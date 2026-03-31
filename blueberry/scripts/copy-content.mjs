import { cpSync, mkdirSync, existsSync } from "fs";
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

for (const file of files) {
  const srcPath = join(parentDir, file.src);
  const destPath = join(destDir, file.dest);
  if (existsSync(srcPath)) {
    cpSync(srcPath, destPath);
    console.log(`Copied ${file.src} → src/content/${file.dest}`);
  } else {
    console.warn(`Warning: ${srcPath} not found, skipping`);
  }
}
