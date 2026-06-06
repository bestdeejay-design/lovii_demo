// Navigation and menu functionality

function initializeNavigation() {
    // Mobile menu functionality
    const fullMenu = document.getElementById('full-menu');
    const moreBtn = document.getElementById('more-btn');
    const closeMenu = document.getElementById('close-menu');
    const menuLinks = document.querySelectorAll('.menu-link');

    // Only add event listener if moreBtn exists (for pages that have it)
    if (moreBtn) {
        moreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            fullMenu.classList.add('active');
        });
    }

    // Only add event listener if closeMenu exists
    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            fullMenu.classList.remove('active');
        });
    }

    // Close menu when clicking outside (only if both elements exist)
    if (moreBtn && closeMenu) {
        document.addEventListener('click', function(e) {
            if (!fullMenu.contains(e.target) && 
                !moreBtn.contains(e.target) && 
                fullMenu.classList.contains('active')) {
                fullMenu.classList.remove('active');
            }
        });
    }
    
    // Close menu when clicking on menu links
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close the full menu if it exists
            if (fullMenu) {
                fullMenu.classList.remove('active');
            }
            
            // Handle navigation if the link has a hash
            if (this.getAttribute('href') && this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1); // Remove the #
                
                if (targetId === 'home') {
                    // Scroll to top for home
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    // Scroll to section
                    const targetSection = document.getElementById(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    });
    
    // Theme toggle button should close menu after changing theme
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Close the full menu after theme change
            if (fullMenu) {
                setTimeout(() => {
                    fullMenu.classList.remove('active');
                }, 300); // Delay to allow theme change animation to complete
            }
        });
    }
    
    // Harmonica menu functionality (excluding settings category)
    const menuCategoryHeaders = document.querySelectorAll('.menu-category-header');
    menuCategoryHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const arrow = this.querySelector('.menu-category-arrow');
            
            // Check if this is the settings category (contains theme toggle)
            const isSettingsCategory = content.querySelector('.theme-toggle') !== null;
            
            if (isSettingsCategory) {
                // For settings category, just toggle without closing others
                content.classList.toggle('expanded');
                arrow.classList.toggle('rotated');
            } else {
                // Close all other categories
                document.querySelectorAll('.menu-category-content').forEach(item => {
                    if (item !== content) {
                        const categoryArrow = item.previousElementSibling ? 
                            item.previousElementSibling.querySelector('.menu-category-arrow') : null;
                        
                        if (categoryArrow) {
                            item.classList.remove('expanded');
                            categoryArrow.classList.remove('rotated');
                        }
                    }
                });
                
                // Toggle current category
                content.classList.toggle('expanded');
                arrow.classList.toggle('rotated');
            }
        });
    });

    // Navigation
    const navItems = document.querySelectorAll('.nav-item:not(#more-btn)');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get target section
            const target = this.getAttribute('data-target');
            
            if (target === 'home') {
                // Scroll to top for home
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // Scroll to section
                const targetSection = document.getElementById(target);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}