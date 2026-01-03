// Управление темами
class ThemeManager {
  constructor() {
    this.init();
  }

  init() {
    // Проверяем сохраненную тему в localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      // Если тема сохранена, применяем её
      if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
      } else {
        document.body.classList.remove('light-theme');
      }
    } else {
      // Если тема не сохранена, по умолчанию используем тёмную тему (без класса)
      document.body.classList.remove('light-theme');
    }
    
    // Обновляем иконку темы в зависимости от текущей темы
    this.updateThemeIcon();
    
    // Настраиваем мобильный переключатель темы
    this.setupMobileThemeToggle();
    
    // Настраиваем переключатель темы в профиле
    this.setupProfileThemeToggle();
  }

  toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLightTheme = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
    this.updateThemeIcon();
    
    // Ensure mobile switcher is updated too
    this.updateMobileThemeSwitcher();
    
    // Update profile switcher as well
    this.updateProfileThemeSwitcher();
    
    return isLightTheme;
  }

  updateThemeIcon() {
    // Обновляем иконку в десктопной версии
    const themeToggle = document.getElementById('theme-toggle-header');
    if (themeToggle) {
      const isLightTheme = document.body.classList.contains('light-theme');
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
      const isLightTheme = document.body.classList.contains('light-theme');
      profileThemeToggle.checked = isLightTheme;
    }
  }

  updateMobileThemeSwitcher() {
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    if (mobileThemeToggle) {
      const isLightTheme = document.body.classList.contains('light-theme');
      mobileThemeToggle.checked = isLightTheme;
    }
  }

  setupProfileThemeToggle() {
    const profileThemeToggle = document.getElementById('theme-toggle-setting');
    if (profileThemeToggle) {
      // Устанавливаем начальное состояние
      const isLightTheme = document.body.classList.contains('light-theme');
      profileThemeToggle.checked = isLightTheme;
      
      // Добавляем обработчик события
      profileThemeToggle.addEventListener('change', () => {
        this.toggleTheme();
      });
    }
  }

  setupMobileThemeToggle() {
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    if (mobileThemeToggle) {
      // Устанавливаем начальное состояние
      this.updateMobileThemeSwitcher();
      
      // Добавляем обработчик события
      mobileThemeToggle.addEventListener('change', () => {
        this.toggleTheme();
      });
    }
  }

  getCurrentTheme() {
    return document.body.classList.contains('light-theme') ? 'light' : 'dark';
  }
}

// Инициализируем менеджер тем
window.themeManager = new ThemeManager();