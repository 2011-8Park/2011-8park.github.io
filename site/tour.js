(() => {
  const dialog = document.querySelector('.photo-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const assetBase = new URL('assets/', document.currentScript.src);
  const views = [
    { src: 'assets/living-to-kitchen.jpg', title: 'Toward the kitchen', alt: 'Living room looking from the windows toward the kitchen and entry.' },
    { src: 'assets/living-to-windows.jpg', title: 'Toward the windows', alt: 'Living room looking from the kitchen side toward the windows at night.' },
    { src: 'assets/kitchen-to-living.jpg', title: 'A daylight perspective', alt: 'Daylight view of the living area and windows beside the kitchen counter.' },
    { src: 'assets/primary-bedroom.png', title: 'The primary bedroom', alt: 'Primary bedroom with a bed, warm lighting, and a desk beside the bright windows.' },
    { src: 'assets/bathroom-ensuite.jpg', title: 'The ensuite bathroom', alt: 'Ensuite bathroom with a vanity and bathtub with shower.' },
    { src: 'assets/bathroom-shower.jpg', title: 'The second bathroom', alt: 'Second bathroom with a vanity and glass shower enclosure.' },
    { src: 'assets/living-daylight.jpg', title: 'Living room in daylight', alt: 'Sunlit living room with a sofa and desk beside the windows.' },
    { src: 'assets/kitchen-daylight.jpg', title: 'Kitchen in daylight', alt: 'Daylight view of the open kitchen, white cabinets, and peninsula.' }
  ];
  const scene = document.querySelector('.living-scenes');
  scene?.querySelectorAll('[data-scene]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const index = Number(link.dataset.scene);
      const view = views[index];
      const main = scene.querySelector('.scene-main');
      main.href = new URL(view.src.replace('assets/', ''), assetBase).href;
      main.dataset.view = index;
      const image = main.querySelector('img');
      image.src = main.href;
      image.alt = view.alt;
      scene.querySelector('figcaption').textContent = {6: 'Living room · In the daylight', 1: 'Living room · After dark', 7: 'Kitchen · Ready for everyday life'}[index];
      scene.querySelectorAll('[data-scene]').forEach(item => {
        if (item === link) item.setAttribute('aria-current', 'true');
        else item.removeAttribute('aria-current');
      });
    });
  });
  let current = 0;
  let opener;
  const show = (index) => {
    current = (index + views.length) % views.length;
    const view = views[current];
    const photo = document.querySelector('#tour-photo');
    photo.src = new URL(view.src.replace('assets/', ''), assetBase).href;
    photo.alt = view.alt;
    document.querySelector('#photo-title').textContent = view.title;
    document.querySelector('#photo-count').textContent = `${current + 1} / ${views.length}`;
  };
  document.querySelectorAll('[data-view]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      show(Number(event.currentTarget.dataset.view));
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
