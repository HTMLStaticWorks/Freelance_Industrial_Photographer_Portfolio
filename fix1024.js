const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');
css += '\n@media (max-width: 1024px) { .map-container { height: 500px !important; } }\n';
fs.writeFileSync('styles.css', css);

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
        </div>`;

for (let file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('Contact Studio') && !content.includes('Sectors')) {
    content = content.replace(
      /(\s*)<div>\s*<h4 class="footer-title">Contact Studio<\/h4>/,
      (match, p1) => `\n${sectorsHtml}${p1}<div>\n          <h4 class="footer-title">Contact Studio</h4>`
    );
    fs.writeFileSync(file, content);
    console.log('Restored Sectors in', file);
  }
}
