// themeSwitcher.js

function setTheme(theme) {
  // Удаляем все классы тем
  document.body.classList.remove('dark-theme', 'bright-theme');
  
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
    document.getElementById('themeToggle').textContent = '🌙';
  } else if (theme === 'bright') {
    document.body.classList.add('bright-theme');
    localStorage.setItem('theme', 'bright');
    document.getElementById('themeToggle').textContent = '💡';
  } else {
    // Светлая тема по умолчанию
    localStorage.setItem('theme', 'light');
    document.getElementById('themeToggle').textContent = '☀️';
  }
}

// Обработчик клика по кнопке переключения темы
document.getElementById('themeToggle').addEventListener('click', (e) => {
  e.stopPropagation(); // Останавливаем всплытие, чтобы дропдаун открылся
  // Просто открываем/закрываем дропдаун, без переключения темы
});

// Обработчики для каждой темы
document.querySelectorAll('.theme-option').forEach(option => {
  option.addEventListener('click', (e) => {
    e.stopPropagation();
    const theme = e.target.getAttribute('data-theme');
    setTheme(theme);
  });
});

// При клике вне дропдауна - закрываем его
document.addEventListener('click', () => {
  document.querySelector('.theme-dropdown').style.display = 'none';
});

// При загрузке страницы, устанавливаем тему из localStorage (если была)
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);
