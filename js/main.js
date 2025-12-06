document.addEventListener('DOMContentLoaded', function() {
  // Theme
  const body = document.body;
  const savedTheme = localStorage.getItem('vitrina-theme') || 'dark';
  
  // Apply saved theme on load
  body.classList.remove('theme-forest'); // Only remove the alternative theme class
  if (savedTheme === 'forest') {
    body.classList.add('theme-forest');
  } else {
    // Default theme is dark, so no class needed
    body.classList.remove('theme-forest');
  }

  // Update toggle knobs based on saved theme
  const updateToggleKnobs = (isForest) => {
    const toggleKnobs = document.querySelectorAll('.toggle-knob');
    toggleKnobs.forEach(knob => {
      knob.style.transform = isForest ? 'translateX(18px)' : 'translateX(0)';
    });
  };

  // Set initial state for toggle knobs
  updateToggleKnobs(savedTheme === 'forest');

  const toggleButtons = document.querySelectorAll('.theme-toggle');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const isNowForest = body.classList.contains('theme-forest');
      const newTheme = isNowForest ? 'dark' : 'forest';
      
      // Remove old theme classes and add new one
      body.classList.remove('theme-forest');
      if (newTheme === 'forest') {
        body.classList.add('theme-forest');
      }
      
      localStorage.setItem('vitrina-theme', newTheme);
      
      // Update all toggle knobs
      updateToggleKnobs(newTheme === 'forest');
    });
  });

  // Mobile menu
  const menuFab = document.getElementById('menuFab');
  const closeMenu = document.getElementById('closeMenu');
  const overlay = document.getElementById('overlay');
  const offcanvasMenu = document.getElementById('offcanvasMenu');

  const openMenu = () => {
    offcanvasMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMenuHandler = () => {
    offcanvasMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  // ОБЯЗАТЕЛЬНО: обработчик клика на FAB-кнопку
  menuFab.addEventListener('click', openMenu);
  closeMenu.addEventListener('click', closeMenuHandler);
  overlay.addEventListener('click', closeMenuHandler);

  // Закрытие меню при клике на ссылку
  document.querySelectorAll('.offcanvas-nav a').forEach(link => {
    link.addEventListener('click', closeMenuHandler);
  });
});