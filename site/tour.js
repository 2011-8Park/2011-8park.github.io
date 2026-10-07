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
    { src: 'assets/kitchen-daylight.jpg', title: 'Kitchen in daylight', alt: 'Daylight view of the open kitchen, white cabinets, and peninsula.' },
    { src: 'assets/living-sunlight-angle.jpg', title: 'Another sunny corner', alt: 'Living room with sunlight across the floor and a view toward the bedroom doorway.' },
    { src: 'assets/entryway.jpg', title: 'A welcome home', alt: 'Entryway with a round mirror and shoe storage.' },
    { src: 'assets/rooftop-lounge.jpg', title: 'Rooftop lounge', alt: 'Rooftop terrace with lounge chairs, planting, and barbecues.' },
    { src: 'assets/rooftop-garden.jpg', title: 'Rooftop garden', alt: 'Landscaped rooftop walkway with flowers and trees.' },
    { src: 'assets/2011_8Park_floorplan.png', title: 'Original floor plan · Suite 2011', alt: 'Original floor plan with room dimensions for Suite 2011 at 8 Park Road.' }
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
  let pool = views.map((_, index) => index);
  const livingViews = [6, 7, 2];
  const groups = { rooms: [6, 7, 1, 3, 4, 5], extras: [8, 9, 10, 11], evening: [1, 0], living: livingViews, bedroom: [3], ensuite: [4], bathroom: [5], entry: [9], rooftop: [10, 11] };
  let opener;
  const show = (index) => {
    current = (index + views.length) % views.length;
    const view = views[current];
    const photo = document.querySelector('#tour-photo');
    photo.src = new URL(view.src.replace('assets/', ''), assetBase).href;
    photo.alt = view.alt;
    document.querySelector('#photo-title').textContent = view.title;
    document.querySelector('#photo-count').textContent = `${pool.indexOf(current) + 1} / ${pool.length}`;
  };
  document.querySelectorAll('[data-view]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      const selected = Number(link.dataset.view);
      pool = groups[link.dataset.tour] || (livingViews.includes(selected) ? livingViews : [10, 11].includes(selected) ? groups.rooftop : [selected]);
      const hint = document.querySelector('#photo-browse-hint');
      hint.textContent = pool === livingViews ? 'Living room → Kitchen → Daylight angle · Use the arrows to browse' : pool.length > 1 ? link.dataset.tour === 'extras' ? 'More photos · Use ← / → to browse' : link.dataset.tour === 'rooms' ? 'Room by room · Use ← / → to browse' : 'Use the arrows to browse this space' : selected === 12 ? 'Original layout and room dimensions' : 'One photograph of this space';
      document.querySelectorAll('.photo-prev, .photo-next').forEach(button => { button.disabled = pool.length === 1; });
      show(Number(event.currentTarget.dataset.view));
      dialog.showModal();
      document.body.classList.add('photo-open');
    });
  });
  const step = (direction) => show(pool[(pool.indexOf(current) + direction + pool.length) % pool.length]);
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  document.querySelector('.photo-prev').addEventListener('click', () => step(-1));
  document.querySelector('.photo-next').addEventListener('click', () => step(1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      step(event.key === 'ArrowRight' ? 1 : -1);
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
