// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const hamburgers = document.querySelectorAll('.hamburger');
    
    // Check for saved theme in localStorage or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    body.setAttribute('data-theme', savedTheme);
    
    // Toggle theme function
    function toggleTheme() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }
    
    // Add event listener to theme toggle button
    themeToggle.addEventListener('click', toggleTheme);
    
    // Mobile Menu Functionality
    function toggleMobileMenu() {
        mobileNav.classList.toggle('active');
        
        // Toggle hamburger animation
        hamburgers.forEach((hamburger, index) => {
            hamburger.classList.toggle('open');
        });
    }
    
    // Add event listener to mobile menu button
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            hamburgers.forEach(hamburger => {
                hamburger.classList.remove('open');
            });
        });
    });
    
    // Close mobile menu when clicking outside of it
    document.addEventListener('click', function(event) {
        const isClickInsideNav = mobileNav.contains(event.target);
        const isClickOnButton = mobileMenuBtn.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnButton && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            hamburgers.forEach(hamburger => {
                hamburger.classList.remove('open');
            });
        }
    });
    
    // Close mobile menu when resizing to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileNav.classList.remove('active');
            hamburgers.forEach(hamburger => {
                hamburger.classList.remove('open');
            });
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Account for fixed header
                behavior: 'smooth'
            });
        }
    });
});