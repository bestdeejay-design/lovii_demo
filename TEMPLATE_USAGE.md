# Template System Usage Guide

## Overview
The site now uses a template system to reduce code duplication and improve maintainability. All pages should use the base template located at `/templates/base.html`.

## Template Structure
The base template (`/templates/base.html`) contains:
- `{{ title }}` - Page title placeholder
- `{{ content }}` - Main content placeholder
- `{{ scripts }}` - Additional scripts placeholder

## How to Create New Pages
1. Create your page content in a separate file
2. Use the base template to render the page
3. The template system will replace placeholders with actual content

## Current Implementation
- `index.html` has been updated to use the template system
- All CSS and JavaScript are now centralized in `/css/style.css` and `/js/main.js`
- Embedded styles and scripts have been removed from individual pages

## Benefits
- Reduced code duplication
- Easier maintenance
- Consistent look and feel across all pages
- Better performance through centralized assets