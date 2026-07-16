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
    this.navigate('home')
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
    const hash = window.location.hash.slice(1) || 'home'
    this.renderScreen(hash)
    this.renderNav()
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

    switch (hash) {
      case 'home':         content.innerHTML = screenHome(); break
      case 'search':       content.innerHTML = screenSearch(); break
      case 'orders':       content.innerHTML = screenOrders(); break
      case 'profile':      content.innerHTML = screenProfile(); break
      case 'partner':      content.innerHTML = screenPartnerDashboard(); break
      case 'partner/products':  content.innerHTML = screenPartnerProducts(); break
      case 'partner/orders':    content.innerHTML = screenPartnerOrders(); break
      case 'partner/reports':   content.innerHTML = screenPartnerReports(); break
      case 'rep':          content.innerHTML = screenRepDashboard(); break
      case 'rep/points':   content.innerHTML = screenRepPoints(); break
      case 'rep/income':   content.innerHTML = screenRepIncome(); break
      case 'rep/profile':  content.innerHTML = screenRepProfile(); break
      case 'ambassador':       content.innerHTML = screenAmbassadorDashboard(); break
      case 'ambassador/reps':  content.innerHTML = screenAmbassadorReps(); break
      case 'ambassador/income': content.innerHTML = screenAmbassadorIncome(); break
      case 'ambassador/training': content.innerHTML = screenAmbassadorTraining(); break
      default:
        window.location.hash = 'home'
    }
  },

  init() {
    const onHash = () => { this.render() }
    window.addEventListener('hashchange', onHash)

    document.getElementById('app').addEventListener('click', e => {
      const gridItem = e.target.closest('[data-nav]')
      if (gridItem) {
        e.preventDefault()
        this.navigate(gridItem.dataset.nav)
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
    })

    this.render()
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
