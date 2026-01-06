// Side Navigation Module JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // Determine position: default to left, but can be overridden via localStorage
  const position = localStorage.getItem('sideNavPosition') || 'left';
  document.body.classList.add(`side-nav-${position}`);
  
  // Create the navigation container
  const container = document.getElementById('side-nav-container');
  
  // Define navigation items based on mobile nav
  const navItems = [
    { id: 'icon-home', label: 'Главная', href: '#home' },
    { id: 'icon-catalog', label: 'Каталог', href: '#catalog' },
    { id: 'icon-cart', label: 'Корзина', href: '#business' }, // Business section as it relates to transactions
    { id: 'icon-wishlist', label: 'Избранное', href: '#features' }, // Features section as it relates to product features
    { id: 'icon-profile', label: 'Профиль / Войти', href: '#contacts' } // Contacts section for user profile access
  ];
  
  // Build the navigation menu
  navItems.forEach(item => {
    const navItem = document.createElement('a');
    navItem.className = 'side-nav-item';
    navItem.href = item.href;
    navItem.title = item.label;
    
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const useElement = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    useElement.setAttribute('href', `#${item.id}`);
    
    svgElement.appendChild(useElement);
    navItem.appendChild(svgElement);
    
    container.appendChild(navItem);
  });
  
  // Add scroll event listener to show/hide menu
  let ticking = false;
  
  function updateMenuVisibility() {
    const scrollY = window.scrollY;
    const isVisible = scrollY > 100;
    
    if (isVisible) {
      document.body.classList.add('side-nav-visible');
    } else {
      document.body.classList.remove('side-nav-visible');
    }
    
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateMenuVisibility);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick);
  
  // Initial check in case page is already scrolled
  requestTick();
});