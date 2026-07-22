import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, ExternalLink, Mail, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

type Project = {
  slug: string;
  title: string;
  url?: string;
  platform: string;
  description: string;
  images: string[];
  imageMode?: 'cover' | 'contain';
  imagePosition?: 'top' | 'center';
};

const ORIGINAL_HERO_IMAGE =
  'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png';

const whatsappUrl =
  'https://wa.me/522294648962?text=Hola%20Daniel%2C%20vi%20tu%20portafolio%20y%20quiero%20hablar%20sobre%20un%20proyecto.';
const emailUrl =
  'mailto:danfelavicas@gmail.com?subject=Contacto%20desde%20el%20portafolio%20de%20Daniel';

const projects: Project[] = [
  {
    slug: 'aloia',
    title: 'Aloia · Asistente IA',
    url: 'https://aloia.space-z.ai/',
    platform: 'Z.AI',
    description: 'Asistente inteligente para la gestión y filtrado de llamadas.',
    images: ['/projects/aloia.webp?v=8'],
    imageMode: 'contain',
    imagePosition: 'center',
  },
  {
    slug: 'transcripcion-pdf',
    title: 'Transcripción a PDF',
    url: 'https://chat.z.ai/space/r115468vw860-art',
    platform: 'Z.AI',
    description: 'Herramienta para limpiar transcripciones de YouTube y generar documentos PDF profesionales.',
    images: ['/projects/transcripcion-pdf.webp?v=8'],
    imagePosition: 'top',
  },
  {
    slug: 'harbest',
    title: 'HarBest · Catálogo agrícola',
    url: 'https://harbestlanding.danfelavicas.workers.dev/#inicio',
    platform: 'Cloudflare Workers',
    description: 'Landing y catálogo de bioinsumos con consulta técnica y contacto comercial.',
    images: ['/projects/harbest.webp?v=8'],
    imagePosition: 'top',
  },
  {
    slug: 'firma-de-comisiones',
    title: 'Firma de Comisiones',
    url: 'https://firma-de-comisiones-1.onrender.com/',
    platform: 'Render',
    description: 'Flujo digital para revisar, completar y firmar acuerdos de comisión.',
    images: ['/projects/firma-principal.webp?v=6', '/projects/firma-alt.webp?v=6'],
  },
  {
    slug: 'circulo-inmobiliario',
    title: 'Círculo Inmobiliario',
    url: 'https://circulo-inmobiliario.onrender.com/',
    platform: 'Render',
    description: 'Asesoría inmobiliaria guiada para compra y renta de propiedades.',
    images: ['/projects/circulo-inmobiliario.webp?v=6'],
  },
  {
    slug: 'valupro',
    title: 'ValuPro',
    url: 'https://j1nke5shgru1.deploy.space.z.ai/',
    platform: 'Z.AI',
    description: 'Cotizador profesional de avalúos con seguimiento de clientes y folios.',
    images: ['/projects/valupro.webp?v=6'],
  },
  {
    slug: 'vivero-utica',
    title: 'Vivero Útica',
    url: 'https://ornamentalesutica.space-z.ai/',
    platform: 'Z.AI',
    description: 'Dashboard financiero y operativo para un vivero ornamental.',
    images: ['/projects/vivero-utica.webp?v=6'],
  },
  {
    slug: 'new-holland',
    title: 'New Holland',
    url: 'https://spessotonewholland.space-z.ai/',
    platform: 'Z.AI',
    description: 'Catálogo digital de calzado de seguridad para la industria mexicana.',
    images: ['/projects/new-holland.webp?v=6'],
  },
  {
    slug: 'deantro',
    title: 'DeAntro',
    platform: 'App Android',
    description: 'Aplicación móvil para encuentros cercanos mediante ubicación y Bluetooth.',
    images: ['/projects/deantro-01.webp?v=6', '/projects/deantro-02.webp?v=6'],
  },
];

const services = [
  ['01', 'Diseño web', 'Sitios modernos, limpios y enfocados en conversión y experiencia de usuario.'],
  ['02', 'Automatización', 'Flujos y herramientas digitales que simplifican procesos comerciales y operativos.'],
  ['03', 'Experiencias con IA', 'Interfaces y soluciones apoyadas por inteligencia artificial para negocios y proyectos.'],
  ['04', 'Identidad visual', 'Sistemas visuales coherentes para comunicar una presencia clara y memorable.'],
  ['05', 'Prototipos digitales', 'Conceptos funcionales que permiten validar ideas antes de escalar su desarrollo.'],
];

function FadeIn({
  children,
  delay = 0,
  y = 24,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
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
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border-2 border-white px-6 py-3 text-xs font-semibold uppercase tracking-[.18em] text-white transition hover:scale-105 sm:px-8"
      style={{ background: 'linear-gradient(123deg,#18011F 7%,#B600A8 37%,#7621B0 72%,#BE4C00 100%)' }}
    >
      Contáctame <MessageCircle size={17} />
    </a>
  );
}

function HeroPortrait() {
  return (
    <img
      src={ORIGINAL_HERO_IMAGE}
      alt="Retrato original del portafolio de Daniel"
      width={916}
      height={1000}
      loading="eager"
      fetchPriority="high"
      decoding="async"
      referrerPolicy="no-referrer"
      className="hero-portrait visible block h-auto max-h-[66vh] w-auto max-w-full object-contain opacity-100 drop-shadow-[0_28px_44px_rgba(0,0,0,.38)] sm:max-h-[72vh] lg:max-h-[78vh]"
    />
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

      <div className="pointer-events-none absolute inset-x-0 bottom-[88px] z-[15] mx-auto flex w-[min(88vw,610px)] justify-center sm:bottom-[50px] sm:w-[min(70vw,650px)] md:w-[min(54vw,690px)] lg:bottom-[22px] lg:w-[min(42vw,720px)]">
        <HeroPortrait />
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
  const [imageIndex, setImageIndex] = useState(0);
  const imageKey = project.images.join('|');

  useEffect(() => {
    setImageIndex(0);
    if (project.images.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setImageIndex((index) => (index + 1) % project.images.length);
    }, compact ? 3800 : 4600);

    return () => window.clearInterval(timer);
  }, [compact, imageKey, project.images.length]);

  const fitClass = project.imageMode === 'contain' ? 'object-contain' : 'object-cover';
  const positionClass = project.imagePosition === 'center' ? 'object-center' : 'object-top';

  return (
    <div className="project-visual relative h-full w-full overflow-hidden bg-[#101216]">
      {project.images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`Vista del proyecto ${project.title} ${index + 1}`}
          loading={compact ? 'eager' : 'lazy'}
          decoding="async"
          className={`absolute inset-0 h-full w-full ${fitClass} ${positionClass} transition-opacity duration-700 ${
            index === imageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {project.images.length > 1 && (
        <div
          className="absolute bottom-4 right-4 z-10 flex gap-1.5"
          aria-label={`Vista ${imageIndex + 1} de ${project.images.length}`}
        >
          {project.images.map((src, index) => (
            <span
              key={src}
              className={`h-1.5 rounded-full transition-all ${
                index === imageIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/45'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  const className =
    'project-preview group relative h-[230px] w-[360px] shrink-0 overflow-hidden rounded-[28px] border border-white/15 bg-[#15151a] sm:h-[290px] sm:w-[470px]';
  const content = (
    <>
      <ProjectVisual project={project} compact />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white">
        <div>
          <span className="text-[10px] uppercase tracking-[.25em] text-white/60">{project.platform}</span>
          <h3 className="mt-1 text-xl font-bold sm:text-2xl">{project.title}</h3>
        </div>
        {project.url && (
          <ExternalLink className="shrink-0 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
        )}
      </div>
    </>
  );

  if (!project.url) {
    return <article className={className}>{content}</article>;
  }

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className={className}
      aria-label={`Abrir ${project.title}`}
    >
      {content}
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
        <h2 className="hero-heading mt-3 text-[clamp(2.8rem,8vw,7rem)] font-black uppercase leading-none">
          Proyectos en línea
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-ice/65 sm:text-base">
          Capturas reales de cada proyecto, ordenadas por portafolio. Los proyectos con más de una vista cambian automáticamente.
        </p>
      </div>

      <div
        className="flex gap-4 pl-4 sm:gap-5"
        style={{ transform: `translate3d(${-260 + offset}px,0,0)`, willChange: 'transform' }}
      >
        {repeated.map((project, index) => (
          <ProjectPreview key={`${project.slug}-${index}`} project={project} />
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
          <h2 className="hero-heading text-[clamp(3.5rem,10vw,9rem)] font-black uppercase leading-none">
            Sobre mí
          </h2>
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
      <h2 className="mb-16 text-center text-[clamp(3.5rem,10vw,9rem)] font-black uppercase leading-none">
        Servicios
      </h2>
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

function ProjectCard({ project }: { project: Project }) {
  const className = 'group overflow-hidden rounded-[34px] border border-white/15 bg-white/[.04]';
  const content = (
    <>
      <div className="aspect-[16/9] overflow-hidden bg-[#15151a]">
        <ProjectVisual project={project} />
      </div>
      <div className="flex items-start justify-between gap-5 p-6 text-ice">
        <div>
          <p className="text-[10px] uppercase tracking-[.24em] text-ice/50">{project.platform}</p>
          <h3 className="mt-1 text-2xl font-bold uppercase">{project.title}</h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ice/60">{project.description}</p>
        </div>
        {project.url && (
          <ArrowUpRight className="mt-1 shrink-0 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
        )}
      </div>
    </>
  );

  if (!project.url) {
    return <article className={className}>{content}</article>;
  }

  return (
    <a href={project.url} target="_blank" rel="noreferrer" className={className}>
      {content}
    </a>
  );
}

function ProjectsSection() {
  return (
    <section id="proyectos" className="bg-ink px-5 py-24 md:px-10">
      <h2 className="hero-heading mb-12 text-center text-[clamp(3.5rem,10vw,9rem)] font-black uppercase leading-none">
        Selección
      </h2>
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contacto" className="bg-ink px-6 py-28 text-center text-ice">
      <h2 className="hero-heading text-[clamp(3rem,9vw,8rem)] font-black uppercase">Hablemos</h2>
      <p className="mx-auto mt-5 max-w-xl text-lg text-ice/70">
        Disponible para proyectos de diseño, desarrollo web, automatización e inteligencia artificial.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 transition hover:bg-white/10"
        >
          <MessageCircle size={19} /> WhatsApp
        </a>
        <a
          href={emailUrl}
          className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 transition hover:bg-white/10"
        >
          <Mail size={19} /> danfelavicas@gmail.com
        </a>
      </div>
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
