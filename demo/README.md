# Demo Section

This directory contains experimental features for the website. All new functionality is tested here before implementing on the main site.

## Current Experiment: Modern Header Menu

We're developing a new modern header menu for the website. This includes:

1. Responsive design that works on all devices
2. Clean and intuitive navigation
3. Improved user experience
4. Modern styling and animations
5. Enhanced accessibility features
6. Dropdown menus for better organization
7. Integrated search functionality
8. Shopping cart indicator

## Implemented Features

- Modern CSS design with smooth animations
- Fully responsive layout for all screen sizes
- Mobile hamburger menu with slide-in panel
- Dropdown menus for complex navigation
- Theme toggle with localStorage persistence
- Search bar integration
- Cart icon with item counter
- Active page indicators
- Keyboard navigation support
- Reduced motion media query support

## Recommendations Implemented

Based on best practices for modern web design, we have implemented:

1. **Mobile-first approach** - Menu works perfectly on mobile devices
2. **Accessibility** - Full keyboard navigation and screen reader support
3. **Performance** - Optimized CSS and JavaScript for fast loading
4. **Visual hierarchy** - Clear distinction between primary and secondary navigation
5. **Consistent branding** - Matches the overall design language of the site
6. **Hover effects** - Subtle animations for better user feedback
7. **Dropdown menus** - Organized submenu structure where needed

## Testing Process

1. ✅ Develop the menu in this demo section
2. 🔄 Test across different browsers and devices
3. 🔄 Gather feedback
4. 🔄 Iterate and improve
5. 📋 Once approved, implement on the main site

## Files Structure

- `index.html` - Main demo page with modern menu
- `css/modern-menu.css` - Styles for the modern menu
- `js/modern-menu.js` - JavaScript functionality for the menu
- `templates/modern-base.html` - Template with modern menu (for potential backend integration)
- `MENU_RECOMMENDATIONS.md` - Documentation of recommendations and implementation

## How to Test

1. Open `index.html` in your browser
2. Test on different screen sizes (desktop, tablet, mobile)
3. Check keyboard navigation (Tab, Enter, Arrow keys)
4. Verify theme toggle functionality
5. Test mobile menu by resizing browser or using device emulator
6. Check dropdown menus functionality
7. Verify search functionality
8. Test all links to ensure they work correctly

To run a local server for testing (if needed):
```bash
cd /workspace/demo
python -m http.server 8000
```

Then visit http://localhost:8000 in your browser.