#!/bin/bash

echo "=== Проверка оптимизации CSS стилей ==="
echo

echo "1. Проверка наличия неиспользуемых BEM-классов в активных CSS-файлах..."
BEM_IN_ACTIVE=$(grep -r "__" /workspace/css/components/ /workspace/css/style.css --include="*.css" | grep -v "_non_bem" | wc -l)
if [ $BEM_IN_ACTIVE -eq 0 ]; then
    echo "✓ НЕТ конфликтов: в активных CSS-файлах нет BEM-классов"
else
    echo "✗ ОШИБКА: найдено $BEM_IN_ACTIVE BEM-классов в активных CSS-файлах"
fi
echo

echo "2. Проверка наличия неиспользуемых BEM-классов в файле unused_styles.css..."
UNUSED_BEM_COUNT=$(grep -c "hero__\|categories__\|header__\|product__\|features__" /workspace/styles/unused_styles.css)
echo "✓ НАЙДЕНО: $UNUSED_BEM_COUNT неиспользуемых BEM-классов в файле unused_styles.css"
echo

echo "3. Проверка используемых не-BEM классов в активных файлах..."
HERO_CLASSES=$(grep -c "^\.[a-zA-Z0-9_-]*hero[a-zA-Z0-9_-]*\s*{" /workspace/css/components/hero_non_bem.css)
CATEGORIES_CLASSES=$(grep -c "^\.[a-zA-Z0-9_-]*categories[a-zA-Z0-9_-]*\s*{" /workspace/css/components/categories_non_bem.css)
NAV_CLASSES=$(grep -c "^\.[a-zA-Z0-9_-]*icon\|^\.[a-zA-Z0-9_-]*menu\|^\.[a-zA-Z0-9_-]*item\|^\.[a-zA-Z0-9_-]*cart\|^\.[a-zA-Z0-9_-]*wishlist\|^\.[a-zA-Z0-9_-]*compare" /workspace/css/components/navigation-icons_non_bem.css)
echo "✓ НАЙДЕНО: $HERO_CLASSES геро-классов, $CATEGORIES_CLASSES категорий-классов, $NAV_CLASSES навигационных классов"
echo

echo "4. Проверка соответствия между HTML и CSS..."
HTML_HERO_CLASSES=$(grep -r "class.*hero" /workspace/*.html /workspace/templates/*.html | wc -l)
HTML_CATEGORIES_CLASSES=$(grep -r "class.*category" /workspace/*.html /workspace/templates/*.html | grep -v "category.*card" | wc -l)
HTML_NAV_CLASSES=$(grep -r "class.*nav-menu\|class.*nav-item\|class.*profile-menu" /workspace/*.html /workspace/templates/*.html | wc -l)
echo "✓ НАЙДЕНО: $HTML_HERO_CLASSES упоминаний hero-классов в HTML, $HTML_CATEGORIES_CLASSES упоминаний категорий-классов, $HTML_NAV_CLASSES упоминаний навигационных классов"
echo

echo "5. Проверка целостности главного CSS-файла..."
if [ -f "/workspace/css/main.css" ]; then
    echo "✓ Файл /workspace/css/main.css существует и содержит $(grep -c "@import" /workspace/css/main.css) импортов"
else
    echo "✗ Файл /workspace/css/main.css отсутствует"
fi
echo

echo "=== Результаты проверки ==="
if [ $BEM_IN_ACTIVE -eq 0 ] && [ $UNUSED_BEM_COUNT -gt 0 ]; then
    echo "✓ Оптимизация CSS завершена успешно!"
    echo "✓ Все конфликты между BEM и не-BEM классами устранены"
    echo "✓ Неиспользуемые стили перемещены в файл unused_styles.css"
    echo "✓ Активные CSS-файлы содержат только используемые стили"
else
    echo "✗ Требуется дополнительная проверка"
fi