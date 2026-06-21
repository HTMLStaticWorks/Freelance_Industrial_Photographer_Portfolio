const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// 1. Update footer background and colors
css = css.replace(/\.footer {\s*background: var\(--primary\);\s*color: #F8FAFC;\s*padding: 6rem 0 3rem 0;\s*border-top: 1px solid rgba\(255, 255, 255, 0\.05\);\s*}/g,
  `.footer {
  background: var(--bg-header);
  color: var(--text-main);
  padding: 6rem 0 3rem 0;
  border-top: 1px solid var(--border-color);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}`);

css = css.replace(/\.footer-desc {\s*color: #94A3B8;/g, `.footer-desc {\n  color: var(--text-muted);`);
css = css.replace(/\.footer-title {\s*font-family: var\(--font-heading\);\s*font-size: 1\.1rem;\s*color: #FFFFFF;/g, `.footer-title {\n  font-family: var(--font-heading);\n  font-size: 1.1rem;\n  color: var(--text-main);`);
css = css.replace(/\.footer-link {\s*color: #94A3B8;/g, `.footer-link {\n  color: var(--text-muted);`);
css = css.replace(/\.footer-contact-item {\s*display: flex;\s*gap: 0\.75rem;\s*margin-bottom: 1rem;\s*color: #94A3B8;/g, `.footer-contact-item {\n  display: flex;\n  gap: 0.75rem;\n  margin-bottom: 1rem;\n  color: var(--text-muted);`);
css = css.replace(/\.footer-bottom {\s*border-top: 1px solid rgba\(255, 255, 255, 0\.08\);/g, `.footer-bottom {\n  border-top: 1px solid var(--border-color);`);
css = css.replace(/\.footer-copy {\s*color: #64748B;/g, `.footer-copy {\n  color: var(--text-muted);`);
css = css.replace(/\.footer-brand \.logo-text {\s*color: var\(--accent\) !important;\s*}/g, `.footer-brand .logo-text {\n  color: var(--text-main) !important;\n}`);

// Add specific grid template to 1024px
const media1024Regex = /@media \(max-width: 1024px\) {/g;
// We know there are a few. The first one is the one we want to change for nav, but let's just do it directly.

// We will change the 1024px mobile drawer overrides to 991px
css = css.replace(/\/\* 1024px Mobile Drawer overrides \*\//g, `/* 991px Mobile Drawer overrides */`);
// Replace @media (max-width: 1024px) for the nav:
// It starts with @media (max-width: 1024px) { \n  .section {
// Let's replace this entire block signature
css = css.replace(/@media \(max-width: 1024px\) \{\s*\.section \{/g, `@media (max-width: 991px) {\n  .section {`);

// Now let's inject a new @media (max-width: 1024px) for the footer specifically, at the end of the file.
css += `\n@media (max-width: 1024px) {\n  .footer-grid {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n`;

fs.writeFileSync('styles.css', css);
console.log('Updated styles.css');
