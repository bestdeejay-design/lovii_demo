# Отчет о унификации hero-секции

## Цель
Удалить индивидуальные стили и фоны у секции hero для разных страниц, обеспечив единообразие визуального оформления.

## Что было сделано
1. Проведен анализ всех HTML-файлов в проекте на наличие hero-секций
2. Выявлены файлы, содержащие дополнительные классы hero (hero--how-to-order, hero--business, hero--investors и т.д.)
3. Удалены все дополнительные классы hero--* из следующих файлов:
   - /workspace/how-to-order.html
   - /workspace/index-business.html
   - /workspace/investors.html
   - /workspace/jobs.html
   - /workspace/promotions.html
   - /workspace/pvz.html
   - /workspace/returns.html
   - /workspace/suppliers.html
   - /workspace/support.html
   - /workspace/team.html
   - /workspace/test_hero_fix.html

## Результат
- Все страницы теперь используют единый класс `hero` без дополнительных модификаторов
- Визуальный стиль hero-секции теперь единообразен на всех страницах
- Упрощена поддержка кода - теперь изменения стилей hero-секции будут применяться ко всем страницам
- Убраны неиспользуемые CSS-классы, что улучшает читаемость кода

## Технические детали
- Используется общий CSS-файл `/workspace/css/components/hero.css`
- Все hero-секции теперь имеют одинаковое оформление
- Удалены потенциальные причины несогласованного отображения элементов