import { ReactNode, useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import robotPortrait from './assets/robot-data';

const marqueeImages = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

const decor = [
  ['https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png', 'left-[1%] top-[4%] w-[120px] sm:w-[160px] md:w-[210px]'],
  ['https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png', 'bottom-[8%] left-[3%] w-[100px] sm:w-[140px] md:w-[180px]'],
  ['https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png', 'right-[1%] top-[4%] w-[120px] sm:w-[160px] md:w-[210px]'],
  ['https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png', 'bottom-[8%] right-[3%] w-[130px] sm:w-[170px] md:w-[220px]'],
];

const services = [
  ['01', 'Modelado 3D', 'Creación de objetos, personajes y ambientes detallados, diseñados para marcas, productos, campañas visuales y experiencias digitales memorables.'],
  ['02', 'Renderizado', 'Renders fotorrealistas de alta calidad con iluminación, texturas y materiales personalizados para presentar conceptos con impacto profesional.'],
  ['03', 'Diseño en movimiento', 'Animaciones y piezas dinámicas que agregan energía, narrativa y profundidad visual a productos, marcas y contenidos digitales.'],
  ['04', 'Identidad visual', 'Construcción de sistemas visuales coherentes, desde logotipos hasta estilos completos, para comunicar una presencia clara y memorable.'],
  ['05', 'Diseño web', 'Diseño de sitios modernos, limpios y enfocados en conversión, con atención al layout, la tipografía y la experiencia de usuario.'],
];

const projects = [
  ['01', 'Estudio Nextlevel', 'Cliente', ['https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85', 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85', 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85']],
  ['02', 'Identidad Aura', 'Personal', ['https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85', 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85', 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85']],
  ['03', 'Solaris Digital', 'Cliente', ['https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85', 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85', 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85']],
] as const;

function FadeIn({ children, delay = 0, x = 0, y = 30, className = '' }: { children: ReactNode; delay?: number; x?: number; y?: number; className?: string }) {
  return <motion.div initial={{ opacity: 0, x, y }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, margin: '50px', amount: 0 }} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>{children}</motion.div>;
}

function ContactButton() {
  return <button className="rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white outline outline-2 outline-offset-[-3px] outline-white transition hover:scale-105 sm:px-10 sm:py-3.5 md:px-12 md:py-4" style={{ background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)', boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset' }}>Contáctame</button>;
}

function Magnet({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('translate3d(0,0,0)');
  useEffect(() => {
    const move = (e: MouseEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const inside = e.clientX > r.left - 150 && e.clientX < r.right + 150 && e.clientY > r.top - 150 && e.clientY < r.bottom + 150;
      setTransform(inside ? `translate3d(${(e.clientX - (r.left + r.width / 2)) / 3}px, ${(e.clientY - (r.top + r.height / 2)) / 3}px, 0)` : 'translate3d(0,0,0)');
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div ref={ref} style={{ transform, transition: 'transform 0.4s ease-out', willChange: 'transform' }}>{children}</div>;
}

function HeroSection() {
  return <section className="relative flex h-screen flex-col overflow-x-clip bg-ink">
    <FadeIn y={-20}><nav className="flex justify-between px-6 pt-6 text-sm font-medium uppercase tracking-wider text-ice md:px-10 md:pt-8 md:text-lg lg:text-[1.4rem]">{[['Acerca de', 'about'], ['Servicios', 'price'], ['Proyectos', 'projects'], ['Contacto', 'contact']].map(([item, href]) => <a key={item} href={`#${href}`} className="transition duration-200 hover:opacity-70">{item}</a>)}</nav></FadeIn>
    <FadeIn delay={0.15} y={40} className="overflow-hidden"><h1 className="hero-heading mt-6 w-full whitespace-nowrap text-center text-[14vw] font-black uppercase leading-none tracking-tight sm:mt-4 sm:text-[15vw] md:-mt-5 md:text-[16vw] lg:text-[17.5vw]">Hola, soy Daniel</h1></FadeIn>
    <FadeIn delay={0.6} y={30} className="absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]"><Magnet><img src={robotPortrait} alt="Retrato cibernético de Daniel" className="w-full object-contain drop-shadow-[0_0_70px_rgba(182,0,168,0.35)]" /></Magnet></FadeIn>
    <div className="relative z-20 mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10"><FadeIn delay={0.35} y={20}><p className="max-w-[160px] text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-ice sm:max-w-[220px] md:max-w-[260px]">creador digital 3D enfocado en proyectos visuales impactantes e inolvidables</p></FadeIn><FadeIn delay={0.5} y={20}><ContactButton /></FadeIn></div>
  </section>;
}

function MarqueeSection() {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => { const onScroll = () => ref.current && setOffset((window.scrollY - ref.current.offsetTop + window.innerHeight) * 0.3); onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll); }, []);
  const row = (imgs: string[], right = true) => <div className="flex gap-3" style={{ transform: `translateX(${right ? offset - 200 : -(offset - 200)}px)`, willChange: 'transform' }}>{[...imgs, ...imgs, ...imgs].map((src, i) => <img key={`${src}-${i}`} src={src} alt="Vista previa de proyecto 3D" loading="lazy" className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover" />)}</div>;
  return <section ref={ref} className="overflow-hidden bg-ink pb-10 pt-24 sm:pt-32 md:pt-40"><div className="flex flex-col gap-3">{row(marqueeImages.slice(0, 11))}{row(marqueeImages.slice(11), false)}</div></section>;
}

function AboutSection() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.25, 1]);
  return <section id="about" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-5 py-20 sm:px-8 md:px-10">
    {decor.map(([src, pos], i) => <FadeIn key={src} delay={0.1 + i * 0.06} x={i < 2 ? -80 : 80} y={0} className={`absolute ${pos}`}><img src={src} alt="Objeto decorativo 3D" /></FadeIn>)}
    <div className="relative z-10 flex flex-col items-center gap-12 md:gap-16"><FadeIn><h2 className="hero-heading text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">Sobre mí</h2></FadeIn><motion.p ref={ref} style={{ opacity }} className="mx-auto max-w-[560px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-ice">Con más de cinco años de experiencia en diseño, me enfoco en branding, diseño web y experiencias visuales. Disfruto trabajar con negocios que buscan destacar, fortalecer su imagen y presentar sus ideas con impacto. Construyamos algo increíble juntos.</motion.p><ContactButton /></div>
  </section>;
}

function ServicesSection() {
  return <section id="price" className="rounded-t-[40px] bg-white px-5 py-20 text-ink sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"><FadeIn><h2 className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none md:mb-28">Servicios</h2></FadeIn><div className="mx-auto max-w-5xl">{services.map(([n, t, d], i) => <FadeIn key={n} delay={i * 0.1}><div className="grid grid-cols-[0.42fr_1fr] gap-6 border-t border-black/15 py-8 last:border-b sm:py-10 md:py-12"><span className="text-[clamp(3rem,10vw,140px)] font-black leading-none">{n}</span><div className="flex flex-col justify-center gap-3"><h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase">{t}</h3><p className="max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed opacity-60">{d}</p></div></div></FadeIn>)}</div></section>;
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (2 - index) * 0.03]);
  const [number, name, category, images] = project;
  return <div ref={ref} className="h-[85vh]"><motion.article className="sticky rounded-[40px] border-2 border-ice bg-ink p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8" style={{ top: `calc(6rem + ${index * 28}px)`, scale }}><div className="mb-6 flex flex-col gap-5 text-ice lg:flex-row lg:items-center lg:justify-between"><div className="flex flex-wrap items-end gap-5"><span className="text-[clamp(3rem,10vw,140px)] font-black leading-none">{number}</span><div className="pb-3"><p className="text-sm uppercase tracking-[0.35em] opacity-60">{category}</p><h3 className="text-[clamp(1.6rem,4vw,4rem)] font-black uppercase leading-none">{name}</h3></div></div><button className="inline-flex items-center gap-2 rounded-full border-2 border-ice px-6 py-2.5 text-xs font-medium uppercase tracking-widest transition hover:bg-ice/10 sm:px-10 sm:py-3.5">Ver proyecto <ArrowUpRight size={18} /></button></div><div className="grid gap-3 lg:grid-cols-[0.4fr_0.6fr]"><div className="grid gap-3"><img src={images[0]} alt="Vista previa del proyecto" className="h-[clamp(130px,16vw,230px)] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]" /><img src={images[1]} alt="Vista previa del proyecto" className="h-[clamp(160px,22vw,340px)] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]" /></div><img src={images[2]} alt="Vista previa del proyecto" className="h-full min-h-[320px] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]" /></div></motion.article></div>;
}

function ProjectsSection() {
  return <section id="projects" className="relative z-10 -mt-10 rounded-t-[40px] bg-ink px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10"><FadeIn><h2 className="hero-heading mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">Proyectos</h2></FadeIn><div className="mx-auto max-w-7xl">{projects.map((project, index) => <ProjectCard key={project[1]} project={project} index={index} />)}</div></section>;
}

export default function App() {
  return <main className="overflow-x-clip bg-ink font-sans"><HeroSection /><MarqueeSection /><AboutSection /><ServicesSection /><ProjectsSection /></main>;
}
