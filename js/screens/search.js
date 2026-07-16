/* ===== Поиск (shared) ===== */

function screenSearch() {
  const categories = [
    { icon: 'bread', label: 'Выпечка', color: 'pink' },
    { icon: 'flower', label: 'Цветы', color: 'tiffany' },
    { icon: 'coffee', label: 'Кофе', color: 'pink' },
    { icon: 'sushi', label: 'Суши', color: 'tiffany' },
    { icon: 'gift', label: 'Подарки', color: 'gold' },
    { icon: 'discount', label: 'Акции', color: 'gold' },
  ]

  const recentSearches = [
    'Пекарня #23', 'Букет «Нежность»', 'Капучино',
    'Суши Мия', 'Эклер шоколадный', 'Чизкейк Нью-Йорк'
  ]

  const stores = MOCK.stores
  const products = getProducts()

  const categoryHtml = categories.map((c, i) =>
    `<div class="cat-chip${i === 0 ? ' active' : ''}" data-cat="${c.label}" data-color="${c.color}">
       <div class="cat-tile t-${c.color}"><svg class="icon"><use href="#i-${c.icon}"/></svg></div>
       <div class="cat-name">${c.label}</div>
     </div>`
  ).join('')
  const recentHtml = recentSearches.map(r =>
    `<div class="menu-item">
      <div class="icon-box dim"><svg class="icon"><use href="#i-clock"/></svg></div>
      <div class="text"><div class="title">${r}</div></div>
      <svg class="arrow"><use href="#i-chevron-right"/></svg>
    </div>`
  ).join('')
  const productHtml = products
    .filter(p => p.active)
    .map(p => {
      p.storeName = getProductStoreName(p.storeId)
      return ProductCard(p, { cart: getCart() })
    }).join('')
  const STORE_CAT = {
    bakery: 'Выпечка',
    flowers: 'Цветы',
    coffee: 'Кофе',
    restaurant: 'Суши',
  }
  const storeColor = s => (s.category === 'flowers' || s.category === 'restaurant') ? 'tiffany' : 'pink'
  const catLabel = s => STORE_CAT[s.category] || 'Магазин'

  const storeListHtml = stores.map(s => {
    const color = storeColor(s)
    return `
      <div class="p-order" data-store="${s.id}" data-nav="store">
        <img class="thumb" src="${s.image}" alt="${s.name}">
        <div class="store-info">
          <div class="oname">${s.name}</div>
          <div class="or-meta"><span class="star">★</span> ${s.rating} · ${s.distance}</div>
          <div class="or-meta">${s.address}</div>
        </div>
        <div class="right">
          <span class="tag tag-${color}">${catLabel(s)}</span>
          <span class="store-eta">${s.eta}</span>
        </div>
      </div>`
  }).join('')

  const storeGridHtml = stores.map(s => {
    const color = storeColor(s)
    return `
      <div class="store-card" data-store="${s.id}" data-nav="store">
        <img class="cover" src="${s.image}" alt="${s.name}">
        <span class="cat-badge ${color}">${catLabel(s)}</span>
        <div class="body">
          <div class="head">
            <div class="oname">${s.name}</div>
            <span class="eta">${s.eta}</span>
          </div>
          <div class="meta"><span class="star">★</span> ${s.rating} · ${s.distance}<br>${s.address}</div>
        </div>
      </div>`
  }).join('')

  return `
    ${SearchBar('Поиск магазинов и товаров...')}
    <div class="section-label">Категории</div>
    <div class="cat-row">${categoryHtml}</div>
    <div class="section-label">Недавние поиски <a href="#">Очистить</a></div>
    <div class="recent-list">${recentHtml}</div>
    <div class="section-label">Популярные товары <a href="#">Все</a></div>
    <div class="product-grid">${productHtml}</div>
    <div class="section-label">
      <span>Магазины рядом · ${stores.length}</span>
      <button class="store-view-toggle" id="storeViewToggle" data-layout="list" aria-label="Показать сеткой">
        <svg class="ic ic-grid" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/></svg>
        <svg class="ic ic-list" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
      </button>
    </div>
    <div class="section-pad" id="storeViewList">${storeListHtml}</div>
    <div class="section-pad store-grid2" id="storeViewGrid" hidden>${storeGridHtml}</div>
  `
}
