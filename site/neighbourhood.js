(() => {
  if (!window.L || !window.rosedaleCatchment) return;
  const home = [43.6714812, -79.3847360];
  const map = L.map('neighbourhood-map', { scrollWheelZoom: false }).setView(home, 17);
  document.querySelector('.map-fallback')?.remove();
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  const boundary = L.polygon(window.rosedaleCatchment, {
    color: '#697d5d', weight: 2, fillColor: '#9cad86', fillOpacity: 0.18
  }).addTo(map);
  boundary.bindPopup('Rosedale Junior Public School attendance area. Source: TDSB. Confirm individual eligibility with the board.');
  const points = [
    { symbol: '8', name: 'Home · Suite 2011', point: home, note: '8 Park Road', className: 'home-pin' },
    { symbol: 'T', name: 'Bloor–Yonge subway', point: [43.6707855, -79.3856867], note: 'Lines 1 & 2 · ~110 m straight-line distance' },
    { symbol: 'L', name: 'Longo’s', point: [43.6708968, -79.3845092], note: '100 Bloor Street East · ~70 m straight-line distance' },
    { symbol: 'S', name: 'Rosedale Junior Public School', point: [43.67753, -79.38188], note: '22 South Drive · JK–Grade 6 · ~710 m straight-line distance', className: 'school-pin' }
  ];
  points.forEach(place => {
    const icon = L.divIcon({ className: `neighbourhood-pin ${place.className || ''}`, html: `<span>${place.symbol}</span>`, iconSize: [34, 34], iconAnchor: [17, 17] });
    L.marker(place.point, { icon, title: place.name, alt: place.name }).addTo(map)
      .bindPopup(`<strong>${place.name}</strong><br>${place.note}`);
  });
  const controls = document.querySelectorAll('[data-map-view]');
  controls.forEach(button => button.addEventListener('click', () => {
    controls.forEach(control => control.setAttribute('aria-pressed', String(control === button)));
    if (button.dataset.mapView === 'school') map.fitBounds(boundary.getBounds(), { padding: [25, 25], animate: false });
    else map.setView(home, 17, { animate: false });
  }));
  L.control.scale({ imperial: false }).addTo(map);
})();
