// Функция для обработки CTA формы
function initializeCtaForm() {
    const ctaForm = document.getElementById('ctaForm');

    if (!ctaForm) {
        console.warn('CTA form not found');
        return;
    }

    // Добавляем обработчики для переключения типа контакта
    const contactTypeButtons = document.querySelectorAll('.contact-type-btn');
    const emailInput = document.getElementById('emailInput');
    const phoneInput = document.getElementById('phoneInput');

    contactTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            
            // Обновляем активные классы
            contactTypeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Показываем соответствующее поле ввода
            if (type === 'email') {
                emailInput.classList.add('active-input');
                phoneInput.classList.remove('active-input');
                emailInput.style.display = 'block';
                phoneInput.style.display = 'none';
                emailInput.focus();
            } else {
                phoneInput.classList.add('active-input');
                emailInput.classList.remove('active-input');
                phoneInput.style.display = 'block';
                emailInput.style.display = 'none';
                phoneInput.focus();
            }
        });
    });

    // Добавляем обработчики ввода для валидации в реальном времени
    emailInput.addEventListener('input', function() {
        validateInput(this.value, 'email');
    });

    emailInput.addEventListener('blur', function() {
        validateInput(this.value, 'email');
    });

    phoneInput.addEventListener('input', function() {
        validateInput(this.value, 'phone');
    });

    phoneInput.addEventListener('blur', function() {
        validateInput(this.value, 'phone');
    });

    ctaForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Получаем значение активного поля
        const activeInput = document.querySelector('.contact-input.active-input');
        const contactValue = activeInput.value;

        // Простая валидация
        if (!contactValue) {
            showInputFeedback('contactFeedback', 'Пожалуйста, введите контактные данные', 'error');
            return;
        }

        // Проверка валидности email или телефон
        let isValid = false;
        if (activeInput.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(contactValue);
        } else if (activeInput.type === 'tel') {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/; // Простая проверка формата телефона
            isValid = phoneRegex.test(contactValue.replace(/\D/g, ''));
        }

        if (!isValid) {
            const errorMessage = activeInput.type === 'email' 
                ? 'Пожалуйста, введите действительный email' 
                : 'Пожалуйста, введите действительный номер телефона';
            showInputFeedback('contactFeedback', errorMessage, 'error');
            return;
        }

        // Показываем индикатор загрузки
        const submitBtn = ctaForm.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');

        // Имитация отправки формы (в реальном приложении здесь будет AJAX-запрос)
        setTimeout(() => {
            // Показываем сообщение об успешной отправке
            alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');

            // Сбрасываем форму
            ctaForm.reset();

            // Скрываем индикатор загрузки
            submitBtn.classList.remove('loading');

            // Скрываем сообщение об ошибке
            hideInputFeedback('contactFeedback');
        }, 1500);
    });
}

// Функция для валидации ввода в реальном времени
function validateInput(value, type) {
    if (!value) {
        hideInputFeedback('contactFeedback');
        return;
    }

    let isValid = false;
    if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    } else if (type === 'phone') {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        isValid = phoneRegex.test(value.replace(/\D/g, ''));
    }

    const activeInput = document.querySelector('.contact-input.active-input');
    const feedbackElement = document.getElementById('contactFeedback');

    if (isValid) {
        activeInput.classList.remove('error');
        activeInput.classList.add('success');
        feedbackElement.textContent = type === 'email' ? 'Корректный email' : 'Корректный номер телефона';
        feedbackElement.className = 'input-feedback success';
        feedbackElement.style.display = 'block';
    } else {
        activeInput.classList.remove('success');
        activeInput.classList.add('error');
        feedbackElement.textContent = type === 'email' ? 'Некорректный email' : 'Некорректный номер телефона';
        feedbackElement.className = 'input-feedback error';
        feedbackElement.style.display = 'block';
    }
}

// Функция для отображения сообщения в поле ввода
function showInputFeedback(elementId, message, type) {
    const feedbackElement = document.getElementById(elementId);
    feedbackElement.textContent = message;
    feedbackElement.className = `input-feedback ${type}`;
    feedbackElement.style.display = 'block';

    // Добавляем класс к полю ввода
    const activeInput = document.querySelector('.contact-input.active-input');
    if (type === 'error') {
        activeInput.classList.add('error');
        activeInput.classList.remove('success');
    } else if (type === 'success') {
        activeInput.classList.add('success');
        activeInput.classList.remove('error');
    }
}

// Функция для скрытия сообщения в поле ввода
function hideInputFeedback(elementId) {
    const feedbackElement = document.getElementById(elementId);
    feedbackElement.style.display = 'none';

    // Убираем классы ошибки/успеха у поля ввода
    const activeInput = document.querySelector('.contact-input.active-input');
    activeInput.classList.remove('error', 'success');
}