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
    }
  }

  async loadFooter() {
    const footerContent = await this.loadTemplate('footer');
    const footerElement = document.getElementById('dynamic-footer');
    if (footerElement) {
      footerElement.innerHTML = footerContent;
    }
  }

  async loadMobileNav() {
    const navContent = await this.loadTemplate('mobile-nav');
    const navElement = document.getElementById('dynamic-mobile-nav');
    if (navElement) {
      navElement.innerHTML = navContent;
    }
  }

  initHeaderEvents() {
    // Добавляем обработчик для переключения темы
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const isDarkTheme = window.themeManager.toggleTheme();
      });
    }

    // Добавляем обработчик для мобильного меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
        const mobileNav = document.getElementById('mobile-nav');
        if (mobileNav) {
          mobileNav.classList.toggle('active');
        }
      });
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