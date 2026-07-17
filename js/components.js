/* ===== LOVII Reusable Components ===== */

function Icon(name, cls = '') {
  return `<svg class="icon ${cls}"><use href="#i-${name}"/></svg>`
}

function escapeHtml(str) {
  if (str == null) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function MetricBlock(val, label, color = '') {
  return `<div class="metric-block"><div class="val ${color}">${val}</div><div class="lbl">${label}</div></div>`
}

function StatusBanner(iconName, title, sub, incomeVal, incomeLabel) {
  return `
    <div class="status-banner">
      <div class="rank-icon">${Icon(iconName)}</div>
      <div class="info">
        <div class="title">${title}</div>
        <div class="sub">${sub}</div>
      </div>
      <div class="income">
        <div class="val">${incomeVal}</div>
        <div class="lbl">${incomeLabel}</div>
      </div>
    </div>`
}

function ProgressBlock(label, current, target, pct) {
  return `
    <div class="progress-block">
      <div class="row">
        <span class="lbl">${label}</span>
        <span class="count"><span class="pink">${current}</span>/${target}</span>
      </div>
      <div class="bar"><div class="bar-fill" style="width:${pct}%"></div></div>
    </div>`
}

function PromoBanner(title, sub, timer) {
  return `
    <div class="promo-banner">
      <div class="text"><strong>${title}</strong>${sub}</div>
      <span class="timer">${Icon('clock', 'icon-sm')}${timer}</span>
    </div>`
}

function TopCard(city, promoTitle, promoSub, timer) {
  return `
    <div class="top-card">
      <div class="top-card-loc">
        ${Icon('map-pin', 'icon-sm')}
        <span>${city}</span>
        <span class="top-card-change" data-nav="city-select">Сменить</span>
      </div>
      <div class="top-card-divider"></div>
      <div class="top-card-body">
        <div>
          <span class="top-card-badge">Акция</span>
          <div class="top-card-title">${promoTitle}</div>
          <div class="top-card-sub">${promoSub}</div>
        </div>
        <span class="top-card-timer">${Icon('clock', 'icon-sm')}${timer}</span>
      </div>
      <div class="top-card-action">
        <span class="top-card-link" data-nav="promo">Подробнее ${Icon('chevron-right', 'icon-sm')}</span>
      </div>
    </div>`
}

function OrderRow(item, name, price, tag, tagColor = 'pink', meta = '') {
  return `
    <div class="order-row">
      <div class="left">
        <div class="icon-box ${tagColor}">${Icon(item.icon || 'package')}</div>
        <div>
          <div class="or-name">${name}</div>
          ${meta ? `<div class="or-meta">${meta}</div>` : ''}
        </div>
      </div>
      <div class="right">
        <span class="or-price">${price}</span>
        <span class="tag tag-${tagColor}">${tag}</span>
      </div>
    </div>`
}

function TableRow(name, meta, value) {
  return `<div class="table-row"><span class="name">${name}</span><span class="meta">${meta}</span><span class="value">${value}</span></div>`
}

function MenuItem(iconName, iconColor, title, sub) {
  return `
    <div class="menu-item">
      <div class="icon-box ${iconColor}">${Icon(iconName)}</div>
      <div class="text">
        <div class="title">${title}</div>
        ${sub ? `<div class="sub">${sub}</div>` : ''}
      </div>
      ${Icon('chevron-right')}
    </div>`
}

function GridMenuItem(iconName, iconColor, label, badge = '', nav = '') {
  return `
    <div class="grid-item"${nav ? ` data-nav="${nav}"` : ''}>
      <div class="iw ${iconColor}">${Icon(iconName)}</div>
      ${label}${badge ? `<span class="badge">${badge}</span>` : ''}
    </div>`
}

function QuickBtn(iconName, label, cls = '') {
  return `<button class="quick-btn ${cls}">${Icon(iconName, 'icon-sm')}${label}</button>`
}

function StatBlock(val, label, color = '') {
  return `<div class="stat-block"><div class="val ${color}">${val}</div><div class="lbl">${label}</div></div>`
}

function POrder(id, items, amount, status, statusColor) {
  return `
    <div class="p-order">
      <div class="left">
        <span class="oname">${items}</span>
      </div>
      <div class="right">
        <span class="oprice">${amount}</span>
        <span class="tag tag-${statusColor}">${status}</span>
      </div>
    </div>`
}

function ProfileBanner(name, sub) {
  return `
    <div class="profile-banner">
      <div class="avatar">${Icon('user')}</div>
      <div class="name">${name}</div>
      <div class="sub">${sub}</div>
    </div>`
}

const BADGE_COLORS = {
  hit: 'pink',
  new: 'tiffany',
  eco: 'gold',
  sale: 'gold',
  top: 'dark',
  season: 'tiffany',
  discount: 'pink',
  sugarfree: 'dark',
}

function Badge(type, label) {
  const color = BADGE_COLORS[type] || 'pink'
  return `<span class="badge b-${color}">${label}</span>`
}

function ProductCard(product, opts = {}) {
  const { id, image, name, price, oldPrice, storeName, badges = [] } = product
  const safeName = escapeHtml(name)
  const safeStore = escapeHtml(storeName)
  const priceLabel = `${price.toLocaleString('ru-RU')}₽`
  const oldLabel = oldPrice ? `${oldPrice.toLocaleString('ru-RU')}₽` : ''
  const badgesHtml = badges.length
    ? `<div class="badges">${badges.map(b => Badge(b.type, b.label)).join('')}</div>`
    : ''
  const priceHtml = `<div class="price-tag">${priceLabel}${oldLabel ? `<span class="old">${oldLabel}</span>` : ''}</div>`
  const qty = (opts.cart && opts.cart[id]) || 0
  const foot = qty > 0
    ? `<div class="qty" data-id="${id}">
         <button class="qty-btn" data-act="dec" data-id="${id}">−</button>
         <span class="count">${qty}</span>
         <button class="qty-btn" data-act="inc" data-id="${id}">+</button>
       </div>`
    : `<div class="add-btn" data-act="add" data-id="${id}">+ В корзину</div>`
  return `
    <div class="product-card" data-id="${id}">
      <div class="media">
        ${priceHtml}
        ${badgesHtml}
        <img class="thumb" src="${image}" alt="${safeName}" loading="lazy">
        <div class="caption glass-edge">
          <div class="store">${safeStore}</div>
          <div class="pname">${safeName}</div>
        </div>
      </div>
      ${foot}
    </div>`
}

function SearchBar(placeholder = 'Поиск магазинов...') {
  return `
    <div class="search-bar">
      ${Icon('search', 'icon-sm')}
      <input type="text" placeholder="${placeholder}">
    </div>`
}

function TabBar(tabs, activeIndex = 0) {
  return `<div class="tab-bar">${tabs.map((t, i) => `<span class="tab-item${i === activeIndex ? ' active' : ''}">${t}</span>`).join('')}</div>`
}

const CART_KEY = 'lovii_cart'

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || {} }
  catch { return {} }
}

function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
  updateCartPill()
}

function cartCount() {
  return Object.values(getCart()).reduce((a, b) => a + b, 0)
}

function updateCartPill() {
  const pill = document.getElementById('cartPill')
  const count = document.getElementById('cartPillCount')
  if (pill && count) {
    const n = cartCount()
    count.textContent = n > 0 ? `${n}` : '0'
    pill.style.display = n > 0 ? 'flex' : 'none'
  }
}

function changeCart(id, delta) {
  const cart = getCart()
  cart[id] = (cart[id] || 0) + delta
  if (cart[id] <= 0) delete cart[id]
  setCart(cart)
}

function showToast(message) {
  const existing = document.querySelector('.toast')
  if (existing) existing.remove()
  const toast = document.createElement('div')
  toast.className = 'toast'
  toast.textContent = message
  document.body.appendChild(toast)
  setTimeout(() => toast.classList.add('show'), 10)
  setTimeout(() => {
    toast.classList.remove('show')
    setTimeout(() => toast.remove(), 300)
  }, 2500)
}
