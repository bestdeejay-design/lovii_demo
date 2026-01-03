// 
ВАЖНОЕ ПРАВИЛО ПРОЕКТА
1. Все изменения сначала фиксируются в pages.md
2. Структура проекта НЕЛЬЗЯ менять без согласования
3. Проверка перед коммитом:
   - Работает ли переключение тем?
   - Корректно ли загружаются шаблоны?
   - Нет ли внешних CDN?
   - Проходит ли валидацию HTML/CSS?
4. Все стили — только через css/main.css
5. Все скрипты — только через /js/
//

// Функция переключения темы
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
        themeIcon.textContent = '🌙'; // Луна для тёмной темы
    } else {
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
        themeIcon.textContent = '☀️'; // Солнце для светлой темы
    }
}

// Функция установки темы из localStorage
function setTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeIcon.textContent = '☀️';
    } else {
        body.classList.remove('light-theme');
        themeIcon.textContent = '🌙';
    }
}

// Инициализация темы при загрузке
document.addEventListener('DOMContentLoaded', function() {
    setTheme();
    
    // Добавляем обработчик события для кнопки переключения темы
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});