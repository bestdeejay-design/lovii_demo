/* ===== Экран магазина (#store/{id}[?tag=...]) ===== */

function screenStore() {
  const [_, idStr, qs] = window.location.hash.match(/store\/(\d+)(?:\?(.+))?/) || []
  const id = parseInt(idStr, 10)
  const store = getStore(id)
  const params = qs ? Object.fromEntries(new URLSearchParams(qs)) : {}
  const activeTag = params.tag || null

  if (!store) {
    return `
      <div class="screen-head">
        <button class="back-btn" data-nav="home" aria-label="Назад">${Icon('arrow-left', 'icon-sm')}</button>
        <span class="screen-title">Магазин</span>
      </div>
      <div class="empty-state">Магазин не найден</div>`
  }

  const catLabel = _storeCategory(store.category) || 'Магазин'
  const color = (store.category === 'flowers' || store.category === 'restaurant') ? 'tiffany' : 'pink'
  const closed = store.active === false

  let storeProducts = getStoreProducts(store.id).filter(p => p.active)
  if (activeTag) {
    storeProducts = storeProducts.filter(p => p.tags && p.tags.includes(activeTag))
  }

  const products = storeProducts.map(p => {
    p.storeName = store.name
    return ProductCard(p, { cart: getCart() })
  }).join('')

  const storeTags = (store.tags || []).map(t => StoreTag(t)).join('')

  const backNav = activeTag ? 'home' : 'home'
  const sectionLabel = activeTag
    ? `Акции · ${storeProducts.length}`
    : `Меню`

  return `
    <div class="screen-head">
      <button class="back-btn" data-nav="${backNav}" aria-label="Назад">${Icon('arrow-left', 'icon-sm')}</button>
      <span class="screen-title">${escapeHtml(store.name)}</span>
    </div>
    <div class="store-detail">
      <div class="store-hero">
        <img class="cover" src="${store.image}" alt="${escapeHtml(store.name)}">
        ${closed ? '<span class="cat-badge closed">Закрыто</span>' : `<span class="cat-badge ${color}">${catLabel}</span>`}
      </div>
      <div class="store-meta">
        <div class="store-name">${escapeHtml(store.name)}</div>
        <div class="store-stats">
          <span class="star">${Icon('star', 'icon-sm')}</span> ${store.rating} · ${store.distance} · ${store.eta}
        </div>
        <div class="store-addr">${Icon('map-pin', 'icon-sm')}${escapeHtml(store.address)}</div>
        ${storeTags ? `<div class="store-tags">${storeTags}</div>` : ''}
      </div>
      <div class="section-label">${sectionLabel}</div>
      ${products
        ? `<div class="product-grid">${products}</div>`
        : `<div class="empty-state">${activeTag ? 'Нет товаров по акции' : 'В этом магазине пока нет активных товаров'}</div>`}
      <button class="add-big store-cta" data-store="${store.id}">Заказать</button>
    </div>`
}
