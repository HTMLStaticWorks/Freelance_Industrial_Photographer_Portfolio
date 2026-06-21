const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const sectorsHtml = `        <div>
          <h4 class="footer-title">Sectors</h4>
          <ul class="footer-links">
            <li><a href="services.html" class="footer-link">Manufacturing</a></li>
            <li><a href="services.html" class="footer-link">Infrastructure</a></li>
            <li><a href="services.html" class="footer-link">Energy & Utilities</a></li>
            <li><a href="services.html" class="footer-link">Drone Operations</a></li>
            <li><a href="services.html" class="footer-link">Corporate Portraits</a></li>
          </ul>
        </div>
`;

for (let file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('<h4 class="footer-title">Contact Studio</h4>')) {
    if (!content.includes('<h4 class="footer-title">Sectors</h4>')) {
      content = content.replace(
        /(\s*)<div>\s*<h4 class="footer-title">Contact Studio<\/h4>/,
        (match, p1) => `\n${sectorsHtml}${p1}<div>\n          <h4 class="footer-title">Contact Studio</h4>`
      );
      fs.writeFileSync(file, content);
      console.log('Restored Sectors in', file);
    }
  }
}

// Also fix the 480px CSS !important issue
let css = fs.readFileSync('styles.css', 'utf8');
css = css.replace(/@media \(max-width: 480px\) \{\s*\.stats-grid \{\s*grid-template-columns: 1fr;\s*\}\s*\.stat-item::after \{\s*display: none !important;\s*\}\s*\.portfolio-grid \{\s*grid-template-columns: 1fr;\s*\}\s*\.footer-grid \{\s*grid-template-columns: 1fr;\s*\}/g,
`@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-item::after {
    display: none !important;
  }

  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .footer-grid {
    grid-template-columns: 1fr !important;
  }`);
fs.writeFileSync('styles.css', css);
console.log('Updated CSS 480px rules');
