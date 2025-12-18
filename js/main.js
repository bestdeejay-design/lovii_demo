// Check if saved theme exists on page load
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize other components after templates load
    setTimeout(initializeAfterTemplatesLoad, 100);
});

// Инициализация компонентов после загрузки шаблонов
function initializeAfterTemplatesLoad() {
    // Используем надежный метод инициализации с повторными попытками
    initializeComponentsWithRetry();
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
    
    themeToggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        toggleTheme();
    });
    
    // Also handle mobile theme toggle if it exists
    const mobileThemeToggle = document.querySelector('.theme-toggle-link');
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleTheme();
            
            // Update the icon text based on current theme
            updateThemeToggleText();
        });
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
    
    ctaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем значение поля
        const emailPhone = document.getElementById('email_phone').value;
        
        // Простая валидация
        if (!emailPhone) {
            alert('Пожалуйста, введите email или телефон');
            return;
        }
        
        // Проверка валидности email или телефон
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/; // Простая проверка формата телефона
        
        if (!emailRegex.test(emailPhone) && !phoneRegex.test(emailPhone.replace(/\D/g, ''))) {
            alert('Пожалуйста, введите действительный email или номер телефона');
            return;
        }
        
        // Здесь можно добавить отправку данных на сервер
        console.log('CTA форма отправлена:', { emailPhone });
        
        // Показываем сообщение об успешной отправке
        alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
        
        // Сбрасываем форму
        ctaForm.reset();
    });
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