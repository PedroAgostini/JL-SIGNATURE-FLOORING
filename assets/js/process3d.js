// Scroll-driven 3D build of a floor, inside "Why Choose Us".
// As the visitor scrolls, a section of floor is installed step by step:
// subfloor prep, moisture check, underlayment, plank by plank, trim and finish.
// Every frame is a pure function of scroll progress, so scrolling back rewinds it.
// Three.js r160 (MIT) loads on demand. Without WebGL the photo fallback and step list remain.

const build = document.getElementById('build');
const stage = document.getElementById('build-stage');
const steps = build ? Array.from(build.querySelectorAll('.bstep')) : [];
const bar = document.getElementById('build-bar');
const reading = document.getElementById('build-reading');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const STEPS = 5;

/* ---------- scroll progress, shared by the step list and the 3D ---------- */
function progress() {
  if (reduce) return 1;
  const r = build.getBoundingClientRect();
  const span = build.offsetHeight - window.innerHeight;
  if (span <= 0) return 1;
  return Math.min(1, Math.max(0, -r.top / span));
}

let activeStep = -1;
function syncSteps(p) {
  const i = reduce ? STEPS - 1 : Math.min(STEPS - 1, Math.floor(p * STEPS));
  if (bar) bar.style.transform = `scaleX(${reduce ? 1 : p.toFixed(4)})`;
  if (i === activeStep) return;
  activeStep = i;
  steps.forEach((li, k) => {
    li.classList.toggle('is-on', reduce || k === i);
    li.classList.toggle('is-done', !reduce && k < i);
  });
}

if (build && stage) {
  steps.forEach((li, k) => {
    li.querySelector('button').addEventListener('click', () => {
      if (reduce) return;
      const span = build.offsetHeight - window.innerHeight;
      const top = build.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + span * ((k + 0.55) / STEPS), behavior: 'smooth' });
    });
  });
  const onScroll = () => syncSteps(progress());
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  if (hasWebGL()) {
    const io = new IntersectionObserver((en) => {
      if (en[0].isIntersecting) { io.disconnect(); load(); }
    }, { rootMargin: '800px 0px' });
    io.observe(build);
  }
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch (e) { return false; }
}

async function load() {
  let THREE;
  try {
    THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js');
  } catch (e) { return; }
  try { mount(THREE); } catch (e) { console.error(e); }
}

/* ---------- helpers ---------- */
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const seg = (p, a, b) => clamp01((p - a) / (b - a));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a, b, t) => a + (b - a) * t;
function rng(seed) {
  return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
}

function woodCanvas({ h, s, l, vary = 8, seed = 3 }) {
  const S = 512;
  const c = document.createElement('canvas');
  c.width = S; c.height = 64;
  const g = c.getContext('2d');
  const r = rng(seed);
  g.fillStyle = `hsl(${h} ${s}% ${l}%)`;
  g.fillRect(0, 0, S, 64);
  for (let k = 0; k < 22; k++) {
    const L = l - 8 - r() * vary;
    g.strokeStyle = `hsla(${h} ${s + 6}% ${L}% / ${0.18 + r() * 0.22})`;
    g.lineWidth = 0.6 + r() * 1.4;
    g.beginPath();
    const y = 4 + r() * 56, ph = r() * 6;
    g.moveTo(0, y);
    for (let x = 0; x <= S; x += 16) g.lineTo(x, y + Math.sin(x * 0.013 + ph) * 4);
    g.stroke();
  }
  if (r() < 0.6) {
    g.fillStyle = `hsla(${h} ${s}% ${l - 20}% / .5)`;
    g.beginPath(); g.ellipse(80 + r() * 350, 20 + r() * 24, 8, 4, 0, 0, Math.PI * 2); g.fill();
  }
  return c;
}

function osbCanvas() {
  const S = 512;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const g = c.getContext('2d');
  const r = rng(91);
  g.fillStyle = '#b8935c';
  g.fillRect(0, 0, S, S);
  for (let i = 0; i < 900; i++) {
    g.save();
    g.translate(r() * S, r() * S);
    g.rotate(r() * Math.PI);
    g.fillStyle = `hsl(${30 + r() * 10} ${35 + r() * 20}% ${42 + r() * 22}%)`;
    g.fillRect(-14 - r() * 18, -4 - r() * 4, 28 + r() * 36, 8 + r() * 8);
    g.restore();
  }
  g.strokeStyle = 'rgba(40,24,10,.55)';
  g.lineWidth = 3;
  g.strokeRect(1, 1, S - 2, S - 2);
  return c;
}

function mount(THREE) {
  const small = window.innerWidth < 760;

  /* ---------- renderer, scene, camera ---------- */
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.75 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const canvas = renderer.domElement;
  canvas.className = 'build__canvas';
  canvas.setAttribute('aria-hidden', 'true');
  stage.insertBefore(canvas, reading);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 200);
  const root = new THREE.Group();
  scene.add(root);

  scene.add(new THREE.HemisphereLight(0xfff0da, 0x24180c, 1.0));
  const sun = new THREE.DirectionalLight(0xffe2b8, 2.3);
  sun.position.set(7, 14, 9);
  sun.castShadow = true;
  sun.shadow.mapSize.set(small ? 1024 : 2048, small ? 1024 : 2048);
  Object.assign(sun.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, near: 1, far: 40 });
  sun.shadow.bias = -0.0005;
  sun.shadow.normalBias = 0.02;
  scene.add(sun);
  const rim = new THREE.DirectionalLight(0xffcf8a, 0.6);
  rim.position.set(-8, 5, -6);
  scene.add(rim);
  const sweep = new THREE.PointLight(0xffd27a, 0, 9, 2);
  scene.add(sweep);

  const mat = (color, o = {}) => new THREE.MeshStandardMaterial(Object.assign({ color, roughness: 0.8 }, o));
  const add = (geo, m, x, y, z, cast = true) => {
    const mesh = new THREE.Mesh(geo, m);
    mesh.position.set(x, y, z);
    mesh.castShadow = cast;
    mesh.receiveShadow = true;
    root.add(mesh);
    return mesh;
  };
  const tex = (cnv, rx = 1, ry = 1) => {
    const t = new THREE.CanvasTexture(cnv);
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    t.repeat.set(rx, ry);
    return t;
  };

  const W = 8, D = 6;

  /* ---------- plinth, subfloor, walls ---------- */
  add(new THREE.BoxGeometry(W + 1.6, 0.5, D + 1.6), mat(0x15100b, { roughness: 0.6 }), 0, -0.45, 0, false);
  const gold = mat(0xc9963a, { metalness: 0.75, roughness: 0.32 });
  add(new THREE.BoxGeometry(W + 1.62, 0.06, 0.06), gold, 0, -0.21, (D + 1.6) / 2, false);
  add(new THREE.BoxGeometry(0.06, 0.06, D + 1.62), gold, (W + 1.6) / 2, -0.21, 0, false);
  add(new THREE.BoxGeometry(W, 0.2, D), mat(0xffffff, { map: tex(osbCanvas(), 2, 1.5), roughness: 0.95 }), 0, -0.1, 0, false);
  const wallM = mat(0xe8e0d3, { roughness: 0.92 });
  add(new THREE.BoxGeometry(W + 0.5, 1.9, 0.25), wallM, 0.25, 0.75, -D / 2 - 0.125);
  add(new THREE.BoxGeometry(0.25, 1.9, D + 0.25), wallM, -W / 2 - 0.125, 0.75, -0.125);
  const capM = mat(0xcfc4b2);
  add(new THREE.BoxGeometry(W + 0.5, 0.04, 0.27), capM, 0.25, 1.72, -D / 2 - 0.125, false);
  add(new THREE.BoxGeometry(0.27, 0.04, D + 0.25), capM, -W / 2 - 0.125, 1.72, -0.125, false);

  /* ---------- step 1: low spots filled as the straightedge passes ---------- */
  const SPOTS = [[-2.6, -1.4, 0.55], [-0.4, 1.3, 0.45], [1.4, -0.6, 0.6], [2.9, 1.6, 0.4], [-1.9, 2.0, 0.35]];
  const LOW = new THREE.Color(0x6e5130), FILLED = new THREE.Color(0xc9bfae);
  const spots = SPOTS.map(([x, z, r]) => {
    const m = add(new THREE.CircleGeometry(r * 0.8, 40), mat(0x6e5130, { roughness: 1 }), x, 0.004, z, false);
    m.rotation.x = -Math.PI / 2;
    return m;
  });
  const edge = add(new THREE.BoxGeometry(0.14, 0.1, D + 0.6), gold, -W / 2 - 0.5, 0.06, 0);

  /* ---------- step 2: moisture meter ---------- */
  const meter = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.2, 1.0), mat(0x1a140e, { roughness: 0.5 }));
  body.castShadow = true;
  const screen = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.02, 0.36), new THREE.MeshStandardMaterial({ color: 0x2a1f12, emissive: 0xd9b866, emissiveIntensity: 0.0 }));
  screen.position.set(0, 0.11, -0.2);
  const pinA = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.12, 0.04), gold);
  pinA.position.set(-0.12, -0.14, 0.42);
  const pinB = pinA.clone(); pinB.position.x = 0.12;
  meter.add(body, screen, pinA, pinB);
  const METER = new THREE.Vector3(1.6, 0.16, 0.9);
  meter.position.copy(METER);
  root.add(meter);
  const ringM = new THREE.MeshBasicMaterial({ color: 0xd9b866, transparent: true, opacity: 0, depthWrite: false });
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.62, 0.68, 64), ringM);
  ring.rotation.x = -Math.PI / 2;
  ring.position.set(METER.x, 0.012, METER.z);
  root.add(ring);

  /* ---------- step 3: underlayment unrolls ---------- */
  const underGeo = new THREE.BoxGeometry(W, 0.02, D);
  underGeo.translate(W / 2, 0, 0);
  const under = add(underGeo, mat(0xcdb98c, { roughness: 0.45, metalness: 0.25 }), -W / 2, 0.012, 0, false);
  const roll = add(new THREE.CylinderGeometry(0.24, 0.24, D + 0.1, 32), mat(0xcdb98c, { roughness: 0.45, metalness: 0.25 }), -W / 2, 0.24, 0);
  roll.rotation.x = Math.PI / 2;

  /* ---------- step 4: planks, staggered rows ---------- */
  const woodMats = [
    { h: 27, s: 46, l: 40, seed: 3 }, { h: 25, s: 50, l: 34, seed: 7 }, { h: 29, s: 44, l: 44, seed: 11 }, { h: 26, s: 48, l: 37, seed: 17 }
  ].map((w) => mat(0xffffff, { map: tex(woodCanvas(w)), roughness: 0.55 }));
  const sideM = mat(0x5a3a1e, { roughness: 0.7 });
  const planks = [];
  const ROWS = 12, PW = D / ROWS, PH = 0.1, GAP = 0.02;
  const r = rng(5);
  for (let row = 0; row < ROWS; row++) {
    const z = -D / 2 + PW / 2 + row * PW;
    let x = -W / 2;
    let len = 0.9 + ((row * 0.83) % 1.7);
    while (x < W / 2 - 0.05) {
      const L = Math.min(len, W / 2 - x);
      const top = woodMats[Math.floor(r() * woodMats.length)];
      const m = new THREE.Mesh(new THREE.BoxGeometry(L - GAP, PH, PW - GAP), [sideM, sideM, top, sideM, sideM, sideM]);
      m.castShadow = true;
      m.receiveShadow = true;
      m.userData.home = new THREE.Vector3(x + L / 2, 0.024 + PH / 2, z);
      root.add(m);
      planks.push(m);
      x += L;
      len = 2.2 + r() * 0.8;
    }
  }

  /* ---------- step 5: trim ---------- */
  const trimM = mat(0xf6f2ea, { roughness: 0.5 });
  const trims = [
    { m: add(new THREE.BoxGeometry(W, 0.34, 0.06), trimM, 0, 0, -D / 2 + 0.03), home: new THREE.Vector3(0, 0.124 + 0.17, -D / 2 + 0.03) },
    { m: add(new THREE.BoxGeometry(0.06, 0.34, D), trimM, -W / 2 + 0.03, 0, 0), home: new THREE.Vector3(-W / 2 + 0.03, 0.124 + 0.17, 0) },
    { m: add(new THREE.BoxGeometry(W, 0.06, 0.06), trimM, 0, 0, -D / 2 + 0.09), home: new THREE.Vector3(0, 0.124 + 0.03, -D / 2 + 0.09) },
    { m: add(new THREE.BoxGeometry(0.06, 0.06, D), trimM, -W / 2 + 0.09, 0, 0), home: new THREE.Vector3(-W / 2 + 0.09, 0.124 + 0.03, 0) }
  ];

  /* ---------- the whole build as a function of progress ---------- */
  const tmpC = new THREE.Color();
  function apply(p) {
    const s1 = seg(p, 0.02, 0.18);  // straightedge + fill
    const s2 = seg(p, 0.2, 0.38);   // meter
    const s3 = seg(p, 0.4, 0.58);   // underlayment
    const s4 = seg(p, 0.6, 0.8);    // planks
    const s5 = seg(p, 0.8, 0.97);   // trim + finish

    // 1. straightedge sweeps, low spots get filled behind it
    const ex = lerp(-W / 2 - 0.5, W / 2 + 0.5, easeInOut(s1));
    edge.position.x = ex;
    edge.visible = s1 > 0 && s1 < 1;
    spots.forEach((m, k) => {
      const filled = clamp01((ex - SPOTS[k][0] + 0.3) / 0.6);
      m.material.color.copy(tmpC.copy(LOW).lerp(FILLED, filled));
      m.visible = s3 < 0.999;
    });

    // 2. meter lands, pulses, reads, then lifts away as the underlayment starts
    const land = easeOut(seg(s2, 0, 0.3));
    const lift = easeInOut(seg(p, 0.385, 0.45));
    meter.position.set(METER.x, METER.y + (1 - land) * 1.6 + lift * 1.8, METER.z);
    meter.rotation.y = (1 - land) * 0.6 - lift * 0.4;
    meter.visible = s2 > 0 && lift < 1;
    const read = seg(s2, 0.35, 0.85);
    screen.material.emissiveIntensity = land * 0.9;
    const pulse = (s2 * 3) % 1;
    ring.visible = land > 0.95 && s2 < 1;
    ring.scale.setScalar(1 + pulse * 2.2);
    ringM.opacity = (1 - pulse) * 0.7;

    // 3. underlayment unrolls from the left wall
    const u = easeInOut(s3);
    under.scale.x = Math.max(0.0001, u);
    under.visible = s3 > 0;
    roll.position.x = -W / 2 + W * u;
    roll.scale.set(1 - u * 0.45, 1, 1 - u * 0.45);
    roll.position.y = 0.24 * (1 - u * 0.45) + 0.02;
    roll.visible = s3 > 0 && s3 < 1;

    // 4. planks drop in, row by row, each clicking into place
    const N = planks.length;
    planks.forEach((m, i) => {
      const t = easeOut(clamp01((s4 * (N + 6) - i) / 6));
      const h = m.userData.home;
      m.visible = t > 0;
      m.position.set(h.x - (1 - t) * 0.35, h.y + (1 - t) * 1.6, h.z + (1 - t) * 0.25);
      m.rotation.z = (1 - t) * 0.35;
      m.rotation.x = (1 - t) * -0.15;
    });

    // 5. trim drops onto the wall line, then a light passes and the floor takes its sheen
    trims.forEach((t, k) => {
      const e = easeOut(seg(s5, k * 0.1, 0.35 + k * 0.1));
      t.m.visible = e > 0;
      t.m.position.set(t.home.x, t.home.y + (1 - e) * 1.2, t.home.z);
    });
    const shine = seg(s5, 0.4, 1);
    sweep.intensity = Math.sin(shine * Math.PI) * 30;
    sweep.position.set(lerp(-W / 2 - 1, W / 2 + 1, shine), 1.4, 0.6);
    woodMats.forEach((m) => { m.roughness = lerp(0.55, 0.22, easeInOut(shine)); });

    return read;
  }

  /* ---------- camera follows the build ---------- */
  function placeCamera(p, time) {
    const a = lerp(0.18, 0.82, easeInOut(p)) + (reduce ? 0 : Math.sin(time * 0.25) * 0.03);
    const aspect = camera.aspect || 1.4;
    const k = aspect < 1.15 ? Math.min(1.35, 1.12 / aspect) : 1;
    const radius = lerp(13.5, 15.8, p) * k;
    const height = lerp(11.5, 7.2, easeInOut(p)) * k;
    camera.position.set(Math.sin(a) * radius, height, Math.cos(a) * radius);
    camera.lookAt(-0.2, 0.1, -0.2);
  }

  /* ---------- size ---------- */
  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(stage);
  resize();

  /* ---------- reading label follows the meter ---------- */
  const rv = new THREE.Vector3();
  const up = new THREE.Vector3(0, 0.6, 0);
  const rb = reading ? reading.querySelector('b') : null;
  const re = reading ? reading.querySelector('em') : null;
  function placeReading(read, visible) {
    if (!reading) return;
    reading.classList.toggle('is-on', visible);
    if (!visible) return;
    rv.copy(meter.position).add(up).project(camera);
    reading.style.transform = `translate(${((rv.x * 0.5 + 0.5) * stage.clientWidth).toFixed(1)}px, ${((-rv.y * 0.5 + 0.5) * stage.clientHeight).toFixed(1)}px)`;
    rb.textContent = Math.round(read * 8) + '%';
    re.textContent = read >= 1 ? 'Ready to install' : 'Testing';
  }

  /* ---------- loop ---------- */
  const clock = new THREE.Clock();
  let shown = progress();
  function frame() {
    const time = clock.getElapsedTime();
    const target = progress();
    shown += (target - shown) * (reduce ? 1 : 0.12);
    if (Math.abs(target - shown) < 0.0005) shown = target;
    const read = apply(shown);
    placeCamera(shown, time);
    renderer.render(scene, camera);
    const s2 = seg(shown, 0.2, 0.38);
    placeReading(read, s2 > 0.3 && shown < 0.4);
  }

  let running = false;
  new IntersectionObserver((en) => {
    const on = en[0].isIntersecting;
    if (on && !running) { renderer.setAnimationLoop(frame); running = true; }
    if (!on && running) { renderer.setAnimationLoop(null); running = false; }
  }, { rootMargin: '100px 0px' }).observe(stage);

  build.classList.add('is-3d');
  frame();
}
