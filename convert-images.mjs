import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, extname, dirname, basename } from "path";

const INPUT_DIR = "./public/Images";
const MAX_WIDTH = 1600;
const QUALITY = 85;

const IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".webp"];

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => {
      const fullPath = join(dir, e.name);
      return e.isDirectory() ? getFiles(fullPath) : fullPath;
    })
  );
  return files.flat();
}

async function convert(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (!IMAGE_EXTS.includes(ext)) return;

  const outPath = join(dirname(filePath), basename(filePath, ext) + ".webp");

  try {
    const meta = await sharp(filePath).metadata();
    const needsResize = meta.width > MAX_WIDTH;

    let pipeline = sharp(filePath);
    if (needsResize) pipeline = pipeline.resize({ width: MAX_WIDTH });
    pipeline = pipeline.webp({ quality: QUALITY });

    await pipeline.toFile(outPath);

    // Si le fichier source n'était pas déjà un webp, on le supprime
    if (ext !== ".webp") {
      const { unlink } = await import("fs/promises");
      await unlink(filePath);
    }

    console.log(`✓ ${filePath} → ${basename(outPath)}${needsResize ? ` (redim. ${meta.width}→${MAX_WIDTH}px)` : ""}`);
  } catch (err) {
    console.error(`✗ ${filePath}: ${err.message}`);
  }
}

const files = await getFiles(INPUT_DIR);
console.log(`${files.length} fichiers trouvés dans ${INPUT_DIR}\n`);
await Promise.all(files.map(convert));
console.log("\nTerminé.");
