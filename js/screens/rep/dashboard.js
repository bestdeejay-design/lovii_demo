/* ===== Представитель — Дашборд ===== */

function screenRepDashboard() {
  const r = MOCK.rep
  const pct = Math.round((r.points / r.pointsToNext) * 100)
  const statusName = 'Цифровой ' + r.status.charAt(0).toUpperCase() + r.status.slice(1)

  return `
    ${StatusBanner(r.statusIcon, statusName, r.points + ' точек · до Мэра ' + (r.pointsToNext - r.points), r.monthlyIncome.toLocaleString() + '₽', 'доход / мес')}
    ${ProgressBlock('Прогресс до ' + Icon(r.nextIcon === 'award' ? 'star' : r.nextIcon) + ' Цифровой Мэр', r.points, r.pointsToNext, pct)}
    <div class="stats-grid-2">
      ${StatBlock(r.points, 'Торговых точек', 'pink')}
      ${StatBlock(MOCK.stores.filter(s => s.active).length, 'Активных', 'tiffany')}
      ${StatBlock(r.monthlyIncome.toLocaleString() + '₽', 'Доход в месяц', 'pink')}
      ${StatBlock('4.8', 'Средний рейтинг')}
    </div>
    <div class="section-label">Мои точки <a href="#rep/points">Подробнее</a></div>
    <div class="section-pad">
      ${r.stores.map(s => TableRow(escapeHtml(s.name), s.orders + ' зак.', s.revenue.toLocaleString() + '₽')).join('')}
    </div>
    <div class="section-label">Карьера</div>
    <div class="section-pad">
      <div class="menu-item" data-nav="rep/map">
        <div class="icon-box tiffany">${Icon('map-pin', 'icon-sm')}</div>
        <div class="text">
          <div class="title">Карта городов (Мэр)</div>
          <div class="sub">Открыть карту присутствия</div>
        </div>
        <svg class="arrow"><use href="#i-chevron-right"/></svg>
      </div>
    </div>
  `
}
