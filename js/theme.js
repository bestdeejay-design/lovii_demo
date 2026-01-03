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
  }

  toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLightTheme = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
    this.updateThemeIcon();
    
    return isLightTheme;
  }

  updateThemeIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      const themeIcon = themeToggle.querySelector('.theme-icon');
      if (themeIcon) {
        const isLightTheme = document.body.classList.contains('light-theme');
        themeIcon.textContent = isLightTheme ? '☀️' : '🌙';
      } else {
        console.warn('Theme icon element not found');
      }
    } 
    // Don't show warning if theme toggle doesn't exist in header since it's moved to mobile menu
    
    // Обновляем состояние свитчера в мобильном меню
    this.updateMobileThemeSwitcher();
  }

  updateMobileThemeSwitcher() {
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    if (mobileThemeToggle) {
      const isLightTheme = document.body.classList.contains('light-theme');
      mobileThemeToggle.checked = isLightTheme;
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