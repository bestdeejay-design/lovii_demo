// Theme management functionality

function initializeThemeManagement() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        let newTheme;
        
        if (currentTheme === 'dark') {
            newTheme = 'light';
        } else if (currentTheme === 'light') {
            newTheme = 'vibrant';
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
    });
}