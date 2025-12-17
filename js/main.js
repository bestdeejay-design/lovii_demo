// Проверяем сохраненную тему при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, есть ли сохраненная тема в localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        // По умолчанию темная тема
        document.body.classList.remove('light-theme');
    }
    
    // Инициализируем переключатель темы
    initializeThemeToggle();
});

function initializeThemeToggle() {
    const themeToggleBtn = document.getElementById('themeToggle');
    
    if (!themeToggleBtn) {
        console.error('Theme toggle button not found');
        return;
    }
    
    themeToggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        
        // Сохраняем текущую тему в localStorage
        if (document.body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Дополнительная функция для плавного перехода между секциями
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});