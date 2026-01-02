// Функция для инициализации основного меню
function initializeMainMenu() {
    // Десктопное меню
    function initDesktopMenu() {
        const submenuItems = document.querySelectorAll('.header .main-menu-list .has-submenu > .nav-link');
        
        submenuItems.forEach(item => {
            // Удаляем существующие обработчики, чтобы избежать дубликатов
            item.removeEventListener('click', handleSubmenuClick);
            item.addEventListener('click', handleSubmenuClick);
        });
        
        // Закрытие меню при клике вне его области
        document.addEventListener('click', function(e) {
            const header = document.querySelector('.header');
            if (!header || !header.contains(e.target)) {
                closeAllSubmenus();
                return;
            }
            
            const clickedElement = e.target;
            const isInsideSubmenu = clickedElement.closest('.submenu');
            const isMenuLink = clickedElement.classList.contains('nav-link') || clickedElement.closest('.nav-link');
            
            if (!isInsideSubmenu && !isMenuLink) {
                closeAllSubmenus();
            }
        });
    }
    
    // Мобильное меню
    function initMobileMenu() {
        const submenuItems = document.querySelectorAll('.header .main-menu-list .has-submenu > .nav-link');
        
        submenuItems.forEach(item => {
            // Удаляем существующие обработчики, чтобы избежать дубликатов
            item.removeEventListener('click', handleMobileSubmenuClick);
            item.addEventListener('click', handleMobileSubmenuClick);
        });
    }
    
    // Обработчик клика для десктопного подменю
    function handleSubmenuClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const parentItem = this.parentElement;
        const submenu = parentItem.querySelector('.submenu');
        const isCurrentlyOpen = parentItem.classList.contains('show-submenu');
        
        // Проверяем, есть ли подменю у этого элемента
        if (submenu) {
            // Закрываем все другие подменю
            document.querySelectorAll('.header .main-menu-list .has-submenu.show-submenu').forEach(submenu => {
                if (submenu !== parentItem) {
                    submenu.classList.remove('show-submenu');
                    // Возвращаем стрелку в исходное положение
                    const arrow = submenu.querySelector('.submenu-arrow');
                    if (arrow) {
                        arrow.style.transform = 'rotate(0deg)';
                    }
                }
            });
            
            // Переключаем текущее подменю
            if (isCurrentlyOpen) {
                parentItem.classList.remove('show-submenu');
            } else {
                parentItem.classList.add('show-submenu');
            }
            
            // Поворачиваем стрелку
            const arrow = this.querySelector('.submenu-arrow');
            if (arrow) {
                arrow.style.transform = isCurrentlyOpen ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        } else {
            // Если нет подменю, переходим по ссылке
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                window.location.href = href;
            }
        }
    }
    
    // Обработчик клика для мобильного подменю
    function handleMobileSubmenuClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const parentItem = this.parentElement;
        const submenu = parentItem.querySelector('.submenu');
        const isCurrentlyActive = parentItem.classList.contains('active');
        
        // Проверяем, есть ли подменю у этого элемента
        if (submenu) {
            // Переключаем подменю
            if (isCurrentlyActive) {
                parentItem.classList.remove('active');
                if (submenu) {
                    submenu.setAttribute('aria-expanded', 'false');
                }
            } else {
                parentItem.classList.add('active');
                if (submenu) {
                    submenu.setAttribute('aria-expanded', 'true');
                }
            }
            
            // Поворачиваем стрелку
            const arrow = this.querySelector('.submenu-arrow');
            if (arrow) {
                arrow.style.transform = isCurrentlyActive ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        } else {
            // Если нет подменю, переходим по ссылке
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                window.location.href = href;
            }
        }
    }
    
    // Функция закрытия всех подменю
    function closeAllSubmenus() {
        document.querySelectorAll('.header .main-menu-list .has-submenu.show-submenu').forEach(submenu => {
            submenu.classList.remove('show-submenu');
            const arrow = submenu.querySelector('.submenu-arrow');
            if (arrow) {
                arrow.style.transform = 'rotate(0deg)';
            }
        });
    }
    
    // Инициализируем меню в зависимости от размера экрана
    function initializeMenuByScreenSize() {
        // Удаляем все классы активности, чтобы сбросить состояние
        document.querySelectorAll('.header .main-menu-list .has-submenu').forEach(item => {
            item.classList.remove('show-submenu', 'active');
            const submenu = item.querySelector('.submenu');
            if (submenu) {
                submenu.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Поворачиваем все стрелки в исходное положение
        document.querySelectorAll('.header .main-menu-list .submenu-arrow').forEach(arrow => {
            arrow.style.transform = 'rotate(0deg)';
        });
        
        if (window.innerWidth > 768) {
            initDesktopMenu();
        } else {
            initMobileMenu();
        }
    }
    
    // Инициализируем меню при загрузке
    initializeMenuByScreenSize();
    
    // Обновляем инициализацию при изменении размера окна
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initializeMenuByScreenSize, 150);
    });
}

// Make initializeMainMenu available globally
window.initializeMainMenu = initializeMainMenu;