/* ===== Главная (shared across roles) ===== */

function screenHome() {
  const role = LOVII.state.role

  let promoBlock = ''
  let contextBlock = ''

  if (role === 'client') {
    promoBlock = TopCard('Москва', '−20% на выпечку', 'В Пекарне #23 до конца дня', '4 ч')
    contextBlock = clientHomeBlock()
  } else if (role === 'partner') {
    promoBlock = PromoBanner('Пекарня #23', 'Сегодня: 24 заказа на 28 800₽', 'онлайн')
    contextBlock = partnerHomeBlock()
  } else if (role === 'rep') {
    promoBlock = ''
    contextBlock = repHomeBlock()
  } else if (role === 'ambassador') {
    promoBlock = ''
    contextBlock = ambassadorHomeBlock()
  }

  return `
    ${promoBlock}
    <div class="grid-menu">
      ${GridMenuItem('🛍', 'shopping-bag', 'pink', 'Каталог', '', 'home')}
      ${GridMenuItem('📦', 'package', 'tiffany', 'Заказы', '3', 'orders')}
      ${GridMenuItem('⭐', 'star', 'pink', 'Бонусы', '', 'profile')}
      ${GridMenuItem('📊', 'bar-chart', 'tiffany', 'Отчёты', '', role === 'client' ? 'search' : role + '/reports')}
      ${GridMenuItem('👥', 'users', 'tiffany', 'Команда', '', role === 'client' ? 'profile' : role + '/points')}
      ${GridMenuItem('🏙', 'building', 'pink', 'Города', '', 'search')}
      ${GridMenuItem('⚡', 'zap', 'chiffon', 'Акции', '', 'search')}
      ${GridMenuItem('⚙', 'settings', 'chiffon', 'Настройки', '', 'profile')}
    </div>
    ${contextBlock}
  `
}

function clientHomeBlock() {
  const orders = getUserOrders().filter(o => o.status === 'preparing' || o.status === 'delivering')
  let ordersHtml = ''
  orders.forEach(o => {
    const color = o.status === 'preparing' ? 'pink' : 'tiffany'
    const statusText = o.status === 'preparing' ? 'Готовится' : 'В пути'
    const meta = `№${o.id} · ${o.time || 'скоро'}`
    ordersHtml += OrderRow(o.emoji, o.store, o.amount.toLocaleString() + '₽', statusText, color, meta)
  })

  return `
    <div class="section-label">Активные заказы <a href="#">Все</a></div>
    <div class="orders-card">
      ${ordersHtml || '<div style="padding:16px 0;text-align:center;font-size:12px;color:var(--text-secondary);">Нет активных заказов</div>'}
    </div>
    <div class="balance-card">
      <div>
        <div class="balance-label">Бонусный баланс</div>
        <span class="balance-amount"><span class="pink">${(MOCK?.user?.bonusBalance ?? 0).toLocaleString()}</span> <span class="unit">баллов</span></span>
        <div class="balance-sub">до статуса Digital Representative</div>
      </div>
      <span class="balance-link" data-nav="bonus-info">Как получить?</span>
    </div>
  `
}

function partnerHomeBlock() {
  const m = MOCK.partners.metrics
  const orders = MOCK.partners.incomingOrders
  let ordersHtml = ''
  orders.slice(0, 2).forEach(o => {
    const color = o.status === 'new' ? 'pink' : o.status === 'preparing' ? 'tiffany' : 'success'
    const statusText = o.status === 'new' ? 'Новый' : o.status === 'preparing' ? 'Готовится' : 'Готов'
    ordersHtml += POrder(o.id, o.items, o.amount + '₽', statusText, color)
  })

  return `
    <div class="metric-row">
      ${MetricBlock(m.orders, 'Заказов', 'pink')}
      ${MetricBlock(m.revenue.toLocaleString() + '₽', 'Выручка', 'tiffany')}
      ${MetricBlock('+' + m.newClients, 'Новых')}
    </div>
    <div class="quick-bar">
      ${QuickBtn('plus', '+ Товар')}
      ${QuickBtn('zap', 'Акция', 'ghost')}
    </div>
    <div class="section-label">Новые заказы <a href="#partner/orders">Все</a></div>
    <div class="section-pad">${ordersHtml}</div>
    <div style="padding:8px 16px 4px;">
      <a href="#partner" class="btn btn-ghost btn-block btn-sm">Перейти в дашборд партнёра</a>
    </div>
  `
}

function repHomeBlock() {
  const r = MOCK.rep
  const pct = Math.round((r.points / r.pointsToNext) * 100)
  const statusName = 'Цифровой ' + r.status.charAt(0).toUpperCase() + r.status.slice(1)

  return `
    ${StatusBanner(r.statusEmoji, statusName, r.points + ' точек · до Мэра ' + (r.pointsToNext - r.points), r.monthlyIncome.toLocaleString() + '₽', 'доход / мес')}
    ${ProgressBlock('Прогресс до ' + r.nextEmoji + ' Цифровой Мэр', r.points, r.pointsToNext, pct)}
    <div class="stats-grid-2">
      ${StatBlock(r.points, 'Торговых точек', 'pink')}
      ${StatBlock('18', 'Активных', 'tiffany')}
      ${StatBlock(r.monthlyIncome.toLocaleString() + '₽', 'Доход в месяц', 'pink')}
      ${StatBlock('4.8', 'Средний рейтинг')}
    </div>
    <div class="section-label">Мои точки <a href="#rep/points">Подробнее</a></div>
    <div class="section-pad">
      ${r.stores.slice(0, 3).map(s => TableRow(s.name, s.orders + ' зак.', s.revenue.toLocaleString() + '₽')).join('')}
    </div>
    <div style="padding:4px 16px 4px;">
      <a href="#rep" class="btn btn-ghost btn-block btn-sm">Перейти в дашборд представителя</a>
    </div>
  `
}

function ambassadorHomeBlock() {
  const a = MOCK.ambassador
  return `
    ${StatusBanner('🤝', 'Амбасадор', a.reps + ' представителей · ' + a.storesTotal + ' точек', a.monthlyIncome.toLocaleString() + '₽', 'доход / мес')}
    <div class="stats-grid-2">
      ${StatBlock(a.reps, 'Представителей', 'pink')}
      ${StatBlock(a.storesTotal, 'Точек в сети', 'tiffany')}
      ${StatBlock(a.monthlyIncome.toLocaleString() + '₽', 'Доход', 'pink')}
      ${StatBlock('4.9', 'Рейтинг сети')}
    </div>
    <div class="section-label">Топ представителей <a href="#ambassador/reps">Все</a></div>
    <div class="section-pad">
      ${a.repList.slice(0, 3).map(r => TableRow(r.name, r.stores + ' точек', r.income.toLocaleString() + '₽')).join('')}
    </div>
    <div style="padding:4px 16px 4px;">
      <a href="#ambassador" class="btn btn-ghost btn-block btn-sm">Перейти в дашборд амбасадора</a>
    </div>
  `
}
