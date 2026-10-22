/* JL Signature Flooring: page behavior. The 3D room lives in room3d.js. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- services: one source of truth for tabs, card, pins and form ---------- */
  var SERVICES = {
    lvp: { code: 'No. 01', title: 'LVP Flooring', form: 'LVP Flooring',
      text: '100% waterproof luxury vinyl plank installation ideal for high-traffic areas and busy households.',
      best: 'Kitchens, basements, mudrooms and homes with kids or pets.',
      img: 'assets/img/projects/jl-signature-wood-look-floor-bright-open-room.webp', alt: 'Wood-look plank floor in a bright empty room with wood-trimmed windows' },
    laminate: { code: 'No. 02', title: 'Laminate Flooring', form: 'Laminate Flooring',
      text: 'Budget-friendly and impact-resistant laminate installations offering authentic hardwood aesthetics.',
      best: 'Bedrooms, living areas and rentals.',
      img: 'assets/img/illustrative/jl-signature-laminate-oak-bright-room-ai.webp', alt: 'Illustrative image of oak-look laminate in a clean bright room' },
    hardwood: { code: 'No. 03', title: 'Hardwood Installation (Solid & Engineered)', form: 'Hardwood Installation',
      text: 'Authentic solid and engineered wood floors that bring timeless character and real estate value.',
      best: 'Living rooms, dining rooms and bedrooms.',
      img: 'assets/img/projects/jl-signature-light-oak-floor-blue-dining-room.webp', alt: 'Light oak floor in a blue dining room with white wainscoting' },
    refinish: { code: 'No. 04', title: 'Hardwood Floor Refinishing', form: 'Hardwood Floor Refinishing',
      text: 'Complete surface sanding, color restaining, and protective clear coating for aging hardwood.',
      best: 'Scratched, faded or dull hardwood that is still solid underneath.',
      img: 'assets/img/projects/jl-signature-oak-floor-living-room-daylight.webp', alt: 'Brown oak floor in a furnished living room with natural daylight' },
    stairs: { code: 'No. 05', title: 'Custom Stairs', form: 'Custom Stairs',
      text: 'Custom tread and riser installations creating seamless transitions between your home levels.',
      best: 'Matching your stairs to new floors upstairs and down.',
      img: 'assets/img/illustrative/jl-signature-stairs-oak-white-risers-ai.webp', alt: 'Illustrative image of oak stair treads with white risers' },
    trim: { code: 'No. 06', title: 'Baseboards & Trim', form: 'Baseboards & Trim',
      text: 'Crisp baseboards, quarter round, and shoe molding that deliver a complete architectural border.',
      best: 'Finishing any new floor, or refreshing tired trim.',
      img: 'assets/img/projects/jl-signature-wood-look-floor-white-baseboards.webp', alt: 'Wood-look plank floor with white baseboards in a clean gray room' }
  };
  var ORDER = ['lvp', 'laminate', 'hardwood', 'refinish', 'stairs', 'trim'];
  var current = 'hardwood';

  var tabs = $$('.tab');
  var card = $('#room-card');
  var fallback = $('#room-fallback');
  var cardCta = card ? $('[data-card="cta"]', card) : null;

  function selectService(id, opts) {
    var s = SERVICES[id];
    if (!s || !card) return;
    current = id;
    tabs.forEach(function (t) {
      var on = t.getAttribute('data-service') === id;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      if (on) {
        card.setAttribute('aria-labelledby', t.id);
        if (opts && opts.scrollTab) {
          var bar = t.parentNode;
          if (bar.scrollWidth > bar.clientWidth) bar.scrollTo({ left: t.offsetLeft - 16, behavior: reduceMotion ? 'auto' : 'smooth' });
        }
      }
    });
    $('[data-card="code"]', card).textContent = s.code;
    $('[data-card="title"]', card).textContent = s.title;
    $('[data-card="text"]', card).textContent = s.text;
    $('[data-card="best"]', card).textContent = s.best;
    if (fallback) { fallback.src = s.img; fallback.alt = s.alt; }
    document.dispatchEvent(new CustomEvent('jl:service', { detail: { id: id } }));
  }

  window.JL = {
    services: SERVICES,
    order: ORDER,
    select: function (id) { selectService(id, { scrollTab: true }); },
    get current() { return current; }
  };

  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { selectService(t.getAttribute('data-service')); });
    t.addEventListener('keydown', function (e) {
      var k = e.key, n = null;
      if (k === 'ArrowDown' || k === 'ArrowRight') n = (i + 1) % tabs.length;
      if (k === 'ArrowUp' || k === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
      if (k === 'Home') n = 0;
      if (k === 'End') n = tabs.length - 1;
      if (n !== null) { e.preventDefault(); tabs[n].focus(); selectService(tabs[n].getAttribute('data-service'), { scrollTab: true }); }
    });
  });

  if (cardCta) cardCta.addEventListener('click', function () { prefill(SERVICES[current].form); });

  $$('[data-pick]').forEach(function (a) {
    a.addEventListener('click', function () { prefill(a.getAttribute('data-pick')); });
  });

  $$('[data-go]').forEach(function (a) {
    a.addEventListener('click', function () { selectService(a.getAttribute('data-go'), { scrollTab: true }); });
  });

  /* ---------- prefill the estimate form ---------- */
  function prefill(service, zip) {
    var ef = $('#estimate-form');
    if (ef && service) {
      $$('input[name="service"]', ef).forEach(function (r) { r.checked = r.value === service; });
      var fld = $('#f-service-fld');
      if (fld) fld.classList.remove('has-error');
    }
    if (zip) $('#f-zip').value = zip;
  }

  /* ---------- input masks: US phone and 5 digit ZIP ---------- */
  function formatPhone(v) {
    var d = String(v).replace(/\D/g, '');
    if (d.length > 10 && d.charAt(0) === '1') d = d.slice(1);
    d = d.slice(0, 10);
    if (d.length === 0) return '';
    if (d.length < 4) return '(' + d;
    if (d.length < 7) return '(' + d.slice(0, 3) + ') ' + d.slice(3);
    return '(' + d.slice(0, 3) + ') ' + d.slice(3, 6) + '-' + d.slice(6);
  }
  function keepCaret(input, formatted) {
    // keep the caret after the same number of digits it had before formatting
    var pos = input.selectionStart == null ? input.value.length : input.selectionStart;
    var digitsBefore = input.value.slice(0, pos).replace(/\D/g, '').length;
    input.value = formatted;
    var n = 0, p = 0;
    while (p < formatted.length && n < digitsBefore) { if (/\d/.test(formatted.charAt(p))) n++; p++; }
    if (document.activeElement === input) input.setSelectionRange(p, p);
  }
  $$('input[name="phone"]').forEach(function (input) {
    input.addEventListener('input', function () { keepCaret(input, formatPhone(input.value)); });
  });
  $$('input[name="zip"]').forEach(function (input) {
    input.setAttribute('maxlength', '5');
    input.addEventListener('input', function () {
      var d = input.value.replace(/\D/g, '').slice(0, 5);
      if (d !== input.value) keepCaret(input, d);
    });
  });

  /* ---------- lead delivery (Web3Forms), shared by the hero form and the full form ---------- */
  function sendLead(form, data, statusEl, onDone) {
    statusEl.className = 'form__status';
    statusEl.textContent = '';
    var btn = form.querySelector('button[type="submit"]');
    var label = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = 'Sending...';
    var key = $('#estimate-form input[name="access_key"]').value;
    if (!key || key.indexOf('YOUR_') === 0) console.warn('Web3Forms access key is not set in index.html');
    data.access_key = key;
    data.subject = 'New estimate request from jlsignatureflooring.com';
    data.from_name = 'JL Signature Flooring website';
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok && j.success, j: j }; }); })
      .then(function (res) {
        if (!res.ok) throw new Error(res.j && res.j.message);
        var first = (data.name || '').trim().split(' ')[0];
        statusEl.className = 'form__status is-ok';
        statusEl.innerHTML = 'Thanks' + (first ? ', ' + escapeHtml(first) : '') + '. Your request is in, and José will reach out by ' + escapeHtml((data.contact_pref || 'phone').toLowerCase()) + '. In a hurry? Call ' + PHONE_LINK + '.';
        form.reset();
        if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { service: data.service });
        if (typeof window.fbq === 'function') window.fbq('track', 'Lead');
        if (onDone) onDone();
      })
      .catch(function () {
        statusEl.className = 'form__status is-err';
        statusEl.innerHTML = 'We could not send your request. Please try again, or call or text ' + PHONE_LINK + '.';
      })
      .then(function () { btn.disabled = false; btn.innerHTML = label; });
  }

  /* ---------- hero form: three short steps ---------- */
  var quick = $('#quick');
  if (quick) {
    var qSteps = $$('.hstep', quick);
    var qBars = $$('.hsteps__bar', quick);
    var qCount = $('.hsteps__count b', quick);
    var qStep = 1;
    var qFields = { 2: [quick.elements.zip], 3: [quick.elements.name, quick.elements.phone] };

    function showStep(n, focus) {
      qStep = n;
      qSteps.forEach(function (fs) {
        var on = +fs.getAttribute('data-step') === n;
        fs.hidden = !on;
        fs.classList.toggle('is-active', on);
      });
      qBars.forEach(function (b, i) { b.classList.toggle('is-on', i < n); });
      if (qCount) qCount.textContent = n;
      if (focus) {
        var first = $('.hstep[data-step="' + n + '"] input:not([type="radio"]):not([type="checkbox"])', quick) || $('.hstep[data-step="' + n + '"] input', quick);
        if (first) first.focus({ preventScroll: true });
      }
    }
    function stepValid(n) {
      var bad = (qFields[n] || []).filter(function (i) { return !check(i); });
      if (bad.length) { bad[0].focus(); return false; }
      return true;
    }

    [].concat(qFields[2], qFields[3]).forEach(function (input) {
      var err = fieldOf(input).querySelector('.fld__err');
      if (err) { err.id = input.id + '-err'; input.setAttribute('aria-describedby', err.id); }
      input.addEventListener('blur', function () { if (input.value) check(input); });
      input.addEventListener('input', function () { if (fieldOf(input).classList.contains('has-error')) check(input); });
    });

    // step 1: picking a service moves on by itself
    $$('input[name="service"]', quick).forEach(function (r) {
      r.addEventListener('change', function () { setTimeout(function () { showStep(2, true); }, reduceMotion ? 0 : 220); });
    });
    var skip = $('.hstep__skip', quick);
    if (skip) skip.addEventListener('click', function () {
      $$('input[name="service"]', quick).forEach(function (r) { r.checked = false; });
      showStep(2, true);
    });
    $$('.hstep__next', quick).forEach(function (btn) {
      btn.addEventListener('click', function () { if (stepValid(qStep)) showStep(qStep + 1, true); });
    });
    $$('.hstep__back', quick).forEach(function (btn) {
      btn.addEventListener('click', function () { showStep(Math.max(1, qStep - 1), true); });
    });
    // Enter inside step 2 means Next, not submit
    quick.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && qStep < 3 && e.target.tagName === 'INPUT') {
        e.preventDefault();
        if (stepValid(qStep)) showStep(qStep + 1, true);
      }
    });

    quick.addEventListener('submit', function (e) {
      e.preventDefault();
      if (qStep < 3) { if (stepValid(qStep)) showStep(qStep + 1, true); return; }
      if (!stepValid(2)) { showStep(2); stepValid(2); return; }
      if (!stepValid(3)) return;
      var data = Object.fromEntries(new FormData(quick).entries());
      if (data.botcheck) return;
      delete data.botcheck;
      data.service = data.service || 'Not sure yet';
      data.source = 'Hero form (3 steps)';
      prefill(data.service, data.zip);
      sendLead(quick, data, $('#quick-status'), function () {
        quick.classList.add('is-sent');
        showStep(1);
      });
    });
  }

  /* ---------- header + mobile bar ---------- */
  var header = $('.header');
  var mbar = $('#mbar');
  var hero = $('.hero');
  var estimate = $('#estimate');
  var estimateVisible = false;
  var quickVisible = false;
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('is-solid', y > 24);
    if (mbar) mbar.classList.toggle('is-on', !estimateVisible && !quickVisible);
  }
  if ('IntersectionObserver' in window && estimate) {
    new IntersectionObserver(function (en) { estimateVisible = en[0].isIntersecting; onScroll(); }, { threshold: 0.12 }).observe(estimate);
  }
  var quickBtn = $('#quick');
  if ('IntersectionObserver' in window && quickBtn) {
    // the hero form is its own call to action: keep the bar out of its way
    new IntersectionObserver(function (en) { quickVisible = en[0].isIntersecting; onScroll(); }, { threshold: 0 }).observe(quickBtn);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- drawer ---------- */
  var drawer = $('#drawer');
  var openBtn = $('#menu-open');
  function setDrawer(open) {
    drawer.classList.toggle('is-open', open);
    openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) $('[data-close]', drawer).focus(); else openBtn.focus({ preventScroll: true });
  }
  if (drawer && openBtn) {
    openBtn.addEventListener('click', function () { setDrawer(true); });
    $('[data-close]', drawer).addEventListener('click', function () { setDrawer(false); });
    $$('a', drawer).forEach(function (a) { a.addEventListener('click', function () { if (a.getAttribute('href').charAt(0) === '#') setDrawer(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && drawer.classList.contains('is-open')) setDrawer(false); });
  }

  /* ---------- nav: mark the section in view ---------- */
  var navLinks = $$('.nav a');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) { a.setAttribute('aria-current', a.getAttribute('href') === '#' + en.target.id ? 'true' : 'false'); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['services', 'tour', 'work', 'reviews', 'process', 'faq'].forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* ---------- hero planks: separate depth planes on scroll ---------- */
  var planks = $$('[data-depth]');
  if (planks.length && !reduceMotion) {
    var ticking = false;
    var drift = function () {
      ticking = false;
      var y = Math.min(window.scrollY, window.innerHeight * 1.2);
      planks.forEach(function (p) {
        var d = parseFloat(p.getAttribute('data-depth'));
        p.style.transform = 'translate3d(0,' + (-y * d).toFixed(1) + 'px,0)';
      });
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(drift); } }, { passive: true });
  }

  /* ---------- why: boards lay in ---------- */
  var boards = $('#boards');
  if (boards) {
    if ('IntersectionObserver' in window && !reduceMotion) {
      new IntersectionObserver(function (en, obs) {
        if (en[0].isIntersecting) { boards.classList.add('is-in'); obs.disconnect(); }
      }, { threshold: 0.25 }).observe(boards);
    } else boards.classList.add('is-in');
  }

  /* ---------- before / after ---------- */
  var ba = $('#ba');
  if (ba) {
    var range = $('.ba__range', ba);
    var setPos = function () { ba.style.setProperty('--pos', range.value + '%'); };
    range.addEventListener('input', setPos);
    setPos();
  }

  /* ---------- estimate form (Web3Forms) ---------- */
  var form = $('#estimate-form');
  var statusEl = $('#form-status');
  var PHONE_LINK = '<a href="tel:+19138206569">(913) 820-6569</a>';

  function fieldOf(input) { return input.closest('.fld'); }
  function check(input) {
    var v = (input.value || '').trim();
    var ok = true;
    if (input.name === 'name') ok = v.length > 1;
    else if (input.name === 'phone') ok = v.replace(/\D/g, '').length >= 10;
    else if (input.name === 'zip') ok = /^\d{5}$/.test(v);
    else if (input.name === 'service') ok = v !== '';
    else if (input.name === 'email') ok = v === '' || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    var f = fieldOf(input);
    if (f) f.classList.toggle('has-error', !ok);
    input.setAttribute('aria-invalid', ok ? 'false' : 'true');
    return ok;
  }

  if (form) {
    var checked = ['name', 'phone', 'zip', 'email'].map(function (n) { return form.elements[n]; });
    var svcFld = $('#f-service-fld');
    function svcValid() {
      var ok = !!form.elements.service.value;
      svcFld.classList.toggle('has-error', !ok);
      return ok;
    }
    $$('input[name="service"]', form).forEach(function (r) { r.addEventListener('change', svcValid); });
    var summary = $('#f-summary');
    function fillSummary() {
      if (!summary) return;
      var parts = [form.elements.service.value, form.elements.zip.value && 'ZIP ' + form.elements.zip.value, form.elements.approx_sqft.value].filter(Boolean);
      summary.innerHTML = '<span>Your project</span>' + parts.map(escapeHtml).join(' · ');
    }
    checked.forEach(function (input) {
      var err = fieldOf(input).querySelector('.fld__err');
      if (err) { err.id = input.id + '-err'; input.setAttribute('aria-describedby', err.id); }
      input.addEventListener('blur', function () { if (input.value) check(input); });
      input.addEventListener('input', function () { if (fieldOf(input).classList.contains('has-error')) check(input); });
      input.addEventListener('change', function () { if (fieldOf(input).classList.contains('has-error')) check(input); });
    });

    /* step-by-step flow */
    var stepEls = $$('.form__step', form);
    var dots = $$('[data-step-dot]', form);
    var backBtn = $('[data-step-back]', form);
    var nextBtn = $('[data-step-next]', form);
    var sendBtn = $('button[type="submit"]', form);
    var step = 0;

    function showStep(n, focus) {
      step = n;
      stepEls.forEach(function (el, i) { el.hidden = i !== n; });
      dots.forEach(function (d, i) {
        d.classList.toggle('is-current', i === n);
        d.classList.toggle('is-done', i < n);
        if (i === n) d.setAttribute('aria-current', 'step'); else d.removeAttribute('aria-current');
      });
      var last = n === stepEls.length - 1;
      backBtn.hidden = n === 0;
      nextBtn.hidden = last;
      sendBtn.hidden = !last;
      if (n === 2) fillSummary();
      if (focus) {
        var first = stepEls[n].querySelector('input:not([type="hidden"]):not([type="radio"]), select, textarea') || stepEls[n].querySelector('input[type="radio"]');
        if (first) first.focus({ preventScroll: true });
      }
    }
    function stepValid() {
      if (step === 0 && !svcValid()) { $('input[name="service"]', form).focus(); return false; }
      var bad = checked.filter(function (i) { return stepEls[step].contains(i) && !check(i); });
      if (bad.length) { bad[0].focus(); return false; }
      return true;
    }
    nextBtn.addEventListener('click', function () { if (stepValid()) showStep(step + 1, true); });
    backBtn.addEventListener('click', function () { showStep(step - 1, true); });
    showStep(0);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      statusEl.className = 'form__status';
      statusEl.textContent = '';
      if (step < stepEls.length - 1) { if (stepValid()) showStep(step + 1, true); return; }
      if (!svcValid()) { showStep(0); $('input[name="service"]', form).focus(); return; }
      var bad = checked.filter(function (i) { return !check(i); });
      if (bad.length) {
        var badStep = stepEls.findIndex(function (s) { return s.contains(bad[0]); });
        showStep(badStep);
        bad[0].focus();
        return;
      }

      var data = Object.fromEntries(new FormData(form).entries());
      if (data.botcheck) return;
      delete data.botcheck;
      if (!data.access_key || data.access_key.indexOf('YOUR_') === 0) console.warn('Web3Forms access key is not set in index.html');

      var btn = form.querySelector('button[type="submit"]');
      var label = btn.innerHTML;
      btn.disabled = true;
      btn.textContent = 'Sending...';

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok && j.success, j: j }; }); })
        .then(function (res) {
          if (!res.ok) throw new Error(res.j && res.j.message);
          var first = (data.name || '').trim().split(' ')[0];
          statusEl.className = 'form__status is-ok';
          statusEl.innerHTML = 'Thanks' + (first ? ', ' + escapeHtml(first) : '') + '. Your request is in, and José will reach out by ' + escapeHtml((data.contact_pref || 'phone').toLowerCase()) + '. In a hurry? Call ' + PHONE_LINK + '.';
          form.reset();
          showStep(0);
          if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { service: data.service });
          if (typeof window.fbq === 'function') window.fbq('track', 'Lead');
        })
        .catch(function () {
          statusEl.className = 'form__status is-err';
          statusEl.innerHTML = 'We could not send your request. Please try again, or call or text ' + PHONE_LINK + '.';
        })
        .then(function () { btn.disabled = false; btn.innerHTML = label; });
    });
  }

  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  /* ---------- service area map ---------- */
  var CITIES = [
    ['Raymore, MO', 38.8017, -94.4527, true],
    ['Kansas City, MO', 39.0997, -94.5786],
    ["Lee's Summit, MO", 38.9108, -94.3822],
    ['Belton, MO', 38.812, -94.5319],
    ['Grandview, MO', 38.8858, -94.533],
    ['Raytown, MO', 39.0086, -94.4636],
    ['Overland Park, KS', 38.9822, -94.6708],
    ['Olathe, KS', 38.8814, -94.8191],
    ['Lenexa, KS', 38.9536, -94.7336],
    ['Shawnee, KS', 39.0228, -94.7152],
    ['Leawood, KS', 38.9667, -94.6169],
    ['Kansas City, KS', 39.1141, -94.6275]
  ];
  function initMap() {
    var el = $('#map');
    if (!el || !window.L || el._mapped) return;
    el._mapped = true;
    var map = window.L.map(el, { scrollWheelZoom: false });
    window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 16,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    var pts = [];
    CITIES.forEach(function (c) {
      var icon = window.L.divIcon({ className: '', html: '<div class="city-pin' + (c[3] ? ' city-pin--home' : '') + '"></div>', iconSize: [16, 16], iconAnchor: [8, 8] });
      window.L.marker([c[1], c[2]], { icon: icon, keyboard: false, title: c[0] }).addTo(map)
        .bindTooltip(c[0], { className: 'city-tip', direction: 'top', offset: [0, -8], permanent: !!c[3] });
      pts.push([c[1], c[2]]);
    });
    map.fitBounds(pts, { padding: [28, 28] });
  }
  var mapEl = $('#map');
  if (mapEl && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (en, obs) {
      if (!en[0].isIntersecting) return;
      obs.disconnect();
      if (window.L) initMap(); else window.addEventListener('load', initMap);
    }, { rootMargin: '400px' }).observe(mapEl);
  } else window.addEventListener('load', initMap);

  var yr = $('#year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
