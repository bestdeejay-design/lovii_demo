#!/usr/bin/env python3
"""
Template rendering script for the Vitrina website.

This script demonstrates how to use the template system to generate final HTML pages
from templates and content files.
"""

import os
import re
from pathlib import Path


def render_template(template_path, **kwargs):
    """
    Render a template with given variables.
    
    Args:
        template_path (str): Path to the template file
        **kwargs: Variables to replace in the template
    
    Returns:
        str: Rendered HTML content
    """
    with open(template_path, 'r', encoding='utf-8') as f:
        template_content = f.read()
    
    # Replace variables in the template
    for key, value in kwargs.items():
        placeholder = f'{{{{ {key} }}}}'
        template_content = template_content.replace(placeholder, str(value))
    
    return template_content


def render_page(output_path, title, content, scripts=""):
    """
    Render a complete page using the base template.
    
    Args:
        output_path (str): Path where to save the rendered page
        title (str): Page title
        content (str): Page content to insert
        scripts (str): Additional scripts to include
    """
    template_path = "templates/base.html"
    rendered_html = render_template(
        template_path,
        title=title,
        content=content,
        scripts=scripts,
        theme_class="dark-theme"
    )
    
    # Ensure output directory exists
    output_dir = os.path.dirname(output_path)
    if output_dir and not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(rendered_html)
    
    print(f"Rendered page saved to: {output_path}")


def main():
    """Main function to render all pages using templates."""
    print("Rendering website pages using template system...")
    
    # Define all pages to render
    pages = [
        {
            "output_path": "index.html",
            "title": "Витрина — цифровая полка для малого бизнеса",
            "content_file": "index_content.html"
        },
        {
            "output_path": "about.html",
            "title": "О нас — Витрина",
            "content_file": "about_content.html"
        },
        {
            "output_path": "business.html",
            "title": "Для бизнеса — Витрина",
            "content_file": "business_content.html"
        },
        {
            "output_path": "buyers.html",
            "title": "Для покупателей — Витрина",
            "content_file": "buyers_content.html"
        },
        {
            "output_path": "contacts.html",
            "title": "Контакты — Витрина",
            "content_file": "contacts_content.html"
        },
        {
            "output_path": "help.html",
            "title": "Помощь — Витрина",
            "content_file": "help_content.html"
        },
        {
            "output_path": "login-customer.html",
            "title": "Вход для покупателя — Витрина",
            "content_file": "login_customer_content.html"
        },
        {
            "output_path": "login-partner.html",
            "title": "Вход для партнёра — Витрина",
            "content_file": "login_partner_content.html"
        },
        {
            "output_path": "partners.html",
            "title": "Для партнёров — Витрина",
            "content_file": "partners_content.html"
        },
        {
            "output_path": "privacy.html",
            "title": "Политика конфиденциальности — Витрина",
            "content_file": "privacy_content.html"
        },
        {
            "output_path": "register-customer.html",
            "title": "Регистрация покупателя — Витрина",
            "content_file": "register_customer_content.html"
        },
        {
            "output_path": "register-partner.html",
            "title": "Регистрация партнёра — Витрина",
            "content_file": "register_partner_content.html"
        },
        {
            "output_path": "terms.html",
            "title": "Условия использования — Витрина",
            "content_file": "terms_content.html"
        },
        {
            "output_path": "catalog/index.html",
            "title": "Каталог — Витрина",
            "content_file": "catalog_index_content.html"
        },
        {
            "output_path": "food-delivery/index.html",
            "title": "Еда и доставка",
            "content_file": "food_delivery_content.html"
        }
    ]
    
    # Render all pages
    for page in pages:
        with open(page["content_file"], "r", encoding="utf-8") as f:
            content = f.read()
        
        render_page(
            output_path=page["output_path"],
            title=page["title"],
            content=content
        )
    
    print("Template rendering completed!")


if __name__ == "__main__":
    main()