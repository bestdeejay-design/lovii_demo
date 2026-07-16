/* ===== Представитель — Точки ===== */

function screenRepPoints() {
  const stores = MOCK.rep.stores

  let html = ''
  stores.forEach(s => {
    const store = MOCK.stores.find(st => st.id === s.id)
    html += `
      <div class="p-order">
        <div class="left">
          <span style="font-size:16px;">${store ? store.emoji : '🏪'}</span>
          <div>
            <div class="oname">${s.name}</div>
            <div class="or-meta">
              ${store ? '★' + store.rating + ' · ' + store.address : ''}
            </div>
          </div>
        </div>
        <div class="right" style="flex-direction:column;align-items:flex-end;gap:1px;">
          <span style="font-size:11px;font-weight:600;">${s.revenue.toLocaleString()}₽</span>
          <span class="store-meta">${s.orders} заказов</span>
        </div>
      </div>`
  })

  return `
    <div class="stats-grid-2">
      ${StatBlock(stores.length, 'Всего точек', 'pink')}
      ${StatBlock('18', 'Активных', 'tiffany')}
    </div>
    <div style="height:8px;"></div>
    <div class="section-label">Все точки</div>
    <div class="section-pad">${html}</div>
  `
}
