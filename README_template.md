# Responsive Website Template

This is a responsive website template with theme switching and mobile menu functionality. It includes all the essential features for a modern, adaptive website.

## Features

- **Fully Responsive Design**: Adapts to all screen sizes from mobile to desktop
- **Theme Switching**: Toggle between light and dark themes with persistent storage
- **Mobile Menu**: Hamburger menu that transforms into a full-screen overlay on mobile
- **Optimized for Mobile**: Touch-friendly elements and optimized performance
- **Smooth Animations**: Transitions and animations for better user experience
- **Accessible**: Proper ARIA labels and keyboard navigation support

## Files Included

- `template.html`: Main HTML structure with all necessary elements
- `template.css`: Complete styling with CSS variables for theming
- `template.js`: JavaScript functionality for theme switching and mobile menu

## How to Use

1. Include the CSS file in the `<head>` of your HTML:
   ```html
   <link rel="stylesheet" href="template.css">
   ```

2. Include the JavaScript file before the closing `</body>` tag:
   ```html
   <script src="template.js"></script>
   ```

3. Use the following HTML structure in your header for the theme toggle and mobile menu:
   ```html
   <header class="header">
       <div class="container">
           <div class="logo">Logo</div>
           
           <!-- Desktop Navigation -->
           <nav class="desktop-nav">
               <ul>
                   <li><a href="#home">Home</a></li>
                   <li><a href="#about">About</a></li>
                   <!-- Add more navigation items as needed -->
               </ul>
           </nav>
           
           <!-- Theme Toggle Button -->
           <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark/light mode">
               <span class="sun-icon">☀️</span>
               <span class="moon-icon">🌙</span>
           </button>
           
           <!-- Mobile Menu Button -->
           <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle mobile menu">
               <span class="hamburger"></span>
               <span class="hamburger"></span>
               <span class="hamburger"></span>
           </button>
       </div>
       
       <!-- Mobile Navigation -->
       <nav class="mobile-nav" id="mobileNav">
           <ul>
               <li><a href="#home">Home</a></li>
               <li><a href="#about">About</a></li>
               <!-- Add more navigation items as needed -->
           </ul>
       </nav>
   </header>
   ```

## Customization

### Colors and Theme
You can customize the theme by modifying the CSS variables in the `:root` and `[data-theme="dark"]` selectors in `template.css`.

### Breakpoints
The template uses 768px as the main breakpoint for mobile responsiveness. You can adjust this in the media queries section of the CSS file.

## Functionality

- **Theme Switching**: The theme preference is saved in localStorage so it persists between visits
- **Mobile Menu**: The mobile menu automatically closes when clicking on links or outside the menu area
- **Smooth Scrolling**: Anchor links have smooth scrolling functionality
- **Accessibility**: All interactive elements have proper ARIA labels and keyboard support

## Browser Support

The template uses modern CSS features and JavaScript. It works in all modern browsers (Chrome, Firefox, Safari, Edge). For older browser support, you may need to add polyfills.

## License

This template is free to use and modify for personal and commercial projects.