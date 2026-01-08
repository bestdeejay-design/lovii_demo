# Graphics Sections with 16:9 Aspect Ratio

This project contains HTML sections designed for displaying graphical materials with a consistent 16:9 aspect ratio. The sections include background SVG patterns and placeholders for your images.

## Files Included

- `multi_graphics_sections.html` - Main HTML file with 4 sections for graphics
- `graphics_section.html` - Single section example
- `css/graphics.css` - Stylesheet for the graphics sections

## Features

- **16:9 Aspect Ratio**: All sections maintain a consistent 16:9 aspect ratio using the padding-top technique
- **SVG Backgrounds**: Each section has a unique SVG background pattern
- **Responsive Design**: Sections adapt to different screen sizes
- **Image Placeholders**: Ready-to-use placeholders for your images
- **Easy Integration**: Simple JavaScript functions to update images

## How to Use

1. Upload your images to GitHub
2. Get the raw URLs for your images (e.g., `https://raw.githubusercontent.com/username/repository/branch/path/to/image.jpg`)
3. Use the JavaScript functions to update the sections:

```javascript
// Update individual sections
updateGraphicsImage('image1', 'placeholder-text1', 'YOUR_IMAGE_URL_HERE');
updateGraphicsImage('image2', 'placeholder-text2', 'YOUR_IMAGE_URL_HERE');
updateGraphicsImage('image3', 'placeholder-text3', 'YOUR_IMAGE_URL_HERE');
updateGraphicsImage('image4', 'placeholder-text4', 'YOUR_IMAGE_URL_HERE');

// Or update all at once
updateAllImages([
    'URL_FOR_IMAGE_1',
    'URL_FOR_IMAGE_2', 
    'URL_FOR_IMAGE_3',
    'URL_FOR_IMAGE_4'
]);
```

## Customization

- Modify the SVG patterns in the HTML files to change the background designs
- Adjust colors and styles in `css/graphics.css`
- Add more sections by duplicating existing section code

## Technical Details

The 16:9 aspect ratio is maintained using the padding-top technique:
- `padding-top: 56.25%` (which is 9/16 as a percentage)
- This ensures the height is always 9/16 of the width
- The content area remains properly positioned regardless of screen size