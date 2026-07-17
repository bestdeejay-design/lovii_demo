/* ===== Главная (общая для всех ролей) ===== */

const homeState = { category: null, query: '' }
let _collapseTimer = null
function _scheduleCollapseReset() {
  if (_collapseTimer) clearTimeout(_collapseTimer)
  _collapseTimer = setTimeout(() => {
    homeView.productExpanded = true
    homeView.storeExpanded = true
    if (typeof renderHomeResults === 'function') renderHomeResults()
    _collapseTimer = null
  }, 5 * 60 * 1000)
}

const homeView = {
  contentType: localStorage.getItem('lovii_tab') || 'stores',
  layout: localStorage.getItem('lovii_layout') || 'list',
  productExpanded: true,
  storeExpanded: true,
  productsCount: 0,
  storesCount: 0,
}

function _storeCategory(cat) {
  const MAP = {
    bakery: 'Выпечка', flowers: 'Цветы', coffee: 'Кофе',
    sushi: 'Суши', pizza: 'Пицца', burger: 'Бургеры',
    grocery: 'Продукты', pharmacy: 'Аптеки', alcohol: 'Алкоголь',
    sweets: 'Сладости', asian: 'Азиатская', restaurant: 'Ресторан'
  }
  return MAP[cat] || 'Магазин'
}

function _storeColor(s) {
  return (s.category === 'flowers' || s.category === 'restaurant') ? 'tiffany' : 'pink'
}

function filterHome() {
  const { category, query } = homeState
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

function buildStoreListHtml(stores) {
  return stores.map(s => {
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
}

function buildStoreGridHtml(stores) {
  return stores.map(s => {
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
}

function buildProductHtml(products) {
  return products.map(p => {
    const pc = { ...p, storeName: getProductStoreName(p.storeId) }
    return ProductCard(pc, { cart: getCart() })
  }).join('')
}

function buildProductListHtml(products) {
  return products.map(p => {
    const pc = { ...p, storeName: getProductStoreName(p.storeId) }
    return ProductCard(pc, { cart: getCart(), layout: 'list' })
  }).join('')
}

function updateCollapse() {
  const isProducts = homeView.contentType === 'products'
  const total = isProducts ? homeView.productsCount : homeView.storesCount
  const expanded = isProducts ? homeView.productExpanded : homeView.storeExpanded
  const wrapId = isProducts ? 'productSection' : 'storeSection'
  const wrap = document.getElementById(wrapId)
  const btn = document.getElementById('mainCollapseBtn')
  if (!wrap || !btn) return

  if (expanded || total <= 2) {
    wrap.classList.remove('collapsed')
    btn.style.display = total <= 2 ? 'none' : ''
    btn.innerHTML = total > 2
      ? `Скрыть <svg class="icon" width="10" height="10"><use href="#i-chevron-up"/></svg>`
      : ''
  } else {
    wrap.classList.add('collapsed')
    btn.style.display = ''
    btn.innerHTML = `Показать все (${total}) <svg class="icon" width="10" height="10"><use href="#i-chevron-down"/></svg>`
  }
}

function renderHomeResults() {
  const { stores, products } = filterHome()
  homeView.productsCount = products.length
  homeView.storesCount = stores.length

  const prodGrid = document.querySelector('#productsContent .product-grid')
  const prodList = document.querySelector('#productsContent .product-list')
  const storeList = document.querySelector('#storesContent .store-view-list')
  const storeGrid = document.querySelector('#storesContent .store-grid2')

  if (prodGrid) prodGrid.innerHTML = buildProductHtml(products)
  if (prodList) prodList.innerHTML = buildProductListHtml(products)
  if (storeList) storeList.innerHTML = buildStoreListHtml(stores)
  if (storeGrid) storeGrid.innerHTML = buildStoreGridHtml(stores)

  const isGrid = homeView.layout === 'grid'
  const pgw = document.querySelector('.product-grid-wrap')
  const plw = document.querySelector('.product-list-wrap')
  const svl = document.querySelector('#storesContent .store-view-list')
  const svg = document.querySelector('#storesContent .store-grid2')
  if (pgw) pgw.classList.toggle('hidden', !isGrid)
  if (plw) plw.classList.toggle('hidden', isGrid)
  if (svl) svl.classList.toggle('hidden', isGrid)
  if (svg) svg.classList.toggle('hidden', !isGrid)

  const pTab = document.querySelector('.tab-btn[data-tab="products"]')
  const sTab = document.querySelector('.tab-btn[data-tab="stores"]')
  if (pTab) pTab.innerHTML = `Товары <span class="count">· ${products.length}</span>`
  if (sTab) sTab.innerHTML = `Магазины <span class="count">· ${stores.length}</span>`

  updateCollapse()

  const searchBar = document.querySelector('.search-bar')
  const input = searchBar?.querySelector('[data-act="search-input"]')
  if (searchBar && input) {
    input.value = homeState.query
    let clearBtn = searchBar.querySelector('.search-clear')
    if (homeState.query) {
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

function screenHome() {
  homeState.category = null
  homeState.query = ''

  const categories = [
    { label: 'Выпечка', cat: 'bakery' },
    { label: 'Цветы', cat: 'flowers' },
    { label: 'Кофе', cat: 'coffee' },
    { label: 'Суши', cat: 'sushi' },
    { label: 'Пицца', cat: 'pizza' },
    { label: 'Бургеры', cat: 'burger' },
    { label: 'Продукты', cat: 'grocery' },
    { label: 'Аптеки', cat: 'pharmacy' },
    { label: 'Ресторан', cat: 'restaurant' },
    { label: 'Алкоголь', cat: 'alcohol' },
    { label: 'Сладости', cat: 'sweets' },
    { label: 'Азиатская', cat: 'asian' },
  ]

  const categoryHtml = categories.map((c, i) =>
    `<div class="cat-chip${homeState.category === c.cat ? ' active' : ''}" data-cat="${c.cat}">
       <div class="cat-tile"><img class="cat-img" src="assets/img/cat-${c.cat}.webp" alt="${c.label}" loading="lazy"></div>
       <div class="cat-name">${c.label}</div>
     </div>`
  ).join('')

  const { stores, products } = filterHome()
  homeView.productsCount = products.length
  homeView.storesCount = stores.length
  const storeListHtml = buildStoreListHtml(stores)
  const storeGridHtml = buildStoreGridHtml(stores)
  const productHtml = buildProductHtml(products)
  const productListHtml = buildProductListHtml(products)

  const city = localStorage.getItem('lovii_city') || 'Москва'
  const promo = CITY_PROMOS[city] || CITY_PROMOS['Москва']

  const { contentType, layout, productExpanded, storeExpanded } = homeView
  const pExp = products.length > 2 && productExpanded
  const sExp = stores.length > 2 && storeExpanded
  const curExp = contentType === 'products' ? pExp : sExp
  const curTotal = contentType === 'products' ? products.length : stores.length
  const collapseBtnText = curExp
    ? `Скрыть <svg class="icon" width="10" height="10"><use href="#i-chevron-up"/></svg>`
    : `Показать все (${curTotal}) <svg class="icon" width="10" height="10"><use href="#i-chevron-down"/></svg>`

  return `
    ${TopCard(city, promo.title, promo.desc, '', promo.storeId, promo.tag)}
    <div class="sticky-block">
      <div class="section-label">Категории</div>
      <div class="cat-row">${categoryHtml}</div>
      <div class="section-controls">
        <div class="tab-group">
          <button class="tab-btn${contentType === 'products' ? ' active' : ''}" data-tab="products">Товары <span class="count">· ${products.length}</span></button>
          <button class="tab-btn${contentType === 'stores' ? ' active' : ''}" data-tab="stores">Магазины <span class="count">· ${stores.length}</span></button>
        </div>
        <div class="controls-right">
          <button class="collapse-btn-sm" id="mainCollapseBtn">${collapseBtnText}</button>
          <button class="view-toggle" id="mainViewToggle" data-layout="${layout}" aria-label="${layout === 'grid' ? 'Показать списком' : 'Показать сеткой'}">
            <svg class="ic ic-grid" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/></svg>
            <svg class="ic ic-list" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
          </button>
        </div>
      </div>
    </div>
    <div id="productsContent" class="tab-content${contentType === 'products' ? '' : ' hidden'}">
      <div class="section-collapse${pExp ? '' : ' collapsed'}" id="productSection">
        <div class="product-grid-wrap${layout === 'grid' ? '' : ' hidden'}"><div class="product-grid">${productHtml}</div></div>
        <div class="product-list-wrap${layout === 'list' ? '' : ' hidden'}"><div class="product-list section-pad">${productListHtml}</div></div>
      </div>
    </div>
    <div id="storesContent" class="tab-content${contentType === 'stores' ? '' : ' hidden'}">
      <div class="section-collapse${sExp ? '' : ' collapsed'}" id="storeSection">
        <div class="store-view-list${layout === 'list' ? '' : ' hidden'}">${storeListHtml}</div>
        <div class="store-grid2${layout === 'grid' ? '' : ' hidden'}">${storeGridHtml}</div>
      </div>
    </div>
  `
}
