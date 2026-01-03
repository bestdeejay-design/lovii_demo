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
      if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    } else {
      // Если тема не сохранена, по умолчанию используем тёмную тему
      document.body.classList.add('dark-theme');
    }
    
    // Обновляем иконку темы в зависимости от текущей темы
    this.updateThemeIcon();
  }

  toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDarkTheme = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    this.updateThemeIcon();
    
    return isDarkTheme;
  }

  updateThemeIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      const themeIcon = themeToggle.querySelector('.theme-icon');
      if (themeIcon) {
        const isDarkTheme = document.body.classList.contains('dark-theme');
        themeIcon.textContent = isDarkTheme ? '🌙' : '☀️';
      } else {
        console.warn('Theme icon element not found');
      }
    } 
    // Don't show warning if theme toggle doesn't exist in header since it's moved to mobile menu
  }

  getCurrentTheme() {
    return document.body.classList.contains('dark-theme') ? 'dark' : 'light';
  }
}

// Инициализируем менеджер тем
window.themeManager = new ThemeManager();