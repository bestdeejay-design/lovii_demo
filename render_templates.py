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
        scripts=scripts
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
    
    # Read the content for the index page
    with open("index_content.html", "r", encoding="utf-8") as f:
        index_content = f.read()
    
    # Render the index page
    render_page(
        output_path="index.html",
        title="Витрина — цифровая полка для малого бизнеса",
        content=index_content
    )
    
    # For other pages, you would create similar content files and render them
    # This is just an example for the main page
    
    print("Template rendering completed!")


if __name__ == "__main__":
    main()