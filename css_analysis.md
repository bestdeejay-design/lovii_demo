# Анализ CSS для B2B-платформы «Витрина»

## 1. Список неиспользуемых CSS-правил

Следующие CSS-классы определены в стилях, но не используются ни на одной HTML-странице проекта:

```
activity-banner
activity-content
activity-feed
activity-header
activity-icon
activity-item
activity-section
activity-text
activity-time
activity-timer
address-form
address-option
address-options
amount
analytics
author-avatar
author-info
breadcrumb-nav
breadcrumbs
btn-loading
btn-text
cart-actions-bottom
cart-count
cart-icon
cart-layout
cart-link
cart-product
cart-summary
cart-table
categories
categories-grid
category-card
category-checkbox
category-icon
category-item
category-label
change-location-btn
changing
checkbox-item
checkout-actions
checkout-layout
checkout-step
close-btn
compare-actions
compare-btn
compare-icon
compare-table
compare-table-container
contact-btn
contact-container
contact-content
contact-form
contact-form-container
contact-icon
contact-info
contact-info-card
contact-info-grid
contact-input
contact-section
contact-subtitle
contact-title
contact-type-btn
contact-type-selector
contact-wrapper
container
cta-btn
cta-buttons
cta-content
cta-form-container
cta-section
cta-subtitle
cta-title
cta-wrapper
current
current-price
date-picker
delivery-info
delivery-method
delivery-methods
delivery-option
delivery-options
delivery-time
description
discount-badge
dots
error
feature-card
feature-icon
feature-item
featured-products
features
features-grid
features-list
filter-btn
filter-controls
filter-group
filters-sidebar
food-layout
footer
footer-bottom
footer-content
footer-logo
footer-section
footer-section-content
footer-section-title
footer-top
form-disclaimer
form-group
form-header
form-row
form-subtitle
form-title
frequently-bought-actions
frequently-bought-grid
frequently-bought-item
frequently-bought-section
hamburger
header
header-actions
header-content
hero
hero-content
hero-image
html
image-overlay
input-feedback
input-group
item-count
item-image
item-info
light-theme
loading
loading-indicator
location-display
location-info
login-link
logo
logo-link
main-image
min-order
mission-values
mobile-menu-btn
mobile-menu-overlay
mobile-nav-button
mobile-nav-header
mobile-nav-list
mobile-nav-menu
mobile-nav-wrapper
nav-divider
nav-item
nav-link
nav-menu
new-products
offer-badge
offer-card
offer-conditions
offers-grid
option-details
option-header
order
order-info
order-item
order-items
order-status
order-summary
original-price
pagination
partner-item
partner-logo
partners-grid
payment-method
payment-methods
popular-tag
price
price-filter
price-inputs
price-slider
pricing
pricing-card
pricing-plans
product-actions
product-badge
product-card
product-compare-item
product-description
product-features
product-gallery
product-image
product-info
product-layout
product-meta
product-price
product-rating
product-sku
product-tabs
products-grid
products-layout
profile-menu
promo-code
promotions-icon
proof-item
proof-label
proof-number
pulse
purchase
quantity-btn
quantity-control
quantity-input
quick-buy-btn
quick-view-btn
rating
rating-value
recently-viewed-icon
registration
related-products
remove-btn
remove-compare-btn
reorder
restaurant-actions
restaurant-card
restaurant-details
restaurant-info
restaurant-logo
restaurant-rating
results-counter
review
review-count
review-header
review-rating
reviewer
reviews-section
sales
savings
search-bar
search-icon
section-header
seller
seller-avatar
seller-card
seller-details
seller-info
seller-rating
seller-stats
sellers-grid
show-submenu
signup-link
social-icons
social-proof
social-proof-contact
sort-and-results
sort-select
special-offers
special-offers-section
specs-table
spinner
star-rating
stars
stat
stat-item
stat-label
stat-number
stats
stats-banner
stats-grid
subcategory
submenu
success
summary-card
summary-header
summary-item
summary-totals
tab-btn
tab-content
tab-nav
tab-pane
testimonial-author
testimonial-card
testimonial-content
testimonial-item
testimonial-rating
testimonial-text
testimonials-grid
testimonials-preview
testimonials-section
theme-toggle
thumbnail
thumbnails
time-option
time-options
time-slots
top-sellers
tree-category
trending
trending-grid
trending-image
trending-info
trending-item
trust-badge
trust-badges
trust-grid
trust-icon
trust-item
trust-section
user-actions
value-card
value-icon
values-grid
view-all
wishlist-btn
wishlist-count
wishlist-icon
```

**Примечание:** Некоторые из этих классов могут использоваться в JavaScript или динамически генерироваться, поэтому требуют ручной проверки перед удалением.

## 2. Предложения по рефакторингу

### 2.1. Дублирующиеся стили

При анализе CSS-файлов были обнаружены следующие дублирующиеся или схожие стили:

#### Кнопки
В разных файлах определены похожие стили для кнопок:
- `.btn` в main.css
- `.btn-primary`, `.btn-outline` в main.css
- Схожие стили могут быть объединены в систему утилит

#### Счетчики элементов
- `.item-count` и `.cart-count`, `.wishlist-count` имеют схожие стили для отображения числа элементов

#### Иконки действий
- `.cart-icon`, `.compare-icon`, `.wishlist-icon` имеют схожие стили

#### Предложение:
Создать общие утилиты для повторяющихся паттернов:

```css
/* Общие стили для кнопок */
.btn {
  display: inline-block;
  padding: 12px 30px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  min-width: 180px;
  text-align: center;
}

.btn-primary {
  background-color: var(--accent-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--accent-hover);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(76, 175, 80, 0.2);
}

.btn-outline {
  background-color: transparent;
  color: var(--accent-color);
  border: 2px solid var(--accent-color);
}

.btn-outline:hover {
  background-color: var(--accent-color);
  color: white;
  transform: translateY(-3px);
}

/* Общие стили для иконок действий */
.action-icon {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: transparent;
  color: var(--text-primary);
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.action-icon:hover {
  background-color: var(--bg-secondary);
}

.count-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: var(--accent-color);
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
```

### 2.2. Избыточная специфичность

Некоторые селекторы имеют избыточную вложенность:

- `.header .nav-menu ul .nav-item:not(.has-submenu) > a` - можно упростить до `.nav-item:not(.has-submenu) > a`
- `.header .submenu` - можно упростить до `.submenu`
- `.header .nav-menu ul .nav-item.has-submenu > a` - можно упростить до `.nav-item.has-submenu > a`

### 2.3. Повторяющиеся паттерны

Множество схожих стилей для карточек:
- `.category-card`, `.product-card`, `.testimonial-card`, `.feature-card` и т.д.

Можно создать базовый класс `.card` и модификаторы:
```css
.card {
  background-color: var(--card-bg);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease;
}

.card--hoverable:hover {
  transform: translateY(-10px);
}
```

## 3. Рекомендации по структуре CSS

### 3.1. Разделение по функциональности

Предлагается организовать CSS-файлы следующим образом:

```
styles/
├── base/
│   ├── reset.css          # Сброс стилей
│   ├── variables.css      # CSS-переменные
│   └── typography.css     # Типографика
├── components/
│   ├── header.css         # Шапка сайта
│   ├── footer.css         # Подвал сайта
│   ├── buttons.css        # Кнопки
│   ├── cards.css          # Карточки
│   ├── forms.css          # Формы
│   └── navigation.css     # Навигация
├── utils/
│   ├── layout.css         # Сетка и позиционирование
│   ├── spacing.css        # Отступы
│   └── utilities.css      # Вспомогательные классы
└── main.css              # Импорт всех стилей
```

### 3.2. Система именования

Рекомендуется использовать БЭМ-методологию для именования классов:

```css
/* Блок */
.header {}

/* Элемент */
.header__logo {}

/* Модификатор */
.header__logo--small {}
.card--featured {}
```

### 3.3. Мобильная адаптация

Все компоненты должны быть мобильными с самого начала:
- Использовать mobile-first подход
- Минимизировать количество медиа-запросов
- Использовать гибкие сетки (flexbox, grid)

### 3.4. Дизайн-система

Для B2B-платформы «Витрина» рекомендуется:

1. **Централизовать переменные** в одном файле
2. **Создать библиотеку компонентов** с единым стилем
3. **Внедрить утилиты** для быстрой разработки
4. **Обеспечить доступность** (a11y) для всех компонентов

## 4. Заключение

Текущая CSS-структура требует рефакторинга для повышения:
- Поддерживаемости
- Масштабируемости
- Согласованности стилей
- Производительности

Рекомендуется внедрять изменения постепенно, с тестированием на всех страницах проекта.