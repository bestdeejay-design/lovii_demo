#!/usr/bin/env python3

import re

def replace_navigation_code():
    with open('/workspace/presentation.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Define the old and new code blocks
    old_block_start = "document.addEventListener('DOMContentLoaded', function() {"
    old_block_end = "// Auto-rotate hero images"
    
    # Find the exact block to replace
    start_pos = content.find(old_block_start)
    if start_pos == -1:
        print("Start pattern not found")
        return
    
    # Find the end of the block we want to replace
    end_pos = content.find(old_block_end, start_pos)
    if end_pos == -1:
        print("End pattern not found")
        return
    
    # Get the block to replace (including some context)
    search_start = start_pos
    search_end = end_pos + len(old_block_end)
    old_block = content[search_start:search_end]
    
    # New code block
    new_block = """document.addEventListener('DOMContentLoaded', function() {
            // Initialize the navigation system
            if (typeof initializeNavigation === 'function') {
                initializeNavigation();
            }
            
            const sections = document.querySelectorAll('.presentation-section');
            const navItems = document.querySelectorAll('.nav-item');
            
            function updateActiveNav() {
                let current = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    
                    if (pageYOffset >= (sectionTop - 200)) {
                        current = section.getAttribute('id');
                    }
                });
                
                navItems.forEach(item => {
                    if (!item.id || (item.id !== 'more-btn' && !item.classList.contains('menu-link'))) {
                        item.classList.remove('active');
                        if (item.getAttribute('href') && item.getAttribute('href').substring(1) === current) {
                            item.classList.add('active');
                        }
                    }
                });
            }
            
            window.addEventListener('scroll', updateActiveNav);
            updateActiveNav();
            
            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]:not(.menu-link):not([id="more-btn"])').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop - 100,
                            behavior: 'smooth'
                        });
                        
                        // Close full menu after selection
                        const fullMenu = document.getElementById('full-menu');
                        if (fullMenu) {
                            fullMenu.classList.remove('active');
                        }
                    }
                });
            });
        });
        
        // Auto-rotate hero images"""
    
    # Perform the replacement
    updated_content = content.replace(old_block, new_block)
    
    # Write back to file
    with open('/workspace/presentation.html', 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    print("Navigation code replaced successfully")

if __name__ == "__main__":
    replace_navigation_code()