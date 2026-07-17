/* ===== LOVII App — Router + State ===== */

const LOVII = {
  state: {
    role: localStorage.getItem('lovii_role') || 'client',
    theme: localStorage.getItem('lovii_theme') || 'light',
    user: { ...MOCK.user }
  },

  setRole(role) {
    this.state.role = role
    localStorage.setItem('lovii_role', role)
    this.renderNav()
    window.location.hash = 'home'
    this.render()
  },

  setTheme(theme) {
    this.state.theme = theme
    localStorage.setItem('lovii_theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  },

  navigate(hash) {
    window.location.hash = hash
  },

  render() {
    const full = window.location.hash.slice(1) || 'home'
    const hash = full.split('?')[0]
    this.renderScreen(full)
    this.renderNav(hash)
  },

  renderNav() {
    const hash = window.location.hash.slice(1) || 'home'
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.tab === hash)
    })
  },

  renderScreen(hash) {
    const content = document.getElementById('app-content')
    if (!content) return
    const base = hash.replace(/^#/, '').split('?')[0]

    // Exact matches for multi-segment routes first
    switch (base) {
      case 'partner/products':  content.innerHTML = screenPartnerProducts(); break
      case 'partner/orders':    content.innerHTML = screenPartnerOrders(); break
      case 'partner/reports':   content.innerHTML = screenPartnerReports(); break
      case 'rep/points':        content.innerHTML = screenRepPoints(); break
      case 'rep/income':        content.innerHTML = screenRepIncome(); break
      case 'rep/profile':       content.innerHTML = screenRepProfile(); break
      case 'rep/map':           content.innerHTML = screenRepMap(); break
      case 'ambassador/reps':   content.innerHTML = screenAmbassadorReps(); break
      case 'ambassador/income': content.innerHTML = screenAmbassadorIncome(); break
      case 'ambassador/training': content.innerHTML = screenAmbassadorTraining(); break
      default: {
        // Prefix matches for single-segment routes with dynamic IDs
        const route = base.split('/')[0]
        switch (route) {
          case 'partner':           content.innerHTML = screenPartnerDashboard(); break
          case 'rep':               content.innerHTML = screenRepDashboard(); break
          case 'ambassador':        content.innerHTML = screenAmbassadorDashboard(); break
          case 'store':             content.innerHTML = screenStore(); break
          case 'product':           content.innerHTML = screenProduct(); break
          case 'home':              content.innerHTML = screenHome(); break
          case 'search':            content.innerHTML = screenSearch(); break
          case 'orders':            content.innerHTML = screenOrders(); break
          case 'profile':           content.innerHTML = screenProfile(); break
          case 'cart':              content.innerHTML = screenCart(); break
          case 'promo':             content.innerHTML = screenPromo(); break
          case 'city-select':       content.innerHTML = screenCitySelect(); break
          case 'bonus-info':        content.innerHTML = screenBonusInfo(); break
          default:
            window.location.hash = 'home'
        }
      }
    }
  },

  init() {
    const onHash = () => { this.render() }
    window.addEventListener('hashchange', onHash)

    document.getElementById('app').addEventListener('input', e => {
      const searchInput = e.target.closest('[data-act="search-input"]')
      if (searchInput) {
        homeState.query = searchInput.value
        if (typeof renderHomeResults === 'function') renderHomeResults()
        return
      }
    })

    document.getElementById('app').addEventListener('click', e => {
      const anchor = e.target.closest('a[href="#"]')
      if (anchor) { e.preventDefault(); return }

      const gridItem = e.target.closest('[data-nav]')
      if (gridItem) {
        e.preventDefault()
        const storeId = gridItem.dataset.store
        if (storeId != null && (gridItem.dataset.nav === 'store' || gridItem.classList.contains('p-order') || gridItem.classList.contains('store-card'))) {
          this.navigate('store/' + storeId)
        } else if (gridItem.dataset.city) {
          localStorage.setItem('lovii_city', gridItem.dataset.city)
          showToast('Город изменён')
          this.navigate(gridItem.dataset.nav || 'home')
        } else {
          this.navigate(gridItem.dataset.nav)
        }
        return
      }
      const tabItem = e.target.closest('.tab-item')
      if (tabItem) {
        document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'))
        tabItem.classList.add('active')
        const tab = tabItem.dataset.tab
        if (tab) {
          const content = document.getElementById('app-content')
          content.querySelectorAll('[id$="-active"], [id$="-history"]').forEach(el => {
            el.style.display = el.id.endsWith('-' + tab) ? '' : 'none'
          })
        }
        return
      }
      const roleCard = e.target.closest('.role-card')
      if (roleCard) {
        document.querySelectorAll('.role-card').forEach(c => c.classList.remove('active'))
        roleCard.classList.add('active')
        return
      }
      const catChip = e.target.closest('.cat-chip')
      if (catChip) {
        const row = catChip.closest('.cat-row')
        const wasActive = catChip.classList.contains('active')
        if (row) row.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'))
        if (!wasActive) {
          catChip.classList.add('active')
          homeState.category = catChip.dataset.cat || null
        } else {
          homeState.category = null
        }
        if (typeof renderHomeResults === 'function') renderHomeResults()
        return
      }
      const searchClear = e.target.closest('[data-act="search-clear"]')
      if (searchClear) {
        homeState.query = ''
        const input = document.querySelector('[data-act="search-input"]')
        if (input) input.value = ''
        if (typeof renderHomeResults === 'function') renderHomeResults()
        return
      }
      const tabBtn = e.target.closest('.tab-btn')
      if (tabBtn) {
        const tab = tabBtn.dataset.tab
        if (!tab || tab === homeView.contentType) return
        homeView.contentType = tab
        localStorage.setItem('lovii_tab', tab)
        document.querySelectorAll('.tab-btn').forEach(t => t.classList.toggle('active', t.dataset.tab === tab))
        document.querySelectorAll('.tab-content').forEach(t => t.classList.toggle('hidden', t.id !== tab + 'Content'))
        if (typeof updateCollapse === 'function') updateCollapse()
        return
      }
      const viewToggle = e.target.closest('#mainViewToggle')
      if (viewToggle) {
        const grid = viewToggle.dataset.layout === 'grid'
        const next = grid ? 'list' : 'grid'
        viewToggle.dataset.layout = next
        viewToggle.setAttribute('aria-label', grid ? 'Показать списком' : 'Показать сеткой')
        homeView.layout = next
        localStorage.setItem('lovii_layout', next)
        const isGrid = next === 'grid'
        document.querySelector('.product-grid-wrap')?.classList.toggle('hidden', !isGrid)
        document.querySelector('.product-list-wrap')?.classList.toggle('hidden', isGrid)
        document.querySelector('#storesContent .store-view-list')?.classList.toggle('hidden', isGrid)
        document.querySelector('#storesContent .store-grid2')?.classList.toggle('hidden', !isGrid)
        return
      }
      const collBtn = e.target.closest('#mainCollapseBtn')
      if (collBtn) {
        const isProduct = homeView.contentType === 'products'
        const wrap = document.getElementById(isProduct ? 'productSection' : 'storeSection')
        if (!wrap) return
        const collapsed = wrap.classList.toggle('collapsed')
        if (isProduct) homeView.productExpanded = !collapsed
        else homeView.storeExpanded = !collapsed
        if (typeof renderHomeResults === 'function') renderHomeResults()
        if (collapsed && typeof _scheduleCollapseReset === 'function') {
          _scheduleCollapseReset()
        } else if (typeof _collapseTimer !== 'undefined' && _collapseTimer) {
          clearTimeout(_collapseTimer)
          _collapseTimer = null
        }
        return
      }
      const dashBtn = e.target.closest('#go-to-dashboard')
      if (dashBtn) {
        const activeRole = document.querySelector('.role-card.active')
        if (activeRole) {
          this.setRole(activeRole.dataset.role)
        }
        return
      }
      const logo = e.target.closest('#app-logo-link')
      if (logo) {
        if (window.location.hash === '#home' || window.location.hash === '') {
          this.render()
        }
        return
      }
      const checkoutBtn = e.target.closest('[data-act="checkout"]')
      if (checkoutBtn) {
        e.stopPropagation()
        const cart = getCart()
        if (Object.keys(cart).length === 0) return
        const orderNum = Date.now().toString(36).toUpperCase()
        const orders = JSON.parse(localStorage.getItem('lovii_orders') || '[]')
        const items = Object.entries(cart).map(([id, qty]) => {
          const p = getProducts().find(x => x.id === Number(id))
          return p ? { id: p.id, name: p.name, price: p.price, qty, storeId: p.storeId } : null
        }).filter(Boolean)
        orders.unshift({
          id: orderNum,
          date: new Date().toLocaleDateString('ru-RU'),
          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
          amount: items.reduce((s, i) => s + i.price * i.qty, 0),
          status: 'preparing',
          items
        })
        localStorage.setItem('lovii_orders', JSON.stringify(orders))
        localStorage.setItem('lovii_cart', '{}')
        updateCartPill()
        showToast(`Заказ ${orderNum} оформлен`)
        this.navigate('orders')
        return
      }
      const addBtn = e.target.closest('.add-btn, .add-big')
      if (addBtn) {
        e.stopPropagation()
        changeCart(addBtn.dataset.id, 1)
        this.renderScreen(window.location.hash.slice(1) || 'home')
        return
      }
      const qtyBtn = e.target.closest('.qty-btn')
      if (qtyBtn) {
        e.stopPropagation()
        const delta = qtyBtn.dataset.act === 'inc' ? 1 : -1
        changeCart(qtyBtn.dataset.id, delta)
        this.renderScreen(window.location.hash.slice(1) || 'home')
        return
      }
      const card = e.target.closest('.product-card')
      if (card) {
        window.location.hash = 'product?id=' + card.dataset.id
        return
      }
    })

    this.render()
    updateCartPill()
  }
}

function showSplash() {
  return new Promise(resolve => {
    const splash = document.getElementById('splash')
    if (!splash) { resolve(); return }
    setTimeout(() => {
      splash.classList.add('hidden')
      setTimeout(resolve, 500)
    }, 1800)
  })
}

document.addEventListener('DOMContentLoaded', async () => {
  await showSplash()
  LOVII.init()
})
