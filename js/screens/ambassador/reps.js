/* ===== Амбасадор — Представители ===== */

function screenAmbassadorReps() {
  const a = MOCK.ambassador

  let html = ''
  a.repList.forEach(r => {
    html += `
      <div class="p-order" style="cursor:default;">
        <div class="left">
          <div style="width:28px;height:28px;border-radius:50%;background:var(--pink-light);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:var(--pink);flex-shrink:0;">
            ${r.name.charAt(0)}
          </div>
          <div>
            <div class="oname">${r.name}</div>
            <div style="font-size:9px;color:var(--text-secondary);margin-top:1px;">${r.stores} точек</div>
          </div>
        </div>
        <div class="right">
          <span style="font-size:11px;font-weight:600;">${r.income.toLocaleString()}₽</span>
        </div>
      </div>`
  })

  return `
    <div class="quick-bar">
      ${QuickBtn('plus', 'Добавить')}
      ${QuickBtn('bar-chart', 'Отчёт', 'ghost')}
    </div>
    <div class="section-label">Все представители (${a.reps})</div>
    <div class="section-pad">${html}</div>
  `
}
