// Загрузка шаблонов
class TemplateLoader {
  constructor() {
    this.templates = {};
  }

  async loadTemplate(templateName) {
    if (this.templates[templateName]) {
      return this.templates[templateName];
    }

    try {
      const response = await fetch(`./templates/${templateName}.html`);
      if (!response.ok) {
        throw new Error(`Ошибка загрузки шаблона: ${templateName}`);
      }
      const templateContent = await response.text();
      this.templates[templateName] = templateContent;
      return templateContent;
    } catch (error) {
      console.error('Ошибка при загрузке шаблона:', error);
      return '';
    }
  }

  async loadHeader() {
    const headerContent = await this.loadTemplate('header');
    const headerElement = document.getElementById('dynamic-header');
    if (headerElement) {
      headerElement.innerHTML = headerContent;
      this.initHeaderEvents();
    } else {
      console.warn('Header element not found');
    }
  }

  async loadFooter() {
    const footerContent = await this.loadTemplate('footer');
    const footerElement = document.getElementById('dynamic-footer');
    if (footerElement) {
      footerElement.innerHTML = footerContent;
    } else {
      console.warn('Footer element not found');
    }
  }

  async loadMobileNav() {
    const navContent = await this.loadTemplate('mobile-nav');
    const navElement = document.getElementById('dynamic-mobile-nav');
    if (navElement) {
      navElement.innerHTML = navContent;
      this.initMobileNavEvents();
    } else {
      console.warn('Mobile navigation element not found');
    }
  }

  initHeaderEvents() {
    // Добавляем обработчик для переключения темы
    const themeToggle = document.getElementById('theme-toggle-header');
    if (themeToggle) {
      // Set initial state based on current theme
      if (window.themeManager) {
        const isLightTheme = window.themeManager.getCurrentTheme() === 'light';
        themeToggle.checked = isLightTheme;
        
        themeToggle.addEventListener('change', () => {
          const isDarkTheme = window.themeManager.toggleTheme();
          // Update mobile theme toggle if exists
          if (window.themeManager) {
            window.themeManager.updateMobileThemeSwitcher();
            window.themeManager.setupProfileThemeToggle(); // Update profile toggle too
          }
        });
      }
    }

    // Initialize profile dropdown for mobile
    this.initProfileDropdownEvents();
    
    // Initialize theme toggle in profile settings if we're on the profile page
    if (window.location.pathname.includes('profile.html') && window.themeManager) {
      window.themeManager.setupProfileThemeToggle();
    }

    // Добавляем обработчик для мобильного меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
        // Проверяем ширину экрана - не обрабатываем клик на мобильных устройствах
        if (window.innerWidth <= 1023) {
          return; // Не обрабатываем клик, если ширина экрана <= 1023px
        }
        
        const mobileNav = document.getElementById('mobile-nav');
        if (mobileNav) {
          mobileNav.classList.toggle('active');
          // Close profile dropdown when mobile menu opens
          const profileDropdown = document.querySelector('.profile-dropdown');
          if (profileDropdown) {
            profileDropdown.classList.remove('active');
          }
        } else {
          console.warn('Mobile navigation element not found');
        }
      });
    } else {
      // Don't show warning if we're on mobile view and button isn't needed
      if (window.innerWidth > 1023) {
        console.warn('Mobile menu button not found');
      }
    }
  }

  initProfileDropdownEvents() {
    // Initialize profile dropdown for mobile
    const profileMenu = document.querySelector('.profile-menu');
    if (profileMenu) {
      const profileLink = profileMenu.querySelector('a');
      const dropdown = profileMenu.querySelector('.profile-dropdown');
      
      if (profileLink && dropdown) {
        // Toggle dropdown on profile menu click
        profileLink.addEventListener('click', (e) => {
          // Prevent default link behavior on mobile
          if (window.innerWidth <= 1023) {
            e.preventDefault();
            dropdown.classList.toggle('active');
          }
        });
        
        // Close dropdown when clicking elsewhere
        document.addEventListener('click', (e) => {
          if (!profileMenu.contains(e.target)) {
            dropdown.classList.remove('active');
          }
        });
      }
    }
  }

  initMobileNavEvents() {
    // Initialize profile dropdown for mobile navigation
    this.initProfileDropdownEvents();
    
    // Initialize mobile theme toggle if it exists
    if (window.themeManager) {
      window.themeManager.setupMobileThemeToggle();
    }
  }

  async loadAllTemplates() {
    await Promise.all([
      this.loadHeader(),
      this.loadFooter(),
      this.loadMobileNav()
    ]);
  }
}

// Экспортируем как глобальную переменную для использования в других скриптах
window.TemplateLoader = TemplateLoader;