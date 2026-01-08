// Theme management functionality

function initializeThemeManagement() {
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', currentTheme);

    function toggleTheme() {
        const currentTheme = body.getAttribute('data-theme');
        let newTheme;
        
        if (currentTheme === 'dark') {
            newTheme = 'light';
        } else if (currentTheme === 'light') {
            newTheme = 'vibrant';
        } else if (currentTheme === 'vibrant') {
            newTheme = 'casual';
        } else {
            newTheme = 'dark';
        }
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Trigger a small animation to show theme change
        gsap.to(body, {
            backgroundColor: getComputedStyle(body).getPropertyValue('--bg-color'),
            duration: 0.5,
            ease: 'power2.out'
        });
    }

    // Desktop theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Mobile theme toggle
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }
}