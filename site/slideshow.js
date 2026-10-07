(() => {
  const section = document.querySelector('.home-orbit');
  if (!section) return;
  const base = new URL('assets/', document.currentScript.src);
  const slides = [
    ['living-daylight.jpg', 'Sunlit mornings in the living room.', 'Sunlit living room with a sofa beside the windows'],
    ['kitchen-daylight.jpg', 'An open kitchen for everyday rituals.', 'Open kitchen with white cabinetry and a peninsula'],
    ['primary-bedroom.png', 'A soft landing at the end of the day.', 'Primary bedroom with a bed and desk beside the windows'],
    ['living-to-windows.jpg', 'City lights. A quiet evening in.', 'Living room and windows at night'],
    ['bathroom-ensuite.jpg', 'Your own space to start the morning.', 'Ensuite vanity and bathtub with shower'],
    ['living-sunlight-angle.jpg', 'South-facing light, from another angle.', 'Sunlight across the living room floor']
  ];
  const images = [...section.querySelectorAll('.orbit-image')];
  const button = section.querySelector('.orbit-pause');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0, active = 0, paused = reduced.matches, timer, version = 0;
  const label = () => {
    button.textContent = paused ? 'Play' : 'Pause';
    button.setAttribute('aria-label', `${paused ? 'Play' : 'Pause'} interior slideshow`);
  };
  const show = async (next) => {
    const request = ++version;
    const target = (next + slides.length) % slides.length;
    const [src, caption, alt] = slides[target];
    const nextImage = images[1 - active];
    nextImage.src = new URL(src, base).href;
    try { await nextImage.decode(); } catch { return; }
    if (request !== version) return;
    images[active].classList.remove('is-visible');
    images[active].setAttribute('aria-hidden', 'true');
    nextImage.alt = alt;
    nextImage.removeAttribute('aria-hidden');
    nextImage.classList.add('is-visible');
    section.querySelector('figcaption').textContent = caption;
    active = 1 - active;
    index = target;
  };
  const schedule = () => {
    clearInterval(timer);
    if (!paused && !document.hidden) timer = setInterval(() => {
      if (!section.matches(':hover') && !section.contains(document.activeElement)) show(index + 1);
    }, 6500);
  };
  button.addEventListener('click', () => { paused = !paused; label(); schedule(); });
  section.querySelector('.orbit-prev').addEventListener('click', () => { show(index - 1); schedule(); });
  section.querySelector('.orbit-next').addEventListener('click', () => { show(index + 1); schedule(); });
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', () => { if (reduced.matches) { paused = true; label(); schedule(); } });
  label(); schedule();
})();
