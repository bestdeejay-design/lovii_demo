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
        document.querySelectorAll('.header .main-menu-list > .nav-item > .nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Проверяем, есть ли подменю у этого элемента
                const parentItem = this.parentElement;
                const hasSubmenu = parentItem.classList.contains('has-submenu');
                
                if (href && href !== '#') {
                    // Если у элемента нет подменю, переходим по ссылке
                    if (!hasSubmenu) {
                        e.preventDefault();
                        handleNavigation(href);
                    } else {
                        // Для элементов с подменю, если кликнули на основную ссылку (а не на ссылку в подменю),
                        // и если нужно, можно перейти по основной ссылке
                        // В текущей реализации мы позволяем обработчику подменю управлять кликом
                        // Если вы хотите, чтобы основная ссылка вела на страницу, даже если есть подменю,
                        // раскомментируйте следующие строки:
                        // e.preventDefault();
                        // handleNavigation(href);
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