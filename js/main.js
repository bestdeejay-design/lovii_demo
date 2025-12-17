document.addEventListener('DOMContentLoaded', function() {
  // Theme
  const body = document.body;
  const savedTheme = localStorage.getItem('vitrina-theme') || 'dark';
  
  // Apply saved theme on load
  if (savedTheme === 'forest') {
    body.classList.add('theme-forest');
  } else {
    body.classList.remove('theme-forest');
  }
  
  // Force re-render to ensure initial theme applies immediately
  void body.offsetWidth;

  // Update toggle knobs based on saved theme
  const updateToggleKnobs = (isForest) => {
    const toggleButtons = document.querySelectorAll('.theme-toggle');
    toggleButtons.forEach(toggleBtn => {
      if (isForest) {
        toggleBtn.classList.add('theme-forest');
      } else {
        toggleBtn.classList.remove('theme-forest');
      }
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
  
  // Mobile dropdown functionality
  document.querySelectorAll('.offcanvas-nav .dropdown > a').forEach(dropdownLink => {
    dropdownLink.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const dropdown = this.parentElement;
      const isActive = dropdown.classList.contains('active');
      
      // Close all other dropdowns in the same menu
      document.querySelectorAll('.offcanvas-nav .dropdown').forEach(d => {
        d.classList.remove('active');
      });
      
      // Toggle current dropdown if it's not active
      if (!isActive) {
        dropdown.classList.add('active');
      }
    });
  });
  
  // Close dropdowns when clicking elsewhere
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.offcanvas-nav .dropdown')) {
      document.querySelectorAll('.offcanvas-nav .dropdown').forEach(d => {
        d.classList.remove('active');
      });
    }
  });
});