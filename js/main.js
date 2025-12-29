// Check if saved theme exists on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize other components after templates load
    setTimeout(initializeAfterTemplatesLoad, 100);
});

// Инициализация компонентов после загрузки шаблонов
function initializeAfterTemplatesLoad() {
    // Сначала устанавливаем сохраненную тему
    initializeTheme();
    
    // Используем надежный метод инициализации с повторными попытками
    initializeComponentsWithRetry();
}

// Инициализация темы при загрузке
function initializeTheme() {
    // Check if there's a saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        // Default to dark theme
        document.body.classList.remove('light-theme');
    }
    
    // Update the theme toggle text based on current theme
    updateThemeToggleText();
}

// Alternative initialization function that keeps trying until elements are found
function initializeComponentsWithRetry() {
    let attempts = 0;
    const maxAttempts = 20; // Try for up to 2 seconds (20 attempts * 100ms)
    
    // Track which components have been initialized
    let themeToggleInitialized = false;
    let contactFormInitialized = false;
    let ctaFormInitialized = false;
    
    const retryInitialization = () => {
        attempts++;
        
        // Check and initialize theme toggle if not already done
        const themeToggleBtn = document.getElementById('theme-toggle');
        if (!themeToggleInitialized && themeToggleBtn) {
            initializeThemeToggle(themeToggleBtn);
            themeToggleInitialized = true;
        } else if (!themeToggleInitialized && attempts >= maxAttempts) {
            console.warn('Theme toggle button not found after maximum attempts');
            themeToggleInitialized = true; // Prevent further checks
        }
        
        // Check and initialize contact form if not already done
        const contactForm = document.getElementById('contactForm');
        if (!contactFormInitialized && contactForm) {
            initializeContactForm();
            contactFormInitialized = true;
        } else if (!contactFormInitialized && attempts >= maxAttempts) {
            console.warn('Contact form not found after maximum attempts');
            contactFormInitialized = true; // Prevent further checks
        }
        
        // Check and initialize CTA form if not already done
        const ctaForm = document.getElementById('ctaForm');
        if (!ctaFormInitialized && ctaForm) {
            initializeCtaForm();
            ctaFormInitialized = true;
        } else if (!ctaFormInitialized && attempts >= maxAttempts) {
            console.warn('CTA form not found after maximum attempts');
            ctaFormInitialized = true; // Prevent further checks
        }
        
        // Continue retrying until max attempts reached or all components initialized
        if (attempts < maxAttempts && 
            (!themeToggleInitialized || !contactFormInitialized || !ctaFormInitialized)) {
            setTimeout(retryInitialization, 100);
        }
    };
    
    retryInitialization();
}

function initializeThemeToggle(themeToggleBtn) {
    // If element is not passed as parameter, find it in DOM
    if (!themeToggleBtn) {
        themeToggleBtn = document.getElementById('theme-toggle');
        
        if (!themeToggleBtn) {
            console.error('Theme toggle button not found');
            return;
        }
    }
    
    // Check if click event is already attached to avoid duplicates
    if (!themeToggleBtn.hasAttribute('data-theme-listener')) {
        themeToggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleTheme();
            
            // Update the icon text based on current theme
            updateThemeToggleText();
        });
        
        // Mark that event listener has been attached
        themeToggleBtn.setAttribute('data-theme-listener', 'true');
    }

    // Also handle mobile theme toggle if it exists
    const mobileThemeToggle = document.querySelector('.theme-toggle-link');
    if (mobileThemeToggle && !mobileThemeToggle.hasAttribute('data-theme-listener')) {
        mobileThemeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleTheme();
            
            // Update the icon text based on current theme
            updateThemeToggleText();
        });
        
        // Mark that event listener has been attached
        mobileThemeToggle.setAttribute('data-theme-listener', 'true');
    }
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    
    // Save current theme to localStorage
    if (document.body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
    
    // Update the icon text based on current theme
    updateThemeToggleText();
}

function updateThemeToggleText() {
    // Update the mobile theme toggle link text and icon
    const mobileThemeToggle = document.querySelector('.theme-toggle-link');
    if (mobileThemeToggle) {
        if (document.body.classList.contains('light-theme')) {
            mobileThemeToggle.innerHTML = '<i class="fas fa-sun"></i> Светлая тема';
        } else {
            mobileThemeToggle.innerHTML = '<i class="fas fa-moon"></i> Темная тема';
        }
    }
    
    // Also update the desktop theme toggle icon
    const desktopThemeToggle = document.getElementById('theme-toggle');
    if (desktopThemeToggle) {
        const icon = desktopThemeToggle.querySelector('i');
        if (icon) {
            if (document.body.classList.contains('light-theme')) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        }
    }
}

function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Мобильное меню для оверлея (если используется)
    const overlayMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuOverlay) {
        const overlayMenuItems = mobileMenuOverlay.querySelectorAll('a');
        
        overlayMenuItems.forEach(item => {
            item.addEventListener('click', function() {
                mobileMenuOverlay.classList.remove('active');
            });
        });
    }
    
    // Initialize the new mobile navigation
    initializeNewMobileNavigation();
    
    // Initialize submenu toggle for mobile
    initializeSubmenuToggle();
}

function initializeSubmenuToggle() {
    // Handle submenu toggling for mobile view
    const submenuItems = document.querySelectorAll('.header .has-submenu > a');
    submenuItems.forEach(item => {
        // Remove the default behavior for submenu links on mobile
        item.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parentItem = this.parentElement;
                parentItem.classList.toggle('active');
            }
        });
    });
    
    // Handle submenu toggle on click for desktop
    const submenuLinks = document.querySelectorAll('.header .has-submenu > a');
    submenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if the link is just '#' (dropdown trigger)
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
            
            const parentItem = this.parentElement;
            // Toggle the submenu visibility
            parentItem.classList.toggle('show-submenu');
            
            // Prevent the click from bubbling up
            e.stopPropagation();
        });
    });
    
    // Close submenus when clicking elsewhere
    document.addEventListener('click', function(e) {
        const openSubmenus = document.querySelectorAll('.header .has-submenu.show-submenu');
        openSubmenus.forEach(submenu => {
            // Check if the click is outside the submenu
            if (!submenu.contains(e.target)) {
                submenu.classList.remove('show-submenu');
            }
        });
    });
    
    // Also handle the new 'Покупателям' and 'Дополнительно' sections
    const newSubmenuItems = document.querySelectorAll('.header .has-submenu > a');
    newSubmenuItems.forEach(item => {
        // Ensure desktop hover still works
        if (window.innerWidth > 768) {
            item.addEventListener('click', function(e) {
                // Prevent default only if it's one of the new dropdowns that don't have specific pages
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                }
            });
        }
    });
}

function initializeNewMobileNavigation() {
    const mobileNavButton = document.getElementById('mobileNavButton');
    const mobileNavMenu = document.getElementById('mobileNavMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    
    if (mobileNavButton && mobileNavMenu) {
        // Toggle mobile navigation menu
        mobileNavButton.addEventListener('click', function() {
            mobileNavMenu.classList.toggle('active');
        });
        
        // Close mobile navigation menu
        if (closeMobileMenu) {
            closeMobileMenu.addEventListener('click', function() {
                mobileNavMenu.classList.remove('active');
            });
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileNavMenu.contains(event.target) && 
                !mobileNavButton.contains(event.target) &&
                mobileNavMenu.classList.contains('active')) {
                mobileNavMenu.classList.remove('active');
            }
        });
        
        // Handle submenu toggling
        const submenuItems = document.querySelectorAll('.has-submenu > .nav-link');
        submenuItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const parentItem = this.parentElement;
                parentItem.classList.toggle('active');
            });
        });
    }
}

// Дополнительная функция для плавного перехода между секциями
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Закрываем мобильное меню при клике на ссылку
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            
            // Закрываем мобильное навигационное меню (если открыто)
            const mobileNavMenu = document.getElementById('mobileNavMenu');
            if (mobileNavMenu) {
                mobileNavMenu.classList.remove('active');
            }
        }
    });
});

// Обработчик для мобильного логотипа
document.addEventListener('DOMContentLoaded', function() {
    const mobileLogo = document.getElementById('mobileLogo');
    if (mobileLogo) {
        mobileLogo.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Прокрутка к началу страницы
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Закрываем мобильное навигационное меню
            const mobileNavMenu = document.getElementById('mobileNavMenu');
            if (mobileNavMenu) {
                mobileNavMenu.classList.remove('active');
            }
        });
    }
});

// Функция для обработки формы обратной связи
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        console.warn('Contact form not found');
        return;
    }
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем значения полей формы
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Простая валидация
        if (!name || !email || !subject || !message) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }
        
        // Проверка валидности email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Пожалуйста, введите действительный адрес электронной почты');
            return;
        }
        
        // Здесь можно добавить отправку данных на сервер
        console.log('Форма отправлена:', { name, email, subject, message });
        
        // Показываем сообщение об успешной отправке
        alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
        
        // Сбрасываем форму
        contactForm.reset();
    });
    
    // Initialize CTA form as well
    initializeCtaForm();
}

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
// Экспортируем функции для использования в других частях приложения
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeThemeToggle,
        initializeMobileMenu,
        initializeNewMobileNavigation,
        initializeContactForm
    };
}
// Dynamic content updates
function updateLiveStats() {
    // Update stats with live-like data
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length > 0) {
        // Animate the stats on page load
        stats.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
            const increment = Math.ceil(target / 100);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = current.toLocaleString() + (stat.textContent.includes('+') ? '+' : '');
            }, 20);
        });
    }
}

// Initialize live stats after templates are loaded
function initializeLiveStats() {
    updateLiveStats();
    
    // Update stats periodically to simulate live data
    setInterval(() => {
        // In a real scenario, this would fetch actual data from an API
        // For now, we just add some random increments to make it look dynamic
        const stats = document.querySelectorAll('.stat-number');
        if (stats.length > 0) {
            // Add small random increments to simulate growth
            stats.forEach(stat => {
                const current = parseInt(stat.textContent.replace(/[^\d]/g, ''));
                const increment = Math.floor(Math.random() * 10) + 1;
                stat.textContent = (current + increment).toLocaleString() + (stat.textContent.includes('+') ? '+' : '');
            });
        }
    }, 30000); // Update every 30 seconds
}

// Add a function to handle dynamic product recommendations
function updateRecommendations() {
    // This would normally fetch personalized recommendations based on user behavior
    // For now, we'll just shuffle the products periodically
    const productCards = document.querySelectorAll('.product-card');
    if (productCards.length > 0) {
        // Add a "new" badge to random products every few seconds
        setInterval(() => {
            const randomIndex = Math.floor(Math.random() * productCards.length);
            const productCard = productCards[randomIndex];
            
            // Remove any existing dynamic badges first
            const existingBadge = productCard.querySelector('.product-badge.dynamic');
            if (existingBadge) {
                existingBadge.remove();
            }
            
            // Add a new dynamic badge
            const badge = document.createElement('span');
            badge.className = 'product-badge dynamic';
            badge.textContent = 'Новинка';
            badge.style.backgroundColor = '#FF9800';
            
            const productImage = productCard.querySelector('.product-image');
            productImage.appendChild(badge);
            
            // Remove the badge after 10 seconds
            setTimeout(() => {
                if (badge.parentNode) {
                    badge.remove();
                }
            }, 10000);
        }, 5000); // Add a new badge every 5 seconds
    }
}

// Update activity feed with dynamic content
function updateActivityFeed() {
    // This would normally fetch actual activity from an API
    // For now, we'll simulate activity updates
    const activityItems = document.querySelectorAll('.activity-item');
    if (activityItems.length > 0) {
        // Add new random activity every 10 seconds
        setInterval(() => {
            // Create a new activity item
            const activityTypes = [
                { icon: '🛒', action: 'покупку', entity: 'Иван Иванов', location: 'в Москве', amount: '' },
                { icon: '📦', action: 'подключил', entity: 'Мария Смирнова', location: '', amount: '5 новых товаров' },
                { icon: '🚚', action: 'оформил заказ', entity: 'ООО "Торг"', location: '', amount: 'на 15 000 ₽' },
                { icon: '⭐', action: 'оставил отзыв', entity: 'Анна Петрова', location: '', amount: 'о товаре' },
                { icon: '🔄', action: 'совершил повторную', entity: 'Сергей Козлов', location: 'в Казани', amount: '' },
                { icon: '📈', action: 'увеличил продажи', entity: 'ИП Сидоров', location: '', amount: 'на 30%' }
            ];
            
            const randomActivity = activityTypes[Math.floor(Math.random() * activityTypes.length)];
            
            // Find a random activity item to update
            const randomIndex = Math.floor(Math.random() * activityItems.length);
            const activityItem = activityItems[randomIndex];
            
            // Update the content
            const activityIcon = activityItem.querySelector('.activity-icon');
            const activityContent = activityItem.querySelector('.activity-content p');
            const activityTime = activityItem.querySelector('.activity-time');
            
            if (activityIcon && activityContent && activityTime) {
                activityIcon.textContent = randomActivity.icon;
                
                let contentText = `<strong>${randomActivity.entity}</strong> ${randomActivity.action}`;
                if (randomActivity.location) {
                    contentText += ` ${randomActivity.location}`;
                }
                if (randomActivity.amount) {
                    contentText += ` ${randomActivity.amount}`;
                }
                
                activityContent.innerHTML = contentText;
                activityTime.textContent = 'только что';
                
                // Add animation effect
                activityItem.style.opacity = '0.5';
                setTimeout(() => {
                    activityItem.style.opacity = '1';
                }, 300);
            }
        }, 10000); // Update every 10 seconds
        
        // Update time displays every minute
        setInterval(() => {
            const timeElements = document.querySelectorAll('.activity-time');
            timeElements.forEach(timeEl => {
                if (timeEl.textContent.includes('только что')) {
                    timeEl.textContent = '1 минуту назад';
                } else if (timeEl.textContent.includes('минуту назад')) {
                    timeEl.textContent = '2 минуты назад';
                } else if (timeEl.textContent.includes('минуты назад')) {
                    const minutes = parseInt(timeEl.textContent) + 1;
                    timeEl.textContent = `${minutes} минут назад`;
                }
            });
        }, 60000); // Update every minute
    }
}

// Update activity banner on products page
function updateActivityBanner() {
    const activityMessage = document.getElementById('activity-message');
    const activityTimer = document.getElementById('activity-timer');
    
    if (activityMessage && activityTimer) {
        // Product names for dynamic messages
        const products = [
            'Молоко деревенское свежее',
            'Сыр домашний из коровьего молока',
            'Яйца куриные высшей категории',
            'Мёд цветочный натуральный',
            'Овощи сезонные (ассорти)',
            'Фрукты экзотические',
            'Мыло ручной работы',
            'Шампунь натуральный'
        ];
        
        const locations = ['Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск', 'Екатеринбург', 'Краснодар'];
        
        // Update activity message every 15 seconds
        setInterval(() => {
            const randomProduct = products[Math.floor(Math.random() * products.length)];
            const randomLocation = locations[Math.floor(Math.random() * locations.length)];
            const randomName = ['Иван Иванов', 'Мария Смирнова', 'Алексей Козлов', 'Елена Волкова', 'Дмитрий Петров', 'Ольга Сидорова'];
            const randomPerson = randomName[Math.floor(Math.random() * randomName.length)];
            
            activityMessage.innerHTML = `<strong>${randomPerson}</strong> из <strong>${randomLocation}</strong> только что купил ${randomProduct}`;
            activityTimer.textContent = 'только что';
            
            // Add animation effect
            activityMessage.style.opacity = '0.7';
            setTimeout(() => {
                activityMessage.style.opacity = '1';
            }, 300);
        }, 15000); // Update every 15 seconds
        
        // Update timer every minute
        setInterval(() => {
            if (activityTimer.textContent.includes('только что')) {
                activityTimer.textContent = '1 минуту назад';
            } else if (activityTimer.textContent.includes('минуту назад')) {
                activityTimer.textContent = '2 минуты назад';
            } else if (activityTimer.textContent.includes('минуты назад')) {
                const minutes = parseInt(activityTimer.textContent) + 1;
                activityTimer.textContent = `${minutes} минут назад`;
            }
        }, 60000); // Update every minute
    }
}

// Initialize dynamic content features
function initializeDynamicContent() {
    initializeLiveStats();
    updateRecommendations();
    updateActivityFeed();
    updateActivityBanner();
}

// Initialize dynamic content after templates are loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeDynamicContent, 1000);
});
