import { cpSync, mkdirSync, existsSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const parentDir = join(projectRoot, "..");
const destDir = join(projectRoot, "src", "content");

mkdirSync(join(destDir, "skills"), { recursive: true });

const files = [
  { src: "CLAUDE.md", dest: "CLAUDE.md" },
  { src: "skills/content-checker.md", dest: "skills/content-checker.md" },
  { src: "skills/copy-creator.md", dest: "skills/copy-creator.md" },
];

console.log(`[copy-content] projectRoot: ${projectRoot}`);
console.log(`[copy-content] parentDir: ${parentDir}`);
console.log(`[copy-content] destDir: ${destDir}`);

let copied = 0;
for (const file of files) {
  const srcPath = join(parentDir, file.src);
  const destPath = join(destDir, file.dest);
  if (existsSync(srcPath)) {
    cpSync(srcPath, destPath);
    const size = statSync(destPath).size;
    console.log(`[copy-content] ✓ Copied ${file.src} → src/content/${file.dest} (${size} bytes)`);
    copied++;
  } else {
    console.error(`[copy-content] ✗ NOT FOUND: ${srcPath}`);
  }
}

if (copied === 0) {
  console.error(`[copy-content] CRITICAL: No content files found. The model will have NO rules.`);
  console.error(`[copy-content] Expected files at: ${parentDir}`);
}

console.log(`[copy-content] Done. ${copied}/${files.length} files copied.`);
