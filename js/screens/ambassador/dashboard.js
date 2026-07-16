/* ===== Амбасадор — Дашборд ===== */

function screenAmbassadorDashboard() {
  const a = MOCK.ambassador

  return `
    ${StatusBanner('🤝', 'Амбасадор', a.reps + ' представителей · ' + a.storesTotal + ' точек', a.monthlyIncome.toLocaleString() + '₽', 'доход / мес')}
    <div class="stats-grid-2">
      ${StatBlock(a.reps, 'Представителей', 'pink')}
      ${StatBlock(a.storesTotal, 'Точек в сети', 'tiffany')}
      ${StatBlock(a.monthlyIncome.toLocaleString() + '₽', 'Доход', 'pink')}
      ${StatBlock('4.9', 'Рейтинг сети')}
    </div>
    <div class="section-label">Представители <a href="#ambassador/reps">Все</a></div>
    <div class="section-pad">
      ${a.repList.map(r => TableRow(r.name, r.stores + ' точек', r.income.toLocaleString() + '₽')).join('')}
    </div>
  `
}
