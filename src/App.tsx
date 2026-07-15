import { ReactNode, useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import robotPortrait from './assets/robot.webp';

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
};

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

const decor = {
  moon: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
  object: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
  lego: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
  group: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
};

const services = [
  ['01', '3D Modeling', 'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.'],
  ['02', 'Rendering', 'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.'],
  ['03', 'Motion Design', 'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.'],
  ['04', 'Branding', 'Crafting cohesive visual identities — from logos to full brand systems — that communicate a clear and memorable presence.'],
  ['05', 'Web Design', 'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.'],
];

const projects = [
  {
    number: '01',
    name: 'Nextlevel Studio',
    category: 'Client',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    ],
  },
  {
    number: '02',
    name: 'Aura Brand Identity',
    category: 'Personal',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    ],
  },
  {
    number: '03',
    name: 'Solaris Digital',
    category: 'Client',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    ],
  },
];

function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = '' }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ContactButton() {
  return (
    <button className="rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white outline outline-2 outline-offset-[-3px] outline-white transition hover:scale-105 sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base" style={{ background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)', boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset' }}>
      Contact Me
    </button>
  );
}

function LiveProjectButton() {
  return (
    <button className="inline-flex items-center gap-2 rounded-full border-2 border-ice px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-ice transition hover:bg-ice/10 sm:px-10 sm:py-3.5 sm:text-base">
      Live Project <ArrowUpRight size={18} />
    </button>
  );
}

function Magnet({ children, padding = 150, strength = 3 }: { children: ReactNode; padding?: number; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('translate3d(0,0,0)');
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inside = event.clientX > rect.left - padding && event.clientX < rect.right + padding && event.clientY > rect.top - padding && event.clientY < rect.bottom + padding;
      if (!inside) {
        setActive(false);
        setTransform('translate3d(0,0,0)');
        return;
      }
      setActive(true);
      const x = (event.clientX - (rect.left + rect.width / 2)) / strength;
      const y = (event.clientY - (rect.top + rect.height / 2)) / strength;
      setTransform(`translate3d(${x}px, ${y}px, 0)`);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [padding, strength]);

  return (
    <div ref={ref} style={{ transform, transition: active ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out', willChange: 'transform' }}>
      {children}
    </div>
  );
}

function AnimatedChar({ children, progress, start, end }: { children: string; progress: MotionValue<number>; start: number; end: number }) {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });
  return (
    <p ref={ref} className="mx-auto max-w-[560px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-ice">
      {text.split('').map((char, i) => {
        const start = i / text.length;
        const end = Math.min(start + 0.12, 1);
        return (
          <AnimatedChar key={`${char}-${i}`} progress={scrollYProgress} start={start} end={end}>
            {char === ' ' ? '\u00A0' : char}
          </AnimatedChar>
        );
      })}
    </p>
  );
}

function HeroSection() {
  return (
    <section className="relative flex h-screen flex-col overflow-x-clip bg-ink">
      <FadeIn delay={0} y={-20}>
        <nav className="flex justify-between px-6 pt-6 text-sm font-medium uppercase tracking-wider text-ice md:px-10 md:pt-8 md:text-lg lg:text-[1.4rem]">
          {['About', 'Price', 'Projects', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="transition duration-200 hover:opacity-70">
              {item}
            </a>
          ))}
        </nav>
      </FadeIn>

      <FadeIn delay={0.15} y={40} className="overflow-hidden">
        <h1 className="hero-heading mt-6 w-full whitespace-nowrap text-center text-[14vw] font-black uppercase leading-none tracking-tight sm:mt-4 sm:text-[15vw] md:-mt-5 md:text-[16vw] lg:text-[17.5vw]">
          Hi, i&apos;m jack
        </h1>
      </FadeIn>

      <FadeIn delay={0.6} y={30} className="absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]">
        <Magnet>
          <img src={robotPortrait} alt="Robot portrait" className="w-full object-contain drop-shadow-[0_0_70px_rgba(182,0,168,0.35)]" />
        </Magnet>
      </FadeIn>

      <div className="relative z-20 mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p className="max-w-[160px] text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-ice sm:max-w-[220px] md:max-w-[260px]">
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}

function MarqueeSection() {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const firstRow = marqueeImages.slice(0, 11);
  const secondRow = marqueeImages.slice(11);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const sectionTop = ref.current.offsetTop;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const renderRow = (images: string[], direction: 'right' | 'left') => (
    <div className="flex gap-3" style={{ transform: `translateX(${direction === 'right' ? offset - 200 : -(offset - 200)}px)`, willChange: 'transform' }}>
      {[...images, ...images, ...images].map((src, index) => (
        <img key={`${src}-${index}`} src={src} alt="3D project preview" loading="lazy" className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover" />
      ))}
    </div>
  );

  return (
    <section ref={ref} className="overflow-hidden bg-ink pb-10 pt-24 sm:pt-32 md:pt-40">
      <div className="flex flex-col gap-3">
        {renderRow(firstRow, 'right')}
        {renderRow(secondRow, 'left')}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-5 py-20 sm:px-8 md:px-10">
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute left-[1%] top-[4%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]"><img src={decor.moon} alt="Moon icon" /></FadeIn>
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]"><img src={decor.object} alt="3D object" /></FadeIn>
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute right-[1%] top-[4%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]"><img src={decor.lego} alt="Lego icon" /></FadeIn>
      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]"><img src={decor.group} alt="3D group" /></FadeIn>

      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">About me</h2>
        </FadeIn>
        <AnimatedText text="With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!" />
        <div className="pt-6 sm:pt-10 md:pt-14"><ContactButton /></div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="price" className="rounded-t-[40px] bg-white px-5 py-20 text-ink sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <FadeIn><h2 className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none md:mb-28">Services</h2></FadeIn>
      <div className="mx-auto max-w-5xl">
        {services.map(([number, title, description], index) => (
          <FadeIn key={number} delay={index * 0.1}>
            <div className="grid grid-cols-[0.42fr_1fr] gap-6 border-t border-black/15 py-8 last:border-b sm:py-10 md:py-12">
              <span className="text-[clamp(3rem,10vw,140px)] font-black leading-none text-ink">{number}</span>
              <div className="flex flex-col justify-center gap-3">
                <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase">{title}</h3>
                <p className="max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed opacity-60">{description}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, total }: { project: (typeof projects)[number]; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={ref} className="h-[85vh]">
      <motion.article className="sticky rounded-[40px] border-2 border-ice bg-ink p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8" style={{ top: `calc(6rem + ${index * 28}px)`, scale }}>
        <div className="mb-6 flex flex-col gap-5 text-ice lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-end gap-5">
            <span className="text-[clamp(3rem,10vw,140px)] font-black leading-none">{project.number}</span>
            <div className="pb-3">
              <p className="text-sm uppercase tracking-[0.35em] opacity-60">{project.category}</p>
              <h3 className="text-[clamp(1.6rem,4vw,4rem)] font-black uppercase leading-none">{project.name}</h3>
            </div>
          </div>
          <LiveProjectButton />
        </div>
        <div className="grid gap-3 lg:grid-cols-[0.4fr_0.6fr]">
          <div className="grid gap-3">
            <img src={project.images[0]} alt={`${project.name} preview 1`} loading="lazy" className="h-[clamp(130px,16vw,230px)] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]" />
            <img src={project.images[1]} alt={`${project.name} preview 2`} loading="lazy" className="h-[clamp(160px,22vw,340px)] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]" />
          </div>
          <img src={project.images[2]} alt={`${project.name} preview 3`} loading="lazy" className="h-full min-h-[320px] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]" />
        </div>
      </motion.article>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 -mt-10 rounded-t-[40px] bg-ink px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10">
      <FadeIn><h2 className="hero-heading mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">Project</h2></FadeIn>
      <div className="mx-auto max-w-7xl">
        {projects.map((project, index) => <ProjectCard key={project.name} project={project} index={index} total={projects.length} />)}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main className="overflow-x-clip bg-ink font-sans">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </main>
  );
}
