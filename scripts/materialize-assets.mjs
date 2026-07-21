import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const CYBORG_OUTPUT_NAME = 'cyborg-daniel-v4.webp';

const LEGACY_EXPECTED_SIZE = 128486;
const LEGACY_EXPECTED_SHA256 =
  'f8e0873eecb30766439de805f2462e7eab003b2a3c1945f7e62e1b31e5a39df4';

function isWebP(buffer) {
  return (
    buffer.length >= 12 &&
    buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
    buffer.subarray(8, 12).toString('ascii') === 'WEBP'
  );
}

async function materializeCyborg() {
  const partsDir = path.join(root, 'src', 'assets', 'cyborg-parts');
  const partNames = [
    'part-01.txt',
    'part-02.txt',
    'part-03.txt',
    'part-04a.txt',
    'part-04b.txt',
    'part-04c.txt',
    'part-04d.txt',
    'part-04e.txt',
  ];

  let parts;
  try {
    parts = await Promise.all(
      partNames.map((name) => fs.readFile(path.join(partsDir, name), 'utf8')),
    );
  } catch (error) {
    console.warn(
      `No fue posible leer todas las partes del ciborg. La aplicación usará la imagen de respaldo: ${error.message}`,
    );
    return;
  }

  const base64 = parts.join('').replace(/\s+/g, '');
  const image = Buffer.from(base64, 'base64');
  const sha256 = createHash('sha256').update(image).digest('hex');

  if (!isWebP(image)) {
    console.warn(
      `El recurso reconstruido no tiene una cabecera WebP válida (${image.length} bytes). La aplicación usará la imagen de respaldo.`,
    );
    return;
  }

  if (
    image.length !== LEGACY_EXPECTED_SIZE ||
    sha256 !== LEGACY_EXPECTED_SHA256
  ) {
    console.warn(
      `El ciborg actual difiere de la versión anterior: ${image.length} bytes, SHA-256 ${sha256}. Se continuará porque el archivo WebP es válido.`,
    );
  }

  const outputPath = path.join(publicDir, CYBORG_OUTPUT_NAME);
  await fs.writeFile(outputPath, image);
  console.log(
    `Ciborg generado: ${outputPath} (${image.length} bytes, SHA-256 ${sha256})`,
  );
}

async function main() {
  await fs.mkdir(publicDir, { recursive: true });
  await materializeCyborg();
  console.log('Capturas estáticas de proyectos preservadas en public/projects.');
}

await main();
