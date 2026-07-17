/* ===== Амбасадор — Представители ===== */

function screenAmbassadorReps() {
  const a = MOCK.ambassador

  let html = ''
  a.repList.forEach(r => {
    html += `
      <div class="p-order">
        <div class="left">
          <!-- avatar -->
          <div style="width:28px;height:28px;border-radius:50%;background:var(--pink-light);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:var(--pink);flex-shrink:0;">
            ${escapeHtml(r.name.charAt(0))}
          </div>
          <div>
            <div class="oname">${escapeHtml(r.name)}</div>
            <div class="or-meta">${r.stores} точек</div>
          </div>
        </div>
        <div class="right">
          <span class="oprice">${r.income.toLocaleString()}₽</span>
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
