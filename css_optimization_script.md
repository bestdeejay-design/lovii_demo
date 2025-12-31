# Скрипт оптимизации CSS проекта

## Шаг 1: Полный аудит всех CSS-файлов

### 1.1. Сбор всех CSS-селекторов
- Просканировать все CSS-файлы в проекте
- Извлечь все CSS-селекторы и сгруппировать по файлам
- Создать список всех используемых классов, ID и других селекторов

### 1.2. Сопоставление с HTML-файлами
- Просканировать все HTML-файлы в проекте
- Извлечь все CSS-классы, используемые в HTML
- Сопоставить CSS-селекторы с HTML-классами

## Шаг 2: Выявление конфликтов

### 2.1. Поиск одинаковых селекторов в разных файлах
- Найти дублирующиеся селекторы в разных CSS-файлах
- Определить приоритеты на основе специфичности CSS

### 2.2. Поиск конфликтующих стилей
- Найти стили, которые могут конфликтовать при наложении
- Определить порядок импорта и приоритеты

## Шаг 3: Определение неиспользуемых стилей

### 3.1. Стили без соответствующих HTML-элементов
- Все CSS-селекторы, не найденные в HTML-файлах, пометить как неиспользуемые
- Исключить стили, которые могут использоваться в JavaScript

### 3.2. Устаревшие и дублирующие стили
- Стили, которые дублируют другие стили с незначительными отличиями
- Стили, которые были заменены более новыми версиями

## Шаг 4: Оптимизация и перенос

### 4.1. Создание файла unused_styles.css
- Перенести все неиспользуемые стили в `/workspace/styles/unused_styles.css`
- Добавить комментарии с объяснением, почему стили не используются
- Организовать по категориям и источникам

### 4.2. Оптимизация оставшихся стилей
- Объединить дублирующиеся стили
- Использовать CSS-переменные для повторяющихся значений
- Оптимизировать структуру файлов

## Шаг 5: Карта изменений по страницам

### 5.1. Анализ влияния на каждую страницу
- Для каждой HTML-страницы определить затронутые стили
- Записать, какие стили были изменены, удалены или добавлены
- Проверить корректность отображения после изменений

## Реализация скрипта:

### Сканирование CSS-файлов:
```bash
# Найти все CSS-файлы
find /workspace -name "*.css" -not -path "*/unused_styles.css" -not -path "*/actually_unused_styles.css"

# Извлечь все CSS-селекторы
grep -oE '\.[a-zA-Z][a-zA-Z0-9_-]*' /workspace/css/**/*.css /workspace/styles/**/*.css | sort | uniq
```

### Сканирование HTML-файлов:
```bash
# Найти все HTML-файлы
find /workspace -name "*.html" -not -path "*/node_modules/*" -not -path "*/.git/*"

# Извлечь все классы из HTML
grep -oE 'class="[^"]*"' /workspace/*.html /workspace/**/*.html | grep -oE '\w+' | sort | uniq
```

## План действий:

1. Создать резервные копии всех CSS-файлов
2. Провести сканирование и анализ
3. Определить неиспользуемые стили
4. Перенести неиспользуемые стили в отдельный файл
5. Оптимизировать оставшиеся стили
6. Протестировать все страницы
7. Составить карту изменений
8. Документировать результаты

## Файлы для обработки:

### CSS файлы:
- /workspace/css/base/reset.css
- /workspace/css/base/typography.css
- /workspace/css/base/variables.css
- /workspace/css/components/buttons.css
- /workspace/css/components/categories.css
- /workspace/css/components/categories_non_bem.css
- /workspace/css/components/features.css
- /workspace/css/components/forms.css
- /workspace/css/components/header.css
- /workspace/css/components/hero.css
- /workspace/css/components/hero_non_bem.css
- /workspace/css/components/navigation-icons.css
- /workspace/css/components/navigation-icons_non_bem.css
- /workspace/css/components/products.css
- /workspace/css/components/theme-toggle.css
- /workspace/css/utils/layout.css
- /workspace/css/style.css
- /workspace/css/main.css
- /workspace/styles/main.css
- /workspace/styles/main_menu_styles.css

### HTML файлы для анализа:
- /workspace/*.html
- /workspace/templates/*.html

## Ожидаемые результаты:

1. Оптимизированная структура CSS-файлов
2. Файл unused_styles.css с неиспользуемыми стилями
3. Карта изменений по страницам
4. Устраненные конфликты и дубликаты
5. Улучшенная производительность и читаемость кода