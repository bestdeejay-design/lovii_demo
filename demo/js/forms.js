// Функции для работы с формами

// Валидация email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Валидация пароля
function validatePassword(password) {
  // Минимум 8 символов, хотя бы одна цифра и одна буква
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  return re.test(password);
}

// Проверка совпадения паролей
function passwordsMatch(password, confirmPassword) {
  return password === confirmPassword;
}

// Показать сообщение об ошибке
function showError(element, message) {
  // Удаляем предыдущие ошибки
  hideError(element);
  
  // Добавляем класс ошибки
  element.classList.add('error');
  
  // Создаем элемент с сообщением об ошибке
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  errorElement.style.color = '#ff6b6b';
  errorElement.style.fontSize = '0.8rem';
  errorElement.style.marginTop = '0.25rem';
  
  element.parentNode.insertBefore(errorElement, element.nextSibling);
}

// Скрыть сообщение об ошибке
function hideError(element) {
  element.classList.remove('error');
  const existingError = element.parentNode.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
}

// Обработчик отправки формы регистрации
function handleRegistration(formId, submitCallback) {
  const form = document.getElementById(formId);
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Сбрасываем предыдущие ошибки
    const errorElements = form.querySelectorAll('.error');
    errorElements.forEach(el => hideError(el));
    
    let isValid = true;
    
    // Проверяем поля
    const emailField = form.querySelector('input[type="email"]');
    const passwordField = form.querySelector('input[name="password"]');
    const confirmPasswordField = form.querySelector('input[name="confirmPassword"]');
    
    if (emailField && !validateEmail(emailField.value)) {
      showError(emailField, 'Пожалуйста, введите корректный email');
      isValid = false;
    }
    
    if (passwordField && !validatePassword(passwordField.value)) {
      showError(passwordField, 'Пароль должен содержать минимум 8 символов, включая буквы и цифры');
      isValid = false;
    }
    
    if (confirmPasswordField && passwordField && 
        !passwordsMatch(passwordField.value, confirmPasswordField.value)) {
      showError(confirmPasswordField, 'Пароли не совпадают');
      isValid = false;
    }
    
    if (isValid) {
      submitCallback(new FormData(form));
    }
  });
}

// Обработчик отправки формы входа
function handleLogin(formId, submitCallback) {
  const form = document.getElementById(formId);
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Сбрасываем предыдущие ошибки
    const errorElements = form.querySelectorAll('.error');
    errorElements.forEach(el => hideError(el));
    
    let isValid = true;
    
    // Проверяем поля
    const emailField = form.querySelector('input[type="email"]');
    const passwordField = form.querySelector('input[type="password"]');
    
    if (emailField && !validateEmail(emailField.value)) {
      showError(emailField, 'Пожалуйста, введите корректный email');
      isValid = false;
    }
    
    if (isValid) {
      submitCallback(new FormData(form));
    }
  });
}

// Инициализация социальных кнопок
function initSocialButtons() {
  const socialButtons = document.querySelectorAll('.social-btn');
  
  socialButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const service = this.classList[1];
      const action = this.textContent.includes('Войти') ? 'login' : 'register';
      
      // В реальной реализации здесь будет OAuth авторизация
      console.log(`${action} через ${getSocialServiceName(service)}`);
      
      // Здесь можно реализовать OAuth flow
      handleSocialLogin(service, action);
    });
  });
}

function getSocialServiceName(service) {
  const services = {
    'vk': 'ВКонтакте',
    'yandex': 'Яндекс',
    'google': 'Google',
    'mailru': 'Mail.ru',
    'apple': 'Apple',
    'github': 'GitHub'
  };
  return services[service] || service;
}

function handleSocialLogin(service, action) {
  // В реальной реализации здесь будет OAuth flow
  // Открываем окно для OAuth
  const authWindow = window.open(
    `/auth/${service}?action=${action}`,
    'social_auth',
    'width=600,height=700,scrollbars=yes,resizable=yes'
  );
  
  // Проверяем результат аутентификации
  const checkAuth = setInterval(() => {
    if (authWindow.closed) {
      clearInterval(checkAuth);
      // Проверяем статус аутентификации
      // В реальной реализации здесь будет проверка токена
    }
  }, 1000);
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
  initSocialButtons();
});