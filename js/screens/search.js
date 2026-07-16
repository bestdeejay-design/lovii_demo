/* ===== Поиск (shared) ===== */

function screenSearch() {
  let storesHtml = ''
  MOCK.stores.filter(s => s.active).forEach(s => {
    storesHtml += `
      <div class="p-order" style="cursor:default;">
        <div class="left">
          <span style="font-size:18px;margin-right:6px;">${s.emoji}</span>
          <div>
            <div class="oname">${s.name}</div>
            <div style="font-size:9px;color:var(--text-secondary);margin-top:1px;">
              <span style="color:#fbbf24;">★</span> ${s.rating} · ${s.distance}
            </div>
          </div>
        </div>
        <div class="right" style="flex-direction:column;align-items:flex-end;gap:1px;">
          <span style="font-size:10px;font-weight:600;">${s.orders} заказов</span>
          <span style="font-size:9px;color:var(--text-secondary);">${s.revenue.toLocaleString()}₽</span>
        </div>
      </div>`
  })

  const recentSearches = ['Пекарня', 'Цветы', 'Кофе', 'Суши']

  return `
    ${SearchBar()}
    <div class="chip-row">
      ${MOCK.stores.filter(s => s.active).map((s, i) => Chip(s.emoji + ' ' + s.category === 'bakery' ? 'Выпечка' : s.category === 'flowers' ? 'Цветы' : s.category === 'coffee' ? 'Кофе' : s.category === 'restaurant' ? 'Суши' : s.category, '', i === 0)).join('')}
    </div>
    <div class="section-label">Магазины рядом</div>
    <div class="section-pad">${storesHtml}</div>
  `
}
