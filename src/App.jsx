import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Menu, Moon, Sun, X } from 'lucide-react';

const profile = {
  name: 'João Pedro',
  role: 'Desenvolvedor full stack',
  email: 'leon.jpbs@gmail.com',
  github: 'https://github.com/4strum',
  linkedin: 'https://www.linkedin.com/in/jo%C3%A3o-pedro-borges-da-silva-84933a249/',
};

const technologies = [
  { name: 'Laravel', note: 'back-end & APIs', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' },
  { name: 'PHP', note: 'aplicações de negócio', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
  { name: 'React', note: 'interfaces web', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Vue', note: 'interfaces progressivas', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg' },
  { name: 'MySQL', note: 'dados & performance', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
  { name: 'JavaScript', note: 'experiências no front', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'Git', note: 'versionamento & colaboração', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
];
const experiences = [
  {
    eyebrow: 'Experiência recente · projeto confidencial',
    title: 'Estabilidade e evolução de uma aplicação em produção.',
    description: 'Atuei na identificação e resolução de problemas que afetavam a operação diária do sistema, sem expor detalhes do produto ou do cliente.',
    highlights: ['Investigação e correção de estouros de memória', 'Ajustes de responsividade para fluxos mobile', 'Correção de bugs gerais e evolução de funcionalidades', 'Integrações com APIs de terceiros e tratamento de falhas'],
    confidential: true,
  },
  {
    eyebrow: 'Desenvolvimento full stack',
    title: 'Do banco de dados à interface que as pessoas realmente usam.',
    description: 'Construção e manutenção de aplicações web com foco em fluxos claros, código sustentável e atenção aos detalhes que aparecem depois do deploy.',
    highlights: ['APIs e regras de negócio em Laravel e PHP', 'Consultas, modelagem e manutenção em MySQL', 'Interfaces responsivas com React e JavaScript'],
  },
];
const projects = [{
  name: 'SIGE',
  type: 'Sistema de gestão',
  description: 'Uma aplicação para gerenciar contratos de estagiários, com métricas, filtros avançados e autenticação.',
  stack: ['Laravel', 'MySQL', 'Bootstrap'],
  href: 'https://sigebr.com/',
}];
const navItems = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Stack', href: '#tecnologias' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Contato', href: '#contato' },
];

function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'light');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);
  return [theme, setTheme];
}
function usePageMotion() {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    let frame;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(max > 0 ? window.scrollY / max : 0);
      frame = undefined;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return scroll;
}
function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.dataset.revealed = 'true';
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function App() {
  const [theme, setTheme] = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const scroll = usePageMotion();
  useReveal();
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <div aria-hidden="true" className="scroll-progress" style={{ transform: `scaleX(${scroll})` }} />
      <Header menuOpen={menuOpen} onClose={closeMenu} setMenuOpen={setMenuOpen} theme={theme} toggleTheme={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))} />
      <main>
        <section className="hero" id="inicio">
          <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
          <div className="page-grid hero-grid">
            <p className="hero-status" data-reveal><span /> Disponível para conversar</p>
            <div className="hero-copy" data-reveal>
              <p className="kicker">Portfólio / 2026</p>
              <h1>Eu transformo sistemas <em>complexos</em> em experiências que funcionam.</h1>
              <p className="hero-intro">{profile.role} com foco em aplicações web bem resolvidas: da regra de negócio à interface, passando por performance, manutenção e mobile.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#experiencia">Ver minha experiência <ArrowDown size={17} strokeWidth={1.8} /></a>
                <a className="text-link" href={`mailto:${profile.email}`}>Vamos conversar <ArrowUpRight size={16} /></a>
              </div>
            </div>
            <div className="system-window" data-reveal>
              <div className="window-bar"><span><i /><i /><i /></span><span>system://joao-pedro</span><span>•••</span></div>
              <div className="terminal-copy">
                <p><b>$</b> status --portfolio</p>
                <p className="terminal-success">● system online</p>
                <p><b>$</b> focus</p>
                <p className="terminal-value">full-stack / web / reliability</p>
                <p><b>$</b> availability</p>
                <p className="terminal-value">open_to_work = true<span className="cursor">_</span></p>
              </div>
              <div className="window-footer"><span>MEM 48%</span><span>UPTIME 99.9%</span></div>
            </div>
          </div>
        </section>

        <section className="section about-section" id="sobre">
          <div className="page-grid about-grid">
            <p className="section-number" data-reveal>01 / SOBRE</p>
            <div data-reveal>
              <h2>Não penso no front e no back como partes separadas.</h2>
              <p className="body-large">Gosto de entender o caminho inteiro: como os dados chegam, onde a regra mora, onde a interface pode falhar e como a pessoa usa aquilo em uma tela pequena, no meio da rotina.</p>
            </div>
            <aside className="about-note" data-reveal><span className="note-mark">✳</span><p>Menos enfeite. Mais intenção, velocidade e clareza.</p></aside>
          </div>
        </section>

        <section className="section technology-section" id="tecnologias">
          <div className="page-grid">
            <div className="section-heading" data-reveal><p className="section-number">02 / TECNOLOGIAS</p><h2>Ferramentas que uso para tirar produto do papel.</h2></div>
            <div className="technology-list">
              {technologies.map((technology, index) => <article className="technology-row" data-reveal key={technology.name} style={{ '--delay': `${index * 70}ms` }}>
                <img alt="" className="technology-logo" loading="lazy" src={technology.logo} />
                <div><span className="technology-index">SYS.0{index + 1}</span><h3>{technology.name}</h3><p>{technology.note}</p></div>
                <span className="technology-state">READY</span>
              </article>)}
            </div>
          </div>
        </section>

        <section className="section experience-section" id="experiencia">
          <div className="page-grid">
            <div className="experience-intro" data-reveal>
              <p className="section-number">03 / EXPERIÊNCIA</p><h2>O tipo de trabalho que deixa um produto mais confiável.</h2>
              <p>Além de construir, gosto de entrar no detalhe: investigar o que está quebrando, corrigir a causa e deixar o fluxo mais sólido para quem vem depois.</p>
            </div>
            <div className="experience-list">
              {experiences.map((experience, index) => <article className="experience-item" data-reveal key={experience.title} style={{ '--delay': `${index * 90}ms` }}>
                <div className="experience-meta"><span>0{index + 1}</span>{experience.confidential && <span className="confidential-badge">Confidencial</span>}</div>
                <div><p className="experience-eyebrow">{experience.eyebrow}</p><h3>{experience.title}</h3><p className="experience-description">{experience.description}</p>
                  <ul>{experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
                </div>
              </article>)}
            </div>
          </div>
        </section>

        <section className="section work-section" id="projetos">
          <div className="page-grid">
            <div className="section-heading" data-reveal><p className="section-number">04 / PROJETO PÚBLICO</p><h2>Uma seleção pequena, com contexto.</h2></div>
            <div className="project-list">{projects.map((project) => <article className="project" data-reveal key={project.name}>
              <div className="project-topline"><span>{project.type}</span><span>01</span></div><h3>{project.name}</h3><p>{project.description}</p>
              <div className="project-footer"><div className="tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div><a aria-label={`Abrir ${project.name}`} href={project.href} rel="noreferrer" target="_blank"><ArrowUpRight size={22} /></a></div>
            </article>)}</div>
          </div>
        </section>

        <section className="contact-section" id="contato">
          <div className="page-grid contact-grid">
            <div data-reveal><p className="section-number">05 / CONTATO</p><h2>Tem um problema interessante para resolver?</h2></div>
            <div className="contact-actions" data-reveal>
              <a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={25} /></a>
              <div className="social-links"><a href={profile.linkedin} rel="noreferrer" target="_blank"><Linkedin size={18} /> LinkedIn</a><a href={profile.github} rel="noreferrer" target="_blank"><Github size={18} /> GitHub</a><a href={`mailto:${profile.email}`}><Mail size={18} /> Email</a></div>
            </div>
          </div>
        </section>
      </main>
      <footer><span>© {new Date().getFullYear()} {profile.name}</span><span>Feito com React</span></footer>
    </div>
  );
}

function Header({ menuOpen, onClose, setMenuOpen, theme, toggleTheme }) {
  return <header className="header">
    <nav className="page-grid nav">
      <a className="brand" href="#inicio" onClick={onClose}><span>JP</span> João Pedro</a>
      <div className="desktop-nav">{navItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}<ThemeButton theme={theme} toggleTheme={toggleTheme} /></div>
      <div className="mobile-actions"><ThemeButton theme={theme} toggleTheme={toggleTheme} /><button aria-expanded={menuOpen} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} className="menu-button" onClick={() => setMenuOpen((value) => !value)} type="button">{menuOpen ? <X size={20} /> : <Menu size={21} />}</button></div>
    </nav>
    <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}>{navItems.map((item, index) => <a href={item.href} key={item.href} onClick={onClose}><span>0{index + 1}</span>{item.label}<ArrowUpRight size={18} /></a>)}</div>
  </header>;
}
function ThemeButton({ theme, toggleTheme }) {
  return <button aria-label="Alternar tema" className="theme-button" onClick={toggleTheme} type="button">{theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}</button>;
}
export default App;
