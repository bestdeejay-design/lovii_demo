// Mobile menu functionality
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
}

function initializeNewMobileNavigation() {
    const mobileNavButton = document.getElementById('mobileNavButton');
    const mobileNavMenu = document.getElementById('mobileNavMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    
    if (mobileNavButton && mobileNavMenu) {
        // Toggle mobile navigation menu
        mobileNavButton.addEventListener('click', function() {
            mobileNavMenu.classList.toggle('active');
            mobileNavButton.classList.toggle('active');
            
            // Improve accessibility
            const isExpanded = mobileNavMenu.classList.contains('active');
            mobileNavButton.setAttribute('aria-expanded', isExpanded);
            
            // Focus on the first menu item when opening
            if (isExpanded) {
                const firstMenuItem = mobileNavMenu.querySelector('.nav-link');
                if (firstMenuItem) {
                    firstMenuItem.focus();
                }
            }
        });
        
        // Close mobile navigation menu
        if (closeMobileMenu) {
            closeMobileMenu.addEventListener('click', function() {
                mobileNavMenu.classList.remove('active');
                mobileNavButton.classList.remove('active');
                mobileNavButton.setAttribute('aria-expanded', 'false');
                
                // Return focus to the menu button when closing
                mobileNavButton.focus();
            });
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileNavMenu.contains(event.target) && 
                !mobileNavButton.contains(event.target) &&
                mobileNavMenu.classList.contains('active')) {
                mobileNavMenu.classList.remove('active');
                mobileNavButton.classList.remove('active');
                mobileNavButton.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Handle submenu toggling
        const submenuItems = document.querySelectorAll('.has-submenu > .nav-link');
        submenuItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const parentItem = this.parentElement;
                parentItem.classList.toggle('active');

                // Update aria-expanded attribute for accessibility
                const submenu = this.nextElementSibling;
                if (submenu && submenu.classList.contains('submenu')) {
                    const isExpanded = parentItem.classList.contains('active');
                    submenu.setAttribute('aria-expanded', isExpanded);
                }
            });
        });

        // Handle keyboard navigation
        mobileNavMenu.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                mobileNavMenu.classList.remove('active');
                mobileNavButton.classList.remove('active');
                mobileNavButton.setAttribute('aria-expanded', 'false');
                mobileNavButton.focus();
            }
        });
    }
}

// Make functions available globally
window.initializeMobileMenu = initializeMobileMenu;
window.initializeNewMobileNavigation = initializeNewMobileNavigation;