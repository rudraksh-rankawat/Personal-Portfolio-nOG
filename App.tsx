
import React, { useState, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Cpu,
  Globe,
  Terminal,
  Layers,
  Wand2,
  Code2,
  Rocket,
  Zap,
  Twitter,
  Sun,
  Moon
} from 'lucide-react';

// --- Data ---
const PROJECTS = [
  {
    title: "AutoSec Agent",
    tech: ["Python", "CrewAI", "FastAPI", "Celery", "React"],
    desc: "Autonomous multi-agent system detecting security threats in PRs before deployment. Orchestrates SAST, dependency scanning, and architectural review agents.",
    link: "https://pr-agent-v1.vercel.app/",
    type: "AI/Security"
  },
  {
    title: "Qrush",
    tech: ["Node.js", "Express", "Supabase", "React", "WebSockets"],
    desc: "Real-time collaborative revision platform. Vedantu Hackathon Winner. Features live peer-quizzing and AI-driven study summaries.",
    link: "https://qrush-vedantu.vercel.app/",
    type: "EdTech"
  },
  {
    title: "Wall Panel Visualizer",
    tech: ["Swift", "VisionOS", "ARKit", "RealityKit"],
    desc: "Apple Vision Pro app for UrbanCompany. Vertical plane detection for interior design visualization with advanced scene reconstruction.",
    link: "https://youtu.be/HywXOYlQGvA",
    type: "AR/VisionOS"
  }
];

const SKILLS = {
  Languages: ["Python", "Go", "TypeScript", "Java", "Swift", "SQL"],
  Frameworks: ["FastAPI", "Django", "React", "React Native", "Node.js", "Express", "Go-Gin"],
  "Tools & AI": ["Docker", "Git", "VisionOS SDK", "CrewAI", "PostgreSQL", "Supabase"]
};

const SKILL_SUBTITLES: Record<string, string> = {
  Languages: "Even though I'm language agnostic",
  Frameworks: "I like some of them",
  "Tools & AI": "Just software"
};

const EXPERIENCE = [
  {
    company: "Zeneta.in",
    role: "Co-Founder | Built CONCEPT01.IN",
    period: "2024 – Present",
    link: "https://www.concept01.in",
    points: [
      "Built the core backend architecture for a creator & event platform using Node.js, Prisma, PostgreSQL.",
      "Implemented Razorpay payment gateway with secure webhooks, automated subscription workflows, and membership tier management.",
      "Designed an in-platform credit system supporting wallet balance, deductions, and transaction history.",
      "Engineered a room & event booking system with availability checks, conflict prevention, and atomic database transactions.",
      "Owned backend deployment, schema design, and production stability while coordinating requirements directly with stakeholders."
    ]
  },
  {
    company: "Kivio Technologies",
    role: "Software Development Intern",
    period: "June 2024 – Sept 2024",
    points: [
      "Engineered a scalable eCommerce mobile application using React Native (Expo) and Node.js.",
      "Integrated Strapi.js CMS, reducing content update turnaround time for product updates.",
      "Collaborated with cross-functional teams to define feature roadmaps."
    ]
  }
];

// Flying text phrases
const FLYING_PHRASES = [
  { text: "IT WORKS ON PROD 🤷‍♂️", color: "#bfff00" },
  { text: "TRUST NOTHING, LOG EVERYTHING 🧾", color: "#88d1e0" },
  { text: "IDEMPOTENCY MATTERS 🔁", color: "#ff6b6b" },
  { text: "DISTRIBUTED SYSTEMS ARE LYING 😐", color: "#a78bfa" },
  { text: "CACHE INVALIDATION IS EASY 🧠", color: "#f472b6" },
  { text: "SCHEMA > SPEED 📐", color: "#34d399" },
  { text: "EVENTUAL CONSISTENCY 😶‍🌫️", color: "#fbbf24" },
  { text: "WEBHOOKS WILL FAIL 🔔", color: "#60a5fa" },
  { text: "if err != nil", color: "#c084fc" },
  { text: "SHIPPED > PERFECT 🚀", color: "#fb923c" },
];


// --- Theme Colors ---
const themes = {
  dark: {
    bg: '#0a0a0a',
    bgSecondary: '#111',
    text: 'white',
    textSecondary: '#9ca3af',
    textMuted: '#6b7280',
    border: '#333',
    borderLight: 'rgba(255,255,255,0.05)',
    accent: '#bfff00',
    accentSecondary: '#88d1e0',
  },
  light: {
    bg: '#fafafa',
    bgSecondary: '#ffffff',
    text: '#0a0a0a',
    textSecondary: '#4b5563',
    textMuted: '#9ca3af',
    border: '#e5e7eb',
    borderLight: 'rgba(0,0,0,0.05)',
    accent: '#059669',
    accentSecondary: '#0891b2',
  }
};

// --- Components ---

const PortalEffect = ({ isChaos, isLight }: { isChaos: boolean; isLight: boolean }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-300 ${isChaos ? 'opacity-60' : 'opacity-20'}`}>
    <div className={`portal-circle absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full border-[20px] blur-3xl ${isChaos ? 'animate-ping' : 'animate-pulse'}`} style={{ borderColor: isLight ? '#059669' : '#bfff00' }}></div>
    <div className={`portal-circle absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full border-[15px] blur-3xl ${isChaos ? 'animate-ping' : 'animate-pulse'}`} style={{ borderColor: isLight ? '#0891b2' : '#88d1e0' }}></div>
    {isChaos && (
      <>
        <div className="portal-circle absolute top-[30%] right-[20%] w-[20%] h-[20%] rounded-full border-[10px] border-[#ff6b6b] blur-2xl animate-ping"></div>
        <div className="portal-circle absolute bottom-[40%] left-[30%] w-[15%] h-[15%] rounded-full border-[8px] border-[#a78bfa] blur-2xl animate-ping"></div>
      </>
    )}
  </div>
);

interface FlyingTextProps {
  phrase: { text: string; color: string };
  direction: 'right' | 'left' | 'diagonal';
  top: string;
  delay: number;
}

const FlyingText = ({ phrase, direction, top, delay }: FlyingTextProps) => (
  <div
    className={`fly-text fly-${direction}`}
    style={{
      top,
      color: phrase.color,
      animationDelay: `${delay}ms`,
    }}
  >
    {phrase.text}
  </div>
);

interface ProjectCardProps {
  project: typeof PROJECTS[0];
  isChaos: boolean;
  index: number;
  isLight: boolean;
}

const ProjectCard = ({ project, isChaos, index, isLight }: ProjectCardProps) => (
  <div
    className={`group relative p-6 transition-all duration-300 transform hover:-translate-y-1 border-2 ${isChaos ? 'glitch-skew-active' : ''}`}
    style={{
      backgroundColor: isLight ? '#ffffff' : '#111',
      borderColor: isLight ? '#e5e7eb' : '#333',
    }}
    onMouseEnter={(e) => e.currentTarget.style.borderColor = isLight ? '#059669' : '#bfff00'}
    onMouseLeave={(e) => e.currentTarget.style.borderColor = isLight ? '#e5e7eb' : '#333'}
  >
    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <a href={project.link} target="_blank" style={{ color: isLight ? '#059669' : '#bfff00' }}><ExternalLink size={20} /></a>
    </div>
    <div className={`text-[10px] font-mono uppercase tracking-tighter mb-2 ${isChaos ? 'glitch-color-active' : ''}`} style={{ color: isLight ? '#059669' : '#bfff00' }}>{project.type}</div>
    <h3 className={`text-xl font-bold mb-3 transition-colors ${isChaos ? 'glitch-active' : ''}`} style={{ color: isLight ? '#0a0a0a' : 'white' }}>{project.title}</h3>
    <p className={`text-sm mb-6 leading-relaxed line-clamp-3 font-light ${isChaos ? 'glitch-active' : ''}`} style={{ color: isLight ? '#4b5563' : '#9ca3af' }}>
      {project.desc}
    </p>
    <div className="flex flex-wrap gap-2">
      {project.tech.map((t, i) => (
        <span
          key={t}
          className={`text-[10px] px-2 py-1 rounded font-mono ${isChaos ? 'float-chaos' : ''}`}
          style={{
            backgroundColor: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
            borderWidth: 1,
            borderColor: isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
            color: isLight ? '#6b7280' : '#6b7280',
            animationDelay: `${i * 50}ms`
          }}
        >
          {t}
        </span>
      ))}
    </div>
  </div>
);

const App: React.FC = () => {
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);
  const [isChaosLocked, setIsChaosLocked] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isThemePreview, setIsThemePreview] = useState(false);
  const [flyingTexts, setFlyingTexts] = useState<Array<{ id: number; phrase: typeof FLYING_PHRASES[0]; direction: 'right' | 'left' | 'diagonal'; top: string; delay: number }>>([]);
  const [activeSkillCategory, setActiveSkillCategory] = useState(0);

  // Chaos mode is active if either hovered OR locked via click
  const isChaosActive = isPhotoHovered || isChaosLocked;

  // Cycle through skill categories every 2 seconds
  const skillCategories = Object.keys(SKILLS);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSkillCategory(prev => (prev + 1) % skillCategories.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [skillCategories.length]);

  // Determine if we should show light theme (either active or previewing)
  const showLight = isLightMode || isThemePreview;
  const theme = showLight ? themes.light : themes.dark;

  // Console Easter Egg for devs 🥚
  useEffect(() => {
    const asciiArt = `
%c
██████╗ ██╗   ██╗██████╗ ██████╗  █████╗ ██╗  ██╗███████╗██╗  ██╗
██╔══██╗██║   ██║██╔══██╗██╔══██╗██╔══██╗██║ ██╔╝██╔════╝██║  ██║
██████╔╝██║   ██║██║  ██║██████╔╝███████║█████╔╝ ███████╗███████║
██╔══██╗██║   ██║██║  ██║██╔══██╗██╔══██║██╔═██╗ ╚════██║██╔══██║
██║  ██║╚██████╔╝██████╔╝██║  ██║██║  ██║██║  ██╗███████║██║  ██║
╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
`;

    console.log(asciiArt, 'color: #bfff00; font-family: monospace; font-size: 10px;');

    console.log(
      '%c🚀 Hey there, curious developer! 👋',
      'color: #88d1e0; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 0px #bfff00;'
    );

    console.log(
      '%c' +
      '╔══════════════════════════════════════════════════════════════╗\n' +
      '║  You found the secret console message! 🥚                    ║\n' +
      '║                                                              ║\n' +
      '║  "Any sufficiently advanced technology is                    ║\n' +
      '║   indistinguishable from magic." - Arthur C. Clarke          ║\n' +
      '║                                                              ║\n' +
      '║  💡 Fun fact: This portfolio has more easter eggs!           ║\n' +
      '║     Try hovering on my photo for CHAOS MODE 🔥               ║\n' +
      '║     Click the spinning orb to toggle themes 🌙☀️             ║\n' +
      '║                                                              ║\n' +
      '║  📧 Let\'s connect: rankawatrudraksh@gmail.com               ║\n' +
      '║  🐦 Twitter: @rankawwat                                      ║\n' +
      '║  💼 LinkedIn: /in/rudraksh-rankawat                          ║\n' +
      '╚══════════════════════════════════════════════════════════════╝',
      'color: #bfff00; font-family: monospace; font-size: 12px; line-height: 1.5;'
    );

    console.log(
      '%c⚠️ Looking to hire? Type "hire" in the console! 💼',
      'color: #fbbf24; font-size: 14px; font-weight: bold; background: #0a0a0a; padding: 8px 16px; border-radius: 4px;'
    );

    // Secret hire command
    (window as any).hire = () => {
      console.log('%c🎉 AMAZING! You actually did it!', 'color: #bfff00; font-size: 24px; font-weight: bold;');
      console.log('%c📧 Shoot me an email at: rankawatrudraksh@gmail.com', 'color: #88d1e0; font-size: 16px;');
      console.log('%c💬 Subject: "I found the easter egg - Let\'s talk!"', 'color: #a78bfa; font-size: 14px;');
      console.log('%c🚀 I\'m always excited to work on interesting projects!', 'color: #34d399; font-size: 14px;');
      return '✨ Thanks for exploring! Looking forward to connecting!';
    };

    // Another secret command
    (window as any).rickroll = () => {
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
      return '🎵 Never gonna give you up...';
    };

    (window as any).matrix = () => {
      console.log('%c' +
        '01001000 01100101 01101100 01101100 01101111\n' +
        '01010111 01101111 01110010 01101100 01100100\n' +
        '00100001 00100000 01011001 01101111 01110101\n' +
        '00100000 01100110 01101111 01110101 01101110\n' +
        '01100100 00100000 01110100 01101000 01100101\n' +
        '00100000 01001101 01100001 01110100 01110010\n' +
        '01101001 01111000 00100001',
        'color: #bfff00; font-family: monospace; font-size: 10px;'
      );
      return 'Wake up, Neo...';
    };

    console.log('%c💡 Secret commands: hire(), rickroll(), matrix()', 'color: #6b7280; font-size: 10px;');

  }, []);

  useEffect(() => {
    if (isChaosActive) {
      const directions: Array<'right' | 'left' | 'diagonal'> = ['right', 'left', 'diagonal'];
      let phraseIndex = 0;

      // Spawn all phrases initially with staggered delays
      FLYING_PHRASES.forEach((phrase, index) => {
        const id = Date.now() + index;
        const direction = directions[index % 3];
        const top = `${10 + (index * 8) % 80}%`;
        setFlyingTexts(prev => [...prev, { id, phrase, direction, top, delay: index * 500 }]);
      });

      // Continuously spawn new phrases every 4 seconds
      const interval = setInterval(() => {
        const phrase = FLYING_PHRASES[phraseIndex % FLYING_PHRASES.length];
        const id = Date.now() + phraseIndex;
        const direction = directions[phraseIndex % 3];
        const top = `${Math.random() * 70 + 10}%`;

        setFlyingTexts(prev => [...prev, { id, phrase, direction, top, delay: 0 }]);
        phraseIndex++;
      }, 4000);

      return () => {
        clearInterval(interval);
      };
    } else {
      setFlyingTexts([]);
    }
  }, [isChaosActive]);

  const handleThemeToggle = () => {
    setIsLightMode(!isLightMode);
  };

  return (
    <div
      className={`min-h-screen font-sans transition-all duration-500 ${isChaosActive ? 'screen-shake' : ''}`}
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
      }}
    >
      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-sm transition-all duration-500 ${isChaosActive ? 'navbar-glitch' : ''}`}
        style={{
          borderBottom: `1px solid ${theme.borderLight}`,
          backgroundColor: isChaosActive ? 'rgba(191,255,0,0.1)' : 'transparent',
        }}
      >
        <div className={`flex items-center gap-2 group ${isChaosActive ? 'glitch-active' : ''}`}>
          <div
            className={`w-8 h-8 rounded-full cursor-pointer transition-all duration-300 ${isChaosActive ? 'animate-ping' : 'animate-spin-slow'} ${isThemePreview ? 'scale-125' : ''}`}
            style={{ backgroundColor: theme.accent }}
            onMouseEnter={() => setIsThemePreview(true)}
            onMouseLeave={() => setIsThemePreview(false)}
            onClick={handleThemeToggle}
            title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            <div className="w-full h-full flex items-center justify-center">
              {isThemePreview && (
                showLight ? <Moon size={16} color={theme.bg} /> : <Sun size={16} color={theme.bg} />
              )}
            </div>
          </div>
          <span className={`font-mono text-lg font-bold tracking-tighter uppercase ${isChaosActive ? 'glitch-color-active' : ''}`}>
            {isChaosActive ? '!!CHAOS_MODE!!' : isThemePreview ? (showLight ? 'Light Mode' : '🌙 Dark Mode') : 'Rudraksh.dimension'}
          </span>
        </div>
        <div className={`hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest ${isChaosActive ? 'glitch-active' : ''}`}>
          <a href="#about" className={`transition-colors ${isChaosActive ? 'float-chaos' : ''}`} style={{ color: theme.textSecondary }} onMouseEnter={(e) => e.currentTarget.style.color = theme.accent} onMouseLeave={(e) => e.currentTarget.style.color = theme.textSecondary}>About</a>
          <a href="#projects" className={`transition-colors ${isChaosActive ? 'float-chaos' : ''}`} style={{ color: theme.textSecondary }} onMouseEnter={(e) => e.currentTarget.style.color = theme.accent} onMouseLeave={(e) => e.currentTarget.style.color = theme.textSecondary}>Inventions</a>
          <a href="#experience" className={`transition-colors ${isChaosActive ? 'float-chaos' : ''}`} style={{ color: theme.textSecondary }} onMouseEnter={(e) => e.currentTarget.style.color = theme.accent} onMouseLeave={(e) => e.currentTarget.style.color = theme.textSecondary}>Timeline</a>
          <a href="#contact" className={`transition-colors ${isChaosActive ? 'float-chaos' : ''}`} style={{ color: theme.textSecondary }} onMouseEnter={(e) => e.currentTarget.style.color = theme.accent} onMouseLeave={(e) => e.currentTarget.style.color = theme.textSecondary}>Signal</a>
        </div>
        <div className={`flex gap-4 ${isChaosActive ? 'glitch-active' : ''}`} style={{ color: theme.textSecondary }}>
          <a href="https://github.com/rudraksh-rankawat" target="_blank" className={`transition-colors ${isChaosActive ? 'float-chaos' : ''}`} onMouseEnter={(e) => e.currentTarget.style.color = theme.accent} onMouseLeave={(e) => e.currentTarget.style.color = theme.textSecondary}><Github size={18} /></a>
          <a href="https://linkedin.com/in/rudraksh-rankawat" target="_blank" className={`transition-colors ${isChaosActive ? 'float-chaos' : ''}`} onMouseEnter={(e) => e.currentTarget.style.color = theme.accent} onMouseLeave={(e) => e.currentTarget.style.color = theme.textSecondary}><Linkedin size={18} /></a>
          <a href="https://x.com/rankawwat" target="_blank" className={`transition-colors ${isChaosActive ? 'float-chaos' : ''}`} onMouseEnter={(e) => e.currentTarget.style.color = theme.accent} onMouseLeave={(e) => e.currentTarget.style.color = theme.textSecondary}><Twitter size={18} /></a>
        </div>
      </nav>

      <PortalEffect isChaos={isPhotoHovered} isLight={showLight} />

      {/* Flying Text Layer */}
      {flyingTexts.map(ft => (
        <FlyingText key={ft.id} {...ft} />
      ))}

      {/* Hero Section */}
      <section id="about" className="relative pt-24 md:pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
        <div className={`flex-1 space-y-8 transition-all duration-300 ${isChaosActive ? 'glitch-skew-active' : ''}`}>
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${isChaosActive ? 'glitch-color-active' : ''}`}
            style={{
              backgroundColor: showLight ? 'rgba(5,150,105,0.1)' : 'rgba(191,255,0,0.1)',
              border: `1px solid ${showLight ? 'rgba(5,150,105,0.2)' : 'rgba(191,255,0,0.2)'}`,
            }}
          >
            {/* <Zap size={14} style={{ color: theme.accent }} /> */}
            <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: theme.accent }}>
              {isChaosActive ? '⚠️ CHAOS PROTOCOL ACTIVE ⚠️' : 'Protocol: Active Curiosity'}
            </span>
          </div>
          <h1 className={`text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] ${isChaosActive ? 'glitch-active' : ''}`}>
            RUDRAKSH <br />
            <span className={isChaosActive ? 'glitch-color-active' : ''} style={{ color: theme.accentSecondary }}>RANKAWAT</span>
          </h1>
          <p className={`text-xl max-w-xl font-light leading-relaxed ${isChaosActive ? 'glitch-active' : ''}`} style={{ color: theme.textSecondary }}>
            I'm a curious engineer operating across dimensions of Software Engineering, AI/ML, and Product Strategy. Currently studying at BITS Pilani and Scaler School of Technology.
          </p>
          <div className={`flex gap-4 ${isChaosActive ? 'glitch-active' : ''}`}>
            <a
              href="mailto:rankawatrudraksh@gmail.com"
              className={`px-8 py-3 font-bold uppercase text-sm tracking-widest transition-all transform active:scale-95 ${isChaosActive ? 'float-chaos' : ''}`}
              style={{
                backgroundColor: theme.accent,
                color: theme.bg,
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = showLight ? '#047857' : 'white'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.accent}
            >
              Contact Me
            </a>
            <a
              href="/CV - Rudraksh Rankawat.pdf"
              download="Rudraksh_Rankawat_Resume.pdf"
              className={`px-8 py-3 font-bold uppercase text-sm tracking-widest transition-all ${isChaosActive ? 'float-chaos glitch-color-active' : ''}`}
              style={{
                border: `1px solid ${showLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'}`,
                color: theme.text,
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.accent}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = showLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'}
            >
              Resume.zip
            </a>
          </div>
        </div>
        <div className="flex-1 relative w-full max-w-sm md:max-w-none mx-auto">
          <div
            className={`w-full aspect-square border-4 relative overflow-hidden group cursor-pointer transition-all duration-300`}
            style={{ borderColor: isChaosActive ? theme.accent : theme.border }}
            onMouseEnter={() => {
              // Only enable hover on devices that support hover (not touch)
              if (window.matchMedia('(hover: hover)').matches) {
                setIsPhotoHovered(true);
              }
            }}
            onMouseLeave={() => {
              if (window.matchMedia('(hover: hover)').matches) {
                setIsPhotoHovered(false);
              }
            }}
            onClick={() => setIsChaosLocked(!isChaosLocked)}
          >
            <img
              src="/photo.jpeg"
              alt="Rudraksh Rankawat"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${isChaosActive ? 'grayscale scale-110 blur-[1px]' : ''}`}
            />
            <div
              className={`absolute inset-0 transition-all duration-500`}
              style={{
                background: isPhotoHovered
                  ? `linear-gradient(135deg, ${theme.bg}E6 0%, transparent 50%, ${theme.accent}1A 100%)`
                  : `linear-gradient(135deg, ${theme.bg}99 0%, transparent 50%, ${theme.accent}1A 100%)`,
              }}
            ></div>
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, transparent 0%, transparent 50%, ${theme.bg}E6 100%)`,
              }}
            ></div>
            {isPhotoHovered && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl md:text-6xl font-mono font-bold glitch-active" style={{ color: theme.accent }}>⚡CHAOS⚡</span>
              </div>
            )}
            <div className={`absolute bottom-4 left-4 font-mono text-[10px] z-10 ${isChaosActive ? 'glitch-active' : ''}`} style={{ color: theme.textMuted }}>
              // Dimensional coordinate: 12.9716° N, 77.5946° E
            </div>
          </div>
          {/* Decorative corners */}
          <div className={`absolute -top-4 -right-4 w-12 h-12 border-t-4 border-r-4 transition-all duration-300 ${isChaosActive ? 'scale-150 rotate-45' : ''}`} style={{ borderColor: theme.accent }}></div>
          <div className={`absolute -bottom-4 -left-4 w-12 h-12 border-b-4 border-l-4 transition-all duration-300 ${isChaosActive ? 'scale-150 -rotate-45' : ''}`} style={{ borderColor: theme.accentSecondary }}></div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className={`py-20 px-6 max-w-6xl mx-auto ${isChaosActive ? 'glitch-skew-active' : ''}`} style={{ borderTop: `1px solid ${theme.borderLight}` }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {Object.entries(SKILLS).map(([cat, list], catIndex) => (
            <div key={cat} className="space-y-4">
              <div className="space-y-1">
                <h4 className={`text-xs font-mono uppercase tracking-[0.3em] font-bold ${isChaosActive ? 'glitch-active' : ''}`} style={{ color: theme.accent }}>{cat}</h4>
                <p
                  className={`text-[10px] font-mono italic transition-all duration-500 ${activeSkillCategory === catIndex ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}`}
                  style={{ color: theme.textMuted }}
                >
                  {SKILL_SUBTITLES[cat]}
                </p>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {list.map((s, i) => (
                  <span
                    key={s}
                    className={`text-lg font-bold cursor-default transition-colors ${isChaosActive ? 'float-chaos glitch-active' : ''}`}
                    style={{ color: theme.textSecondary, animationDelay: `${(catIndex * 100) + (i * 50)}ms` }}
                    onMouseEnter={(e) => e.currentTarget.style.color = theme.text}
                    onMouseLeave={(e) => e.currentTarget.style.color = theme.textSecondary}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 px-6 max-w-6xl mx-auto ${isChaosActive ? 'glitch-skew-active' : ''}`}>
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-4">
            <h2 className={`text-4xl font-black uppercase tracking-tighter ${isChaosActive ? 'glitch-active' : ''}`}>Selected Inventions</h2>
            <p className={`font-mono text-xs max-w-md uppercase ${isChaosActive ? 'glitch-active' : ''}`} style={{ color: theme.textMuted }}>Things I built when curiosity peaked and the laws of physics allowed it.</p>
          </div>
          <div className={`hidden md:block h-[1px] flex-1 mx-8 mb-4 transition-colors duration-500`} style={{ backgroundColor: isChaosActive ? `${theme.accent}80` : theme.borderLight }}></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} isChaos={isPhotoHovered} index={i} isLight={showLight} />
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`py-20 px-6 max-w-6xl mx-auto ${isChaosActive ? 'glitch-skew-active' : ''}`} style={{ borderTop: `1px solid ${theme.borderLight}` }}>
        <h2 className={`text-4xl font-black uppercase tracking-tighter mb-12 ${isChaosActive ? 'glitch-active' : ''}`}>Timeline</h2>
        <div className="space-y-16">
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className={`flex flex-col md:flex-row gap-8 ${isChaosActive ? 'float-chaos' : ''}`} style={{ animationDelay: `${i * 100}ms` }}>
              <div className="md:w-1/3">
                <div className={`font-mono text-sm mb-1 ${isChaosActive ? 'glitch-color-active' : ''}`} style={{ color: theme.accent }}>{exp.period}</div>
                <h3 className={`text-2xl font-bold ${isChaosActive ? 'glitch-active' : ''}`}>{exp.company}</h3>
                <div className={`text-sm font-mono uppercase ${isChaosActive ? 'glitch-active' : ''}`} style={{ color: theme.textMuted }}>{exp.role}</div>
              </div>
              <div className="md:w-2/3 space-y-4">
                <ul className="space-y-3">
                  {exp.points.map((p, j) => (
                    <li key={j} className={`flex gap-4 leading-relaxed font-light ${isChaosActive ? 'glitch-active' : ''}`} style={{ color: theme.textSecondary }}>
                      <span className={`mt-1.5 shrink-0 ${isChaosActive ? 'float-chaos' : ''}`} style={{ color: theme.accent }}><div className="w-1.5 h-1.5" style={{ backgroundColor: theme.accent }}></div></span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className={`py-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 ${isChaosActive ? 'glitch-skew-active' : ''}`} style={{ borderTop: `1px solid ${theme.borderLight}` }}>
        <div className="text-center md:text-left">
          <h2 className={`text-4xl font-black uppercase tracking-tighter mb-2 ${isChaosActive ? 'glitch-active glitch-color-active' : ''}`}>
            {isChaosActive ? '🔥 YOU FOUND AN EASTER EGG 🔥' : 'Wubba Lubba Dub Dub!'}
          </h2>
          <p className={`font-mono text-xs uppercase ${isChaosActive ? 'glitch-active' : ''}`} style={{ color: theme.textMuted }}>
            {isChaosActive ? 'CHAOS MODE ACTIVATED // ALL SYSTEMS NOMINAL' : 'No more distress, only code.'}
          </p>
        </div>
        <div className={`flex gap-6 ${isChaosActive ? 'glitch-active' : ''}`}>
          <a
            href="mailto:rankawatrudraksh@gmail.com"
            className={`p-4 rounded-full transition-colors ${isChaosActive ? 'float-chaos' : ''}`}
            style={{ backgroundColor: theme.bgSecondary, border: `1px solid ${theme.border}`, color: theme.text }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.accent}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.border}
          >
            <Mail size={24} />
          </a>
          <a
            href="https://github.com/rudraksh-rankawat"
            target="_blank"
            className={`p-4 rounded-full transition-colors ${isChaosActive ? 'float-chaos' : ''}`}
            style={{ backgroundColor: theme.bgSecondary, border: `1px solid ${theme.border}`, color: theme.text, animationDelay: '100ms' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.accent}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.border}
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com/in/rudraksh-rankawat"
            target="_blank"
            className={`p-4 rounded-full transition-colors ${isChaosActive ? 'float-chaos' : ''}`}
            style={{ backgroundColor: theme.bgSecondary, border: `1px solid ${theme.border}`, color: theme.text, animationDelay: '200ms' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.accent}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.border}
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://x.com/rankawwat"
            target="_blank"
            className={`p-4 rounded-full transition-colors ${isChaosActive ? 'float-chaos' : ''}`}
            style={{ backgroundColor: theme.bgSecondary, border: `1px solid ${theme.border}`, color: theme.text, animationDelay: '300ms' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.accent}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.border}
          >
            <Twitter size={24} />
          </a>
        </div>
      </footer>

      <div className={`fixed bottom-4 left-4 font-mono text-[8px] pointer-events-none select-none ${isChaosActive ? 'glitch-active' : ''}`} style={{ color: isChaosActive ? theme.accent : theme.textMuted }}>
        {isChaosActive ? '⚡ CHAOS_DIMENSION // REALITY_UNSTABLE ⚡' : `C-137 // ${new Date().getFullYear()} // RUDRAKSH_PROTOCAL`}
      </div>

      {/* Chaos overlay scanlines */}
      {isPhotoHovered && (
        <div
          className="fixed inset-0 pointer-events-none z-[100]"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.1) 2px, rgba(0, 0, 0, 0.1) 4px)',
          }}
        />
      )}

      {/* Selection style override based on theme */}
      <style>{`
        ::selection {
          background-color: ${theme.accent};
          color: ${theme.bg};
        }
      `}</style>
    </div>
  );
};

export default App;
