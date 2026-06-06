# Проект "Лови" - цифровой оператор лояльности для микробизнеса

## Общая информация

**Название проекта:** Лови - цифровой оператор лояльности для микробизнеса
**Тип проекта:** SaaS-платформа и оператор баллов лояльности
**Целевая аудитория:** микробизнес, поставщики, франчайзи, инвесторы

## Текущая структура сайта

### Основные файлы
- `index.html` - главная страница с полным описанием проекта
- `presentation.html` - презентационный контент для инвесторов
- `graphics_section.html` - секция для графических материалов с соотношением сторон 16:9
- `css/` - стилевые файлы (main.css, responsive.css, sections.css, animations.css, theme.css, graphics.css)
- `js/` - скриптовые файлы (main.js, navigation.js, animations.js, parallax.js, theme.js, validation.js)
- `modules/side-nav/` - модуль боковой навигации
- `img/` - каталог с изображениями для графических материалов
- `analysis.md` - анализ отзывчивости presentation.html
- `graphics_sections_readme.md` - документация по графическим секциям

### Основные разделы сайта
- Главная (hero section)
- Метрики/показатели эффективности
- Каталог товаров и услуг
- Для микробизнеса (с тарифами)
- О проекте
- Возможности платформы
- Франшиза "Город Лови"
- Для поставщиков
- Партнёрская программа
- Помощь и поддержка
- Контакты
- Документы
- Графические материалы (в отдельном файле graphics_section.html)

## Основные возможности

### Позитивные аспекты:
- Четкое позиционирование бренда как SaaS-платформы и оператора баллов лояльности
- Современный дизайн с поддержкой темной/светлой/яркой тем
- Анимации и параллакс-эффекты для повышения вовлеченности
- Адаптивная верстка для мобильных устройств
- Четкая навигация по основным разделам
- Логическая последовательность подачи информации
- Разделение на якорные блоки для удобства навигации
- Наличие отдельной презентации для инвесторов
- Четкое разделение на целевые аудитории: микробизнес, поставщики, франчайзи
- Присутствие контактной информации и формы обратной связи
- Акцент на локальной экономике и поддержке местного бизнеса
- Наличие раздела с метриками и показателями эффективности
- Поддержка переключения тем (dark/light/vibrant)
- Поддержка режима ограниченной подвижности (prefers-reduced-motion)
- Наличие боковой навигации для десктопных устройств
- Использование современных библиотек (GSAP для анимаций, Rellax для параллакса)
- Графические секции с соотношением сторон 16:9 для визуального контента
- Улучшенная мобильная адаптация с оптимизированными сенсорными элементами
- Оптимизация сложных макетов для лучшего отображения на мобильных устройствах

### Технические особенности:
- Используется CSS Grid и Flexbox для адаптивного дизайна
- Поддержка SVG-спрайтов для иконок
- Использование CSS-переменных для темизации
- Анимации при загрузке и при прокрутке
- Параллакс-эффекты для элементов
- Плавная навигация по якорям
- Сохранение выбранной темы в localStorage
- Поддержка различных размеров экранов
- Минимальные размеры интерактивных элементов для удобства на мобильных устройствах
- Графические секции с соотношением сторон 16:9
- Улучшенная мобильная адаптация с оптимизированными размерами сенсорных элементов
- Оптимизация сложных макетов для мобильных экранов

## Как работает сайт и его компоненты

### Навигация
- **Мобильная навигация:** 5 иконок внизу экрана (home, catalog, business, about, more)
- **Полноэкранное меню:** открывается по нажатию на "Еще" (more), содержит категории с якорными ссылками
- **Якорная навигация:** все ссылки ведут к соответствующим секциям на той же странице
- **Боковая навигация:** появляется при прокрутке на десктопных устройствах, скрыта на мобильных

### Темизация
- Три темы: темная (по умолчанию), светлая и яркая
- Выбор темы сохраняется в localStorage
- Кнопка переключения темы в полноэкранном меню

### Анимации и эффекты
- GSAP используется для анимаций заголовков, кнопок и карточек
- Параллакс-эффекты с помощью библиотеки Rellax
- Анимации при прокрутке с использованием IntersectionObserver
- Плавные переходы между состояниями

### Структура секций
- Каждая секция имеет уникальный ID для якорной навигации
- Секции содержат заголовки, подзаголовки, карточки и контент
- Используется сетка карточек с различными эффектами
- Присутствуют декоративные элементы (круги, градиенты)

### Мобильная адаптация
- Специальное мобильное меню внизу экрана
- Адаптация сеток под мобильные устройства
- Увеличенные размеры интерактивных элементов (min-height: 50px)
- Медиа-запросы для экранов до 480px
- Автоматическое закрытие меню при клике на ссылки

### Формы
- Форма обратной связи в разделе "Контакты"
- Подготовлена заготовка для валидации форм (validation.js)

## Инструкции для ИИ агента

Ниже приведены полные инструкции для ИИ агента, используемые при внесении изменений в сайт:

```
AI AGENT GUIDE:
1. Mobile navigation works as follows:
   - Bottom bar with 5 icons: home, catalog, business, about, more
   - First four icons navigate to sections
   - 'more' icon opens full-menu (slide-up from bottom)
   - Full-menu contains additional links and theme toggle
   - Mobile navigation is preserved on all screen sizes below 768px
2. Adding new icons:
   - Add new <symbol> to the SVG sprite
   - Each icon must support color variations for all three themes
   - Use CSS variables like fill="var(--icon-color)" for theme compatibility
   - Icons should be available in three color versions for dark/light/vibrant themes
3. What NOT to change:
   - Order of mobile navigation buttons (home, catalog, business, about, more)
   - Core mobile navigation functionality (it's excellent as is)
   - Theme structure and localStorage implementation
   - Core navigation functionality
4. Adding new sections:
   - Create new section with unique ID
   - Add corresponding navigation item
   - Update mobile navigation if needed
   - Ensure section is responsive and works with parallax effects
5. Modern design elements:
   - Asymmetrical layouts using section-wrapper
   - Staggered card grids using CSS grid with special positioning
   - Decorative elements (circles, gradients) for visual interest
   - Animated buttons with hover effects
   - Gradient text and backgrounds
   - Enhanced card hover animations with rotation
   - Animated background elements with CSS keyframes
6. External libraries:
   - GSAP (GreenSock Animation Platform) for animations: https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js
   - Rellax for parallax effects: https://cdn.jsdelivr.net/npm/rellax@1.12.1/rellax.min.js
   - Both libraries are loaded from CDN
   - If experiencing script errors, clear browser cache or try different CDN versions
7. Mobile optimization requirements:
   - All interactive elements should have minimum 44px touch target size
   - Use min-height: 50px for buttons and navigation items
   - Optimize complex grid layouts for single-column display on mobile
   - Use @media (max-width: 480px) for very small screens
   - Adjust padding and font sizes for better readability on small screens
   - Ensure all content remains accessible when grid layouts change
   - Graphics sections should maintain 16:9 aspect ratio using padding-top technique
8. Mobile menu behavior:
   - Full menu (opened by 'more' icon) should automatically close when clicking on menu links
   - Menu links should maintain smooth scrolling navigation functionality
   - Menu should also close when clicking outside or using the close button
```

## Структура файлов проекта

```
/workspace/
├── CNAME
├── README.md
├── analysis.md
├── audit_report.md
├── css/
│   ├── animations.css
│   ├── graphics.css
│   ├── main.css
│   ├── responsive.css
│   ├── sections.css
│   └── theme.css
├── design_system_prompt.md
├── graphics_section.html
├── graphics_sections_readme.md
├── gsap.min.js
├── img/
│   ├── generated_image_*.png (multiple image files)
├── index.html
├── js/
│   ├── animations.js
│   ├── main.js
│   ├── navigation.js
│   ├── parallax.js
│   ├── theme.js
│   └── validation.js
├── modules/
│   └── side-nav/
│       ├── side-nav.css
│       ├── side-nav.html
│       └── side-nav.js
├── presentation.html
└── rellax.min.js
```

### Файлы CSS

- `main.css` - Основные стили проекта, включая переменные тем, базовые стили, заголовки и футер
- `responsive.css` - Стили для адаптивности и мобильной навигации
- `sections.css` - Стили для секций и карточек
- `animations.css` - CSS анимации
- `theme.css` - Переменные тем и стили для режима ограниченной подвижности
- `graphics.css` - Стили для графических секций с соотношением сторон 16:9

### Файлы JavaScript

- `main.js` - Основной файл инициализации
- `navigation.js` - Логика навигации и меню
- `animations.js` - GSAP анимации
- `parallax.js` - Параллакс эффекты с использованием Rellax
- `theme.js` - Управление переключением тем
- `validation.js` - Валидация форм (заготовка)

### Используемые библиотеки

- GSAP (GreenSock Animation Platform) - для анимаций
- Rellax.js - для параллакс эффектов

### Особенности реализации

- Поддержка трех тем: темная, светлая и яркая
- Адаптивный дизайн для мобильных устройств
- Анимации при прокрутке
- Поддержка режима ограниченной подвижности (prefers-reduced-motion)
- Плавная навигация по якорям
- Интерактивное меню
- Боковая навигация для десктопных устройств