// 
ВАЖНОЕ ПРАВИЛО ПРОЕКТА
1. Все изменения сначала фиксируются в pages.md
2. Структура проекта НЕЛЬЗЯ менять без согласования
3. Проверка перед коммитом:
   - Работает ли переключение тем?
   - Корректно ли загружаются шаблоны?
   - Нет ли внешних CDN?
   - Проходит ли валидацию HTML/CSS?
4. Все стили — только через css/main.css
5. Все скрипты — только через /js/
//

// Функция загрузки шаблона
async function loadTemplate(templatePath, elementId) {
    try {
        const response = await fetch(templatePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const templateContent = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = templateContent;
            element.classList.add('loaded');
        }
    } catch (error) {
        console.error(`Ошибка загрузки шаблона ${templatePath}:`, error);
    }
}

// Функция загрузки всех шаблонов
async function loadAllTemplates() {
    await Promise.all([
        loadTemplate('/templates/header.html', 'dynamic-header'),
        loadTemplate('/templates/footer.html', 'dynamic-footer'),
        loadTemplate('/templates/mobile-nav.html', 'dynamic-mobile-nav')
    ]);
}

// Инициализация загрузки шаблонов при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    loadAllTemplates();
});