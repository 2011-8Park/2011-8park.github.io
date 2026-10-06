(() => {
  const dialog = document.querySelector('.photo-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const views = [
    { src: 'assets/living-to-kitchen.jpg', title: 'Toward the kitchen', alt: 'Living room looking from the windows toward the kitchen and entry.' },
    { src: 'assets/living-to-windows.jpg', title: 'Toward the windows', alt: 'Living room looking from the kitchen side toward the windows at night.' },
    { src: 'assets/kitchen-to-living.jpg', title: 'A daylight perspective', alt: 'Daylight view of the living area and windows beside the kitchen counter.' }
  ];
  let current = 0;
  let opener;
  const show = (index) => {
    current = (index + views.length) % views.length;
    const view = views[current];
    const photo = document.querySelector('#tour-photo');
    photo.src = view.src;
    photo.alt = view.alt;
    document.querySelector('#photo-title').textContent = view.title;
    document.querySelector('#photo-count').textContent = `${current + 1} / ${views.length}`;
  };
  document.querySelectorAll('[data-view]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      show(Number(link.dataset.view));
      dialog.showModal();
      document.body.classList.add('photo-open');
    });
  });
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  document.querySelector('.photo-prev').addEventListener('click', () => show(current - 1));
  document.querySelector('.photo-next').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('photo-open');
    opener?.focus();
  });
})();
