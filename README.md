# Modern Marketplace Website

Этот проект представляет собой современный интернет-магазин с адаптивным дизайном и модульной архитектурой.

## Особенности

- Адаптивный дизайн для десктопных и мобильных устройств
- Модульная архитектура с использованием шаблонов для хедера, футера и мобильного меню
- Темная/светлая тема с возможностью переключения
- Мобильное меню, которое выезжает сбоку и находится в правом нижнем углу экрана
- Поддержка вложенных меню

## Структура проекта

```
/workspace/
├── index.html              # Главная страница с загрузкой шаблонов
├── demo.html               # Демо-страница с примером использования шаблонов
├── styles/
│   └── main.css            # Основные стили
├── js/
│   └── main.js             # Основной JavaScript
├── templates/
│   ├── header.html         # Шаблон хедера
│   ├── footer.html         # Шаблон футера
│   └── mobile-nav.html     # Шаблон мобильного меню
└── README.md               # Документация (этот файл)
```

## Запуск проекта

Для корректной работы загрузки шаблонов через JavaScript, сайт должен быть запущен с использованием локального сервера (из-за ограничений CORS при загрузке файлов с помощью fetch).

### Способы запуска:

#### Python (версия 3.x):
```bash
cd /workspace
python3 -m http.server 8000
```

Затем откройте в браузере: http://localhost:8000

#### Node.js (если доступен):
```bash
npm install -g http-server
cd /workspace
http-server
```

## Использование шаблонов

Шаблоны могут быть использованы на других страницах следующим образом:

```html
<!-- В шапке страницы -->
<div id="header-container"></div>

<!-- Внизу страницы перед закрывающим тегом body -->
<div id="footer-container"></div>
<div id="mobile-nav-container"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    loadTemplate('templates/header.html', 'header-container');
    loadTemplate('templates/footer.html', 'footer-container');
    loadTemplate('templates/mobile-nav.html', 'mobile-nav-container');
});

function loadTemplate(url, elementId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            // Повторная инициализация JavaScript после загрузки шаблона
            if (elementId === 'mobile-nav-container') {
                initializeNewMobileNavigation();
            } else if (elementId === 'header-container') {
                initializeMobileMenu();
            }
        })
        .catch(error => console.error('Ошибка загрузки шаблона:', error));
}
</script>
```

## Технические особенности

- Все меню вынесены в отдельные шаблоны для переиспользования
- Десктопное меню компактное, без вложенности
- Мобильное меню выезжает сбоку и содержит вложенные разделы
- Бургер-меню находится в правом нижнем углу экрана, а не в хедере
- Стили адаптированы для различных размеров экранов

## Совместимость

Проект совместим со всеми современными браузерами, включая Chrome, Firefox, Safari и Edge.