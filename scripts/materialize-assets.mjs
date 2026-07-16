import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const projectsDir = path.join(publicDir, 'projects');

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
  const sourcePath = path.join(root, 'src', 'assets', 'robot-data.ts');
  const source = await fs.readFile(sourcePath, 'utf8');
  const match = source.match(/data:image\/webp;base64,([^'"`]+)/);

  if (!match?.[1]) {
    throw new Error('No se encontró la imagen WebP embebida del ciborg.');
  }

  const outputPath = path.join(publicDir, 'cyborg-daniel.webp');
  await fs.writeFile(outputPath, Buffer.from(match[1], 'base64'));
  console.log(`Ciborg estático generado: ${outputPath}`);
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

  for (const project of projects) {
    try {
      await captureProject(project);
    } catch (error) {
      console.warn(`No fue posible generar ${project.slug}: ${error.message}`);
    }
  }
}

await main();
