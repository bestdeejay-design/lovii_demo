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

// Initialize dynamic content features
function initializeDynamicContent() {
    initializeLiveStats();
    updateRecommendations();
}

// Initialize dynamic content after templates are loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeDynamicContent, 1000);
});
