#!/bin/bash
# Script to extract all CSS classes from HTML files

# Find all HTML files and extract CSS classes
find /workspace -name "*.html" -exec grep -oE 'class="[^"]*"' {} \; | \
sed 's/class="//g; s/"//g' | \
tr ' ' '\n' | \
grep -v '^$' | \
sort | \
uniq > /workspace/used_css_classes.txt

echo "CSS classes extracted to /workspace/used_css_classes.txt"
