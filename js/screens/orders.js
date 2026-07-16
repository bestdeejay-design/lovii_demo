/* ===== Заказы (role-aware) ===== */

function screenOrders() {
  const role = LOVII.state.role
  if (role === 'client') return clientOrders()
  if (role === 'partner') return screenPartnerOrders()
  if (role === 'rep') return repOrdersBlock()
  if (role === 'ambassador') return ambassadorOrdersBlock()
  return clientOrders()
}

function clientOrders() {
  const orders = getUserOrders()
  const active = orders.filter(o => o.status !== 'delivered')
  const history = orders.filter(o => o.status === 'delivered')

  let activeHtml = ''
  active.forEach(o => {
    const statusText = o.status === 'preparing' ? 'Готовится' : 'В пути'
    const color = o.status === 'preparing' ? 'pink' : 'tiffany'
    activeHtml += OrderRow(o.emoji || 'package', o.store, o.amount.toLocaleString() + '₽', statusText, color)
  })

  let historyHtml = ''
  history.forEach(o => {
    historyHtml += OrderRow(o.emoji || 'package', o.store, o.amount.toLocaleString() + '₽', o.date, 'gray')
  })

  return `
    <div class="tab-bar" id="order-tabs">
      <span class="tab-item active" data-tab="active">Активные</span>
      <span class="tab-item" data-tab="history">История</span>
    </div>
    <div id="order-active" class="section-pad section-top">
      ${activeHtml ? `<div class="card">${activeHtml}</div>` : '<div style="padding:16px;text-align:center;font-size:12px;color:var(--text-secondary);">Нет активных заказов</div>'}
    </div>
    <div id="order-history" class="section-pad section-top" style="display:none;">
      ${historyHtml ? `<div class="card">${historyHtml}</div>` : '<div style="padding:16px;text-align:center;font-size:12px;color:var(--text-secondary);">История пуста</div>'}
    </div>
  `
}

function repOrdersBlock() {
  return `
    <div style="padding:16px;display:flex;flex-direction:column;gap:10px;">
      <div class="stats-grid-2">
        ${StatBlock('135', 'Заказов сегодня', 'pink')}
        ${StatBlock('162 000₽', 'Выручка', 'tiffany')}
      </div>
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:11px;font-weight:500;">Пекарня #23</span>
          <span style="font-size:12px;font-weight:600;">45 зак.</span>
          <span style="font-size:11px;color:var(--text-secondary);">54 000₽</span>
        </div>
      </div>
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:11px;font-weight:500;">Цветы Fresh</span>
          <span style="font-size:12px;font-weight:600;">28 зак.</span>
          <span style="font-size:11px;color:var(--text-secondary);">33 600₽</span>
        </div>
      </div>
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:11px;font-weight:500;">Кофе daily</span>
          <span style="font-size:12px;font-weight:600;">62 зак.</span>
          <span style="font-size:11px;color:var(--text-secondary);">37 200₽</span>
        </div>
      </div>
    </div>
  `
}

function ambassadorOrdersBlock() {
  return repOrdersBlock()
}
