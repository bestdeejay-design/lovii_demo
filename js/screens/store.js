/* ===== Экран магазина (#store/{id}) ===== */

function screenStore() {
  const id = parseInt(window.location.hash.split('/')[1], 10)
  const store = getStore(id)

  if (!store) {
    return `
      <div class="screen-head">
        <button class="back-btn" data-nav="search" aria-label="Назад">${Icon('arrow-left', 'icon-sm')}</button>
        <span class="screen-title">Магазин</span>
      </div>
      <div class="empty-state">Магазин не найден</div>`
  }

  const STORE_CAT = {
    bakery: 'Выпечка',
    flowers: 'Цветы',
    coffee: 'Кофе',
    restaurant: 'Суши',
  }
  const color = (store.category === 'flowers' || store.category === 'restaurant') ? 'tiffany' : 'pink'
  const catLabel = STORE_CAT[store.category] || 'Магазин'
  const closed = store.active === false

  const products = getStoreProducts(store.id)
    .filter(p => p.active)
    .map(p => {
      p.storeName = store.name
      return ProductCard(p, { cart: getCart() })
    }).join('')

  return `
    <div class="screen-head">
      <button class="back-btn" data-nav="search" aria-label="Назад">${Icon('arrow-left', 'icon-sm')}</button>
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
      </div>
      <div class="section-label">Меню · ${products ? '' : '0'}</div>
      ${products
        ? `<div class="product-grid">${products}</div>`
        : `<div class="empty-state">В этом магазине пока нет активных товаров</div>`}
      <button class="add-big store-cta" data-store="${store.id}">Заказать</button>
    </div>`
}
