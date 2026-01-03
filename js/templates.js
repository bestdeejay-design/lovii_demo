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
    } else {
      console.warn('Mobile navigation element not found');
    }
  }

  initHeaderEvents() {
    // Добавляем обработчик для переключения темы
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const isDarkTheme = window.themeManager.toggleTheme();
      });
      
      // Update the theme icon after header is loaded
      if (window.themeManager && typeof window.themeManager.updateThemeIcon === 'function') {
        window.themeManager.updateThemeIcon();
      }
    } else {
      console.warn('Theme toggle element not found in header');
    }

    // Initialize mobile theme toggle if it exists
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    if (mobileThemeToggle) {
      // Set initial state based on current theme
      if (window.themeManager && typeof window.themeManager.getCurrentTheme === 'function') {
        const isDarkTheme = window.themeManager.getCurrentTheme() === 'dark';
        mobileThemeToggle.checked = isDarkTheme;
      }
      
      mobileThemeToggle.addEventListener('change', () => {
        const isDarkTheme = window.themeManager.toggleTheme();
        // Update mobile toggle state to match theme
        mobileThemeToggle.checked = isDarkTheme;
      });
    }

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

    // Добавляем обработчик для мобильного меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
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
      console.warn('Mobile menu button not found');
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