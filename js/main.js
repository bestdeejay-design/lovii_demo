// Основной JavaScript файл
document.addEventListener('DOMContentLoaded', async function() {
  // Инициализируем загрузчик шаблонов
  const templateLoader = new TemplateLoader();
  await templateLoader.loadAllTemplates();
  
  // Инициализируем другие функции
  initializePageComponents();
  initializeFormHandlers();
  initializeTabHandlers();
});

function initializePageComponents() {
  // Инициализация компонентов страницы
  initializeThemeToggle();
  initializeSmoothScrolling();
}

function initializeThemeToggle() {
  // Обработчик переключения темы управляется через theme.js
  // Эта функция оставлена для совместимости, если потребуется дополнительная логика
  // Обновляем состояние мобильного переключателя темы, если он существует
  if (window.themeManager) {
    // Инициализируем состояние иконки темы
    window.themeManager.updateThemeIcon();
  }
}

function initializeSmoothScrolling() {
  // Плавная прокрутка для якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

function initializeFormHandlers() {
  // Обработчики форм
  const forms = document.querySelectorAll('form');
  if (forms.length > 0) {
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit(this);
      });
    });
  }
}

function handleFormSubmit(form) {
  // Обработка отправки формы
  const formData = new FormData(form);
  const formId = form.getAttribute('id') || form.className || 'form';
  
  // Простая валидация
  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');
  requiredFields.forEach(field => {
    if (!field.value?.trim()) {
      isValid = false;
      field.classList.add('error');
    } else {
      field.classList.remove('error');
    }
  });
  
  if (isValid) {
    // Здесь можно добавить логику отправки данных
    console.log(`Форма ${formId} успешно отправлена`, Object.fromEntries(formData));
    
    // Показываем сообщение об успехе
    showMessage('Форма успешно отправлена!', 'success');
    
    // Сбрасываем форму, если это не авторизационная форма
    if (!form.classList.contains('auth-form')) {
      form.reset();
    }
  } else {
    showMessage('Пожалуйста, заполните все обязательные поля', 'error');
  }
}

function initializeTabHandlers() {
  // Обработчики вкладок на странице профиля
  const tabButtons = document.querySelectorAll('.tab-btn');
  if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        switchTab(tabId);
      });
    });
  }
}

function switchTab(tabId) {
  // Переключение вкладок
  const tabButtons = document.querySelectorAll('.tab-btn');
  if (tabButtons.length > 0) {
    tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });
  }
  
  const tabPanes = document.querySelectorAll('.tab-pane');
  if (tabPanes.length > 0) {
    tabPanes.forEach(pane => {
      pane.classList.toggle('active', pane.id === tabId);
    });
  }
}

function showMessage(message, type = 'info') {
  // Показываем сообщение пользователю
  const messageEl = document.createElement('div');
  messageEl.className = `message message-${type}`;
  messageEl.textContent = message;
  messageEl.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    color: white;
    z-index: 10000;
    font-family: 'Inter', sans-serif;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: fadeInOut 3s ease-in-out;
  `;
  
  // Устанавливаем цвет в зависимости от типа сообщения
  if (type === 'error') {
    messageEl.style.backgroundColor = '#e63946';
  } else if (type === 'success') {
    messageEl.style.backgroundColor = '#4cc9f0';
  } else {
    messageEl.style.backgroundColor = '#4361ee';
  }
  
  document.body.appendChild(messageEl);
  
  // Удаляем сообщение через 3 секунды
  setTimeout(() => {
    messageEl.remove();
  }, 3000);
}

// Добавляем CSS для анимации сообщений
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(-20px); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-20px); }
  }
`;
document.head.appendChild(style);

// Обработчики для кнопок карточек
document.addEventListener('click', function(e) {
  if (e.target.closest('.btn-secondary') && e.target.closest('.feature-card, .product-card')) {
    const card = e.target.closest('.feature-card, .product-card');
    if (card) {
      showMessage('Функция в разработке', 'info');
    }
  }
});

// Функции для поиска на странице 404
function handleSearch(event) {
  if (event.key === 'Enter') {
    performSearch();
  }
}

function performSearch() {
  const searchTerm = document.getElementById('error-search')?.value?.trim();
  if (searchTerm) {
    showMessage(`Поиск по запросу: "${searchTerm}"\nНа реальном сайте здесь бы отобразились результаты поиска.`, 'info');
    // В реальной реализации это перенаправило бы на страницу с результатами поиска
    // window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
  }
}