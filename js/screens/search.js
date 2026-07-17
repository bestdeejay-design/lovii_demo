/* ===== Поиск (shared) ===== */

const searchState = { category: null, query: '' }

function _storeCategory(cat) {
  return { bakery: 'Выпечка', flowers: 'Цветы', coffee: 'Кофе', restaurant: 'Суши' }[cat] || 'Магазин'
}

function _storeColor(s) {
  return (s.category === 'flowers' || s.category === 'restaurant') ? 'tiffany' : 'pink'
}

function filterSearch() {
  const { category, query } = searchState
  const q = query.toLowerCase().trim()
  const stores = MOCK.stores.filter(s => {
    if (category && s.category !== category) return false
    if (q && !s.name.toLowerCase().includes(q)) return false
    return true
  })
  const products = getProducts().filter(p => {
    if (!p.active) return false
    if (category) {
      const store = MOCK.stores.find(s => s.id === p.storeId)
      if (!store || store.category !== category) return false
    }
    if (q && !p.name.toLowerCase().includes(q)) return false
    return true
  })
  return { stores, products }
}

function renderSearchResults() {
  const { stores, products } = filterSearch()

  const storeListHtml = stores.map(s => {
    const color = _storeColor(s)
    return `
      <div class="p-order" data-store="${s.id}" data-nav="store">
        <img class="thumb" src="${s.image}" alt="${escapeHtml(s.name)}">
        <div class="store-info">
          <div class="oname">${escapeHtml(s.name)}</div>
          <div class="or-meta"><span class="star">${Icon('star')}</span> ${s.rating} · ${s.distance}</div>
          <div class="or-meta">${escapeHtml(s.address)}</div>
        </div>
        <div class="right">
          <span class="tag tag-${color}">${_storeCategory(s.category)}</span>
          <span class="store-eta">${s.eta}</span>
        </div>
      </div>`
  }).join('')

  const storeGridHtml = stores.map(s => {
    const color = _storeColor(s)
    return `
      <div class="store-card" data-store="${s.id}" data-nav="store">
        <img class="cover" src="${s.image}" alt="${escapeHtml(s.name)}">
        <span class="cat-badge ${color}">${_storeCategory(s.category)}</span>
        <div class="body">
          <div class="head">
            <div class="oname">${escapeHtml(s.name)}</div>
            <span class="eta">${s.eta}</span>
          </div>
          <div class="meta"><span class="star">${Icon('star')}</span> ${s.rating} · ${s.distance}<br>${escapeHtml(s.address)}</div>
        </div>
      </div>`
  }).join('')

  const productHtml = products.map(p => {
    const pc = { ...p, storeName: getProductStoreName(p.storeId) }
    return ProductCard(pc, { cart: getCart() })
  }).join('')

  const listEl = document.getElementById('storeViewList')
  const gridEl = document.getElementById('storeViewGrid')
  const prodGridEl = document.querySelector('.product-grid')
  if (listEl) listEl.innerHTML = storeListHtml
  if (gridEl) gridEl.innerHTML = storeGridHtml
  if (prodGridEl) prodGridEl.innerHTML = productHtml

  const toggle = document.getElementById('storeViewToggle')
  if (toggle) {
    const isGrid = toggle.dataset.layout === 'grid'
    if (listEl) listEl.hidden = isGrid
    if (gridEl) gridEl.hidden = !isGrid
  }

  const label = document.querySelector('.section-label span')
  if (label) label.textContent = `Магазины рядом · ${stores.length}`

  const searchBar = document.querySelector('.search-bar')
  const input = searchBar?.querySelector('[data-act="search-input"]')
  if (searchBar && input) {
    input.value = searchState.query
    let clearBtn = searchBar.querySelector('.search-clear')
    if (searchState.query) {
      if (!clearBtn) {
        const btn = document.createElement('button')
        btn.className = 'search-clear'
        btn.dataset.act = 'search-clear'
        btn.innerHTML = Icon('x')
        searchBar.appendChild(btn)
      }
    } else {
      if (clearBtn) clearBtn.remove()
    }
  }
}

function screenSearch() {
  searchState.category = null
  searchState.query = ''

  const categories = [
    { icon: 'bread', label: 'Выпечка', color: 'pink', cat: 'bakery' },
    { icon: 'flower', label: 'Цветы', color: 'tiffany', cat: 'flowers' },
    { icon: 'coffee', label: 'Кофе', color: 'pink', cat: 'coffee' },
    { icon: 'sushi', label: 'Суши', color: 'tiffany', cat: 'restaurant' },
  ]

  const recentSearches = [
    'Пекарня #23', 'Букет «Нежность»', 'Капучино',
    'Суши Мия', 'Эклер шоколадный', 'Чизкейк Нью-Йорк'
  ]

  const categoryHtml = categories.map((c, i) =>
    `<div class="cat-chip${searchState.category === c.cat ? ' active' : ''}" data-cat="${c.cat}" data-color="${c.color}">
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

  const { stores, products } = filterSearch()

  const storeListHtml = stores.map(s => {
    const color = _storeColor(s)
    return `
      <div class="p-order" data-store="${s.id}" data-nav="store">
        <img class="thumb" src="${s.image}" alt="${escapeHtml(s.name)}">
        <div class="store-info">
          <div class="oname">${escapeHtml(s.name)}</div>
          <div class="or-meta"><span class="star">${Icon('star')}</span> ${s.rating} · ${s.distance}</div>
          <div class="or-meta">${escapeHtml(s.address)}</div>
        </div>
        <div class="right">
          <span class="tag tag-${color}">${_storeCategory(s.category)}</span>
          <span class="store-eta">${s.eta}</span>
        </div>
      </div>`
  }).join('')

  const storeGridHtml = stores.map(s => {
    const color = _storeColor(s)
    return `
      <div class="store-card" data-store="${s.id}" data-nav="store">
        <img class="cover" src="${s.image}" alt="${escapeHtml(s.name)}">
        <span class="cat-badge ${color}">${_storeCategory(s.category)}</span>
        <div class="body">
          <div class="head">
            <div class="oname">${escapeHtml(s.name)}</div>
            <span class="eta">${s.eta}</span>
          </div>
          <div class="meta"><span class="star">${Icon('star')}</span> ${s.rating} · ${s.distance}<br>${escapeHtml(s.address)}</div>
        </div>
      </div>`
  }).join('')

  const productHtml = products.map(p => {
    const pc = { ...p, storeName: getProductStoreName(p.storeId) }
    return ProductCard(pc, { cart: getCart() })
  }).join('')

  const clearBtn = searchState.query
    ? `<button class="search-clear" data-act="search-clear">${Icon('x')}</button>`
    : ''

  return `
    <div class="search-bar">
      ${Icon('search', 'icon-sm')}
      <input type="text" data-act="search-input" placeholder="Поиск магазинов и товаров..." value="${escapeHtml(searchState.query)}">
      ${clearBtn}
    </div>
    <div class="section-label">Категории</div>
    <div class="cat-row">${categoryHtml}</div>
    <div class="section-label">Недавние поиски <a href="#">Очистить</a></div>
    <div class="recent-list">${recentHtml}</div>
    <div class="section-label">Популярные товары</div>
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
