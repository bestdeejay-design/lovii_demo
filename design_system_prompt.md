# Design System Documentation for "Лови" Project
## Complete Prompt for AI Agents to Recreate Similar Website

### 1. PROJECT OVERVIEW
**Project Name**: Лови - цифровой оператор лояльности для микробизнеса
**Purpose**: SaaS-платформа и оператор баллов лояльности для объединения микробизнеса в единую экосистему цифровой локальной экономики
**Target Audience**: Микробизнес, франчайзи, инвесторы, клиенты

### 2. VISUAL DESIGN SYSTEM

#### 2.1 Color Themes
The website supports three distinct themes:

**Dark Theme (default):**
- Background: #0A0F1F
- Text: #FFFFFF
- Accent: #FF6B35 (orange)
- Card Background: #1A2238
- Border: #2D3748
- Icon Color: #FFFFFF
- Shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
- Gradient: linear-gradient(135deg, #FF6B35, #ff9a8b)

**Light Theme:**
- Background: #FFFFFF
- Text: #000000
- Accent: #F97316 (orange)
- Card Background: #F3F4F6
- Border: #E5E7EB
- Icon Color: #000000

**Vibrant Theme:**
- Background: linear-gradient(135deg, #0f0c29, #302b63)
- Text: #FFFFFF
- Accent: #ff7e5f
- Card Background: rgba(255, 255, 255, 0.1)
- Border: rgba(255, 255, 255, 0.2)
- Icon Color: #FFFFFF

#### 2.2 Typography
- **Font Family**: 'Inter', Roboto, system-ui, sans-serif
- **Font Weights**: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)
- **Hero Title**: 3.5rem (mobile), 4.5rem (desktop) - 800 weight
- **Section Title**: 2.8rem (mobile), 3.5rem (desktop) - 700 weight
- **Card Title**: 1.6rem - 700 weight
- **Body Text**: 1rem - 400 weight

#### 2.3 Spacing System
- **Container**: max-width 1200px, padding 0 20px
- **Section Padding**: 100px 0
- **Grid Gap**: 40px for cards, 30px for metrics
- **Button Padding**: 18px 40px
- **Card Padding**: 40px 30px

#### 2.4 Components Design

**Cards:**
- Background: var(--card-bg)
- Border-radius: 20px
- Border: 1px solid var(--border-color)
- Transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)
- Hover: translateY(-10px), box-shadow 0 20px 40px rgba(0,0,0,0.2)
- Min-height: 200px
- Icon: 70x70px with drop-shadow(0 5px 10px rgba(255,107,53,0.2))

**Buttons:**
- Primary: Full orange background, white text, 50px min-height
- Secondary: Transparent with orange border, orange text
- Border-radius: 50px
- Hover: translateY(-5px), enhanced shadow
- Transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)

**Pricing Cards:**
- Background: var(--card-bg)
- Border-radius: 20px
- Border: 1px solid var(--border-color)
- Popular card: 2px solid var(--accent-color), scale(1.03)
- Hover: translateY(-10px) for all, extra scale for popular

### 3. LAYOUT SYSTEM

#### 3.1 Grid System
- **Main Grid**: CSS Grid with auto-fit and minmax(280px, 1fr)
- **Responsive Breakpoints**: 
  - Desktop: 4 columns for some sections
  - Tablet: 2 columns 
  - Mobile: 1 column
- **Special Layouts**: 
  - Asymmetrical layout for business section (flex with content + cards)
  - Staggered cards for "about" section with grid-row/column spans

#### 3.2 Section Structure
Each section follows this pattern:
- Container wrapper with max-width
- Section content with title and subtitle
- Cards grid or specific layout
- Decorative elements (circles, gradients)

### 4. NAVIGATION SYSTEM

#### 4.1 Mobile Navigation (Bottom Bar)
- **Position**: Fixed at bottom of screen
- **Display**: Flex with space-around
- **Items**: 5 icons - home, catalog, business, about, more
- **Active State**: Orange color for active item
- **Minimum Touch Target**: 50px height for accessibility
- **Icons**: 24x24px with labels below

#### 4.2 Full Menu (Slide-up)
- **Trigger**: "More" icon opens slide-up menu
- **Position**: Fixed, slides up from bottom
- **Content**: Organized by categories with expandable sections
- **Behavior**: Closes when clicking outside or on menu links
- **Theme Toggle**: Included in full menu

#### 4.3 Desktop Navigation
- **Display**: Hidden on desktop (media query min-width: 768px)
- **Smooth Scrolling**: All navigation uses smooth scroll to sections

### 5. ANIMATION SYSTEM

#### 5.1 GSAP Animations
- **Hero Elements**: Fade in with slide up (duration 1s)
- **Buttons**: Delayed animation with opacity and y movement
- **Cards**: Intersection Observer triggered animations
- **Section Titles**: Back easing with subtle bounce
- **Decorative Elements**: Elastic scale animation

#### 5.2 CSS Animations
- **Background Rotation**: Continuous 360deg rotation for hero section
- **Button Hover**: Gradient overlay with width transition
- **Card Hover**: Background overlay with height transition
- **Reduced Motion Support**: Prefers-reduced-motion media query disables animations

### 6. PARALLAX EFFECTS
- **Rellax Library**: Used for parallax scrolling effects
- **Speed Variations**: Different elements have different parallax speeds (data-rellax-speed)
- **Performance**: Optimized for smooth scrolling

### 7. SVG ICON SYSTEM

#### 7.1 SVG Sprite
- **Location**: Hidden SVG sprite at top of body
- **Icons**: 10+ icons including home, catalog, business, about, more, email, web, features, cart, wishlist, profile
- **Theming**: Uses CSS variables (fill: var(--icon-color)) for theme compatibility
- **Accessibility**: Each icon has proper viewBox and semantic meaning

#### 7.2 Icon Usage
- **Implementation**: <svg><use href="#icon-name"></use></svg>
- **Sizing**: Different sizes for different contexts (24x24 for nav, 70x70 for cards)
- **Color**: Dynamically changes based on current theme

### 8. RESPONSIVE DESIGN

#### 8.1 Breakpoints
- **Mobile**: < 768px (bottom navigation active)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

#### 8.2 Mobile Optimizations
- **Touch Targets**: Minimum 50px height for buttons and navigation
- **Font Sizes**: Scaled appropriately for readability
- **Grid Layouts**: Converts to single column on small screens
- **Special Cases**: 
  - About section complex grid simplified to single column
  - Business section becomes vertical stack instead of horizontal split
  - Pricing cards stack vertically

#### 8.3 Very Small Screens (< 480px)
- **Reduced Padding**: Smaller gaps and padding
- **Font Scaling**: Smaller font sizes for better fit
- **Element Sizing**: Adjusted icon and content sizes

### 9. ACCESSIBILITY FEATURES

#### 9.1 Reduced Motion
- **Support**: Full support for prefers-reduced-motion media query
- **Implementation**: Disables all animations when requested

#### 9.2 Touch Targets
- **Minimum Size**: 50px height for all interactive elements
- **Spacing**: Adequate space between touch targets

#### 9.3 Semantic HTML
- **Structure**: Proper heading hierarchy (h1, h2, h3)
- **Landmarks**: Proper use of section, header, footer elements
- **Links**: Descriptive link text where appropriate

### 10. PERFORMANCE OPTIMIZATIONS

#### 10.1 Asset Loading
- **CSS**: Critical CSS inlined, rest loaded async
- **JS**: Modular approach with separate files for different functionality
- **Images**: Not used (all SVG icons and CSS backgrounds)

#### 10.2 Animation Performance
- **GPU Acceleration**: Used for transforms and opacity changes
- **Intersection Observer**: For scroll-triggered animations
- **Throttling**: Animation optimizations to prevent jank

### 11. FUNCTIONALITY REQUIREMENTS

#### 11.1 JavaScript Modules
- **navigation.js**: Mobile menu, smooth scrolling, theme toggle
- **theme.js**: Theme switching with localStorage persistence
- **animations.js**: GSAP animations with intersection observers
- **parallax.js**: Rellax parallax effects
- **validation.js**: Form validation (template)

#### 11.2 External Libraries
- **GSAP**: For advanced animations
- **Rellax**: For parallax effects
- **Loaded via CDN**: From trusted sources

#### 11.3 Local Storage
- **Theme Persistence**: Saves user's theme preference
- **Data Key**: 'theme' with values 'dark', 'light', 'vibrant'

### 12. DEVELOPMENT STRUCTURE

#### 12.1 File Organization
```
/workspace/
├── css/
│   ├── main.css        # Core styles and variables
│   ├── theme.css       # Theme variables and system
│   ├── sections.css    # Section-specific styles
│   ├── responsive.css  # Mobile and responsive styles
│   └── animations.css  # CSS animations
├── js/
│   ├── main.js         # Main initialization
│   ├── navigation.js   # Navigation functionality
│   ├── theme.js        # Theme management
│   ├── animations.js   # GSAP animations
│   ├── parallax.js     # Rellax effects
│   └── validation.js   # Form validation
└── index.html          # Main HTML file
```

#### 12.2 HTML Structure Requirements
- **SVG Sprite**: At the top of body, hidden
- **Mobile Navigation**: Fixed bottom bar
- **Full Menu**: Slide-up menu with categories
- **Sections**: Proper IDs for smooth scrolling
- **Decorative Elements**: Positioned absolutely with z-index management

### 13. CUSTOMIZATION GUIDELINES

#### 13.1 Adding New Sections
- Create section with unique ID
- Add corresponding navigation item
- Ensure responsive behavior
- Include parallax elements if appropriate
- Add to mobile navigation if needed

#### 13.2 Adding New Icons
- Add to SVG sprite as new <symbol>
- Use CSS variables for color theming
- Maintain consistent style
- Test across all themes

#### 13.3 Theme Modifications
- Update CSS variables in theme.css
- Ensure contrast ratios meet accessibility standards
- Test all interactive elements
- Verify icon color changes

### 14. MAINTENANCE REQUIREMENTS

#### 14.1 Regular Testing
- Cross-browser compatibility
- Mobile device testing
- Accessibility compliance
- Performance monitoring

#### 14.2 Documentation Updates
- Update README when making major changes
- Maintain AI agent instructions
- Keep file structure documentation current

### 15. AI AGENT IMPLEMENTATION INSTRUCTIONS

When implementing this design system:

1. **Start with HTML structure**: Create main sections with proper IDs
2. **Implement theme system first**: CSS variables and theme switching
3. **Add mobile navigation**: Bottom bar with 5 icons as specified
4. **Create responsive grid**: CSS Grid with appropriate breakpoints
5. **Add animations**: GSAP animations with scroll triggers
6. **Implement parallax**: Rellax library for depth effects
7. **Test accessibility**: Ensure all requirements are met
8. **Optimize performance**: Minimize render-blocking resources

**What NOT to change:**
- Mobile navigation structure and functionality
- Theme variable system
- Core animation patterns
- SVG sprite implementation
- Z-index layering system

This design system creates a modern, accessible, performant website with a strong visual identity that works across all devices and supports multiple themes while maintaining excellent user experience.