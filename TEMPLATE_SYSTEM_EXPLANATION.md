# Template System for Витрина Website

## Overview
The Витрина website uses a simple template system to maintain consistency across all pages. This system ensures that all pages have the same header, footer, navigation, and styling while allowing unique content for each page.

## File Structure
- `/templates/base.html` - Main template with header, footer, navigation, and common elements
- `/*_content.html` - Individual content files for each page
- `render_templates.py` - Python script to generate final HTML pages

## How the Template System Works

### 1. Base Template (`/templates/base.html`)
The base template contains:
- Complete HTML structure
- Header with navigation menu
- Footer with links
- CSS and JavaScript includes
- Template variables:
  - `{{ title }}` - Page title
  - `{{ content }}` - Page-specific content
  - `{{ theme_class }}` - Theme class (default: dark-theme)
  - `{{ scripts }}` - Additional scripts

### 2. Content Files
Each page has a corresponding content file:
- `index_content.html` → `index.html`
- `about_content.html` → `about.html`
- `business_content.html` → `business.html`
- etc.

### 3. Template Variables
- `{{ title }}` - Gets the title from render_templates.py
- `{{ content }}` - Gets the content from the respective content file
- `{{ theme_class|default('dark-theme') }}` - Theme class with default value
- `{{ scripts }}` - Additional scripts if needed

## Regenerating Pages
To regenerate all pages after making changes to the template or content files:
```bash
python render_templates.py
```

## Key Improvements Made
1. **Consistent Header/Footer**: Added container divs to ensure consistent layout across all pages
2. **Fixed CSS Links**: Added style_fixed.css to all pages
3. **Proper Title Generation**: Fixed title duplication issue
4. **Responsive Navigation**: Ensured all pages have the same navigation structure
5. **Consistent Styling**: All pages now use the same CSS files and structure

## Pages Generated
- index.html
- about.html
- business.html
- buyers.html
- contacts.html
- help.html
- login-customer.html
- login-partner.html
- partners.html
- privacy.html
- register-customer.html
- register-partner.html
- terms.html
- catalog/index.html
- food-delivery/index.html

## Benefits
- **Consistency**: All pages have the same look and feel
- **Maintainability**: Changes to header/footer affect all pages automatically
- **Efficiency**: Only content needs to be updated for individual pages
- **Scalability**: Easy to add new pages following the same pattern