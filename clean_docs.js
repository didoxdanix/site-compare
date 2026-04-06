const fs = require('fs');
let c = fs.readFileSync('public/docs/compare.md', 'utf8');

// Correção para tags de imagem com align="..." -> invalida o regex do ReactMarkdown
c = c.replace(/ align="[^"]+"\)/g, ')');
c = c.replace(/ align='[^']+'\)/g, ')');

// Correção para "Copy" que o hashnode insere na primeira linha de códigos
c = c.replace(/```(.*)\r?\nCopy/g, '```$1\n');

fs.writeFileSync('public/docs/compare.md', c);
console.log('Docs cleaned successfully!');
