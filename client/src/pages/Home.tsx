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
  Search,
  Send,
  Server,
  Terminal,
  Twitter,
  X,
  Zap,
} from "lucide-react";

const projects = [
  {
    title: "Base Loading Page",
    year: "2024",
    description: "Fondasi landing page performa tinggi dengan state loading, progressive reveal, dan micro-interactions.",
    language: "JavaScript",
    color: "#f7df1e",
    stars: 3,
    href: "https://github.com/JohnIsDimz/Base-Loading-Page",
    featured: true,
    role: "Product engineer / frontend",
    stack: ["JavaScript", "CSS architecture", "Web animation API"],
    challenge: "Landing page sering terasa lambat sebelum konten utama siap. Tantangannya adalah memberi feedback yang jelas tanpa membuat pengguna menunggu dalam keadaan pasif.",
    approach: "Mendesain loading sequence yang progresif: skeleton yang ringan, progressive reveal, dan micro-interactions yang merespons status aktual halaman. Struktur CSS dibuat modular agar mudah diadopsi ke halaman lain.",
    outcome: "Fondasi landing page reusable dengan transisi yang terasa cepat, status yang mudah dipahami, dan pola loading yang dapat dipakai lintas proyek.",
    highlights: ["Progressive reveal tanpa library berat", "State loading yang dapat dikomposisi", "Animasi tetap menghormati reduced motion"],
  },
  {
    title: "jooexe-portfolio",
    year: "2026",
    description: "Portfolio personal dengan data live, visual dark neon, dan komponen frontend yang mudah dikembangkan.",
    language: "TypeScript",
    color: "#3178c6",
    stars: 2,
    href: "https://github.com/JohnIsDimz",
    featured: true,
    role: "Design engineer / solo builder",
    stack: ["React", "TypeScript", "Vite", "Responsive CSS"],
    challenge: "Menyatukan portfolio, proof of work, dan eksperimen developer dalam satu pengalaman yang terasa personal—bukan sekadar daftar link.",
    approach: "Menggunakan editorial dark system dengan aksen cyan, grid modular, data cards, dan hierarchy yang jelas. Setiap section dirancang sebagai titik masuk berbeda: profile, live signals, karya, toolkit, lalu contact.",
    outcome: "Portfolio yang cepat dipindai, responsif di mobile, dan cukup fleksibel untuk menampung karya baru tanpa kehilangan identitas visual.",
    highlights: ["Design system dark editorial yang konsisten", "Responsive layout dari 390px sampai desktop", "Interactive live dashboard dan quick tools"],
  },
  {
    title: "API Playground",
    year: "2023",
    description: "Kumpulan eksperimen REST API, integrasi fetch, dan utility kecil untuk workflow developer sehari-hari.",
    language: "Node.js",
    color: "#67c52a",
    stars: 1,
    href: "https://github.com/JohnIsDimz",
    featured: false,
    role: "Backend-minded frontend engineer",
    stack: ["Node.js", "REST API", "Fetch", "Redis / SQL"],
    challenge: "Eksperimen API mudah menjadi kumpulan snippet yang terpisah. Dibutuhkan cara untuk menguji endpoint dan memahami response tanpa friction tambahan.",
    approach: "Menyusun endpoint berdasarkan intent, menambahkan response states yang eksplisit, dan membuat utility kecil yang bisa dipakai ulang untuk debugging, conversion, serta observability ringan.",
    outcome: "Workflow eksplorasi API yang lebih cepat dan kumpulan pola integrasi yang siap dibawa ke produk nyata.",
    highlights: ["Endpoint dengan error state yang jelas", "Utility fetch yang mudah diuji", "Pola response untuk data live"],
  },
];

const skills = [
  ["JavaScript", 100],
  ["TypeScript", 98],
  ["Python", 88],
  ["Java", 78],
  ["C#", 76],
  ["C / C++", 72],
  ["Go", 74],
  ["Rust", 68],
  ["PHP", 80],
  ["Kotlin", 70],
  ["Swift", 66],
  ["SQL", 86],
  ["HTML5 & CSS3", 100],
  ["Node.js & Express", 94],
  ["REST API & Fetch", 92],
  ["Git & GitHub", 96],
];

const cryptoData = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin", price: null, change: null, icon: "₿" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum", price: null, change: null, icon: "Ξ" },
  { id: "solana", symbol: "SOL", name: "Solana", price: null, change: null, icon: "S" },
];
type MarketCoin = (typeof cryptoData)[number];
const formatUsd = (value: number) => `$${new Intl.NumberFormat("en-US", { maximumFractionDigits: value < 10 ? 4 : 2 }).format(value)}`;
const formatChange = (value: number) => `${value >= 0 ? "+" : "−"}${Math.abs(value).toFixed(2)}%`;

const GITHUB_USERNAME = "JohnIsDimz";
const FALLBACK_GITHUB = {
  followers: 1248,
  publicRepos: 42,
  avatarUrl: "https://github.com/JohnIsDimz.png",
};
type GitHubRepo = {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  updated_at: string;
  fork: boolean;
};
type GitHubProfile = typeof FALLBACK_GITHUB;
type PortfolioProject = (typeof projects)[number];

const languageColors: Record<string, string> = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python: "#3776ab",
  HTML: "#e34f26",
  CSS: "#1572b6",
};
const normalizeRepoName = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

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

function Skeleton({ className = "" }: { className?: string }) {
  return <span className={`skeleton ${className}`} aria-hidden="true" />;
}

export default function Home() {
  const [clock, setClock] = useState(() => formatTime(new Date()));
  const [lastSync, setLastSync] = useState(() => formatTime(new Date()));
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState("");
  const [filter, setFilter] = useState<"all" | "featured">("all");
  const [projectQuery, setProjectQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [backToTop, setBackToTop] = useState(false);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [githubProfile, setGithubProfile] = useState<GitHubProfile>(FALLBACK_GITHUB);
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [githubState, setGithubState] = useState<"loading" | "live" | "fallback">("loading");
  const [githubSync, setGithubSync] = useState("menunggu sinkronisasi");
  const [marketData, setMarketData] = useState<MarketCoin[]>(cryptoData);
  const [marketState, setMarketState] = useState<"loading" | "live" | "unavailable">("loading");
  const [marketSync, setMarketSync] = useState("menunggu sinkronisasi");

  const syncGithub = async (signal?: AbortSignal) => {
    try {
      const [profileResponse, reposResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { signal, headers: { Accept: "application/vnd.github+json" } }),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, { signal, headers: { Accept: "application/vnd.github+json" } }),
      ]);
      if (!profileResponse.ok || !reposResponse.ok) throw new Error("GitHub API unavailable");
      const profile = await profileResponse.json();
      const repos = (await reposResponse.json()) as GitHubRepo[];
      setGithubProfile({ followers: profile.followers, publicRepos: profile.public_repos, avatarUrl: profile.avatar_url });
      setGithubRepos(repos.filter((repo) => !repo.fork));
      setGithubState("live");
      setGithubSync(`sync ${formatTime(new Date())} WIB`);
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        setGithubState("fallback");
        setGithubSync("fallback snapshot");
      }
    }
  };

  const syncMarket = async (signal?: AbortSignal) => {
    try {
      const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true", { signal, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("CoinGecko unavailable");
      const payload = await response.json();
      setMarketData(cryptoData.map((coin) => ({ ...coin, price: payload[coin.id]?.usd ?? null, change: payload[coin.id]?.usd_24h_change ?? null })));
      setMarketState("live");
      setMarketSync(`sync ${formatTime(new Date())} WIB`);
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        setMarketData(cryptoData);
        setMarketState("unavailable");
        setMarketSync("data unavailable");
      }
    }
  };

  useEffect(() => {
    const timer = window.setInterval(() => setClock(formatTime(new Date())), 1000);
    const controller = new AbortController();
    syncGithub(controller.signal);
    syncMarket(controller.signal);
    const githubTimer = window.setInterval(() => syncGithub(), 300000);
    const marketTimer = window.setInterval(() => syncMarket(), 60000);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      setBackToTop(window.scrollY > 680);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.clearInterval(timer);
      window.clearInterval(githubTimer);
      window.clearInterval(marketTimer);
      controller.abort();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const liveProjects: PortfolioProject[] = githubRepos.length
    ? githubRepos.map((repo) => {
        const editorialProject = projects.find((project) => normalizeRepoName(project.title) === normalizeRepoName(repo.name));
        if (editorialProject) return { ...editorialProject, description: repo.description || editorialProject.description, language: repo.language || editorialProject.language, stars: repo.stargazers_count, href: repo.html_url };
        const language = repo.language || "Open source";
        return {
          title: repo.name,
          year: new Date(repo.updated_at).getFullYear().toString(),
          description: repo.description || "Repository publik dari GitHub yang terus dikembangkan.",
          language,
          color: languageColors[language] || "#6de5e9",
          stars: repo.stargazers_count,
          href: repo.html_url,
          featured: false,
          role: "Open-source project",
          stack: [language, "GitHub API"],
          challenge: "Repository ini tercatat sebagai bagian dari aktivitas open-source publik John Is Dimz.",
          approach: "Data repository, bahasa pemrograman, jumlah star, dan waktu update diambil otomatis dari GitHub REST API.",
          outcome: "Informasi karya tetap mengikuti repository sumber tanpa perlu mengubah konten portfolio secara manual.",
          highlights: [`${repo.stargazers_count} GitHub stars`, `Updated ${new Date(repo.updated_at).toLocaleDateString("id-ID")}`, "Data publik tersinkron otomatis"],
        };
      })
    : projects;

  const availableLanguages = useMemo(
    () => Array.from(new Set(liveProjects.map((project) => project.language))).sort(),
    [liveProjects],
  );
  const visibleProjects = useMemo(() => {
    const query = projectQuery.trim().toLowerCase();
    return liveProjects.filter((project) => {
      const matchesTab = filter === "all" || project.featured;
      const matchesLanguage = languageFilter === "all" || project.language === languageFilter;
      const matchesQuery = !query || [project.title, project.description, project.language, ...project.stack].some((value) => value.toLowerCase().includes(query));
      return matchesTab && matchesLanguage && matchesQuery;
    });
  }, [filter, languageFilter, liveProjects, projectQuery]);

  const clearProjectFilters = () => {
    setProjectQuery("");
    setLanguageFilter("all");
    setFilter("all");
  };

  const handleRefresh = () => {
    setRefreshing(true);
    Promise.all([syncGithub(), syncMarket()]).finally(() => {
      setLastSync(formatTime(new Date()));
      setRefreshing(false);
    });
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
            <span className="brand-mark"><span className="brand-glyph">J<span>×</span>E</span></span>
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
                Membangun <span className="outline-word">Digital</span>
                <br />untuk <em>menuju masa depan.</em>
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
                  <div className="portrait-art"><img className="profile-photo" src={githubProfile.avatarUrl} alt="Foto profil John Is Dimz dari GitHub" onError={(event) => { event.currentTarget.src = FALLBACK_GITHUB.avatarUrl; }} /><div className="portrait-overlay" /><div className="portrait-ring ring-a" /><div className="portrait-ring ring-b" /><div className="portrait-symbol">J<span>×</span>E</div><div className="portrait-caption">BUILD / BREAK / REPEAT</div></div>
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
              <div className="metric-card data-card"><div className="card-label"><Github size={14} /> GITHUB / PUBLIC</div><div className="metric-value">{githubState === "loading" ? <Skeleton className="skeleton-number" /> : githubProfile.followers.toLocaleString("id-ID")}</div><div className="metric-foot"><span>followers</span><span className={githubState === "live" ? "positive" : "negative"}>{githubState === "loading" ? "syncing" : githubState === "live" ? "● live api" : "● unavailable"}</span></div></div>
              <div className="metric-card data-card"><div className="card-label"><Layers3 size={14} /> OPEN SOURCE</div><div className="metric-value">{githubState === "loading" ? <Skeleton className="skeleton-number skeleton-short" /> : githubProfile.publicRepos}</div><div className="metric-foot"><span>repositories</span><span className={githubState === "live" ? "positive" : "negative"}>{githubState === "loading" ? "syncing" : githubState === "live" ? "● active" : "● unavailable"}</span></div></div>
              <div className="metric-card data-card"><div className="card-label"><HeartPulse size={14} /> SYSTEM STATUS</div><div className="metric-value status-value"><span className="status-pulse" /> 99.9%</div><div className="metric-foot"><span>all systems normal</span><span>past 30 days</span></div></div>
            </div>
            <div className="crypto-heading"><span>MARKET SNAPSHOT</span><span className="crypto-heading-line" /><span>COINGECKO · {marketState === "live" ? "LIVE" : marketState === "loading" ? "SYNCING" : "UNAVAILABLE"} · {marketSync}</span></div>
            <div className="crypto-grid">{marketState === "loading" ? cryptoData.map((coin) => <div className="crypto-card" key={coin.symbol}><Skeleton className="skeleton-coin" /><div><Skeleton className="skeleton-label" /><Skeleton className="skeleton-subtitle" /></div><div className="coin-price"><Skeleton className="skeleton-price" /><Skeleton className="skeleton-change" /></div></div>) : marketData.map((coin) => <div className="crypto-card" key={coin.symbol}><div className="coin-icon">{coin.icon}</div><div><strong>{coin.symbol}</strong><span>{coin.name}</span></div><div className="coin-price">{coin.price === null ? "—" : formatUsd(coin.price)}<small className={coin.change === null ? "market-unavailable" : coin.change >= 0 ? "positive" : "negative"}>{coin.change === null ? "data unavailable" : `${formatChange(coin.change)} · 24h`}</small></div></div>)}</div>
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="page-width">
            <div className="section-kicker"><span>03</span><span className="kicker-line" /><span>SELECTED WORK</span></div>
            <div className="section-heading-row"><div><h2>Beberapa hal yang <span className="accent-text">saya buat</span>.</h2><div className={`github-sync github-${githubState}`}><span className="status-pulse" /> GitHub {githubState === "live" ? "live" : githubState === "loading" ? "syncing" : "fallback"} · {githubSync}</div></div><a className="text-link" href="https://github.com/JohnIsDimz" target="_blank" rel="noreferrer">lihat semua di GitHub <ArrowUpRight size={15} /></a></div>
            <div className="project-tabs"><button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>Semua karya <span>{liveProjects.length.toString().padStart(2, "0")}</span></button><button className={filter === "featured" ? "active" : ""} onClick={() => setFilter("featured")}>Pilihan <span>{liveProjects.filter((project) => project.featured).length.toString().padStart(2, "0")}</span></button></div>
            <div className="project-filters"><label className="project-search"><Search size={15} /><input value={projectQuery} onChange={(event) => setProjectQuery(event.target.value)} placeholder="Cari proyek, deskripsi, atau stack..." aria-label="Cari proyek" /></label><label className="language-select"><span>BAHASA</span><select value={languageFilter} onChange={(event) => setLanguageFilter(event.target.value)} aria-label="Filter bahasa pemrograman"><option value="all">Semua bahasa</option>{availableLanguages.map((language) => <option value={language} key={language}>{language}</option>)}</select></label><span className="filter-result">{visibleProjects.length} dari {liveProjects.length} proyek</span>{(projectQuery || languageFilter !== "all" || filter !== "all") && <button className="clear-filters" onClick={clearProjectFilters}>reset filter <X size={13} /></button>}</div>
            {githubState === "loading" ? <div className="projects-grid projects-skeleton-grid">{[0, 1, 2].map((item) => <div className="project-card project-skeleton-card" key={item}><div className="project-top"><Skeleton className="skeleton-index" /><Skeleton className="skeleton-arrow" /></div><div className="project-visual"><Skeleton className="skeleton-project-visual" /></div><div className="project-info"><div><Skeleton className="skeleton-title" /><Skeleton className="skeleton-description" /><Skeleton className="skeleton-description skeleton-description-short" /></div><div className="project-meta"><Skeleton className="skeleton-meta" /><Skeleton className="skeleton-meta skeleton-meta-short" /></div></div></div>)}</div> : visibleProjects.length > 0 ? <div className="projects-grid">{visibleProjects.map((project, index) => <button className={`project-card ${index === 0 ? "project-featured" : ""}`} onClick={() => setSelectedProject(project)} key={project.title}><div className="project-top"><span className="project-index">{String(index + 1).padStart(2, "0")}</span><ArrowUpRight size={17} className="project-arrow" /></div><div className="project-visual"><div className="visual-grid" /><span className="visual-code">~/ {project.href.includes("JohnIsDimz/") ? project.href.split("JohnIsDimz/")[1] : project.title}</span><div className="visual-corner" /></div><div className="project-info"><div><h3>{project.title}</h3><p>{project.description}</p></div><div className="project-meta"><span><i style={{ background: project.color }} />{project.language}</span><span>★ {project.stars}</span></div></div></button>)}</div> : <div className="projects-empty"><Search size={22} /><strong>Tidak ada proyek yang cocok.</strong><span>Coba kata kunci atau bahasa lain, lalu reset filter jika perlu.</span><button onClick={clearProjectFilters}>Tampilkan semua proyek</button></div>}
            {selectedProject && <div className="case-study-backdrop" role="presentation" onClick={() => setSelectedProject(null)}><article className="case-study-modal" role="dialog" aria-modal="true" aria-labelledby="case-study-title" onClick={(event) => event.stopPropagation()}><button className="case-study-close" onClick={() => setSelectedProject(null)} aria-label="Tutup studi kasus"><X size={18} /></button><div className="case-study-eyebrow">CASE STUDY / {selectedProject.year}</div><div className="case-study-heading"><div><h3 id="case-study-title">{selectedProject.title}</h3><p>{selectedProject.role}</p></div><a href={selectedProject.href} target="_blank" rel="noreferrer">Buka repository <ExternalLink size={14} /></a></div><div className="case-study-tags">{selectedProject.stack.map((item) => <span key={item}>{item}</span>)}</div><div className="case-study-body"><div><span className="case-study-label">01 / Tantangan</span><p>{selectedProject.challenge}</p></div><div><span className="case-study-label">02 / Pendekatan</span><p>{selectedProject.approach}</p></div><div><span className="case-study-label">03 / Hasil</span><p>{selectedProject.outcome}</p></div></div><div className="case-study-highlights"><span>HIGHLIGHTS</span>{selectedProject.highlights.map((highlight) => <div key={highlight}><Check size={14} /> {highlight}</div>)}</div></article></div>}
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <div className="page-width skills-layout">
            <div className="section-kicker"><span>04</span><span className="kicker-line" /><span>THE TOOLKIT</span></div>
            <div className="skills-content"><div className="section-heading-row"><h2>Senjata <span className="accent-text">utama</span>.</h2><span className="heading-note">CONFIDENCE, NOT EGO</span></div><p className="section-intro">Teknologi hanyalah alat. Yang penting adalah tahu kapan harus menggunakannya — dan kapan membuat sesuatu yang lebih sederhana.</p><div className="skills-grid">{skills.map(([name, level]) => <div className="skill-row" key={name as string}><div className="skill-label"><span>{name}</span><span>{level}%</span></div><div className="skill-track"><span style={{ width: `${level}%` }} /></div></div>)}</div><div className="stack-tags"><span><Code2 size={14} /> React</span><span><Server size={14} /> Node.js</span><span><Globe2 size={14} /> REST API</span><span><Zap size={14} /> Vite</span></div></div>
          </div>
        </section>

        <section className="section tools-section" id="api-tools">
          <div className="page-width tools-layout"><div className="section-kicker"><span>05</span><span className="kicker-line" /><span>PLAYGROUND</span></div><div className="tools-content"><div className="section-heading-row"><h2>Useful <span className="accent-text">little things</span>.</h2><span className="heading-note">BUILT FOR FUN, KEPT FOR LATER</span></div><div className="tools-grid"><div className="tool-card"><div className="tool-card-head"><Terminal size={17} /><span>API ENDPOINTS</span></div><p>Eksplorasi endpoint publik yang digunakan portfolio ini.</p>{["/api/live", "/api/live/github", "/api/live/crypto"].map((endpoint) => <div className="endpoint-row" key={endpoint}><code>{endpoint}</code><button onClick={() => copyEndpoint(endpoint)} aria-label={`Copy ${endpoint}`}>{copied === endpoint ? <Check size={14} /> : <Copy size={14} />}</button></div>)}</div></div></div></div>
        </section>

        <section className="section contact-section" id="contact"><div className="contact-grid" /><div className="page-width contact-inner"><div className="section-kicker"><span>06</span><span className="kicker-line" /><span>LET'S CONNECT</span></div><h2>Do you have an<br /><span>interesting idea?</span></h2><p>Kalau iya, saya ingin mendengarnya. Kirim pesan — biasanya saya membalas dalam 1–2 hari kerja.</p><a className="button button-primary contact-button" href="mailto:johnisdimz@gmail.com">Mulai percakapan <Send size={16} /></a><div className="social-links"><a href="https://github.com/JohnIsDimz" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a><a href="mailto:johnisdimz@gmail.com"><Mail size={16} /> Email</a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a><a href="https://twitter.com" target="_blank" rel="noreferrer"><Twitter size={16} /> Twitter</a></div></div></section>
      </main>

      <footer className="footer"><div className="page-width footer-inner"><span>© 2026 JOOEXE / MADE WITH INTENTION.</span><span>BUILT IN JAKARTA <span className="footer-heart">♥</span></span><button onClick={() => scrollToId("top")}>BACK TO TOP <ArrowUp size={13} /></button></div></footer>
      {backToTop && <button className="floating-top" onClick={() => scrollToId("top")} aria-label="Kembali ke atas"><ArrowUp size={17} /></button>}
    </div>
  );
}

export { ChevronRight };
