(() => {
  const row = document.querySelector('.evening-row');
  if (!row) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const control = document.createElement('button');
  control.type = 'button';
  control.className = 'evening-motion';
  let paused = reduced.matches, direction = 1, last = 0;
  const label = () => { control.textContent = paused ? 'Play photo scrolling' : 'Pause photo scrolling'; };
  control.addEventListener('click', () => { paused = !paused; label(); });
  row.after(control);
  reduced.addEventListener('change', () => { if (reduced.matches) { paused = true; label(); } });
  label();
  const tick = time => {
    const delta = Math.min(time - (last || time), 50);
    last = time;
    const end = row.scrollWidth - row.clientWidth;
    if (!paused && !document.hidden && end > 0 && !row.matches(':hover') && !row.contains(document.activeElement)) {
      row.scrollLeft += direction * delta * .022;
      if (row.scrollLeft >= end - 1) direction = -1;
      if (row.scrollLeft <= 1) direction = 1;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();
