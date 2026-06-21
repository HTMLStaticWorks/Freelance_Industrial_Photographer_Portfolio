const fs = require('fs');

let html = fs.readFileSync('contact.html', 'utf8');
html = html.replace(
  '<button class="btn btn-primary" type="submit" style="width: 100%; margin-top: 1rem;">Send Project Brief</button>',
  '<button class="btn btn-primary submit-btn" type="submit" style="margin-top: 1rem;">Send Project Brief</button>'
);
fs.writeFileSync('contact.html', html);

let css = fs.readFileSync('styles.css', 'utf8');
css += `\n.submit-btn { width: 100%; }\n@media (min-width: 1024px) { .submit-btn { width: auto; padding-left: 3rem; padding-right: 3rem; display: block; margin-left: auto; margin-right: auto; } }\n`;
fs.writeFileSync('styles.css', css);

console.log("Updated contact.html and styles.css");
