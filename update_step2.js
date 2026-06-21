const fs = require('fs');

// 1. Update HTML files to remove "Safety Channels"
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const safetyRegex = /\s*<div>\s*<h4 class="footer-title">Safety Channels<\/h4>\s*<ul class="footer-links">[\s\S]*?<\/ul>\s*<\/div>/g;

for (let file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (safetyRegex.test(content)) {
    content = content.replace(safetyRegex, '');
    fs.writeFileSync(file, content);
    console.log('Removed Safety Channels from', file);
  }
}

// 2. Update styles.css
let css = fs.readFileSync('styles.css', 'utf8');

// Update main grid template since we removed a column
css = css.replace(/grid-template-columns: 1\.5fr 1fr 1fr 1fr 1\.2fr;/g, 'grid-template-columns: 1.5fr 1fr 1fr 1.2fr;');

// Remove the max-width: 1200px footer-grid override
// It looks like:
/*
  .footer-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
  }
*/
// It's inside @media (max-width: 1200px)
// We will just replace it with grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
css = css.replace(/@media \(max-width: 1200px\) \{[\s\S]*?\.footer-grid \{\s*grid-template-columns: repeat\(3, 1fr\);\s*gap: 3rem;\s*\}/g, match => {
  return match.replace(/grid-template-columns: repeat\(3, 1fr\);/, 'grid-template-columns: 1.5fr 1fr 1fr 1.2fr;');
});

// Remove the max-width: 1024px footer-grid that we added
css = css.replace(/@media \(max-width: 1024px\) \{\s*\.footer-grid \{\s*grid-template-columns: repeat\(3, 1fr\);\s*\}\s*\}/g, '');

// Update max-width: 768px footer-grid to 2x2
// Currently it is:
/*
  .footer-grid {
    grid-template-columns: 1fr !important;
    gap: 2rem !important;
  }
*/
// Inside @media (max-width: 768px)
css = css.replace(/@media \(max-width: 768px\) \{[\s\S]*?\.footer-grid \{\s*grid-template-columns: 1fr !important;\s*gap: 2rem !important;\s*\}/g, match => {
  return match.replace(/grid-template-columns: 1fr !important;/, 'grid-template-columns: repeat(2, 1fr) !important;');
});

// Add map-container height for 768px
// Let's add it to the end of the file
css += `\n@media (max-width: 768px) { .map-container { height: 450px; } }\n`;

fs.writeFileSync('styles.css', css);
console.log('Updated styles.css');
