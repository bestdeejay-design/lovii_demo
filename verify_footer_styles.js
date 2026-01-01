// Скрипт для проверки корректности подключения стилей футера
console.log('Проверка подключения стилей футера...');

// Проверяем, что CSS-классы футера существуют
const footer = document.querySelector('.footer');
if (footer) {
    console.log('✓ Футер найден на странице');
    
    // Проверяем наличие секций
    const footerSections = document.querySelectorAll('.footer-section');
    console.log(`✓ Найдено ${footerSections.length} секций в футере`);
    
    // Проверяем, что кнопки аккордеона существуют
    const accordionButtons = document.querySelectorAll('.footer-section-title');
    console.log(`✓ Найдено ${accordionButtons.length} кнопок аккордеона`);
    
    // Проверяем, что контент секций существует
    const sectionContents = document.querySelectorAll('.footer-section-content');
    console.log(`✓ Найдено ${sectionContents.length} контейнеров контента секций`);
    
    // Проверяем, что функция инициализации аккордеона существует
    if (typeof initializeFooterAccordion === 'function') {
        console.log('✓ Функция инициализации аккордеона найдена');
    } else {
        console.error('✗ Функция инициализации аккордеона не найдена');
    }
    
    // Проверяем, что ARIA-атрибуты корректно установлены
    accordionButtons.forEach((button, index) => {
        const ariaExpanded = button.getAttribute('aria-expanded');
        if (ariaExpanded !== null) {
            console.log(`✓ Кнопка аккордеона ${index + 1} имеет корректный ARIA-атрибут: aria-expanded="${ariaExpanded}"`);
        } else {
            console.error(`✗ Кнопка аккордеона ${index + 1} не имеет атрибута aria-expanded`);
        }
    });
    
} else {
    console.error('✗ Футер не найден на странице');
}

// Проверяем медиа-запросы (это можно проверить только на уровне стилей, но мы можем проверить, что элементы имеют соответствующие классы)
console.log('Проверка завершена.');