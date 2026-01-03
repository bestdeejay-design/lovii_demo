// Check if saved theme exists on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize other components after templates load
    setTimeout(initializeAfterTemplatesLoad, 100);
});

// Инициализация компонентов после загрузки шаблонов
function initializeAfterTemplatesLoad() {
    // Сначала устанавливаем сохраненную тему
    initializeTheme();
    
    // Используем надежный метод инициализации с повторными попытками
    initializeComponentsWithRetry();
    
    // Инициализация маршрутизации
    initializeRouting();
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
    const maxAttempts = 10; // Reduce attempts to 1 second (10 attempts * 100ms)
    
    // Track which components have been initialized
    let themeToggleInitialized = false;
    let contactFormInitialized = false;
    let ctaFormInitialized = false;
    let submenuInitialized = false;
    
    const retryInitialization = () => {
        attempts++;
        
        // Check and initialize submenu toggle if not already done
        const submenuItems = document.querySelectorAll('.header .has-submenu > a');
        if (!submenuInitialized && submenuItems.length > 0) {
            if (typeof initializeMainMenu !== 'undefined') {
                initializeMainMenu();
            }
            submenuInitialized = true;
        } else if (!submenuInitialized && attempts >= maxAttempts) {
            // Initialize even if no items found, in case they appear later
            if (typeof initializeMainMenu !== 'undefined') {
                initializeMainMenu();
            }
            submenuInitialized = true; // Prevent further checks
        }
        
        // Check and initialize theme toggle if not already done
        const themeToggleBtn = document.getElementById('theme-toggle');
        if (!themeToggleInitialized && themeToggleBtn) {
            initializeThemeToggle(themeToggleBtn);
            themeToggleInitialized = true;
        } else if (!themeToggleInitialized && attempts >= maxAttempts) {
            // Only warn if we're on a page where theme toggle is expected
            if (themeToggleBtn) {
                initializeThemeToggle(themeToggleBtn);
            }
            themeToggleInitialized = true; // Prevent further checks
        }
        
        // Check and initialize contact form if not already done
        const contactForm = document.getElementById('contactForm');
        if (!contactFormInitialized && contactForm) {
            initializeContactForm();
            contactFormInitialized = true;
        } else if (!contactFormInitialized && attempts >= maxAttempts) {
            contactFormInitialized = true; // Prevent further checks
        }
        
        // Check and initialize CTA form if not already done
        const ctaForm = document.getElementById('ctaForm');
        if (!ctaFormInitialized && ctaForm) {
            initializeCtaForm();
            ctaFormInitialized = true;
        } else if (!ctaFormInitialized && attempts >= maxAttempts) {
            ctaFormInitialized = true; // Prevent further checks
        }
        
        // Continue retrying until max attempts reached or all components initialized
        if (attempts < maxAttempts) {
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
                emailInput.focus();
            } else {
                phoneInput.classList.add('active-input');
                emailInput.classList.remove('active-input');
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

// Initialize recommended products filtering
function initializeRecommendedFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterButtons.length > 0 && productCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filterValue = button.getAttribute('data-filter');
                
                // Filter products
                productCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Initialize quick view functionality
function initializeQuickView() {
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productImage = productCard.querySelector('img').src;
            const productDescription = productCard.querySelector('p').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            
            // Show quick view modal or perform other action
            alert(`Быстрый просмотр: ${productName}\nЦена: ${productPrice}\nОписание: ${productDescription}`);
        });
    });
}

// Initialize compare functionality
function initializeCompare() {
    const compareButtons = document.querySelectorAll('.compare-btn');
    
    compareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            // Add to compare list or perform other action
            alert(`Товар "${productName}" добавлен в список сравнения`);
        });
    });
}

// Initialize add to cart functionality
function initializeAddToCart() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = button.closest('.product-card');
            const productId = button.getAttribute('data-product-id');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            
            // Add to cart logic
            alert(`Товар "${productName}" добавлен в корзину`);
            
            // Update cart UI
            updateCartCount();
        });
    });
}

// Initialize wishlist functionality
function initializeWishlist() {
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const icon = button.querySelector('i');
            
            // Toggle wishlist state
            if (icon.classList.contains('far')) {
                icon.classList.replace('far', 'fas');
                icon.style.color = '#e74c3c';
                alert(`Товар "${productName}" добавлен в избранное`);
            } else {
                icon.classList.replace('fas', 'far');
                icon.style.color = '';
                alert(`Товар "${productName}" удален из избранного`);
            }
        });
    });
}

// Initialize quick buy functionality
function initializeQuickBuy() {
    const quickBuyButtons = document.querySelectorAll('.quick-buy-btn');
    
    quickBuyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            
            // Quick buy logic
            alert(`Быстрая покупка: ${productName} за ${productPrice}`);
        });
    });
}

// Update cart count display
function updateCartCount() {
    // This function would update the cart count in the header
    // For now, we'll just log it
    console.log('Cart updated');
}

// Update activity feed with dynamic content - Vertical scrolling implementation
function updateActivityFeed() {
    // Create a pool of 5 activity cards and implement vertical scrolling
    const activityFeed = document.querySelector('.activity-feed');
    if (!activityFeed) {
        console.warn('Activity feed container not found');
        return;
    }

    // Clear any existing intervals to prevent multiple timers
    if (window.activityTimer) {
        clearInterval(window.activityTimer);
    }
    if (window.timeUpdater) {
        clearInterval(window.timeUpdater);
    }
    
    // Function to get random interval between 1.5 and 4 seconds
    function getRandomInterval() {
        return Math.floor(Math.random() * 2500) + 1500;
    }

    // Function to create a new activity item
    function createActivityItem(activity) {
        const activityItem = document.createElement('div');
        activityItem.className = `activity-item ${activity.type}`;
        
        // Build content text properly, avoiding empty strings
        let contentText = `<strong>${activity.entity}</strong> ${activity.action}`;
        if (activity.location && activity.location.trim() !== '') {
            contentText += ` ${activity.location}`;
        }
        if (activity.amount && activity.amount.trim() !== '') {
            contentText += ` ${activity.amount}`;
        }
        
        activityItem.innerHTML = `
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-content">
                <p>${contentText}</p>
                <span class="activity-time">только что</span>
            </div>
        `;
        return activityItem;
    }

    // Define activity types (excluding the problematic "ООО \"Торг\"")
    const activityTypes = [
        // Покупки
        { icon: '🛒', action: 'совершил покупку', entity: 'Иван Иванов', location: 'в Москве', amount: 'на 14 723 ₽', type: 'purchase' },
        { icon: '🛒', action: 'купил', entity: 'Артём Лебедев', location: 'в Санкт-Петербурге', amount: 'на 8 391 ₽', type: 'purchase' },
        { icon: '🛒', action: 'оформил заказ', entity: 'ООО «Горизонт»', location: 'в Новосибирске', amount: 'на 62 847 ₽', type: 'purchase' },
        { icon: '🛒', action: 'приобрёл', entity: 'Елена Кузнецова', location: 'в Казани', amount: 'на 3 429 ₽', type: 'purchase' },
        { icon: '🛒', action: 'сделал заказ', entity: 'ИП Морозов', location: 'в Екатеринбурге', amount: 'на 27 615 ₽', type: 'purchase' },
        
        // Подключение товаров
        { icon: '📦', action: 'подключил', entity: 'Мария Смирнова', location: '', amount: '7 новых товаров', type: 'new-products' },
        { icon: '📦', action: 'добавил ассортимент', entity: 'ООО «Феникс»', location: '', amount: '12 SKU', type: 'new-products' },
        { icon: '📦', action: 'расширил каталог', entity: 'Дмитрий Орлов', location: '', amount: '9 позиций', type: 'new-products' },
        { icon: '📦', action: 'загрузил', entity: 'ИП Волкова', location: '', amount: '23 наименования', type: 'new-products' },
        { icon: '📦', action: 'обновил предложения', entity: 'Татьяна Жукова', location: '', amount: '15 товаров', type: 'new-products' },

        // Заказы (excluding the problematic "ООО «Торг»")
        { icon: '🚚', action: 'отправил заказ', entity: 'Антон Гусев', location: '', amount: 'на 4 872 ₽', type: 'order' },
        { icon: '🚚', action: 'сформировал поставку', entity: 'ИП Романов', location: '', amount: 'на 31 284 ₽', type: 'order' },
        { icon: '🚚', action: 'заказал', entity: 'Светлана Ершова', location: '', amount: 'на 18 639 ₽', type: 'order' },
        { icon: '🚚', action: 'подтвердил доставку', entity: 'ООО «Вектор»', location: '', amount: 'на 72 503 ₽', type: 'order' },
        { icon: '🚚', action: 'оформил заказ', entity: 'ООО «Альфа»', location: 'в Красноярске', amount: 'на 45 120 ₽', type: 'order' },

        // Отзывы и рейтинги
        { icon: '⭐', action: 'оставил отзыв', entity: 'Анна Петрова', location: '', amount: 'о товаре', type: 'review' },
        { icon: '⭐', action: 'оценил', entity: 'Максим Соколов', location: '', amount: 'магазин на 4.8', type: 'review' },
        { icon: '⭐', action: 'написал рекомендацию', entity: 'ИП Ковалёв', location: '', amount: 'для нового поставщика', type: 'review' },
        { icon: '⭐', action: 'отметил качество', entity: 'Наталья Белова', location: '', amount: 'в описании товара', type: 'review' },
        { icon: '⭐', action: 'поделился опытом', entity: 'Олег Фёдоров', location: '', amount: 'в карточке продавца', type: 'review' },

        // Повторные действия
        { icon: '🔄', action: 'совершил повторную', entity: 'Сергей Козлов', location: 'в Казани', amount: 'покупку', type: 'reorder' },
        { icon: '🔄', action: 'вернулся и заказал', entity: 'Евгения Маркова', location: 'в Самаре', amount: 'ещё раз', type: 'reorder' },
        { icon: '🔄', action: 'сделал повторный заказ', entity: 'ООО «Лотос»', location: 'в Ростове-на-Дону', amount: 'через неделю', type: 'reorder' },
        { icon: '🔄', action: 'купил снова', entity: 'ИП Григорьева', location: 'в Краснодаре', amount: 'то же наименование', type: 'reorder' },
        { icon: '🔄', action: 'повторил покупку', entity: 'Арсений Воронцов', location: 'в Волгограде', amount: 'по рекомендации', type: 'reorder' },

        // Рост и аналитика
        { icon: '📈', action: 'увеличил продажи', entity: 'ИП Сидоров', location: '', amount: 'на 30%', type: 'sales' },
        { icon: '📈', action: 'вышел в топ', entity: 'ООО «Меркурий»', location: '', amount: 'категории «Быт»', type: 'sales' },
        { icon: '📈', action: 'превысил план', entity: 'Андрей Никитин', location: '', amount: 'на 22%', type: 'sales' },
        { icon: '📈', action: 'улучшил конверсию', entity: 'Людмила Степанова', location: '', amount: 'на 17%', type: 'sales' },
        { icon: '📈', action: 'увеличил средний чек', entity: 'ИП Попов', location: '', amount: 'до 9 240 ₽', type: 'sales' },

        // Аналитика, подключение платформ
        { icon: '📊', action: 'подключил аналитику', entity: 'Иванов и Ко', location: '', amount: 'по продажам', type: 'analytics' },
        { icon: '📊', action: 'начал использовать', entity: 'ООО «Квант»', location: '', amount: 'отчёты по трафику', type: 'analytics' },
        { icon: '📊', action: 'настроил витрину', entity: 'Ксения Ларионова', location: '', amount: 'под сезон', type: 'analytics' },

        // Новые пользователи / регистрации
        { icon: '🆕', action: 'зарегистрировался', entity: 'ИП Зайцев', location: 'из Челябинска', amount: '', type: 'registration' },
        { icon: '🆕', action: 'присоединился к платформе', entity: 'ООО «Сфера»', location: 'из Владивостока', amount: '', type: 'registration' },
        { icon: '🆕', action: 'открыл магазин', entity: 'Дарья Мельникова', location: 'в Сочи', amount: '', type: 'registration' }
    ];

    // Function to add a new activity to the bottom of the feed
    function addNewActivity() {
        const randomActivity = activityTypes[Math.floor(Math.random() * activityTypes.length)];
        
        // Create new activity item
        const newActivityItem = createActivityItem(randomActivity);
        
        // Add animation class for smooth entry
        newActivityItem.style.opacity = '0';
        newActivityItem.style.transform = 'translateY(20px)';
        
        // Add to the bottom of the feed
        activityFeed.appendChild(newActivityItem);
        
        // Animate in
        setTimeout(() => {
            newActivityItem.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            newActivityItem.style.opacity = '1';
            newActivityItem.style.transform = 'translateY(0)';
        }, 10);

        // Maintain pool size of 5 cards - remove the oldest if we have more than 5
        const allActivities = activityFeed.querySelectorAll('.activity-item');
        if (allActivities.length > 5) {
            // Remove the first (oldest) activity with animation
            const oldestActivity = allActivities[0];
            oldestActivity.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            oldestActivity.style.opacity = '0';
            oldestActivity.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                if (oldestActivity.parentNode) {
                    oldestActivity.parentNode.removeChild(oldestActivity);
                }
            }, 300);
        }
    }

    // Function to update time displays
    function updateTimeDisplays() {
        const timeElements = document.querySelectorAll('.activity-time');
        timeElements.forEach(timeEl => {
            if (timeEl.textContent.includes('только что')) {
                timeEl.textContent = '1 минуту назад';
            } else if (timeEl.textContent.includes('минуту назад')) {
                timeEl.textContent = '2 минуты назад';
            } else if (timeEl.textContent.includes('минуты назад')) {
                const minutesMatch = timeEl.textContent.match(/(\d+)/);
                if (minutesMatch) {
                    const minutes = parseInt(minutesMatch[0]) + 1;
                    timeEl.textContent = `${minutes} минут назад`;
                }
            } else if (timeEl.textContent.includes('час назад')) {
                timeEl.textContent = '2 часа назад';
            } else if (timeEl.textContent.includes('часа назад') || timeEl.textContent.includes('часов назад')) {
                const hoursMatch = timeEl.textContent.match(/(\d+)/);
                if (hoursMatch) {
                    const hours = parseInt(hoursMatch[0]) + 1;
                    if (hours === 1) {
                        timeEl.textContent = '1 час назад';
                    } else if (hours > 1 && hours < 5) {
                        timeEl.textContent = `${hours} часа назад`;
                    } else {
                        timeEl.textContent = `${hours} часов назад`;
                    }
                }
            }
        });
    }

    // Clear existing content and add initial activities to start with some content
    activityFeed.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            addNewActivity();
        }, i * 800); // Stagger initial activities
    }

    // Start adding new activities at random intervals
    window.activityTimer = setInterval(() => {
        addNewActivity();
    }, getRandomInterval());

    // Update time displays every minute
    window.timeUpdater = setInterval(updateTimeDisplays, 60000); // Update every minute
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
    
    // Initialize Recommended Section functionality
    initializeRecommendedFilters();
    initializeQuickView();
    initializeCompare();
    initializeAddToCart();
    initializeWishlist();
    initializeQuickBuy();
}

// Функция для обработки контактной формы
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        console.warn('Contact form not found');
        return;
    }
    
    // Добавляем обработчик отправки формы
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем все поля формы
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        // Проверяем валидность полей
        let isValid = true;
        
        // Проверяем имя
        if (!nameInput.value.trim()) {
            showInputFeedback('nameFeedback', 'Пожалуйста, введите ваше имя', 'error');
            isValid = false;
        } else {
            hideInputFeedback('nameFeedback');
        }
        
        // Проверяем email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            showInputFeedback('emailFeedback', 'Пожалуйста, введите ваш email', 'error');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            showInputFeedback('emailFeedback', 'Пожалуйста, введите корректный email', 'error');
            isValid = false;
        } else {
            hideInputFeedback('emailFeedback');
        }
        
        // Проверяем тему
        if (!subjectInput.value.trim()) {
            showInputFeedback('subjectFeedback', 'Пожалуйста, введите тему сообщения', 'error');
            isValid = false;
        } else {
            hideInputFeedback('subjectFeedback');
        }
        
        // Проверяем сообщение
        if (!messageInput.value.trim()) {
            showInputFeedback('messageFeedback', 'Пожалуйста, введите ваше сообщение', 'error');
            isValid = false;
        } else {
            hideInputFeedback('messageFeedback');
        }
        
        if (!isValid) {
            return;
        }
        
        // Показываем индикатор загрузки
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');
        
        // Здесь можно добавить отправку данных на сервер
        // Для демонстрации используем setTimeout
        setTimeout(function() {
            // Скрываем индикатор загрузки
            submitBtn.classList.remove('loading');
            
            // Показываем сообщение об успехе
            alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
            
            // Сбрасываем форму
            contactForm.reset();
            
            // Скрываем все индикаторы ошибок
            hideInputFeedback('nameFeedback');
            hideInputFeedback('emailFeedback');
            hideInputFeedback('subjectFeedback');
            hideInputFeedback('messageFeedback');
        }, 2000);
    });
    
    // Добавляем обработчики для валидации в реальном времени
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            if (this.value.trim()) {
                hideInputFeedback('nameFeedback');
            } else {
                showInputFeedback('nameFeedback', 'Пожалуйста, введите ваше имя', 'error');
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value.trim() && emailRegex.test(this.value)) {
                hideInputFeedback('emailFeedback');
            } else if (!this.value.trim()) {
                showInputFeedback('emailFeedback', 'Пожалуйста, введите ваш email', 'error');
            } else {
                showInputFeedback('emailFeedback', 'Пожалуйста, введите корректный email', 'error');
            }
        });
    }
    
    if (subjectInput) {
        subjectInput.addEventListener('blur', function() {
            if (this.value.trim()) {
                hideInputFeedback('subjectFeedback');
            } else {
                showInputFeedback('subjectFeedback', 'Пожалуйста, введите тему сообщения', 'error');
            }
        });
    }
    
    if (messageInput) {
        messageInput.addEventListener('blur', function() {
            if (this.value.trim()) {
                hideInputFeedback('messageFeedback');
            } else {
                showInputFeedback('messageFeedback', 'Пожалуйста, введите ваше сообщение', 'error');
            }
        });
    }
}

// Initialize dynamic content after templates are loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeDynamicContent, 1000);
    // Initialize footer accordion functionality
    setTimeout(initializeFooterAccordion, 1000);
});

// Initialize footer accordion functionality
function initializeFooterAccordion() {
    const footerSectionTitles = document.querySelectorAll('.footer-section-title');
    
    footerSectionTitles.forEach(title => {
        title.addEventListener('click', function(e) {
            e.preventDefault();
            
            const section = this.parentElement;
            const content = section.querySelector('.footer-section-content');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle expanded state
            this.setAttribute('aria-expanded', !isExpanded);
            content.setAttribute('aria-expanded', !isExpanded);
            
            // For mobile, only allow one section to be open at a time
            if (window.innerWidth <= 768) {
                // Close other sections
                footerSectionTitles.forEach(otherTitle => {
                    if (otherTitle !== this) {
                        const otherContent = otherTitle.parentElement.querySelector('.footer-section-content');
                        otherTitle.setAttribute('aria-expanded', 'false');
                        otherContent.setAttribute('aria-expanded', 'false');
                    }
                });
            }
        });
    });
    
    // Handle window resize to adjust accordion behavior
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // On desktop, show all sections
            footerSectionTitles.forEach(title => {
                const content = title.parentElement.querySelector('.footer-section-content');
                title.setAttribute('aria-expanded', 'true');
                content.setAttribute('aria-expanded', 'true');
            });
        } else {
            // On mobile, keep sections collapsed by default
            footerSectionTitles.forEach(title => {
                const content = title.parentElement.querySelector('.footer-section-content');
                // Only keep expanded if it was explicitly opened by user
                // (we'll leave this as is for now, but could add logic to track user preferences)
            });
        }
    });
    
    // On desktop, expand all sections by default
    if (window.innerWidth > 768) {
        footerSectionTitles.forEach(title => {
            const content = title.parentElement.querySelector('.footer-section-content');
            title.setAttribute('aria-expanded', 'true');
            content.setAttribute('aria-expanded', 'true');
        });
    }
}


// Updated function with animation
function toggleTheme() {
    // Add animation class to theme toggle button
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.classList.add('changing');
        
        // Remove the animation class after the animation completes
        setTimeout(() => {
            themeToggleBtn.classList.remove('changing');
        }, 600); // Match the animation duration
    }

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

// Function to load HTML templates
function loadTemplate(url, elementId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            // Re-initialize any JavaScript functionality after template is loaded
            if (elementId === 'header-container') {
                // Use the new responsive header functionality instead of the old one
                if (typeof initializeResponsiveHeader !== 'undefined') {
                    initializeResponsiveHeader();
                } else {
                    // Fallback to initializeMobileMenu if new functionality is not available
                    initializeMobileMenu();
                }
            }
            
            // After all templates are loaded, try initializing components again
            setTimeout(initializeAfterTemplatesLoad, 50);
        })
        .catch(error => console.error('Error loading template:', error));
}


// Функция инициализации маршрутизации
function initializeRouting() {
    // Проверяем, существует ли уже обработчик маршрутизации
    if (typeof handleNavigation === 'undefined') {
        // Основная функция маршрутизации
        function handleNavigation(href) {
            // Проверяем, является ли ссылка внутренней
            if (href.startsWith('/')) {
                // Для демонстрации просто обновляем URL без перезагрузки страницы
                // В реальном приложении здесь будет логика загрузки соответствующего контента
                window.history.pushState({}, '', href);
                
                // В реальном приложении здесь может быть логика динамической загрузки контента
                console.log('Navigating to:', href);
                
                // Здесь можно добавить логику для загрузки соответствующего контента
                // в зависимости от маршрута
                loadContentForRoute(href);
            } else {
                // Если внешняя ссылка, просто переходим по ней
                window.location.href = href;
            }
        }
        
        // Функция для загрузки контента в зависимости от маршрута
        function loadContentForRoute(route) {
            // В реальном приложении здесь будет логика загрузки соответствующего контента
            // В демонстрационных целях просто выводим сообщение
            console.log('Loading content for route:', route);
            
            // Пример: обновление заголовка страницы в зависимости от маршрута
            updatePageTitle(route);
        }
        
        // Функция для обновления заголовка страницы
        function updatePageTitle(route) {
            const titles = {
                '/products': 'Товары и услуги',
                '/catalog': 'Каталог товаров',
                '/services': 'Услуги',
                '/promotions': 'Акции',
                '/business': 'Для бизнеса',
                '/suppliers': 'Поставщикам',
                '/partners': 'Партнерам',
                '/corporate': 'Корпоративным клиентам',
                '/about': 'О проекте',
                '/company': 'О компании',
                '/contacts': 'Контакты',
                '/news': 'Новости',
                '/additional': 'Дополнительно',
                '/help': 'Помощь',
                '/documents': 'Документы',
                '/delivery': 'Доставка',
                '/payment': 'Оплата',
                '/profile': 'Профиль',
                '/personal': 'Личный кабинет',
                '/orders': 'Мои заказы',
                '/favorites': 'Избранное',
                '/settings': 'Настройки'
            };
            
            const title = titles[route] || 'Страница';
            document.title = title;
        }
        
        // Обработка кликов по ссылкам в меню
        document.querySelectorAll('.header .main-menu-list .nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Проверяем, есть ли подменю у этого элемента
                const parentItem = this.parentElement;
                const hasSubmenu = parentItem.classList.contains('has-submenu');
                
                if (href && href !== '#') {
                    // Если у элемента нет подменю, или это элемент с подменю но без дочерних ссылок,
                    // переходим по ссылке
                    if (!hasSubmenu) {
                        e.preventDefault();
                        handleNavigation(href);
                    } else {
                        // Для элементов с подменю проверяем, есть ли у них дочерние ссылки
                        const submenu = parentItem.querySelector('.submenu');
                        if (submenu && submenu.querySelectorAll('a').length === 0) {
                            e.preventDefault();
                            handleNavigation(href);
                        }
                        // Если есть подменю с дочерними ссылками, обработчик подменю будет управлять кликом
                    }
                }
            });
        });
        
        // Обработка переходов с помощью истории браузера
        window.addEventListener('popstate', function(e) {
            // В реальном приложении здесь будет логика восстановления состояния страницы
            console.log('Navigated back/forward to:', window.location.pathname);
        });
        
        // Экспортируем функции для использования в других модулях
        window.handleNavigation = handleNavigation;
        window.loadContentForRoute = loadContentForRoute;
    }
}
