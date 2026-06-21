const fs = require('fs');

// 1. Remove inline style in logo-text in footer
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (let file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('style="color: #FFFFFF;"')) {
    content = content.replace(/<div class="logo-text" style="color: #FFFFFF;">/g, '<div class="logo-text">');
    fs.writeFileSync(file, content);
    console.log('Removed inline color from', file);
  }
}

// 2. Remove .footer-brand .logo-text override in CSS
let css = fs.readFileSync('styles.css', 'utf8');
css = css.replace(/\.footer-brand \.logo-text \{\s*color: var\(--text-main\) !important;\s*\}/g, '');
css = css.replace(/\.footer-brand \.logo-text \{\s*color: var\(--accent\) !important;\s*\}/g, '');

// Also ensure map container at 1024px has the height
if (!css.includes('@media (max-width: 1024px) { .map-container { height: 600px !important; } }')) {
  css += '\n@media (max-width: 1024px) { .map-container { height: 600px !important; } }\n';
}

// Fix 360px content moving out - add box-sizing border-box to html/body if not already there, 
// and fix footer padding
css += '\n@media (max-width: 480px) { .footer { padding: 3rem 1rem 2rem 1rem !important; overflow-x: hidden; } .footer-grid { gap: 1.5rem !important; } }\n';

fs.writeFileSync('styles.css', css);
console.log('CSS overrides removed');
