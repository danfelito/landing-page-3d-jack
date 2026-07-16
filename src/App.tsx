import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, ExternalLink, ImageOff } from 'lucide-react';
import { motion } from 'framer-motion';
import cyborgFallback from './assets/robot-data';

type Project = {
  title: string;
  url: string;
  platform: string;
  description: string;
  frameable: boolean;
};

const projects: Project[] = [
  {
    title: 'Firma de Comisiones',
    url: 'https://firma-de-comisiones-1.onrender.com/',
    platform: 'Render',
    description: 'Aplicación publicada para gestión y firma de acuerdos de comisión.',
    frameable: true,
  },
  {
    title: 'Harbest Landing',
    url: 'https://harbestlanding.danfelavicas.workers.dev/#inicio',
    platform: 'Cloudflare',
    description: 'Landing comercial publicada para una propuesta del sector agro y tecnología.',
    frameable: true,
  },
  {
    title: 'Proyecto Z.AI 01',
    url: 'https://chat.z.ai/c/0bf041c1-2ed3-4ec1-9ce7-0ec63e14e6aa',
    platform: 'Z.AI',
    description: 'Proyecto desarrollado y compartido mediante una publicación de Z.AI.',
    frameable: false,
  },
  {
    title: 'Proyecto Z.AI 02',
    url: 'https://chat.z.ai/c/cb0eafde-199d-4182-bcdc-0f5fc0ac4a90',
    platform: 'Z.AI',
    description: 'Segunda muestra de proyecto publicado y compartido mediante Z.AI.',
    frameable: false,
  },
];

const services = [
  ['01', 'Diseño web', 'Sitios modernos, limpios y enfocados en conversión y experiencia de usuario.'],
  ['02', 'Automatización', 'Flujos y herramientas digitales que simplifican procesos comerciales y operativos.'],
  ['03', 'Experiencias con IA', 'Interfaces y soluciones apoyadas por inteligencia artificial para negocios y proyectos.'],
  ['04', 'Identidad visual', 'Sistemas visuales coherentes para comunicar una presencia clara y memorable.'],
  ['05', 'Prototipos digitales', 'Conceptos funcionales que permiten validar ideas antes de escalar su desarrollo.'],
];

function screenshotSources(url: string) {
  const raw = url.replace('#inicio', '');
  return [
    `https://image.thum.io/get/width/1400/crop/900/noanimate/${raw}`,
    `https://s.wordpress.com/mshots/v1/${encodeURIComponent(raw)}?w=1400`,
    `https://api.microlink.io/?url=${encodeURIComponent(raw)}&screenshot=true&meta=false&embed=screenshot.url`,
  ];
}

function FadeIn({ children, delay = 0, y = 24, className = '' }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ContactButton() {
  return (
    <a
      href="#contacto"
      className="inline-flex items-center gap-2 rounded-full border-2 border-white px-6 py-3 text-xs font-semibold uppercase tracking-[.18em] text-white transition hover:scale-105 sm:px-8"
      style={{ background: 'linear-gradient(123deg,#18011F 7%,#B600A8 37%,#7621B0 72%,#BE4C00 100%)' }}
    >
      Contáctame <ArrowUpRight size={17} />
    </a>
  );
}

function HeroSection() {
  return (
    <section className="relative isolate min-h-[760px] overflow-hidden bg-ink sm:min-h-[820px] lg:min-h-screen">
      <div className="hero-aura" aria-hidden="true" />

      <nav className="relative z-40 mx-auto flex max-w-[1600px] flex-wrap justify-center gap-x-5 gap-y-2 px-5 pt-6 text-[11px] font-medium uppercase tracking-[.14em] text-ice sm:justify-between sm:px-8 sm:text-sm md:px-10 md:text-base">
        {[
          ['Acerca de', 'about'],
          ['Servicios', 'servicios'],
          ['Proyectos', 'proyectos'],
          ['Contacto', 'contacto'],
        ].map(([text, id]) => (
          <a key={id} href={`#${id}`} className="transition hover:opacity-65">
            {text}
          </a>
        ))}
      </nav>

      <div className="relative z-20 mx-auto mt-10 max-w-[1560px] px-4 text-center sm:mt-6 md:px-8 lg:mt-2">
        <FadeIn>
          <p className="mb-2 text-[clamp(.78rem,1.4vw,1.4rem)] font-medium uppercase tracking-[.34em] text-ice/75 sm:mb-1">
            Hola, soy
          </p>
          <h1 className="hero-heading mx-auto text-[clamp(4.6rem,14.2vw,13.6rem)] font-black uppercase leading-[.82] tracking-[-.06em]">
            Daniel
          </h1>
        </FadeIn>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-[102px] z-[15] mx-auto flex w-[min(94vw,680px)] justify-center opacity-100 sm:bottom-[58px] sm:w-[min(78vw,720px)] md:w-[min(60vw,760px)] lg:bottom-[32px] lg:w-[min(48vw,790px)]">
        <img
          src={cyborgFallback}
          alt="Ciborg de Daniel"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className="hero-cyborg visible block h-auto max-h-[67vh] w-auto max-w-full object-contain opacity-100 sm:max-h-[72vh] lg:max-h-[78vh]"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-30 mx-auto flex max-w-[1600px] items-end justify-between gap-3 px-5 pb-5 sm:px-8 sm:pb-8 md:px-10">
        <p className="max-w-[170px] text-[10px] font-light uppercase leading-snug tracking-[.08em] text-ice sm:max-w-[260px] sm:text-sm md:text-base">
          Diseño, desarrollo web e inteligencia artificial para proyectos digitales.
        </p>
        <ContactButton />
      </div>
    </section>
  );
}

function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  const sources = useMemo(() => screenshotSources(project.url), [project.url]);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const exhausted = sourceIndex >= sources.length;

  useEffect(() => {
    setSourceIndex(0);
    setLoaded(false);
  }, [project.url]);

  return (
    <div className="project-visual relative h-full w-full overflow-hidden bg-[#15151a]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(182,0,168,.34),transparent_34%),radial-gradient(circle_at_82%_20%,rgba(45,211,255,.28),transparent_30%),linear-gradient(135deg,#15151a,#090a0e)]" />

      {project.frameable && (
        <div className="absolute inset-0 overflow-hidden bg-white">
          <iframe
            src={project.url}
            title={`Vista en vivo de ${project.title}`}
            loading="lazy"
            tabIndex={-1}
            aria-hidden="true"
            className="live-project-frame"
          />
        </div>
      )}

      {!exhausted && (
        <img
          key={sources[sourceIndex]}
          src={sources[sourceIndex]}
          alt={`Captura del proyecto terminado ${project.title}`}
          loading={compact ? 'eager' : 'lazy'}
          referrerPolicy="no-referrer"
          className={`absolute inset-0 h-full w-full object-cover object-top transition duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={(event) => {
            const image = event.currentTarget;
            if (image.naturalWidth < 300 || image.naturalHeight < 180) {
              setLoaded(false);
              setSourceIndex((index) => index + 1);
              return;
            }
            setLoaded(true);
          }}
          onError={() => {
            setLoaded(false);
            setSourceIndex((index) => index + 1);
          }}
        />
      )}

      {!project.frameable && !loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center text-white/80">
          <ImageOff size={30} className="opacity-65" />
          <span className="text-sm uppercase tracking-[.2em] text-white/55">Cargando captura</span>
          <strong className="text-xl text-white">{project.title}</strong>
        </div>
      )}
    </div>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className="project-preview group relative h-[230px] w-[360px] shrink-0 overflow-hidden rounded-[28px] border border-white/15 bg-[#15151a] sm:h-[290px] sm:w-[470px]"
      aria-label={`Abrir ${project.title}`}
    >
      <ProjectVisual project={project} compact />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white">
        <div>
          <span className="text-[10px] uppercase tracking-[.25em] text-white/60">{project.platform}</span>
          <h3 className="mt-1 text-xl font-bold sm:text-2xl">{project.title}</h3>
        </div>
        <ExternalLink className="shrink-0 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
      </div>
    </a>
  );
}

function PublishedProjectsCarousel() {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const repeated = useMemo(() => [...projects, ...projects, ...projects], []);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setOffset((window.innerHeight - rect.top) * 0.11);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={ref} className="overflow-hidden bg-ink py-20 sm:py-28">
      <div className="mx-auto mb-10 max-w-5xl px-5 text-center">
        <p className="text-xs uppercase tracking-[.3em] text-ice/55">Muestras reales publicadas</p>
        <h2 className="hero-heading mt-3 text-[clamp(2.8rem,8vw,7rem)] font-black uppercase leading-none">Proyectos en línea</h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-ice/65 sm:text-base">
          Vistas en vivo y capturas automáticas de las versiones publicadas. Cada tarjeta abre el proyecto original.
        </p>
      </div>

      <div className="flex gap-4 pl-4 sm:gap-5" style={{ transform: `translate3d(${-260 + offset}px,0,0)`, willChange: 'transform' }}>
        {repeated.map((project, index) => (
          <ProjectPreview key={`${project.title}-${index}`} project={project} />
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="flex min-h-[65vh] items-center justify-center bg-ink px-6 py-24">
      <div className="max-w-3xl text-center">
        <FadeIn>
          <h2 className="hero-heading text-[clamp(3.5rem,10vw,9rem)] font-black uppercase leading-none">Sobre mí</h2>
          <p className="mx-auto mt-10 max-w-2xl text-[clamp(1rem,2vw,1.35rem)] leading-relaxed text-ice">
            Combino conocimiento de negocio, diseño, automatización e inteligencia artificial para convertir ideas en soluciones digitales claras y funcionales.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="servicios" className="rounded-t-[46px] bg-white px-5 py-24 text-ink md:px-10">
      <h2 className="mb-16 text-center text-[clamp(3.5rem,10vw,9rem)] font-black uppercase leading-none">Servicios</h2>
      <div className="mx-auto max-w-5xl">
        {services.map(([number, title, description]) => (
          <div key={number} className="grid grid-cols-[.3fr_1fr] gap-5 border-t border-black/15 py-9 last:border-b">
            <span className="text-[clamp(3rem,8vw,7rem)] font-black leading-none">{number}</span>
            <div>
              <h3 className="text-[clamp(1.1rem,2.5vw,2rem)] font-semibold uppercase">{title}</h3>
              <p className="mt-3 max-w-2xl text-base leading-relaxed opacity-60">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="proyectos" className="bg-ink px-5 py-24 md:px-10">
      <h2 className="hero-heading mb-12 text-center text-[clamp(3.5rem,10vw,9rem)] font-black uppercase leading-none">Selección</h2>
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <a key={project.title} href={project.url} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-[34px] border border-white/15 bg-white/[.04]">
            <div className="aspect-[16/9] overflow-hidden bg-[#15151a]">
              <ProjectVisual project={project} />
            </div>
            <div className="flex items-start justify-between gap-5 p-6 text-ice">
              <div>
                <p className="text-[10px] uppercase tracking-[.24em] text-ice/50">{project.platform}</p>
                <h3 className="mt-1 text-2xl font-bold uppercase">{project.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-ice/60">{project.description}</p>
              </div>
              <ArrowUpRight className="mt-1 shrink-0 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contacto" className="bg-ink px-6 py-28 text-center text-ice">
      <h2 className="hero-heading text-[clamp(3rem,9vw,8rem)] font-black uppercase">Hablemos</h2>
      <p className="mx-auto mt-5 max-w-xl text-lg text-ice/70">Disponible para proyectos de diseño, desarrollo web, automatización e inteligencia artificial.</p>
    </section>
  );
}

export default function App() {
  return (
    <main className="overflow-x-clip bg-ink font-sans">
      <HeroSection />
      <PublishedProjectsCarousel />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
