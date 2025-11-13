// Мобильное меню
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('nav-open');
    menuToggle.classList.toggle('open');
  });
}

// Переключение темы
const themeToggle = document.getElementById('themeToggle');

function setTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
    if (themeToggle) themeToggle.textContent = '☀️';
  } else {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
    if (themeToggle) themeToggle.textContent = '🌙';
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-theme');
    setTheme(isDark ? 'light' : 'dark');
  });
}

const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);
