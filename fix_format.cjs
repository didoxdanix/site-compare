const fs = require('fs');
let c = fs.readFileSync('public/docs/compare.md', 'utf8');

// Fix 1: Remove trailing spaces/whitespace from list items that cause "loose lists"
// A loose list has blank lines between items — react-markdown renders them as <p> tags = ugly spacing
// We collapse consecutive list items that have blank lines between them
c = c.replace(/(\*   .+)\n    \n(\n\*)/g, '$1\n$2');
c = c.replace(/(\*   .+)\n    \n\n(\*)/g, '$1\n$2');

// More aggressive: collapse items in tightly-spaced bullet lists
// Match "* item\n    \n" patterns (trailing whitespace + blank line between bullets)
c = c.replace(/(^\*   .+)\n[ \t]*\n(?=\*)/gm, '$1\n');

// Fix 2: Orphaned question lines should be bold subheadings
c = c.replace(/^Mas o que é o COMPARE\?$/m, '### Mas o que é o COMPARE?');
c = c.replace(/^Quais são os tipos de dados que o COMPARE compara\?$/m, '### Quais são os tipos de dados que o COMPARE compara?');
c = c.replace(/^OBS: (.+)$/m, '> **OBS:** $1');

// Fix ordered list items: "1.  text\n    \n" (blank line after ordered item creates loose list)
c = c.replace(/(^\d+\. {2}.+)\n[ \t]*\n(?=\d+\.)/gm, '$1\n');

// Fix sub-bullets of ordered items (the "    *   " pattern)
c = c.replace(/(^[ \t]+\*[ \t]+.+)\n[ \t]*\n(?=[ \t]+\*)/gm, '$1\n');

fs.writeFileSync('public/docs/compare.md', c);
console.log('Formatting fixed!');
