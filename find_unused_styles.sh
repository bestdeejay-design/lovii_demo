#!/bin/bash
# Script to find CSS rules for unused classes and add them to unused_styles.css

# Empty the unused_styles.css file and add header
> /workspace/styles/unused_styles.css
echo "/* Неиспользуемые CSS-стили - перенесены из основных стилей во время оптимизации */" >> /workspace/styles/unused_styles.css
echo "/* Эти стили были найдены в CSS-файлах, но не используются в HTML-файлах */" >> /workspace/styles/unused_styles.css
echo "/* Они сохранены здесь на случай, если они понадобятся в будущем */" >> /workspace/styles/unused_styles.css
echo "" >> /workspace/styles/unused_styles.css

# Loop through each unused class and find its CSS rules
while IFS= read -r class; do
  if [ -n "$class" ]; then
    echo "Ищем стили для класса: .$class"
    # Find CSS rules containing this class in all CSS files
    for css_file in $(find /workspace -name "*.css" -not -path "*/unused_styles.css" -not -path "*/actually_unused_styles.css"); do
      # Search for the class in the CSS file
      if grep -q "\.$class" "$css_file"; then
        echo "/* Найдено в файле: $css_file */" >> /workspace/styles/unused_styles.css
        # Use grep with context to extract CSS rules
        # Find patterns like .class-name { ... } including multi-line rules
        grep -A 50 -B 1 "\.$class" "$css_file" | sed -n '/{/,/}/p' | head -n -0 >> /workspace/styles/unused_styles.css
      fi
    done
  fi
done < /workspace/unused_css_classes.txt

echo "Поиск неиспользуемых стилей завершен."
