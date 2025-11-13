// themeSwitcher.js

function setTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
    document.getElementById('themeToggle').textContent = '☀️';
  } else {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
    document.getElementById('themeToggle').textContent = '🌙';
  }
}

document.getElementById('themeToggle').addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark-theme');
  setTheme(isDark ? 'light' : 'dark');
});

// При загрузке страницы, устанавливаем тему из localStorage (если была)
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);
