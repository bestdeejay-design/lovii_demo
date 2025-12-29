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