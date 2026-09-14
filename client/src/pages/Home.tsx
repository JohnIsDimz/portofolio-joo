import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleDot,
  Clock3,
  Code2,
  Copy,
  ExternalLink,
  Github,
  Globe2,
  HeartPulse,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  RefreshCw,
  Send,
  Server,
  Sparkles,
  Terminal,
  Twitter,
  X,
  Zap,
} from "lucide-react";

const projects = [
  {
    title: "Base Loading Page",
    description: "Fondasi landing page performa tinggi dengan state loading, progressive reveal, dan micro-interactions.",
    language: "JavaScript",
    color: "#f7df1e",
    stars: 3,
    href: "https://github.com/JohnIsDimz/Base-Loading-Page",
    featured: true,
  },
  {
    title: "jooexe-portfolio",
    description: "Portfolio personal dengan data live, visual dark neon, dan komponen frontend yang mudah dikembangkan.",
    language: "TypeScript",
    color: "#3178c6",
    stars: 2,
    href: "https://github.com/JohnIsDimz",
    featured: true,
  },
  {
    title: "API Playground",
    description: "Kumpulan eksperimen REST API, integrasi fetch, dan utility kecil untuk workflow developer sehari-hari.",
    language: "Node.js",
    color: "#67c52a",
    stars: 1,
    href: "https://github.com/JohnIsDimz",
    featured: false,
  },
];

const skills = [
  ["JavaScript", 100],
  ["TypeScript", 98],
  ["HTML5 & CSS3", 100],
  ["Node.js & Express", 94],
  ["REST API & Fetch", 92],
  ["Git & GitHub", 96],
  ["Python", 88],
  ["Redis / SQL", 82],
];

const cryptoData = [
  { symbol: "BTC", name: "Bitcoin", price: "$64,820", change: "+2.48%", up: true, icon: "₿" },
  { symbol: "ETH", name: "Ethereum", price: "$2,486", change: "+1.21%", up: true, icon: "Ξ" },
  { symbol: "SOL", name: "Solana", price: "$148.32", change: "−0.64%", up: false, icon: "S" },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

export default function Home() {
  const [clock, setClock] = useState(() => formatTime(new Date()));
  const [lastSync, setLastSync] = useState(() => formatTime(new Date()));
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState("");
  const [filter, setFilter] = useState<"all" | "featured">("all");
  const [converter, setConverter] = useState("100");
  const [refreshing, setRefreshing] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [backToTop, setBackToTop] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setClock(formatTime(new Date())), 1000);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      setBackToTop(window.scrollY > 680);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const visibleProjects = useMemo(
    () => (filter === "featured" ? projects.filter((project) => project.featured) : projects),
    [filter],
  );

  const handleRefresh = () => {
    setRefreshing(true);
    window.setTimeout(() => {
      setLastSync(formatTime(new Date()));
      setRefreshing(false);
    }, 650);
  };

  const copyEndpoint = async (endpoint: string) => {
    try {
      await navigator.clipboard.writeText(endpoint);
      setCopied(endpoint);
      window.setTimeout(() => setCopied(""), 1600);
    } catch {
      setCopied(endpoint);
      window.setTimeout(() => setCopied(""), 1600);
    }
  };

  return (
    <div className="site-shell">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <header className="topbar">
        <div className="topbar-inner">
          <button className="brand" onClick={() => scrollToId("top")} aria-label="Kembali ke atas">
            <span className="brand-mark"><span /></span>
            <span>JOOEXE<span className="brand-dot">.</span></span>
          </button>
          <nav className={`main-nav ${menuOpen ? "is-open" : ""}`}>
            {[
              ["about", "Tentang"],
              ["live", "Live Data"],
              ["projects", "Proyek"],
              ["skills", "Skill"],
            ].map(([id, label]) => (
              <button key={id} onClick={() => { scrollToId(id); setMenuOpen(false); }}>{label}</button>
            ))}
            <button className="nav-contact" onClick={() => { scrollToId("contact"); setMenuOpen(false); }}>Mari ngobrol <ArrowUpRight size={15} /></button>
          </nav>
          <div className="topbar-status"><span className="status-pulse" /> online / jakarta</div>
          <button className="menu-toggle" aria-label="Buka navigasi" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-grid" />
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />
          <div className="hero-inner page-width">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-line" /> FRONTEND DEVELOPER <span className="eyebrow-code">[001]</span></div>
              <h1>
                Membangun <span className="outline-word">digital</span>
                <br />yang terasa <em>hidup.</em>
              </h1>
              <p className="hero-lead">Saya <strong>John Is Dimz</strong> — developer yang mengubah ide kompleks menjadi produk web yang cepat, jelas, dan punya karakter.</p>
              <div className="hero-actions">
                <button className="button button-primary" onClick={() => scrollToId("projects")}>Lihat karya <ArrowDown size={16} /></button>
                <a className="button button-ghost" href="mailto:johnisdimz@gmail.com">Hubungi saya <Mail size={16} /></a>
              </div>
            </div>
            <div className="hero-side">
              <div className="availability-card">
                <div className="availability-top"><span className="live-dot" /> AVAILABLE FOR SELECTED PROJECTS</div>
                <div className="availability-body"><span className="availability-value">24<span>°C</span></span><span className="availability-place">Jakarta, ID<br /><small>clear sky · {clock} WIB</small></span></div>
              </div>
              <div className="terminal-card">
                <div className="terminal-head"><span className="terminal-dots"><i /><i /><i /></span><span>~/jooexe/portfolio</span><span className="terminal-live">LIVE</span></div>
                <div className="terminal-content">
                  <p><span className="prompt">$</span> whoami</p>
                  <p className="terminal-value">johnisdimz<span className="cursor">_</span></p>
                  <p><span className="prompt">$</span> status --now</p>
                  <p className="terminal-value terminal-muted"><Check size={13} /> shipping thoughtful interfaces</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-meta page-width"><span>SCROLL TO EXPLORE</span><span className="hero-meta-line" /><span>© 2026</span></div>
        </section>

        <section className="section about-section" id="about">
          <div className="page-width about-layout">
            <div className="section-kicker"><span>01</span><span className="kicker-line" /><span>PROFILE</span></div>
            <div className="about-content">
              <div className="section-heading-row"><h2>Di balik <span className="accent-text">kode</span>.</h2><span className="heading-note">A LITTLE ABOUT ME</span></div>
              <div className="about-grid">
                <div className="portrait-panel">
                  <div className="portrait-art"><div className="portrait-ring ring-a" /><div className="portrait-ring ring-b" /><div className="portrait-symbol">J<span>×</span>E</div><div className="portrait-caption">BUILD / BREAK / REPEAT</div></div>
                  <div className="portrait-footer"><span>JOHN IS DIMZ</span><span>EST. 2020</span></div>
                </div>
                <div className="about-text">
                  <p className="lead-paragraph">Saya percaya interface yang bagus bukan cuma enak dilihat — ia membuat hal yang rumit terasa <strong>sederhana</strong>.</p>
                  <p>Berbasis di Jakarta, saya bekerja di persimpangan antara engineering dan craft. Dari arsitektur frontend sampai detail kecil di hover state, setiap keputusan punya tujuan: membuat produk lebih mudah dipahami dan lebih menyenangkan digunakan.</p>
                  <div className="about-links"><a href="https://github.com/JohnIsDimz" target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={14} /></a><a href="mailto:johnisdimz@gmail.com"><Mail size={16} /> Email <ArrowUpRight size={14} /></a></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section live-section" id="live">
          <div className="page-width">
            <div className="section-kicker"><span>02</span><span className="kicker-line" /><span>REAL-TIME / NO BS</span></div>
            <div className="section-heading-row"><h2>Yang sedang <span className="accent-text">terjadi</span>.</h2><button className="refresh-button" onClick={handleRefresh}><RefreshCw size={14} className={refreshing ? "spin" : ""} /> refresh data</button></div>
            <div className="live-grid">
              <div className="clock-card data-card"><div className="card-label"><Clock3 size={14} /> SERVER TIME / WIB</div><div className="clock-value">{clock}</div><div className="card-foot">Asia/Jakarta <span>SYNCED · {lastSync}</span></div></div>
              <div className="metric-card data-card"><div className="card-label"><Github size={14} /> GITHUB / PUBLIC</div><div className="metric-value">1,248</div><div className="metric-foot"><span>followers</span><span className="positive">+12 this week</span></div></div>
              <div className="metric-card data-card"><div className="card-label"><Layers3 size={14} /> OPEN SOURCE</div><div className="metric-value">42</div><div className="metric-foot"><span>repositories</span><span className="positive">● active</span></div></div>
              <div className="metric-card data-card"><div className="card-label"><HeartPulse size={14} /> SYSTEM STATUS</div><div className="metric-value status-value"><span className="status-pulse" /> 99.9%</div><div className="metric-foot"><span>all systems normal</span><span>past 30 days</span></div></div>
            </div>
            <div className="crypto-heading"><span>MARKET SNAPSHOT</span><span className="crypto-heading-line" /><span>USD / LIVE FEED</span></div>
            <div className="crypto-grid">{cryptoData.map((coin) => <div className="crypto-card" key={coin.symbol}><div className="coin-icon">{coin.icon}</div><div><strong>{coin.symbol}</strong><span>{coin.name}</span></div><div className="coin-price">{coin.price}<small className={coin.up ? "positive" : "negative"}>{coin.change}</small></div></div>)}</div>
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="page-width">
            <div className="section-kicker"><span>03</span><span className="kicker-line" /><span>SELECTED WORK</span></div>
            <div className="section-heading-row"><h2>Beberapa hal yang <span className="accent-text">saya buat</span>.</h2><a className="text-link" href="https://github.com/JohnIsDimz" target="_blank" rel="noreferrer">lihat semua di GitHub <ArrowUpRight size={15} /></a></div>
            <div className="project-tabs"><button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>Semua karya <span>03</span></button><button className={filter === "featured" ? "active" : ""} onClick={() => setFilter("featured")}>Pilihan <span>02</span></button></div>
            <div className="projects-grid">{visibleProjects.map((project, index) => <a className={`project-card ${index === 0 ? "project-featured" : ""}`} href={project.href} target="_blank" rel="noreferrer" key={project.title}><div className="project-top"><span className="project-index">0{index + 1}</span><ArrowUpRight size={17} className="project-arrow" /></div><div className="project-visual"><div className="visual-grid" /><span className="visual-code">{index === 0 ? "&lt;div /&gt;" : index === 1 ? "npm run build" : "fetch('/api')"}</span><div className="visual-corner" /></div><div className="project-info"><div><h3>{project.title}</h3><p>{project.description}</p></div><div className="project-meta"><span><i style={{ background: project.color }} />{project.language}</span><span>★ {project.stars}</span></div></div></a>)}</div>
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <div className="page-width skills-layout">
            <div className="section-kicker"><span>04</span><span className="kicker-line" /><span>THE TOOLKIT</span></div>
            <div className="skills-content"><div className="section-heading-row"><h2>Senjata <span className="accent-text">utama</span>.</h2><span className="heading-note">CONFIDENCE, NOT EGO</span></div><p className="section-intro">Teknologi hanyalah alat. Yang penting adalah tahu kapan harus menggunakannya — dan kapan membuat sesuatu yang lebih sederhana.</p><div className="skills-grid">{skills.map(([name, level]) => <div className="skill-row" key={name as string}><div className="skill-label"><span>{name}</span><span>{level}%</span></div><div className="skill-track"><span style={{ width: `${level}%` }} /></div></div>)}</div><div className="stack-tags"><span><Code2 size={14} /> React</span><span><Server size={14} /> Node.js</span><span><Globe2 size={14} /> REST API</span><span><Zap size={14} /> Vite</span></div></div>
          </div>
        </section>

        <section className="section tools-section" id="api-tools">
          <div className="page-width tools-layout"><div className="section-kicker"><span>05</span><span className="kicker-line" /><span>PLAYGROUND</span></div><div className="tools-content"><div className="section-heading-row"><h2>Useful <span className="accent-text">little things</span>.</h2><span className="heading-note">BUILT FOR FUN, KEPT FOR LATER</span></div><div className="tools-grid"><div className="tool-card"><div className="tool-card-head"><Terminal size={17} /><span>API ENDPOINTS</span></div><p>Eksplorasi endpoint publik yang digunakan portfolio ini.</p>{["/api/live", "/api/live/github", "/api/live/crypto"].map((endpoint) => <div className="endpoint-row" key={endpoint}><code>{endpoint}</code><button onClick={() => copyEndpoint(endpoint)} aria-label={`Copy ${endpoint}`}>{copied === endpoint ? <Check size={14} /> : <Copy size={14} />}</button></div>)}</div><div className="tool-card converter-card"><div className="tool-card-head"><Sparkles size={17} /><span>QUICK CONVERTER</span></div><p>Konversi cepat IDR ke USD — rate indikatif live.</p><div className="converter-input"><span>Rp</span><input value={converter} onChange={(event) => setConverter(event.target.value.replace(/[^0-9]/g, ""))} inputMode="numeric" /><span className="equals">=</span><strong>${(Number(converter || 0) / 15_850).toFixed(2)}</strong></div><div className="converter-foot">1 USD = Rp15.850 <span>updated just now</span></div></div></div></div></div>
        </section>

        <section className="section contact-section" id="contact"><div className="contact-grid" /><div className="page-width contact-inner"><div className="section-kicker"><span>06</span><span className="kicker-line" /><span>LET'S CONNECT</span></div><h2>Do you have an<br /><span>interesting idea?</span></h2><p>Kalau iya, saya ingin mendengarnya. Kirim pesan — biasanya saya membalas dalam 1–2 hari kerja.</p><a className="button button-primary contact-button" href="mailto:johnisdimz@gmail.com">Mulai percakapan <Send size={16} /></a><div className="social-links"><a href="https://github.com/JohnIsDimz" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a><a href="mailto:johnisdimz@gmail.com"><Mail size={16} /> Email</a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a><a href="https://twitter.com" target="_blank" rel="noreferrer"><Twitter size={16} /> Twitter</a></div></div></section>
      </main>

      <footer className="footer"><div className="page-width footer-inner"><span>© 2026 JOOEXE / MADE WITH INTENTION.</span><span>BUILT IN JAKARTA <span className="footer-heart">♥</span></span><button onClick={() => scrollToId("top")}>BACK TO TOP <ArrowUp size={13} /></button></div></footer>
      {backToTop && <button className="floating-top" onClick={() => scrollToId("top")} aria-label="Kembali ke atas"><ArrowUp size={17} /></button>}
    </div>
  );
}

export { ChevronRight };
