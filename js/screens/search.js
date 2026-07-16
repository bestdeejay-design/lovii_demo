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
  const storeHtml = stores.map(s => {
    const color = s.category === 'flowers' || s.category === 'restaurant' ? 'tiffany' : 'pink'
    const catLabel = STORE_CAT[s.category] || 'Магазин'
    return `
      <div class="p-order" data-store="${s.id}" data-nav="store">
        <div class="left">
          <div class="store-badge ${color}">${s.emoji}</div>
          <div class="store-info">
            <div class="oname">${s.name}</div>
            <div class="or-meta"><span class="star">★</span> ${s.rating} · ${s.distance}</div>
            <div class="or-meta">${s.address}</div>
          </div>
        </div>
        <div class="right">
          <span class="tag tag-${color}">${catLabel}</span>
          <span class="store-eta">${s.eta}</span>
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
    <div class="section-label">Магазины рядом · ${stores.length}</div>
    <div class="section-pad">${storeHtml}</div>
  `
}
