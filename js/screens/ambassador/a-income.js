/* ===== Амбасадор — Доход ===== */

function screenAmbassadorIncome() {
  const a = MOCK.ambassador

  return `
    ${TabBar(['День', 'Неделя', 'Месяц'], 2)}
    <div style="padding:8px 16px;">
      <div class="card" style="padding:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <div>
            <div style="font-size:11px;color:var(--text-secondary);">Доход за месяц</div>
            <div style="font-size:20px;font-weight:700;color:var(--pink);">${a.monthlyIncome.toLocaleString()}₽</div>
          </div>
          <div style="font-size:11px;color:var(--tiffany);font-weight:500;">+15% vs прошлый</div>
        </div>
      </div>
    </div>
    <div class="section-label">Доход по представителям</div>
    <div class="section-pad">
      ${a.repList.map(r => TableRow(r.name, r.stores + ' точек', r.income.toLocaleString() + '₽')).join('')}
    </div>
  `
}
