// Mobile menu functionality
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        e.target !== menuToggle) {
        mobileMenu.classList.remove('active');
    }
});

// Mobile dropdown functionality
const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
mobileDropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const dropdown = toggle.parentElement;
        const submenu = dropdown.querySelector('.mobile-submenu');
        
        // Close other open submenus
        document.querySelectorAll('.mobile-submenu').forEach(sub => {
            if (sub !== submenu) {
                sub.classList.remove('active');
                sub.previousElementSibling.querySelector('.dropdown-arrow').style.transform = 'rotate(0deg)';
            }
        });
        
        // Toggle current submenu
        submenu.classList.toggle('active');
        const arrow = toggle.querySelector('.dropdown-arrow');
        if (submenu.classList.contains('active')) {
            arrow.style.transform = 'rotate(90deg)';
        } else {
            arrow.style.transform = 'rotate(0deg)';
        }
    });
});

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add focus management for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
    }
});

// Initialize dropdown arrows for desktop
document.querySelectorAll('.dropdown-toggle i').forEach(icon => {
    // Add rotation effect on hover for desktop dropdowns
    const dropdown = icon.closest('.dropdown');
    if (dropdown) {
        dropdown.addEventListener('mouseenter', () => {
            icon.style.transform = 'rotate(180deg)';
        });
        
        dropdown.addEventListener('mouseleave', () => {
            icon.style.transform = 'rotate(0deg)';
        });
    }
});