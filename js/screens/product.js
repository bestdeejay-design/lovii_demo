function screenProduct() {
  const params = new URLSearchParams(window.location.hash.split('?')[1] || '')
  const id = parseInt(params.get('id'), 10)
  const product = getProducts().find(p => p.id === id)

  if (!product) {
    return `
      <div class="top-bar">
        <button class="back-btn" data-nav="search">‹</button>
        <span class="top-title">Товар</span>
      </div>
      <div class="empty-state">Товар не найден</div>`
  }

  const storeName = getProductStoreName(product.storeId)
  const priceLabel = `${product.price.toLocaleString('ru-RU')}₽`
  const badges = product.badges || []
  const badgesHtml = badges.length
    ? `<div class="badges">${badges.map(b => Badge(b.type, b.label)).join('')}</div>`
    : ''
  const qty = getCart()[product.id] || 0
  const btn = qty > 0
    ? `<div class="qty qty-detail" data-id="${product.id}">
         <button class="qty-btn" data-act="dec" data-id="${product.id}">−</button>
         <span class="count">${qty}</span>
         <button class="qty-btn" data-act="inc" data-id="${product.id}">+</button>
       </div>
       <div class="add-big" data-act="add" data-id="${product.id}">Обновить корзину</div>`
    : `<div class="add-big" data-act="add" data-id="${product.id}">+ В корзину</div>`

  return `
    <div class="top-bar">
      <button class="back-btn" data-nav="search">‹</button>
      <span class="top-title">Товар</span>
    </div>
    <div class="product-detail">
      <div class="hero">
        ${badgesHtml}
        <img class="hero-img" src="${product.image}" alt="${product.name}">
      </div>
      <div class="detail-info">
        <div class="store">${storeName}</div>
        <div class="name">${product.name}</div>
        <div class="price">${priceLabel}</div>
        <div class="desc">Свежая поставка от проверенного партнёра LOVII. Доставка в течение часа по выбранному адресу.</div>
        ${btn}
      </div>
    </div>`
}
