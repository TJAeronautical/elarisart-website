import { cp, mkdir, rm } from 'node:fs/promises';

const out = 'dist';
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

const files = [
  'index.html','about.html','work.html','commissions.html','contact.html',
  'styles.css','site.js','robots.txt','sitemap.xml','_headers','_redirects'
];

for (const file of files) await cp(file, `${out}/${file}`);
console.log(`Built ${files.length} static assets into ${out}/`);
