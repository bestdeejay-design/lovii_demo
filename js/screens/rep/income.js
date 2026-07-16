/* ===== Представитель — Доход ===== */

function screenRepIncome() {
  const r = MOCK.rep

  let historyHtml = ''
  r.incomeHistory.forEach(h => {
    historyHtml += TableRow(h.date, '', h.amount.toLocaleString() + '₽')
  })

  return `
    ${TabBar(['День', 'Неделя', 'Месяц'], 0)}
    <div style="padding:8px 16px;">
      <div class="card" style="padding:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <div>
            <div style="font-size:11px;color:var(--text-secondary);">Доход за месяц</div>
            <div style="font-size:20px;font-weight:700;color:var(--pink);">${r.monthlyIncome.toLocaleString()}₽</div>
          </div>
          <div style="font-size:11px;color:var(--tiffany);font-weight:500;">+8% vs прошлый</div>
        </div>
        <div style="display:flex;gap:4px;height:60px;align-items:flex-end;">
          <div style="flex:1;height:65%;background:var(--pink-light);border-radius:4px;"></div>
          <div style="flex:1;height:55%;background:var(--pink-light);border-radius:4px;"></div>
          <div style="flex:1;height:80%;background:var(--pink-light);border-radius:4px;"></div>
          <div style="flex:1;height:70%;background:var(--pink-light);border-radius:4px;"></div>
          <div style="flex:1;height:58%;background:var(--pink-mid);border-radius:4px;"></div>
          <div style="flex:1;height:45%;background:var(--pink-light);border-radius:4px;"></div>
          <div style="flex:1;height:90%;background:var(--pink);border-radius:4px;"></div>
        </div>
      </div>
    </div>
    <div class="section-label">История выплат</div>
    <div class="section-pad">${historyHtml}</div>
  `
}
