import { ReactNode, useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import cyborgPortrait from './assets/robot-data';

const projectPreviews = [
  ['Harbest Landing','https://github.com/danfelito/Harbest-landing','https://opengraph.githubassets.com/1/danfelito/Harbest-landing'],
  ['Círculo Internacional','https://github.com/danfelito/Circulo-Internacional','https://opengraph.githubassets.com/1/danfelito/Circulo-Internacional'],
  ['Círculo Inmobiliaria','https://github.com/danfelito/Circulo-Inmobiliaria','https://opengraph.githubassets.com/1/danfelito/Circulo-Inmobiliaria'],
  ['Página Web Demo','https://github.com/danfelito/Pagina-web-demo','https://opengraph.githubassets.com/1/danfelito/Pagina-web-demo'],
  ['Firma de Comisiones','https://github.com/danfelito/Firma-de-comisiones','https://opengraph.githubassets.com/1/danfelito/Firma-de-comisiones'],
  ['Círculo Bienes Raíces','https://github.com/danfelito/circulo-bienes-raices','https://opengraph.githubassets.com/1/danfelito/circulo-bienes-raices'],
  ['Brasil MX','https://github.com/danfelito/brasil-mx','https://opengraph.githubassets.com/1/danfelito/brasil-mx'],
  ['Landing 3D Daniel','https://landing-page-3d-jack.onrender.com','https://opengraph.githubassets.com/1/danfelito/landing-page-3d-jack'],
] as const;

const services = [
  ['01','Modelado 3D','Creación de objetos, personajes y ambientes detallados para marcas, productos y experiencias digitales.'],
  ['02','Renderizado','Renders de alta calidad con iluminación, texturas y materiales para presentar conceptos con impacto.'],
  ['03','Diseño en movimiento','Animaciones y piezas dinámicas que agregan narrativa y profundidad visual.'],
  ['04','Identidad visual','Sistemas visuales coherentes, desde logotipos hasta estilos completos de marca.'],
  ['05','Diseño web','Sitios modernos, limpios y enfocados en conversión y experiencia de usuario.'],
];

function FadeIn({ children, delay = 0, y = 24, className = '' }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return <motion.div initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, delay }} className={className}>{children}</motion.div>;
}

function ContactButton() {
  return <a href="#contacto" className="inline-flex rounded-full border-2 border-white px-7 py-3 text-xs font-semibold uppercase tracking-[.18em] text-white transition hover:scale-105" style={{ background: 'linear-gradient(123deg,#18011F 7%,#B600A8 37%,#7621B0 72%,#BE4C00 100%)' }}>Contáctame</a>;
}

function HeroSection() {
  return <section className="relative min-h-[780px] overflow-hidden bg-ink md:min-h-screen">
    <nav className="relative z-30 flex flex-wrap justify-center gap-x-5 gap-y-2 px-5 pt-6 text-xs font-medium uppercase tracking-[.14em] text-ice sm:justify-between sm:px-8 sm:text-sm md:px-10 md:text-lg">
      {[['Acerca de','about'],['Servicios','servicios'],['Proyectos','proyectos'],['Contacto','contacto']].map(([title,id]) => <a key={id} href={`#${id}`} className="hover:opacity-70">{title}</a>)}
    </nav>
    <div className="relative z-20 mx-auto mt-8 max-w-[1500px] px-4 text-center sm:mt-5 md:px-8">
      <FadeIn>
        <p className="mb-1 text-[clamp(1rem,2.2vw,2rem)] font-medium uppercase tracking-[.34em] text-ice/75">Hola, soy</p>
        <h1 className="hero-heading mx-auto max-w-full text-[clamp(4.3rem,15vw,14rem)] font-black uppercase leading-[.82] tracking-[-.055em]">Daniel</h1>
      </FadeIn>
    </div>
    <FadeIn delay={0.15} className="pointer-events-none absolute inset-x-0 bottom-[108px] z-10 mx-auto w-[min(82vw,650px)] sm:bottom-[50px] md:w-[min(52vw,690px)] lg:w-[min(46vw,720px)]">
      <img src={cyborgPortrait} alt="Ciborg de Daniel" className="h-auto w-full object-contain drop-shadow-[0_0_32px_rgba(182,0,168,0.26)] drop-shadow-[0_0_46px_rgba(40,210,255,0.18)]" />
    </FadeIn>
    <div className="absolute inset-x-0 bottom-0 z-30 flex items-end justify-between gap-4 px-5 pb-6 sm:px-8 md:px-10 md:pb-9">
      <p className="max-w-[175px] text-[11px] font-light uppercase leading-snug tracking-[.08em] text-ice sm:max-w-[250px] sm:text-sm md:text-lg">Creador digital 3D enfocado en proyectos visuales impactantes.</p>
      <ContactButton />
    </div>
  </section>;
}

function MarqueeSection() {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => ref.current && setOffset((window.scrollY - ref.current.offsetTop + window.innerHeight) * 0.18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const row = (items: readonly (typeof projectPreviews)[number][], right = true) => <div className="flex gap-4" style={{ transform: `translateX(${right ? offset - 240 : -(offset - 240)}px)` }}>
    {[...items, ...items].map(([title,url,image], index) => <a key={`${title}-${index}`} href={url} target="_blank" rel="noreferrer" className="group relative h-[230px] w-[380px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-white/5 sm:h-[280px] sm:w-[470px]">
      <img src={image} alt={`Captura del proyecto ${title}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-5 pb-4 pt-14 text-lg font-semibold text-white">{title}</span>
    </a>)}
  </div>;
  return <section ref={ref} className="overflow-hidden bg-ink py-20">
    <div className="mb-8 px-5 text-center"><p className="text-sm uppercase tracking-[.3em] text-ice/60">Proyectos publicados</p><h2 className="hero-heading mt-2 text-[clamp(2.8rem,8vw,7rem)] font-black uppercase leading-none">GitHub y Render</h2></div>
    <div className="flex flex-col gap-4">{row(projectPreviews.slice(0,4))}{row(projectPreviews.slice(4), false)}</div>
  </section>;
}

function AboutSection() {
  return <section id="about" className="flex min-h-[70vh] items-center justify-center bg-ink px-6 py-24"><div className="max-w-3xl text-center"><FadeIn><h2 className="hero-heading text-[clamp(3.5rem,10vw,9rem)] font-black uppercase leading-none">Sobre mí</h2><p className="mx-auto mt-10 max-w-2xl text-[clamp(1rem,2vw,1.35rem)] leading-relaxed text-ice">Combino diseño, tecnología y narrativa visual para construir experiencias digitales memorables y funcionales.</p></FadeIn></div></section>;
}

function ServicesSection() {
  return <section id="servicios" className="rounded-t-[48px] bg-white px-5 py-24 text-ink md:px-10"><h2 className="mb-16 text-center text-[clamp(3.5rem,10vw,9rem)] font-black uppercase leading-none">Servicios</h2><div className="mx-auto max-w-5xl">{services.map(([number,title,description]) => <div key={number} className="grid grid-cols-[.32fr_1fr] gap-5 border-t border-black/15 py-9 last:border-b"><span className="text-[clamp(3rem,8vw,7rem)] font-black leading-none">{number}</span><div><h3 className="text-[clamp(1.15rem,2.5vw,2rem)] font-semibold uppercase">{title}</h3><p className="mt-3 max-w-2xl text-base leading-relaxed opacity-60">{description}</p></div></div>)}</div></section>;
}

function ProjectsSection() {
  return <section id="proyectos" className="bg-ink px-5 py-24 md:px-10"><h2 className="hero-heading mb-12 text-center text-[clamp(3.5rem,10vw,9rem)] font-black uppercase leading-none">Proyectos</h2><div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">{projectPreviews.map(([title,url,image]) => <a key={title} href={url} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-[36px] border border-white/15 bg-white/5"><img src={image} alt={`Captura de ${title}`} className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-105" /><div className="flex items-center justify-between p-6 text-ice"><h3 className="text-2xl font-bold uppercase">{title}</h3><ArrowUpRight /></div></a>)}</div></section>;
}

function ContactSection() {
  return <section id="contacto" className="bg-ink px-6 py-24 text-center text-ice"><h2 className="hero-heading text-[clamp(3rem,9vw,8rem)] font-black uppercase">Hablemos</h2><p className="mx-auto mt-5 max-w-xl text-lg text-ice/70">Disponible para proyectos de diseño, desarrollo web y experiencias digitales.</p></section>;
}

export default function App() {
  return <main className="overflow-x-clip bg-ink font-sans"><HeroSection /><MarqueeSection /><AboutSection /><ServicesSection /><ProjectsSection /><ContactSection /></main>;
}
