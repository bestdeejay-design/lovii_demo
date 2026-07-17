/* ===== Партнёр — Дашборд ===== */

function screenPartnerDashboard() {
  const m = MOCK.partners.metrics
  const orders = MOCK.partners.incomingOrders

  let ordersHtml = ''
  orders.forEach(o => {
    const color = o.status === 'new' ? 'pink' : o.status === 'preparing' ? 'tiffany' : 'success'
    const statusText = o.status === 'new' ? 'Новый' : o.status === 'preparing' ? 'Готовится' : 'Готов'
    ordersHtml += POrder(o.id, escapeHtml(o.items), o.amount + '₽', statusText, color)
  })

  return `
    ${PromoBanner('Пекарня #23', 'Сегодня: ' + m.orders + ' заказов', 'онлайн')}
    <div style="height:8px;"></div>
    <div class="metric-row">
      ${MetricBlock(m.orders, 'Заказов', 'pink')}
      ${MetricBlock(m.revenue.toLocaleString() + '₽', 'Выручка', 'tiffany')}
      ${MetricBlock('+' + m.newClients, 'Новых')}
    </div>
    <div class="quick-bar">
      ${QuickBtn('plus', '+ Товар')}
      ${QuickBtn('zap', 'Акция', 'ghost')}
    </div>
    <div class="section-label">Входящие заказы</div>
    <div class="section-pad">${ordersHtml}</div>
  `
}
