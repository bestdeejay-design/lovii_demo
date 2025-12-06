# Site Structure Analysis and Optimization Plan

## Current State

### Templates Found:
1. `/workspace/templates/base.html` - Main template with placeholders `{{ title }}`, `{{ content }}`, and `{{ scripts }}`
2. `/workspace/template.html` - A separate template (seems to be a demo template)

### Pages Using Template Structure (Common Layout):
All pages except `index.html` have the same layout structure (header, off-canvas menu, footer), but they don't use the template system:
- `/workspace/about.html`
- `/workspace/business.html`
- `/workspace/buyers.html`
- `/workspace/cart.html`
- `/workspace/contacts.html`
- `/workspace/help.html`
- `/workspace/login-customer.html`
- `/workspace/login-partner.html`
- `/workspace/partners.html`
- `/workspace/privacy.html`
- `/workspace/product.html`
- `/workspace/register-customer.html`
- `/workspace/register-partner.html`
- `/workspace/terms.html`
- `/workspace/catalog/index.html`

### Pages with Custom CSS/JS:
- `/workspace/index.html` - Has embedded CSS (lines 7-361) and embedded JavaScript (lines 492-566)
- All other pages use `/workspace/css/style.css` and `/workspace/js/main.js`

## Optimization Plan

### 1. Convert index.html to use external CSS/JS
- Extract embedded CSS to the shared style.css
- Extract embedded JavaScript to the shared main.js
- Update index.html to use the template system

### 2. Convert all HTML files to use the template system
- Replace common HTML structure with template placeholders
- Create content files that will be inserted into the template

### 3. Remove duplicate template.html file
- This appears to be an unused template

### 4. Standardize all pages to use the template system