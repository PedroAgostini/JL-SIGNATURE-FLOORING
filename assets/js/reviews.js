/* Continuous, draggable loop of verified Google review excerpts. */
(function () {
  'use strict';
  var carousel = document.querySelector('.reviews-carousel');
  if (!carousel) return;
  var track = carousel.querySelector('.reviews-carousel__track');
  var viewport = carousel.querySelector('.reviews-carousel__viewport');
  var cards = Array.prototype.slice.call(track.children);
  if (cards.length < 4) return;
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var count = cards.length, step = 0, cycle = 0, offset = 0, viewportWidth = 0;
  var frame = null, lastTime = null, visible = false, pointer = null;
  var suppressClick = false, visibleRange = '', keyboardFocus = false;
  var speed = 32; // CSS pixels per second, independent of refresh rate.

  function copy(card) {
    var clone = card.cloneNode(true);
    clone.removeAttribute('data-review-author');
    clone.setAttribute('data-review-clone', '');
    clone.setAttribute('aria-hidden', 'true');
    clone.inert = true;
    return clone;
  }
  // Full copies on each side allow arbitrary dragging in either direction.
  cards.forEach(function (card) { track.insertBefore(copy(card), cards[0]); });
  cards.forEach(function (card) { track.appendChild(copy(card)); });
  var allCards = Array.prototype.slice.call(track.children);

  function render() {
    if (!cycle) return;
    offset = ((offset % cycle) + cycle) % cycle;
    var position = cycle + offset;
    track.style.transform = 'translate3d(' + (-position) + 'px, 0, 0)';
    var first = Math.floor(position / step);
    var last = Math.ceil((position + viewportWidth) / step) - 1;
    var range = first + ':' + last;
    if (range === visibleRange) return;
    visibleRange = range;
    allCards.forEach(function (card, i) {
      var shown = i >= first && i <= last;
      card.inert = !shown;
      card.setAttribute('aria-hidden', String(!shown));
    });
  }
  function animate(time) {
    frame = null;
    if (lastTime !== null) offset += Math.min(time - lastTime, 64) * speed / 1000;
    lastTime = time;
    render();
    frame = requestAnimationFrame(animate);
  }
  function sync() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    lastTime = null;
    if (visible && !document.hidden && !motion.matches && !pointer && !keyboardFocus) frame = requestAnimationFrame(animate);
  }
  function measure() {
    var progress = step ? offset / step : 0;
    step = cards[1].getBoundingClientRect().left - cards[0].getBoundingClientRect().left;
    cycle = step * count;
    viewportWidth = track.clientWidth;
    offset = progress * step;
    visibleRange = '';
    render();
  }
  viewport.addEventListener('pointerdown', function (event) {
    if (!event.isPrimary || event.button !== 0) return;
    pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, lastX: event.clientX, dragging: false };
    suppressClick = false;
    sync();
  });
  viewport.addEventListener('pointermove', function (event) {
    if (!pointer || event.pointerId !== pointer.id) return;
    var dx = event.clientX - pointer.x, dy = event.clientY - pointer.y;
    if (!pointer.dragging) {
      if (Math.abs(dx) < 6 || Math.abs(dx) <= Math.abs(dy)) return;
      pointer.dragging = true;
      viewport.setPointerCapture(event.pointerId);
      carousel.classList.add('is-dragging');
    }
    event.preventDefault();
    offset -= event.clientX - pointer.lastX;
    pointer.lastX = event.clientX;
    suppressClick = true;
    render();
  });
  function release(event) {
    if (!pointer || event.pointerId !== pointer.id) return;
    var id = pointer.id;
    pointer = null;
    carousel.classList.remove('is-dragging');
    if (viewport.hasPointerCapture(id)) viewport.releasePointerCapture(id);
    sync();
  }
  window.addEventListener('pointerup', release);
  window.addEventListener('pointercancel', release);
  viewport.addEventListener('lostpointercapture', release);
  window.addEventListener('blur', function () {
    pointer = null;
    carousel.classList.remove('is-dragging');
    sync();
  });
  viewport.addEventListener('click', function (event) {
    if (!suppressClick || event.detail === 0) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClick = false;
  }, true);
  viewport.addEventListener('dragstart', function (event) { event.preventDefault(); });
  viewport.addEventListener('keydown', function (event) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    viewport.focus({ preventScroll: true });
    offset += event.key === 'ArrowRight' ? step : -step;
    render();
  });
  // Keep links stable for keyboard navigation; hovering never stops motion.
  viewport.addEventListener('focusin', function (event) {
    keyboardFocus = event.target.matches(':focus-visible');
    sync();
  });
  viewport.addEventListener('focusout', function (event) {
    if (viewport.contains(event.relatedTarget)) return;
    keyboardFocus = false;
    sync();
  });
  document.addEventListener('visibilitychange', sync);
  motion.addEventListener('change', sync);
  new ResizeObserver(measure).observe(viewport);
  new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; sync(); }).observe(carousel);
  carousel.classList.add('is-ready');
  viewport.tabIndex = 0;
  viewport.setAttribute('aria-label', 'Customer reviews. Drag or use left and right arrow keys to browse.');
  measure();
})();
