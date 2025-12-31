#!/bin/bash
# Script to extract all CSS selectors from CSS files

# Find all CSS files and extract CSS selectors
find /workspace -name "*.css" -not -path "*/unused_styles.css" -not -path "*/actually_unused_styles.css" -exec grep -oE '\.[a-zA-Z][a-zA-Z0-9_-]*' {} \; | \
sed 's/^\.//' | \
sort | \
uniq > /workspace/all_css_selectors.txt

echo "CSS selectors extracted to /workspace/all_css_selectors.txt"
