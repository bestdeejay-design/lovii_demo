document.addEventListener('DOMContentLoaded', function() {
  // Theme
  const body = document.body;
  const savedTheme = localStorage.getItem('vitrina-theme') || 'dark';
  
  // Apply saved theme on load
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
    body.classList.remove('dark-theme');
  } else {
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');
  }
  
  // Force re-render to ensure initial theme applies immediately
  void body.offsetWidth;

  // Update toggle knobs based on saved theme
  const updateToggleKnobs = (isLight) => {
    const toggleButtons = document.querySelectorAll('.theme-switcher');
    toggleButtons.forEach(toggleBtn => {
      if (isLight) {
        toggleBtn.classList.add('light-theme');
      } else {
        toggleBtn.classList.remove('light-theme');
      }
    });
  };

  // Set initial state for toggle knobs
  updateToggleKnobs(savedTheme === 'light');

  // Handle theme toggle buttons
  const toggleButtons = document.querySelectorAll('.theme-switcher');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const isNowLight = body.classList.contains('light-theme');
      const newTheme = isNowLight ? 'dark' : 'light';
      
      // Remove old theme classes and add new one
      body.classList.remove('light-theme', 'dark-theme');
      if (newTheme === 'light') {
        body.classList.add('light-theme');
      } else {
        body.classList.add('dark-theme');
      }
      
      localStorage.setItem('vitrina-theme', newTheme);
      
      // Update all toggle knobs
      updateToggleKnobs(newTheme === 'light');
      
      // Force re-render to ensure theme changes apply immediately
      void body.offsetWidth;
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