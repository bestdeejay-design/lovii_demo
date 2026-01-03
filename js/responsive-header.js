// Responsive Header with Separate Desktop and Mobile Menus
(function() {
    'use strict';
    
    // Initialize header functionality when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeResponsiveHeader();
    });
    
    function initializeResponsiveHeader() {
        // Initialize theme functionality
        initializeThemeToggle();
        
        // Initialize responsive menu based on screen size
        initializeResponsiveMenu();
        
        // Add resize listener to handle screen size changes
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(initializeResponsiveMenu, 250);
        });
    }
    
    function initializeResponsiveMenu() {
        // Check current screen size and initialize appropriate menu
        if (window.innerWidth >= 768) {
            // Desktop mode - show desktop menu, hide mobile menu
            initializeDesktopMenu();
            hideMobileMenu();
        } else {
            // Mobile mode - show mobile menu, hide desktop menu
            initializeMobileMenu();
            hideDesktopMenu();
        }
    }
    
    function initializeDesktopMenu() {
        // Ensure desktop menu is visible and mobile menu is hidden
        const desktopNav = document.querySelector('.main-nav.desktop-nav');
        const mobileNav = document.querySelector('.mobile-nav-wrapper');
        
        if (desktopNav) {
            desktopNav.style.display = 'block';
        }
        
        if (mobileNav) {
            mobileNav.style.display = 'block'; // Mobile button is shown, menu is hidden by default
        }
        
        // Initialize desktop submenu functionality
        const submenuItems = document.querySelectorAll('.desktop-nav .has-submenu > .nav-link');
        
        submenuItems.forEach(item => {
            // Remove existing event listeners to prevent duplicates
            item.removeEventListener('click', handleDesktopSubmenuClick);
            item.removeEventListener('mouseenter', handleDesktopSubmenuHover);
            item.addEventListener('click', handleDesktopSubmenuClick);
            item.addEventListener('mouseenter', handleDesktopSubmenuHover);
        });
        
        // Add click outside handler to close submenus
        document.removeEventListener('click', handleDesktopClickOutside);
        document.addEventListener('click', handleDesktopClickOutside);
    }
    
    function initializeMobileMenu() {
        // Ensure mobile menu is visible and desktop menu is hidden
        const desktopNav = document.querySelector('.main-nav.desktop-nav');
        const mobileNav = document.querySelector('.mobile-nav-wrapper');
        
        if (desktopNav) {
            desktopNav.style.display = 'none';
        }
        
        if (mobileNav) {
            mobileNav.style.display = 'block';
        }
        
        // Initialize mobile menu button functionality
        const mobileMenuButton = document.getElementById('mobileNavButton');
        const mobileNavMenu = document.getElementById('mobileNavMenu');
        const closeMobileMenu = document.getElementById('closeMobileMenu');
        
        if (mobileMenuButton) {
            mobileMenuButton.removeEventListener('click', toggleMobileMenu);
            mobileMenuButton.addEventListener('click', toggleMobileMenu);
        }
        
        if (closeMobileMenu) {
            closeMobileMenu.removeEventListener('click', closeMobileMenuHandler);
            closeMobileMenu.addEventListener('click', closeMobileMenuHandler);
        }
        
        // Close menu when clicking outside
        document.removeEventListener('click', handleMobileClickOutside);
        document.addEventListener('click', handleMobileClickOutside);
        
        // Initialize mobile submenu functionality
        initializeMobileSubmenus();
    }
    
    function hideDesktopMenu() {
        const desktopNav = document.querySelector('.main-nav.desktop-nav');
        if (desktopNav) {
            desktopNav.style.display = 'none';
        }
    }
    
    function hideMobileMenu() {
        const mobileNav = document.querySelector('.mobile-nav-wrapper');
        if (mobileNav) {
            mobileNav.style.display = 'block'; // Button is always visible on mobile
        }
        
        // Close mobile menu if it's open
        const mobileNavMenu = document.getElementById('mobileNavMenu');
        if (mobileNavMenu && mobileNavMenu.classList.contains('active')) {
            mobileNavMenu.classList.remove('active');
        }
    }
    
    // Desktop submenu handlers
    function handleDesktopSubmenuClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const parentItem = this.parentElement;
        const submenu = parentItem.querySelector('.submenu');
        const isCurrentlyOpen = parentItem.classList.contains('show-submenu');
        
        // Check if click was on arrow
        const isArrowClick = e.target.classList.contains('submenu-arrow') || 
                           e.target.closest('.submenu-arrow');
        
        if (submenu) {
            if (isArrowClick) {
                // Toggle submenu when clicking arrow
                closeAllDesktopSubmenus();
                
                if (isCurrentlyOpen) {
                    parentItem.classList.remove('show-submenu');
                } else {
                    parentItem.classList.add('show-submenu');
                }
                
                // Update arrow rotation
                const arrow = this.querySelector('.submenu-arrow');
                if (arrow) {
                    arrow.style.transform = isCurrentlyOpen ? 'rotate(0deg)' : 'rotate(180deg)';
                }
            } else {
                // If submenu is open, close it and allow navigation
                if (isCurrentlyOpen) {
                    parentItem.classList.remove('show-submenu');
                    const href = this.getAttribute('href');
                    if (href && href !== '#') {
                        window.location.href = href;
                    }
                } else {
                    // Open submenu
                    closeAllDesktopSubmenus();
                    parentItem.classList.add('show-submenu');
                    
                    const arrow = this.querySelector('.submenu-arrow');
                    if (arrow) {
                        arrow.style.transform = 'rotate(180deg)';
                    }
                }
            }
        } else {
            // If no submenu, navigate to link
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                window.location.href = href;
            }
        }
    }
    
    function handleDesktopSubmenuHover(e) {
        // Only on larger screens (desktop)
        if (window.innerWidth < 768) return;
        
        const parentItem = this.parentElement;
        const submenu = parentItem.querySelector('.submenu');
        
        if (submenu) {
            closeAllDesktopSubmenus();
            parentItem.classList.add('show-submenu');
            
            const arrow = this.querySelector('.submenu-arrow');
            if (arrow) {
                arrow.style.transform = 'rotate(180deg)';
            }
        }
    }
    
    function closeAllDesktopSubmenus() {
        document.querySelectorAll('.desktop-nav .has-submenu.show-submenu').forEach(item => {
            item.classList.remove('show-submenu');
            const arrow = item.querySelector('.submenu-arrow');
            if (arrow) {
                arrow.style.transform = 'rotate(0deg)';
            }
        });
    }
    
    function handleDesktopClickOutside(e) {
        const header = document.querySelector('.header');
        if (!header || !header.contains(e.target)) {
            closeAllDesktopSubmenus();
            return;
        }
        
        const clickedElement = e.target;
        const isInsideSubmenu = clickedElement.closest('.submenu');
        const isMenuLink = clickedElement.classList.contains('nav-link') || 
                          clickedElement.closest('.nav-link');
        
        if (!isInsideSubmenu && !isMenuLink) {
            closeAllDesktopSubmenus();
        }
    }
    
    // Mobile menu handlers
    function toggleMobileMenu() {
        const mobileNavMenu = document.getElementById('mobileNavMenu');
        const mobileNavButton = document.getElementById('mobileNavButton');
        
        if (mobileNavMenu && mobileNavButton) {
            mobileNavMenu.classList.toggle('active');
            mobileNavButton.classList.toggle('active');
            
            const isExpanded = mobileNavMenu.classList.contains('active');
            mobileNavButton.setAttribute('aria-expanded', isExpanded);
            
            // Focus on first menu item when opening
            if (isExpanded) {
                const firstMenuItem = mobileNavMenu.querySelector('.nav-link');
                if (firstMenuItem) {
                    firstMenuItem.focus();
                }
            }
        }
    }
    
    function closeMobileMenuHandler() {
        const mobileNavMenu = document.getElementById('mobileNavMenu');
        const mobileNavButton = document.getElementById('mobileNavButton');
        
        if (mobileNavMenu && mobileNavButton) {
            mobileNavMenu.classList.remove('active');
            mobileNavButton.classList.remove('active');
            mobileNavButton.setAttribute('aria-expanded', 'false');
            
            // Return focus to menu button
            mobileNavButton.focus();
        }
    }
    
    function handleMobileClickOutside(e) {
        const mobileNavMenu = document.getElementById('mobileNavMenu');
        const mobileNavButton = document.getElementById('mobileNavButton');
        
        if (mobileNavMenu && mobileNavButton && 
            mobileNavMenu.classList.contains('active') &&
            !mobileNavMenu.contains(e.target) && 
            !mobileNavButton.contains(e.target)) {
            mobileNavMenu.classList.remove('active');
            mobileNavButton.classList.remove('active');
            mobileNavButton.setAttribute('aria-expanded', 'false');
        }
    }
    
    function initializeMobileSubmenus() {
        const submenuItems = document.querySelectorAll('.mobile-nav-menu .has-submenu > .nav-link');
        
        submenuItems.forEach(item => {
            item.removeEventListener('click', handleMobileSubmenuClick);
            item.addEventListener('click', handleMobileSubmenuClick);
        });
    }
    
    function handleMobileSubmenuClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const parentItem = this.parentElement;
        const submenu = this.nextElementSibling;
        
        if (submenu && submenu.classList.contains('submenu')) {
            const isCurrentlyActive = parentItem.classList.contains('active');
            
            // Close all other submenus in the same level
            parentItem.parentElement.querySelectorAll('.has-submenu').forEach(item => {
                if (item !== parentItem) {
                    item.classList.remove('active');
                    const otherSubmenu = item.querySelector('.submenu');
                    if (otherSubmenu) {
                        otherSubmenu.style.maxHeight = '0';
                    }
                }
            });
            
            // Toggle current submenu
            if (isCurrentlyActive) {
                parentItem.classList.remove('active');
                submenu.style.maxHeight = '0';
            } else {
                parentItem.classList.add('active');
                submenu.style.maxHeight = submenu.scrollHeight + 'px';
            }
            
            // Update arrow rotation
            const arrow = this.querySelector('.submenu-arrow');
            if (arrow) {
                arrow.style.transform = isCurrentlyActive ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        }
    }
    
    // Theme toggle functionality
    function initializeThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const mobileThemeToggle = document.getElementById('theme-toggle-mobile');
        
        // Initialize theme from localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            updateThemeIcon(true);
        } else {
            document.body.classList.remove('light-theme');
            updateThemeIcon(false);
        }
        
        // Add event listeners
        if (themeToggle) {
            themeToggle.removeEventListener('click', toggleTheme);
            themeToggle.addEventListener('click', toggleTheme);
        }
        
        if (mobileThemeToggle) {
            mobileThemeToggle.removeEventListener('click', toggleTheme);
            mobileThemeToggle.addEventListener('click', toggleTheme);
        }
    }
    
    function toggleTheme(e) {
        e.preventDefault();
        
        document.body.classList.toggle('light-theme');
        
        const isLightTheme = document.body.classList.contains('light-theme');
        
        // Save theme preference
        localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
        
        // Update icon
        updateThemeIcon(isLightTheme);
    }
    
    function updateThemeIcon(isLight) {
        const desktopIcon = document.querySelector('#theme-toggle i');
        const mobileLink = document.querySelector('#theme-toggle-mobile');
        
        if (desktopIcon) {
            desktopIcon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
        }
        
        if (mobileLink) {
            mobileLink.innerHTML = isLight ? 
                '<i class="fas fa-sun" aria-hidden="true"></i> Светлая тема' : 
                '<i class="fas fa-moon" aria-hidden="true"></i> Темная тема';
        }
    }
})();