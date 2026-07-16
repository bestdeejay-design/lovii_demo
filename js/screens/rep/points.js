/* ===== Представитель — Точки ===== */

function screenRepPoints() {
  const stores = MOCK.rep.stores

  let html = ''
  stores.forEach(s => {
    const store = MOCK.stores.find(st => st.id === s.id)
    html += `
      <div class="p-order" style="cursor:default;">
        <div class="left">
          <span style="font-size:16px;margin-right:4px;">${store ? store.emoji : '🏪'}</span>
          <div>
            <div class="oname">${s.name}</div>
            <div style="font-size:9px;color:var(--text-secondary);margin-top:1px;">
              ${store ? '★' + store.rating + ' · ' + store.address : ''}
            </div>
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:11px;font-weight:600;">${s.revenue.toLocaleString()}₽</div>
          <div style="font-size:9px;color:var(--text-secondary);">${s.orders} заказов</div>
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
