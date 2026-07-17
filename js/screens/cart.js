/* ===== Cart Screen (#cart) ===== */

function screenCart() {
  const cart = getCart()
  const items = Object.entries(cart)
  const stores = MOCK.stores
  const products = getProducts()

  if (!items.length) {
    return `
      <div class="screen-head">
        <button class="back-btn" data-nav="home" aria-label="Назад">${Icon('arrow-left', 'icon-sm')}</button>
        <span class="screen-title">Корзина</span>
      </div>
      <div class="empty-state">Корзина пуста</div>`
  }

  let total = 0
  const itemsHtml = items.map(([id, qty]) => {
    const p = products.find(x => x.id === Number(id))
    if (!p || !p.active) return ''
    const store = stores.find(s => s.id === p.storeId)
    const storeName = store ? store.name : 'Магазин'
    const lineTotal = p.price * qty
    total += lineTotal
    return `
      <div class="product-card" data-id="${p.id}">
        <div class="media">
          <img class="thumb" src="${p.image}" alt="${escapeHtml(p.name)}">
        </div>
        <div class="caption">
          <div class="pname">${escapeHtml(p.name)}</div>
          <div class="store">${escapeHtml(storeName)}</div>
        </div>
        <div class="price-tag">${p.price.toLocaleString('ru-RU')}₽</div>
        <div class="qty qty-detail" data-id="${p.id}">
          <button class="qty-btn" data-act="dec" data-id="${p.id}">−</button>
          <span class="count">${qty}</span>
          <button class="qty-btn" data-act="inc" data-id="${p.id}">+</button>
        </div>
        <div class="line-total">${lineTotal.toLocaleString('ru-RU')}₽</div>
      </div>`
  }).join('')

  return `
    <div class="screen-head">
      <button class="back-btn" data-nav="home" aria-label="Назад">${Icon('arrow-left', 'icon-sm')}</button>
      <span class="screen-title">Корзина</span>
    </div>
    <div class="section-pad">${itemsHtml}</div>
    <div class="section-pad">
      <div class="cart-total">Итого: <strong>${total.toLocaleString('ru-RU')}₽</strong></div>
      <button class="add-big" data-act="checkout">Оформить заказ</button>
    </div>`
}