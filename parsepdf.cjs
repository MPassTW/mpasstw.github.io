const { PDFParse } = require('/workspaces/default/code/node_modules/pdf-parse/dist/pdf-parse/cjs/index.cjs');
const fs = require('fs');
const buf = fs.readFileSync('/workspaces/default/code/src/imports/MP_2.0.pdf');
const parser = new PDFParse();
parser.parse(buf).then(d => {
  d.pages.forEach((p, i) => {
    process.stdout.write(`\n=== Page ${i+1} ===\n`);
    p.content.forEach(c => process.stdout.write(c.str + ' '));
    process.stdout.write('\n');
  });
}).catch(e => process.stderr.write(e.message + '\n'));
