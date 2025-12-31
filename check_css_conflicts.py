#!/usr/bin/env python3
"""
Скрипт для проверки подключений CSS и шаблонов на страницах сайта
с целью выявления потенциальных конфликтов
"""

import os
import re
from bs4 import BeautifulSoup

def find_all_html_files(directory):
    """Находит все HTML файлы в директории"""
    html_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    return html_files

def extract_css_links(soup):
    """Извлекает все подключения CSS из HTML"""
    css_links = []
    # Поиск тегов link с типом css
    for link in soup.find_all('link', {'rel': 'stylesheet'}):
        href = link.get('href')
        if href:
            css_links.append(href)
    
    # Поиск тегов style
    for style in soup.find_all('style'):
        if style.string:
            css_links.append('inline-style')
    
    # Поиск подключений CSS через теги link с rel="preload" для стилей
    for link in soup.find_all('link', {'rel': 'preload', 'as': 'style'}):
        href = link.get('href')
        if href:
            css_links.append(f'preload: {href}')
    
    return css_links

def extract_template_includes(soup):
    """Извлекает подключения шаблонов"""
    includes = []
    
    # Поиск подключений через JavaScript (например, loadTemplate)
    scripts = soup.find_all('script')
    for script in scripts:
        if script.string:
            # Проверяем наличие вызовов подключения шаблонов
            if 'loadTemplate' in script.string:
                matches = re.findall(r"loadTemplate\(['\"]([^'\"]+)['\"].*?\)", script.string)
                includes.extend(matches)
            
            # Проверяем на наличие других шаблонизаторов
            if 'mustache' in script.string.lower() or 'handlebars' in script.string.lower():
                includes.append('mustache/handlebars template')
            
            # Проверяем на включения через jQuery
            if 'load(' in script.string or 'get(' in script.string:
                matches = re.findall(r"[.\w]+load\(['\"]([^'\"]+)['\"].*?\)", script.string)
                includes.extend(matches)
    
    # Поиск включения шаблонов в data-атрибутах
    for element in soup.find_all(attrs={'data-template': True}):
        includes.append(f"data-template: {element.get('data-template')}")
    
    return includes

def analyze_file(filepath):
    """Анализирует один HTML файл"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        soup = BeautifulSoup(content, 'html.parser')
        
        css_links = extract_css_links(soup)
        templates = extract_template_includes(soup)
        
        return {
            'file': filepath,
            'css': css_links,
            'templates': templates
        }
    except Exception as e:
        return {
            'file': filepath,
            'error': str(e),
            'css': [],
            'templates': []
        }

def main():
    # Проверяем текущую директорию
    html_files = find_all_html_files('.')
    
    print(f"Найдено {len(html_files)} HTML файлов для анализа\n")
    
    all_results = []
    for html_file in html_files:
        result = analyze_file(html_file)
        all_results.append(result)
        
        print(f"=== Файл: {result['file']} ===")
        if 'error' in result:
            print(f"Ошибка: {result['error']}\n")
            continue
            
        if result['css']:
            print("CSS файлы:")
            for css in result['css']:
                print(f"  - {css}")
        else:
            print("CSS файлы: не найдены")
            
        if result['templates']:
            print("Шаблоны:")
            for template in result['templates']:
                print(f"  - {template}")
        else:
            print("Шаблоны: не найдены")
        
        print()
    
    # Анализ потенциальных конфликтов
    print("=== АНАЛИЗ ПОТЕНЦИАЛЬНЫХ КОНФЛИКТОВ ===")
    
    all_css = []
    all_templates = []
    
    for result in all_results:
        if 'error' not in result:
            all_css.extend([(css, result['file']) for css in result['css']])
            all_templates.extend([(template, result['file']) for template in result['templates']])
    
    # Проверка дублирующихся CSS
    css_counts = {}
    for css, file in all_css:
        if css not in css_counts:
            css_counts[css] = []
        css_counts[css].append(file)
    
    print("\nДублирующиеся CSS файлы:")
    duplicates_found = False
    for css, files in css_counts.items():
        if len(files) > 1:
            print(f"  {css}: используется на {len(files)} страницах - {', '.join(files)}")
            duplicates_found = True
    
    if not duplicates_found:
        print("  Не найдено")
    
    # Проверка разных CSS на разных страницах
    print(f"\nВсего уникальных CSS файлов: {len(set([css for css, _ in all_css]))}")
    print(f"Всего уникальных шаблонов: {len(set([template for template, _ in all_templates]))}")
    
    return all_results

if __name__ == "__main__":
    main()