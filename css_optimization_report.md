# Отчет об оптимизации CSS проекта

## Общая статистика

- Всего CSS-классов в HTML: 802
- Всего CSS-селекторов в файлах: 393
- Неиспользуемых CSS-классов: 93
- Используемых CSS-классов: 300

## Анализ неиспользуемых CSS-классов

### 1. BEM-классы, не используемые в HTML
- `categories__card`
- `categories__card-item`
- `categories__card-list`
- `categories__card-title`
- `categories__grid`
- `categories__icon`
- `categories__title`
- `features__card`
- `features__description`
- `features__grid`
- `features__icon`
- `features__list`
- `features__list-item`
- `features__step`
- `features__title`
- `header__container`
- `header__logo`
- `header__logo-link`
- `header__main-menu`
- `header__nav-item`
- `header__nav-menu`
- `header__profile-link`
- `header__profile-menu`
- `header__submenu`
- `product__actions`
- `product__badge`
- `product__badge--eco`
- `product__badge--featured`
- `product__badge--popular`
- `product__badge--sale`
- `product__card`
- `product__image`
- `product__info`
- `product__meta`
- `product__price`
- `product__rating`
- `products__grid`

### 2. Устаревшие или дублирующие классы
- `btn_loading` (должен быть `btn-loading`)
- `btn_text` (должен быть `btn-text`)
- `cart__count` (должен быть `cart-count`)
- `wishlist__count` (должен быть `wishlist-count`)
- `cta__btn` (должен быть `cta-btn`)
- `cta__form` (должен быть `cta-form`)

### 3. Классы, относящиеся к другим компонентам
- `light-theme` (класс для темизации)
- `html`, `css` (глобальные селекторы)
- `form` (глобальный селектор)
- `order` (класс для заказов)
- `analytics` (классы для аналитики)
- `sales` (классы для продаж)
- `top-sellers` (классы для топ продавцов)
- `new-products` (классы для новых продуктов)

## Рекомендации по оптимизации

### 1. Перенос неиспользуемых стилей
Все 93 неиспользуемых CSS-класса должны быть перенесены в файл `/workspace/styles/unused_styles.css`

### 2. Исправление конфликтов
- Удалить дублирующие BEM-классы, которые не используются в HTML
- Оставить только те классы, которые используются в HTML-файлах
- Объединить дублирующие стили

### 3. Оптимизация оставшихся стилей
- Использовать CSS-переменные для повторяющихся значений
- Объединить похожие стили
- Удалить дубликаты

## Карта изменений по страницам

### Главная страница (index.html)
- Использует классы: `hero`, `container`, `hero-content`, `hero-image`, `hero-img` и др.
- Убедиться, что все основные компоненты отображаются корректно

### Страницы категорий
- Используют классы: `categories`, `categories-grid`, `category-card` и др.
- Убедиться, что сетка категорий работает корректно

### Страницы товаров
- Используют классы: `product-card`, `product-image`, `product-info` и др.
- Убедиться, что карточки товаров отображаются корректно

## План реализации

1. Создать резервные копии всех CSS-файлов
2. Перенести неиспользуемые стили в unused_styles.css
3. Обновить используемые CSS-файлы, удалив неиспользуемые стили
4. Проверить отображение всех страниц
5. Оптимизировать оставшиеся стили
6. Создать документацию по изменениям