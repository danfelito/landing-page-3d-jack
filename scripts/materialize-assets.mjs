import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';

const root = process.cwd();
const publicDir = path.join(root, 'public');

const CYBORG_OUTPUT_NAME = 'cyborg-daniel-v4.webp';
const CYBORG_PUBLIC_URL = `/${CYBORG_OUTPUT_NAME}?v=4`;
const CYBORG_EXPECTED_SIZE = 128486;
const CYBORG_EXPECTED_SHA256 =
  'f8e0873eecb30766439de805f2462e7eab003b2a3c1945f7e62e1b31e5a39df4';

async function ensureDirectories() {
  await fs.mkdir(publicDir, { recursive: true });
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

  const parts = await Promise.all(
    partNames.map((name) => fs.readFile(path.join(partsDir, name), 'utf8')),
  );

  const base64 = parts.join('').replace(/\s+/g, '');
  const image = Buffer.from(base64, 'base64');
  const sha256 = createHash('sha256').update(image).digest('hex');

  if (image.length !== CYBORG_EXPECTED_SIZE) {
    throw new Error(
      `Tamaño inesperado del ciborg: ${image.length} bytes; se esperaban ${CYBORG_EXPECTED_SIZE}.`,
    );
  }

  if (sha256 !== CYBORG_EXPECTED_SHA256) {
    throw new Error(
      `SHA-256 inesperado del ciborg: ${sha256}; se esperaba ${CYBORG_EXPECTED_SHA256}.`,
    );
  }

  const outputPath = path.join(publicDir, CYBORG_OUTPUT_NAME);
  await fs.writeFile(outputPath, image);
  console.log(
    `Ciborg actualizado generado: ${outputPath} (${image.length} bytes, SHA-256 ${sha256})`,
  );
}

async function updateCyborgReference() {
  const appPath = path.join(root, 'src', 'App.tsx');
  const source = await fs.readFile(appPath, 'utf8');
  const updated = source.replace(
    /\/cyborg-daniel(?:-v4)?\.webp\?v=\d+/g,
    CYBORG_PUBLIC_URL,
  );

  if (updated === source && !source.includes(CYBORG_PUBLIC_URL)) {
    throw new Error('No se encontró la referencia del ciborg dentro de src/App.tsx.');
  }

  await fs.writeFile(appPath, updated);
  console.log(`Referencia del hero confirmada: ${CYBORG_PUBLIC_URL}`);
}

async function main() {
  await ensureDirectories();
  await materializeCyborg();
  await updateCyborgReference();
  console.log('Capturas estáticas de proyectos preservadas en public/projects.');
}

await main();
