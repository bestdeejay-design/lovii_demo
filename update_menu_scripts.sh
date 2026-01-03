#!/bin/bash

# Скрипт для обновления всех HTML-файлов, чтобы они правильно подключали скрипты меню

HTML_FILES=$(find /workspace -name "*.html" -not -path "*/lovi-pwa/*" -not -name "index.html")

for file in $HTML_FILES; do
    # Проверяем, содержит ли файл подключение main-menu.js
    if ! grep -q "js/main-menu.js" "$file"; then
        echo "Обновляем файл: $file"
        
        # Заменяем подключение js/main.js на подключение всех необходимых скриптов
        sed -i 's|<script src="js/main.js"></script>|<script src="js/main-menu.js"></script>\n    <script src="js/mobile-menu.js"></script>\n    <script src="js/main.js"></script>|g' "$file"
        
        # Если файл уже содержит другие скрипты до main.js, просто добавим недостающие
        if grep -q "js/main-menu.js" "$file"; then
            echo "  Уже содержит js/main-menu.js"
        else
            echo "  Добавлены скрипты в $file"
        fi
    fi
done

echo "Все HTML-файлы обновлены!"