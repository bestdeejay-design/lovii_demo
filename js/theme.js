// Управление темами
class ThemeManager {
  constructor() {
    this.init();
  }

  init() {
    // Проверяем сохраненную тему в localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Удаляем все классы тем
    document.body.classList.remove('light-theme', 'vibrant-theme');
    
    if (savedTheme) {
      // Если тема сохранена, применяем её
      if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
      } else if (savedTheme === 'vibrant') {
        document.body.classList.add('vibrant-theme');
      }
      // Если тема 'dark' или неизвестная, ничего не добавляем (остаётся тёмная по умолчанию)
    } else {
      // Если тема не сохранена, по умолчанию используем тёмную тему (без класса)
      localStorage.setItem('theme', 'dark');
    }
    
    // Обновляем иконку темы в зависимости от текущей темы
    this.updateThemeIcon();
    
    // Настраиваем мобильный переключатель темы
    this.setupMobileThemeToggle();
    
    // Настраиваем переключатель темы в профиле
    this.setupProfileThemeToggle();
    
    // Настраиваем переключатели тем на странице (если есть)
    this.setupPageThemeToggles();
  }

  setTheme(themeName) {
    // Удаляем все классы тем
    document.body.classList.remove('light-theme', 'vibrant-theme');
    
    // Добавляем нужный класс (если не 'dark')
    if (themeName === 'light') {
      document.body.classList.add('light-theme');
    } else if (themeName === 'vibrant') {
      document.body.classList.add('vibrant-theme');
    }
    
    // Сохраняем выбранную тему в localStorage
    localStorage.setItem('theme', themeName);
    
    // Обновляем иконку темы
    this.updateThemeIcon();
    
    // Обновляем состояние переключателей
    this.updateMobileThemeSwitcher();
    this.updateProfileThemeSwitcher();
    this.updatePageThemeToggles();
  }

  toggleTheme() {
    const currentTheme = this.getCurrentTheme();
    let newTheme;
    
    if (currentTheme === 'dark') {
      newTheme = 'light';
    } else if (currentTheme === 'light') {
      newTheme = 'vibrant';
    } else {
      newTheme = 'dark';
    }
    
    this.setTheme(newTheme);
  }

  updateThemeIcon() {
    // Обновляем иконку в десктопной версии
    const themeToggle = document.getElementById('theme-toggle-header');
    if (themeToggle) {
      const currentTheme = this.getCurrentTheme();
      // Для переключателя с CSS-стилями не нужно обновлять иконку, т.к. она задается в CSS
    }
    
    // Обновляем состояние свитчера в мобильном меню
    this.updateMobileThemeSwitcher();
    
    // Обновляем состояние свитчера в профиле
    this.updateProfileThemeSwitcher();
  }

  updateProfileThemeSwitcher() {
    const profileThemeToggle = document.getElementById('theme-toggle-setting');
    if (profileThemeToggle) {
      const currentTheme = this.getCurrentTheme();
      // Обновляем состояние переключателя в зависимости от текущей темы
      if (currentTheme === 'light') {
        profileThemeToggle.checked = true;
      } else {
        profileThemeToggle.checked = false;
      }
    }
  }

  updateMobileThemeSwitcher() {
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    if (mobileThemeToggle) {
      const currentTheme = this.getCurrentTheme();
      // Обновляем состояние переключателя в зависимости от текущей темы
      if (currentTheme === 'light') {
        mobileThemeToggle.checked = true;
      } else {
        mobileThemeToggle.checked = false;
      }
    }
  }

  updatePageThemeToggles() {
    // Обновляем состояние кнопок переключения тем на странице
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(button => {
      const theme = button.getAttribute('data-theme');
      const currentTheme = this.getCurrentTheme();
      if (theme === currentTheme) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  setupProfileThemeToggle() {
    const profileThemeToggle = document.getElementById('theme-toggle-setting');
    if (profileThemeToggle) {
      // Устанавливаем начальное состояние
      const currentTheme = this.getCurrentTheme();
      profileThemeToggle.checked = currentTheme === 'light';
      
      // Добавляем обработчик события
      profileThemeToggle.addEventListener('change', () => {
        const currentTheme = this.getCurrentTheme();
        if (currentTheme === 'light') {
          // Если текущая тема light, переключаем на dark
          this.setTheme('dark');
        } else {
          // В противном случае переключаем на light
          this.setTheme('light');
        }
      });
    }
  }

  setupMobileThemeToggle() {
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    if (mobileThemeToggle) {
      // Устанавливаем начальное состояние
      const currentTheme = this.getCurrentTheme();
      mobileThemeToggle.checked = currentTheme === 'light';
      
      // Добавляем обработчик события
      mobileThemeToggle.addEventListener('change', () => {
        const currentTheme = this.getCurrentTheme();
        if (currentTheme === 'light') {
          // Если текущая тема light, переключаем на dark
          this.setTheme('dark');
        } else {
          // В противном случае переключаем на light
          this.setTheme('light');
        }
      });
    }
  }

  setupPageThemeToggles() {
    // Настраиваем кнопки переключения тем на странице
    const themeButtons = document.querySelectorAll('.theme-btn[data-theme]');
    themeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const theme = button.getAttribute('data-theme');
        this.setTheme(theme);
      });
    });
  }

  getCurrentTheme() {
    if (document.body.classList.contains('light-theme')) {
      return 'light';
    } else if (document.body.classList.contains('vibrant-theme')) {
      return 'vibrant';
    } else {
      return 'dark';
    }
  }
}

// Инициализируем менеджер тем
window.themeManager = new ThemeManager();