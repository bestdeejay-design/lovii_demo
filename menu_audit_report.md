# Аудит основного меню

## Обнаруженные проблемы

1. **Несоответствие в подключении скриптов**:
   - Только `index.html` подключает `js/main-menu.js` и `js/mobile-menu.js`
   - Все остальные страницы подключают только `js/main.js`

2. **Несоответствие в шаблонах заголовка**:
   - `index.html` использует `templates/new_header.html`
   - Все остальные страницы используют `templates/header.html`

3. **Несоответствие в инициализации меню**:
   - Только `index.html` вызывает `setTimeout(initializeMainMenu, 10)` после загрузки шаблона заголовка
   - Все остальные страницы не вызывают `initializeMainMenu()`

## Страницы, где меню работает корректно:
- index.html

## Страницы, где меню не работает:
- 404.html
- about.html
- adapted_header.html
- advertising.html
- api-docs.html
- api-integration.html
- become-supplier.html
- blog.html
- business.html
- cart.html
- checkout.html
- compare.html
- contacts.html
- documents.html
- faq.html
- food.html
- franchise.html
- header_variants.html
- help-buyers.html
- help-suppliers.html
- how-to-order.html
- index-business.html
- investors.html
- jobs.html
- login.html
- partnership.html
- pricing.html
- product.html
- products.html
- products_new.html
- promotions.html
- pvz.html
- recently-viewed.html
- register-supplier.html
- returns.html
- search.html
- supplier-dashboard.html
- suppliers.html
- support.html
- team.html
- test_desktop_menu.html
- test_main_menu.html
- test_menu.html
- training.html
- wishlist.html

## Рекомендации по исправлению

1. Обновить все HTML-файлы, чтобы:
   - Подключать `js/main-menu.js` и `js/mobile-menu.js`
   - Вызывать `initializeMainMenu()` после загрузки шаблона заголовка
   - Лучше всего использовать единый шаблон заголовка (`templates/new_header.html`) для всех страниц

2. Альтернативно, можно обновить все страницы, чтобы использовать единый подход к инициализации меню.