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

// Импортируем модули (в браузере используем последовательность подключения скриптов)
// Сначала загружаем шаблоны, затем темы, затем основную логику

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация переключения вкладок в профиле
    initProfileTabs();
    
    // Инициализация мобильного меню
    initMobileMenu();
    
    // Инициализация форм
    initForms();
});

// Инициализация вкладок в профиле
function initProfileTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Убираем активный класс у всех кнопок и контента
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Добавляем активный класс к текущей вкладке
            this.classList.add('active');
            document.getElementById(`${tabId}-content`).classList.add('active');
        });
    });
}

// Инициализация мобильного меню
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // В текущей реализации мобильное меню всегда видимо внизу экрана
            // Можно добавить дополнительные функции при необходимости
            console.log('Мобильное меню открыто');
        });
    }
}

// Инициализация форм
function initForms() {
    // Обработка формы входа
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Здесь будет логика аутентификации
            console.log('Попытка входа:', email);
            
            // Для демонстрации показываем сообщение
            alert('Вход выполнен успешно!');
            window.location.href = 'profile.html';
        });
    }
    
    // Обработка формы обратной связи
    const messageForm = document.querySelector('.message-form');
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Здесь будет логика отправки сообщения
            console.log('Отправлено сообщение:', {name, email, subject, message});
            
            // Для демонстрации показываем сообщение
            alert('Сообщение отправлено успешно!');
            messageForm.reset();
        });
    }
}

// Функция проверки, является ли устройство мобильным
function isMobile() {
    return window.innerWidth <= 767;
}

// Обработчик изменения размера окна
window.addEventListener('resize', function() {
    // Можно добавить логику для адаптации интерфейса под изменение размера
});