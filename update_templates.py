#!/usr/bin/env python3

import os
import re

# List of files to update
files_to_update = [
    "404.html",
    "advertising.html",
    "api-docs.html",
    "become-supplier.html",
    "blog.html",
    "documents.html",
    "franchise.html",
    "help-buyers.html",
    "help-suppliers.html",
    "how-to-order.html",
    "investors.html",
    "jobs.html",
    "login.html",
    "promotions.html",
    "returns.html",
    "support.html",
    "team.html"
]

def update_html_file(filepath):
    """Update a single HTML file to use JavaScript template loading instead of includes"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Backup original
    backup_path = filepath + '.bak'
    with open(backup_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    # Update head section: add viewport, keywords, favicon, update font awesome version
    # Add viewport meta tag after charset
    content = re.sub(r'(<meta charset="UTF-8">)', r'\1\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">', content)
    
    # Add keywords meta tag after description if not already present
    if '<meta name="keywords"' not in content:
        content = re.sub(r'(<meta name="description"[^>]*>)', r'\1\n    <meta name="keywords" content="ваш, список, ключевых, слов">', content)
    
    # Replace old font awesome with new version and add favicon
    content = re.sub(
        r'<link rel="stylesheet" href="https://cdnjs\.cloudflare\.com/ajax/libs/font-awesome/6\.0\.0/css/all\.min\.css">',
        '    <link rel="icon" type="image/x-icon" href="favicon.ico">\n    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">',
        content
    )
    
    # Remove script tag from head if present
    content = re.sub(r'\s*<script src="js/main\.js"></script>', '', content)
    
    # Replace header include
    content = content.replace(
        '<include src="templates/header.html"></include>',
        '    <!-- Header will be loaded via JavaScript -->\n    <div id="header-container"></div>'
    )
    
    # Replace footer include
    footer_replacement = '''    <div id="footer-container"></div>

    <!-- Mobile Navigation -->
    <div id="mobile-nav-container"></div>

    <button id="backToTop" class="back-to-top">
        <i class="fas fa-arrow-up"></i>
    </button>

    <script src="js/main.js"></script>
    <script>
        // Load header, footer and mobile navigation templates
        document.addEventListener(\'DOMContentLoaded\', function() {
            loadTemplate(\'templates/header.html\', \'header-container\');
            loadTemplate(\'templates/footer.html\', \'footer-container\');
            loadTemplate(\'templates/mobile-nav.html\', \'mobile-nav-container\');
        });

        function loadTemplate(url, elementId) {
            fetch(url)
                .then(response => response.text())
                .then(data => {
                    document.getElementById(elementId).innerHTML = data;
                    // Re-initialize any JavaScript functionality after template is loaded
                    if (elementId === \'mobile-nav-container\') {
                        initializeNewMobileNavigation();
                    } else if (elementId === \'header-container\') {
                        initializeMobileMenu();
                    }
                    
                    // After all templates are loaded, try initializing components again
                    setTimeout(initializeAfterTemplatesLoad, 50);
                })
                .catch(error => console.error(\'Error loading template:\', error));
        }
    </script>'''
    
    content = content.replace(
        '<include src="templates/footer.html"></include>',
        footer_replacement
    )
    
    # Write updated content back to file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Updated {filepath}")

def main():
    workspace_dir = "/workspace"
    
    for filename in files_to_update:
        filepath = os.path.join(workspace_dir, filename)
        if os.path.exists(filepath):
            print(f"Processing {filename}...")
            update_html_file(filepath)
        else:
            print(f"File {filename} not found, skipping...")
    
    print("All files updated successfully!")

if __name__ == "__main__":
    main()