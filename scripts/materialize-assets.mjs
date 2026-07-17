import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const projectsDir = path.join(publicDir, 'projects');

const CYBORG_OUTPUT_NAME = 'cyborg-daniel-v4.webp';
const CYBORG_PUBLIC_URL = `/${CYBORG_OUTPUT_NAME}?v=4`;
const CYBORG_EXPECTED_SIZE = 128486;
const CYBORG_EXPECTED_SHA256 =
  'f8e0873eecb30766439de805f2462e7eab003b2a3c1945f7e62e1b31e5a39df4';

const projects = [
  {
    slug: 'firma-de-comisiones',
    url: 'https://firma-de-comisiones-1.onrender.com/',
  },
  {
    slug: 'harbest-landing',
    url: 'https://harbestlanding.danfelavicas.workers.dev/#inicio',
  },
  {
    slug: 'proyecto-zai-01',
    url: 'https://chat.z.ai/c/0bf041c1-2ed3-4ec1-9ce7-0ec63e14e6aa',
  },
  {
    slug: 'proyecto-zai-02',
    url: 'https://chat.z.ai/c/cb0eafde-199d-4182-bcdc-0f5fc0ac4a90',
  },
];

async function ensureDirectories() {
  await fs.mkdir(publicDir, { recursive: true });
  await fs.mkdir(projectsDir, { recursive: true });
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
  console.log(`Referencia del hero actualizada: ${CYBORG_PUBLIC_URL}`);
}

async function fetchWithTimeout(url, timeoutMs = 70000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: {
        'user-agent': 'Mozilla/5.0 DanielPortfolioBuild/1.0',
        accept: '*/*',
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

async function captureProject(project) {
  const targetUrl = project.url.replace('#inicio', '');
  const params = new URLSearchParams({
    url: targetUrl,
    screenshot: 'true',
    waitUntil: 'networkidle2',
    waitForTimeout: '9000',
    prerender: 'true',
    force: 'true',
    retry: '2',
    timeout: '60000',
  });

  const apiUrl = `https://api.microlink.io/?${params.toString()}`;
  const apiResponse = await fetchWithTimeout(apiUrl);

  if (!apiResponse.ok) {
    throw new Error(`Microlink respondió ${apiResponse.status}`);
  }

  const payload = await apiResponse.json();
  const imageUrl = payload?.data?.screenshot?.url || payload?.data?.image?.url;

  if (!imageUrl) {
    throw new Error(payload?.message || 'Microlink no devolvió una captura.');
  }

  const imageResponse = await fetchWithTimeout(imageUrl);
  if (!imageResponse.ok) {
    throw new Error(`La descarga de la captura respondió ${imageResponse.status}`);
  }

  const buffer = Buffer.from(await imageResponse.arrayBuffer());
  if (buffer.length < 12000) {
    throw new Error(`La captura recibida es demasiado pequeña (${buffer.length} bytes).`);
  }

  const outputPath = path.join(projectsDir, `${project.slug}.jpg`);
  await fs.writeFile(outputPath, buffer);
  console.log(`Captura cargada y guardada: ${project.slug} (${buffer.length} bytes)`);
}

async function main() {
  await ensureDirectories();
  await materializeCyborg();
  await updateCyborgReference();

  for (const project of projects) {
    try {
      await captureProject(project);
    } catch (error) {
      console.warn(`No fue posible generar ${project.slug}: ${error.message}`);
    }
  }
}

await main();
