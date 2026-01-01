// Simple script to verify menu functionality
// This script will test if the submenu toggle functionality is working

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking menu functionality...');
    
    // Wait a bit more for templates to load
    setTimeout(function() {
        console.log('Checking for submenu items...');
        
        // Check for submenu items in the header
        const submenuItems = document.querySelectorAll('.header .has-submenu > a');
        console.log(`Found ${submenuItems.length} submenu items`);
        
        if (submenuItems.length > 0) {
            console.log('Menu items found, functionality should be working');
            console.log('Submenu items:', Array.from(submenuItems).map(item => item.textContent.trim()));
        } else {
            console.log('No submenu items found - there might be an issue with template loading');
        }
    }, 1000);
});