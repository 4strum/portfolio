import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Code2,
  Database,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  Moon,
  ServerCog,
  Sun,
  X,
} from 'lucide-react';

const profile = {
  name: 'João Pedro',
  title: 'Desenvolvedor Full Stack',
  location: 'Brasil',
  email: 'leon.jpbs@gmail.com',
  github: 'https://github.com/4strum',
  linkedin: 'https://www.linkedin.com/in/jo%C3%A3o-pedro-borges-da-silva-84933a249/',
};

const roles = [
  'Laravel',
  'PHP',
  'MySQL',
  'React',
  'interfaces modernas',
  'produtos web escalaveis',
];

const skills = [
  { label: 'Laravel', icon: ServerCog, detail: 'APIs, MVC e integrações.' },
  { label: 'PHP', icon: Code2, detail: 'Código limpo, orientação a objetos e boas práticas.' },
  { label: 'MySQL', icon: Database, detail: 'Modelagem, consultas, índices e performance.' },
  { label: 'React', icon: Code2, detail: 'Componentes, estados, hooks e interfaces responsivas.' },
];

const projects = [
  {
    name: 'Sige',
    description:
      'Sistema feito para gerenciar contratos de estagiários, com métricas, filtros avançados e autenticação segura.',
    tags: ['Laravel', 'MySQL', 'Bootstrap'],
    deploy: 'https://sigebr.com/',
    github: 'https://sigebr.com/',
  }
];

const contactMethods = [
  {
    label: 'Email',
    value: profile.email,
    description: 'Melhor canal para propostas, orçamentos e conversas mais detalhadas.',
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: 'GitHub',
    value: '@4astrum',
    description: 'Veja meus repositórios, projetos e estudos em desenvolvimento.',
    href: profile.github,
    icon: Github,
  },
  {
    label: 'LinkedIn',
    value: 'João Pedro',
    description: 'Conecte-se comigo para networking e oportunidades profissionais.',
    href: profile.linkedin,
    icon: Linkedin,
  },
].filter((method) => method.href && !method.href.includes('seu-usuario'));

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return (
      localStorage.getItem('portfolio-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    );
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  return [theme, setTheme];
}

function useTyping(words) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const doneTyping = !isDeleting && text === current;
    const doneDeleting = isDeleting && text === '';
    const delay = doneTyping ? 1200 : isDeleting ? 42 : 78;

    const timeout = setTimeout(() => {
      if (doneTyping) {
        setIsDeleting(true);
        return;
      }

      if (doneDeleting) {
        setIsDeleting(false);
        setWordIndex((index) => (index + 1) % words.length);
        return;
      }

      setText((value) =>
        isDeleting ? current.slice(0, value.length - 1) : current.slice(0, value.length + 1),
      );
    }, delay);

    return () => clearTimeout(timeout);
  }, [isDeleting, text, wordIndex, words]);

  return text;
}

function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function App() {
  const [theme, setTheme] = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const typedText = useTyping(roles);
  const navItems = useMemo(
    () => [
      { label: 'Sobre', href: '#sobre' },
      { label: 'Projetos', href: '#projetos' },
      { label: 'Contato', href: '#contato' },
    ],
    [],
  );

  useScrollReveal();

  const toggleTheme = () => setTheme((value) => (value === 'dark' ? 'light' : 'dark'));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 antialiased transition-colors duration-500 dark:bg-[#07111f] dark:text-slate-100">
      <Header
        menuOpen={menuOpen}
        navItems={navItems}
        setMenuOpen={setMenuOpen}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main>
        <section
          id="home"
          className="relative isolate flex min-h-[88vh] items-center overflow-hidden px-5 pb-20 pt-28 sm:px-8 lg:px-12"
        >
          <HeroPattern />
          <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="max-w-3xl" data-reveal>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-white/70 px-4 py-2 text-sm font-medium text-cyan-700 shadow-sm backdrop-blur dark:bg-slate-900/60 dark:text-cyan-200">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_16px_rgba(16,185,129,0.75)]" />
                Disponivel para novos projetos
              </p>
              <h1 className="text-5xl font-semibold tracking-normal text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
                Olá, eu sou <span className="text-cyan-600 dark:text-cyan-300">{profile.name}</span>.
              </h1>
              <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-700 dark:text-slate-300">
                {profile.title} focado em criar produtos web rápidos, bem estruturados e
                agradáveis de usar. Trabalho com{' '}
                <span className="typing-caret font-semibold text-slate-950 dark:text-white">
                  {typedText}
                </span>
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#projetos"
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
                >
                  Ver projetos
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#contato"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white dark:hover:border-cyan-300 dark:hover:text-cyan-200"
                >
                  Falar comigo
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
            <HeroShowcase />
          </div>
        </section>

        <section id="sobre" className="px-5 py-24 sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div data-reveal>
              <SectionLabel>Sobre mim</SectionLabel>
              <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-normal text-slate-950 dark:text-white sm:text-4xl">
                Construo aplicações com base sólida, UI precisa e código sustentável.
              </h2>
            </div>
            <div className="space-y-7" data-reveal>
              <p className="text-lg leading-8 text-slate-700 dark:text-slate-300">
                Sou desenvolvedor com experiência em sistemas web, APIs e interfaces
                responsivas. Minha abordagem junta organização técnica, clareza visual e foco
                em experiências que resolvem problemas reais.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {skills.map((skill) => (
                  <article
                    className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-glow dark:border-slate-800 dark:bg-slate-900/75 dark:hover:border-cyan-500"
                    key={skill.label}
                  >
                    <skill.icon className="h-6 w-6 text-cyan-600 dark:text-cyan-300" />
                    <h3 className="mt-4 font-semibold text-slate-950 dark:text-white">
                      {skill.label}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {skill.detail}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="projetos" className="bg-white px-5 py-24 dark:bg-slate-950/35 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end" data-reveal>
              <div>
                <SectionLabel>Projetos</SectionLabel>
                <h2 className="mt-4 text-3xl font-semibold tracking-normal text-slate-950 dark:text-white sm:text-4xl">
                  Trabalhos em destaque
                </h2>
              </div>
              <p className="max-w-xl text-slate-600 dark:text-slate-400">
                Soluções pensadas para clareza, performance e manutenção, da arquitetura do
                backend aos detalhes de interação no frontend.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {projects.map((project, index) => (
                <ProjectCard index={index} key={project.name} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="px-5 py-24 sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div data-reveal>
              <SectionLabel>Contato</SectionLabel>
              <h2 className="mt-4 text-3xl font-semibold tracking-normal text-slate-950 dark:text-white sm:text-4xl">
                Me encontre pelos canais abaixo.
              </h2>
              <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                Para propostas, oportunidades ou troca de ideias sobre desenvolvimento web,
                escolha o canal que fizer mais sentido.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {!profile.linkedin.includes('seu-usuario') && (
                  <SocialLink href={profile.linkedin} icon={Linkedin} label="LinkedIn" />
                )}
                <SocialLink href={profile.github} icon={Github} label="GitHub" />
                <SocialLink href={`mailto:${profile.email}`} icon={Mail} label="Email" />
              </div>
            </div>
            <div className="grid gap-4" data-reveal>
              {contactMethods.map((method) => (
                <ContactCard key={method.label} method={method} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Header({ menuOpen, navItems, setMenuOpen, theme, toggleTheme }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-slate-50/82 px-5 py-4 backdrop-blur-xl transition-colors dark:border-slate-800/80 dark:bg-[#07111f]/82 sm:px-8 lg:px-12">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <a className="flex items-center gap-3 font-semibold text-slate-950 dark:text-white" href="#home">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-600 text-white shadow-lg shadow-cyan-500/25 dark:bg-cyan-300 dark:text-slate-950">
            JP
          </span>
          <span>{profile.name}</span>
        </a>
        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <a
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-200/70 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
          <ThemeButton theme={theme} toggleTheme={toggleTheme} />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeButton theme={theme} toggleTheme={toggleTheme} />
          <button
            aria-label="Abrir menu"
            className="grid h-11 w-11 place-items-center rounded-lg border border-slate-300 bg-white text-slate-800 transition hover:border-cyan-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            onClick={() => setMenuOpen((value) => !value)}
            type="button"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="mx-auto mt-4 grid max-w-7xl gap-2 rounded-lg border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-slate-900 md:hidden">
          {navItems.map((item) => (
            <a
              className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              href={item.href}
              key={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function ThemeButton({ theme, toggleTheme }) {
  return (
    <button
      aria-label="Alternar tema"
      className="group grid h-11 w-11 place-items-center rounded-lg border border-slate-300 bg-white text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-cyan-300 dark:hover:text-cyan-200"
      onClick={toggleTheme}
      title="Alternar tema"
      type="button"
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

function HeroPattern() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.08)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 dark:bg-[linear-gradient(to_right,rgba(148,163,184,0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.09)_1px,transparent_1px)]" />
      <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-cyan-100/70 to-transparent dark:from-cyan-950/25" />
    </div>
  );
}

function HeroShowcase() {
  return (
    <div className="relative mx-auto w-full max-w-xl" data-reveal>
      <div className="relative animate-float rounded-lg border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/12 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">portfolio.jsx</span>
        </div>
        <div className="grid gap-4 pt-5 lg:grid-cols-[1fr_0.72fr]">
          <div className="space-y-3 rounded-lg bg-slate-950 p-4 font-mono text-sm text-slate-200">
            <p><span className="text-cyan-300">const</span> stack = [</p>
            <p className="pl-5 text-emerald-300">'Laravel', 'PHP',</p>
            <p className="pl-5 text-emerald-300">'MySQL', 'React'</p>
            <p>];</p>
            <p><span className="text-cyan-300">return</span> buildProduct(stack);</p>
          </div>
          <div className="grid gap-3">
            {['API limpa', 'UI responsiva', 'Performance'].map((item) => (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950" key={item}>
                <div className="mb-2 h-2 w-16 rounded-full bg-cyan-500" />
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute -bottom-8 left-8 hidden rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:block">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          Local
        </p>
        <p className="mt-1 font-semibold text-slate-950 dark:text-white">{profile.location}</p>
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">
      {children}
    </p>
  );
}

function ProjectCard({ index, project }) {
  return (
    <article
      className="group flex min-h-[360px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-glow dark:border-slate-800 dark:bg-slate-900/80"
      data-reveal
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="relative h-36 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.55),transparent_28%),radial-gradient(circle_at_85%_35%,rgba(245,158,11,0.42),transparent_24%),linear-gradient(135deg,#0f172a,#172554_55%,#0f766e)]" />
        <div className="absolute inset-x-5 bottom-5 rounded-lg border border-white/15 bg-white/10 p-3 backdrop-blur">
          <div className="h-2 w-24 rounded-full bg-white/70" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <span className="h-10 rounded bg-white/20" />
            <span className="h-10 rounded bg-white/20" />
            <span className="h-10 rounded bg-white/20" />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{project.name}</h3>
        <p className="mt-3 flex-1 leading-7 text-slate-600 dark:text-slate-400">
          {project.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-700 dark:text-cyan-200"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <a
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-slate-700 transition hover:border-cyan-400 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-cyan-300"
            href={project.github}
            rel="noreferrer"
            target="_blank"
            title="Abrir GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-slate-700 transition hover:border-cyan-400 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-cyan-300"
            href={project.deploy}
            rel="noreferrer"
            target="_blank"
            title="Abrir deploy"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

function SocialLink({ href, icon: Icon, label }) {
  return (
    <a
      className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-cyan-300"
      href={href}
      rel="noreferrer"
      target={href.startsWith('mailto:') ? undefined : '_blank'}
    >
      <Icon className="h-4 w-4" />
      {label}
    </a>
  );
}

function ContactCard({ method }) {
  const Icon = method.icon;

  return (
    <a
      className="group flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:border-slate-800 dark:bg-slate-900/75 dark:hover:border-cyan-500"
      href={method.href}
      rel="noreferrer"
      target={method.href.startsWith('mailto:') ? undefined : '_blank'}
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-cyan-500/10 text-cyan-700 transition group-hover:bg-cyan-600 group-hover:text-white dark:text-cyan-300">
        <Icon className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
          {method.label}
        </span>
        <span className="mt-1 block text-lg font-semibold text-slate-950 dark:text-white">
          {method.value}
        </span>
        <span className="mt-2 block leading-7 text-slate-600 dark:text-slate-400">
          {method.description}
        </span>
      </span>
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 px-5 py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 sm:px-8 lg:px-12">
      <p>
        © {new Date().getFullYear()} {profile.name}. Criado com React e Tailwind CSS.
      </p>
    </footer>
  );
}

export default App;
