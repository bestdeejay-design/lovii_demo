/* ===== Партнёр — Заказы ===== */

function screenPartnerOrders() {
  const orders = MOCK.partners.incomingOrders

  const tabs = ['Активные', 'История']

  let activeHtml = ''
  orders.forEach(o => {
    const color = o.status === 'new' ? 'pink' : o.status === 'preparing' ? 'tiffany' : 'success'
    const statusText = o.status === 'new' ? 'Новый' : o.status === 'preparing' ? 'Готовится' : 'Готов'
    activeHtml += `
      <div class="p-order">
        <div>
          <div class="oname">Заказ №${o.id}</div>
          <div class="or-meta">${escapeHtml(o.items)}</div>
        </div>
        <div class="right">
          <span class="oprice">${o.amount}₽</span>
          <span class="tag tag-${color}">${statusText}</span>
        </div>
      </div>`
  })

  return `
    <div style="height:4px;"></div>
    ${TabBar(tabs, 0)}
    <div class="section-pad section-top">${activeHtml}</div>
  `
}
