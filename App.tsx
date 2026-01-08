
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
  Twitter
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

const EXPERIENCE = [
  {
    company: "Kivio Technologies",
    role: "Software Development Intern",
    period: "June 2024 – Sept 2024",
    points: [
      "Engineered a scalable eCommerce mobile application using React Native and Node.js.",
      "Integrated Strapi.js CMS, reducing content update turnaround time by 40%.",
      "Collaborated with cross-functional teams to define feature roadmaps."
    ]
  }
];

// Flying text phrases
const FLYING_PHRASES = [
  { text: "I LOVE PHYSICS ⚛️", color: "#bfff00" },
  { text: "ALAN TURING WAS GOAT 🐐", color: "#88d1e0" },
  { text: "E=MC²", color: "#ff6b6b" },
  { text: "QUANTUM SUPREMACY 🌌", color: "#a78bfa" },
  { text: "HELLO WORLD 👋", color: "#f472b6" },
  { text: "42 IS THE ANSWER 🌍", color: "#34d399" },
  { text: "RECURSION IS LIFE 🔄", color: "#fbbf24" },
  { text: "CTRL+Z MY LIFE 💀", color: "#60a5fa" },
  { text: "I USE ARCH BTW 🐧", color: "#c084fc" },
  { text: "COFFEE.exe ☕", color: "#fb923c" },
];

// --- Components ---

const PortalEffect = ({ isChaos }: { isChaos: boolean }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-300 ${isChaos ? 'opacity-60' : 'opacity-20'}`}>
    <div className={`portal-circle absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full border-[20px] border-[#bfff00] blur-3xl ${isChaos ? 'animate-ping' : 'animate-pulse'}`}></div>
    <div className={`portal-circle absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full border-[15px] border-[#88d1e0] blur-3xl ${isChaos ? 'animate-ping' : 'animate-pulse'}`}></div>
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

const Navbar = ({ isChaos }: { isChaos: boolean }) => (
  <nav className={`fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-sm border-b border-white/5 transition-all duration-300 ${isChaos ? 'navbar-glitch bg-[#bfff00]/10' : ''}`}>
    <div className={`flex items-center gap-2 group cursor-default ${isChaos ? 'glitch-active' : ''}`}>
      <div className={`w-8 h-8 bg-[#bfff00] rounded-full ${isChaos ? 'animate-ping' : 'animate-spin-slow group-hover:animate-ping'}`}></div>
      <span className={`font-mono text-lg font-bold tracking-tighter uppercase ${isChaos ? 'glitch-color-active' : ''}`}>
        {isChaos ? '!!CHAOS_MODE!!' : 'Rudraksh.dimension'}
      </span>
    </div>
    <div className={`hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest ${isChaos ? 'glitch-active' : ''}`}>
      <a href="#about" className={`hover:text-[#bfff00] transition-colors ${isChaos ? 'float-chaos' : ''}`} style={{ animationDelay: '0ms' }}>About</a>
      <a href="#projects" className={`hover:text-[#bfff00] transition-colors ${isChaos ? 'float-chaos' : ''}`} style={{ animationDelay: '100ms' }}>Inventions</a>
      <a href="#experience" className={`hover:text-[#bfff00] transition-colors ${isChaos ? 'float-chaos' : ''}`} style={{ animationDelay: '200ms' }}>Timeline</a>
      <a href="#contact" className={`hover:text-[#bfff00] transition-colors ${isChaos ? 'float-chaos' : ''}`} style={{ animationDelay: '300ms' }}>Signal</a>
    </div>
    <div className={`flex gap-4 ${isChaos ? 'glitch-active' : ''}`}>
      <a href="https://github.com/rudraksh-rankawat" target="_blank" className={`hover:text-[#bfff00] ${isChaos ? 'float-chaos' : ''}`}><Github size={18} /></a>
      <a href="https://linkedin.com/in/rudraksh-rankawat" target="_blank" className={`hover:text-[#bfff00] ${isChaos ? 'float-chaos' : ''}`}><Linkedin size={18} /></a>
      <a href="https://x.com/rankawwat" target="_blank" className={`hover:text-[#bfff00] ${isChaos ? 'float-chaos' : ''}`}><Twitter size={18} /></a>
    </div>
  </nav>
);

const ProjectCard = ({ project, isChaos, index }: { project: typeof PROJECTS[0], isChaos: boolean, index: number }) => (
  <div className={`group relative bg-[#111] border-2 border-[#333] hover:border-[#bfff00] p-6 transition-all duration-300 transform hover:-translate-y-1 ${isChaos ? 'glitch-skew-active' : ''}`} style={{ animationDelay: `${index * 100}ms` }}>
    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <a href={project.link} target="_blank" className="text-[#bfff00]"><ExternalLink size={20} /></a>
    </div>
    <div className={`text-[10px] font-mono text-[#bfff00] uppercase tracking-tighter mb-2 ${isChaos ? 'glitch-color-active' : ''}`}>{project.type}</div>
    <h3 className={`text-xl font-bold mb-3 group-hover:text-[#bfff00] transition-colors ${isChaos ? 'glitch-active' : ''}`}>{project.title}</h3>
    <p className={`text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3 font-light ${isChaos ? 'glitch-active' : ''}`}>
      {project.desc}
    </p>
    <div className="flex flex-wrap gap-2">
      {project.tech.map((t, i) => (
        <span key={t} className={`text-[10px] px-2 py-1 bg-white/5 border border-white/10 rounded font-mono text-gray-500 ${isChaos ? 'float-chaos' : ''}`} style={{ animationDelay: `${i * 50}ms` }}>{t}</span>
      ))}
    </div>
  </div>
);

const App: React.FC = () => {
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);
  const [flyingTexts, setFlyingTexts] = useState<Array<{ id: number; phrase: typeof FLYING_PHRASES[0]; direction: 'right' | 'left' | 'diagonal'; top: string; delay: number }>>([]);

  useEffect(() => {
    if (isPhotoHovered) {
      // Launch flying texts at intervals
      const intervals: NodeJS.Timeout[] = [];
      const directions: Array<'right' | 'left' | 'diagonal'> = ['right', 'left', 'diagonal'];

      FLYING_PHRASES.forEach((phrase, index) => {
        const timeout = setTimeout(() => {
          const id = Date.now() + index;
          const direction = directions[index % 3];
          const top = `${10 + (index * 8) % 80}%`;

          setFlyingTexts(prev => [...prev, { id, phrase, direction, top, delay: 0 }]);

          // Remove after animation
          setTimeout(() => {
            setFlyingTexts(prev => prev.filter(t => t.id !== id));
          }, 2500);
        }, index * 200);

        intervals.push(timeout);
      });

      return () => {
        intervals.forEach(clearTimeout);
      };
    } else {
      setFlyingTexts([]);
    }
  }, [isPhotoHovered]);

  return (
    <div className={`min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#bfff00] selection:text-black ${isPhotoHovered ? 'screen-shake' : ''}`}>
      <Navbar isChaos={isPhotoHovered} />
      <PortalEffect isChaos={isPhotoHovered} />

      {/* Flying Text Layer */}
      {flyingTexts.map(ft => (
        <FlyingText key={ft.id} {...ft} />
      ))}

      {/* Hero Section */}
      <section id="about" className="relative pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className={`flex-1 space-y-8 transition-all duration-300 ${isPhotoHovered ? 'glitch-skew-active' : ''}`}>
          <div className={`inline-flex items-center gap-2 px-3 py-1 bg-[#bfff00]/10 border border-[#bfff00]/20 rounded-full ${isPhotoHovered ? 'glitch-color-active' : ''}`}>
            <Zap size={14} className="text-[#bfff00]" />
            <span className="text-[10px] font-mono text-[#bfff00] uppercase tracking-widest">
              {isPhotoHovered ? '⚠️ CHAOS PROTOCOL ACTIVE ⚠️' : 'Protocol: Active Curiosity'}
            </span>
          </div>
          <h1 className={`text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] ${isPhotoHovered ? 'glitch-active' : ''}`}>
            RUDRAKSH <br />
            <span className={`text-[#88d1e0] ${isPhotoHovered ? 'glitch-color-active' : ''}`}>RANKAWAT</span>
          </h1>
          <p className={`text-xl text-gray-400 max-w-xl font-light leading-relaxed ${isPhotoHovered ? 'glitch-active' : ''}`}>
            I'm a curious engineer operating across dimensions of Software Engineering, AI/ML, and Product Strategy. Currently studying at BITS Pilani and Scaler School of Technology.
          </p>
          <div className={`flex gap-4 ${isPhotoHovered ? 'glitch-active' : ''}`}>
            <a
              href="mailto:rankawatrudraksh@gmail.com"
              className={`px-8 py-3 bg-[#bfff00] text-black font-bold uppercase text-sm tracking-widest hover:bg-white transition-all transform active:scale-95 ${isPhotoHovered ? 'float-chaos' : ''}`}
            >
              Contact Me
            </a>
            <a
              href="/CV - Rudraksh Rankawat.pdf"
              download="Rudraksh_Rankawat_Resume.pdf"
              className={`px-8 py-3 border border-white/20 font-bold uppercase text-sm tracking-widest hover:border-[#bfff00] transition-all ${isPhotoHovered ? 'float-chaos glitch-color-active' : ''}`}
            >
              Resume.zip
            </a>
          </div>
        </div>
        <div className="flex-1 relative">
          <div
            className={`w-full aspect-square border-4 border-[#333] hover:border-[#bfff00] relative overflow-hidden group cursor-pointer transition-all duration-300 ${isPhotoHovered ? 'border-[#bfff00]' : ''}`}
            onMouseEnter={() => setIsPhotoHovered(true)}
            onMouseLeave={() => setIsPhotoHovered(false)}
          >
            <img
              src="/photo.jpeg"
              alt="Rudraksh Rankawat"
              className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-500 ${isPhotoHovered ? 'grayscale scale-110 blur-[1px]' : ''}`}
            />
            <div className={`absolute inset-0 bg-gradient-to-tr from-[#0a0a0a]/60 via-transparent to-[#bfff00]/10 transition-all duration-500 ${isPhotoHovered ? 'from-[#0a0a0a]/90' : ''}`}></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]/90"></div>
            {isPhotoHovered && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-mono font-bold text-[#bfff00] glitch-active">⚡CHAOS⚡</span>
              </div>
            )}
            <div className={`absolute bottom-4 left-4 font-mono text-[10px] text-gray-400 z-10 ${isPhotoHovered ? 'glitch-active' : ''}`}>
              // Dimensional coordinate: 12.9716° N, 77.5946° E
            </div>
          </div>
          {/* Decorative corner */}
          <div className={`absolute -top-4 -right-4 w-12 h-12 border-t-4 border-r-4 border-[#bfff00] transition-all duration-300 ${isPhotoHovered ? 'scale-150 rotate-45' : ''}`}></div>
          <div className={`absolute -bottom-4 -left-4 w-12 h-12 border-b-4 border-l-4 border-[#88d1e0] transition-all duration-300 ${isPhotoHovered ? 'scale-150 -rotate-45' : ''}`}></div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className={`py-20 px-6 max-w-6xl mx-auto border-t border-white/5 ${isPhotoHovered ? 'glitch-skew-active' : ''}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {Object.entries(SKILLS).map(([cat, list], catIndex) => (
            <div key={cat} className="space-y-4">
              <h4 className={`text-xs font-mono text-[#bfff00] uppercase tracking-[0.3em] font-bold ${isPhotoHovered ? 'glitch-active' : ''}`}>{cat}</h4>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {list.map((s, i) => (
                  <span
                    key={s}
                    className={`text-lg font-bold text-gray-400 hover:text-white transition-colors cursor-default ${isPhotoHovered ? 'float-chaos glitch-active' : ''}`}
                    style={{ animationDelay: `${(catIndex * 100) + (i * 50)}ms` }}
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
      <section id="projects" className={`py-20 px-6 max-w-6xl mx-auto ${isPhotoHovered ? 'glitch-skew-active' : ''}`}>
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-4">
            <h2 className={`text-4xl font-black uppercase tracking-tighter ${isPhotoHovered ? 'glitch-active' : ''}`}>Selected Inventions</h2>
            <p className={`text-gray-500 font-mono text-xs max-w-md uppercase ${isPhotoHovered ? 'glitch-active' : ''}`}>Things I built when curiosity peaked and the laws of physics allowed it.</p>
          </div>
          <div className={`hidden md:block h-[1px] flex-1 bg-white/5 mx-8 mb-4 ${isPhotoHovered ? 'bg-[#bfff00]/50' : ''}`}></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} isChaos={isPhotoHovered} index={i} />
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`py-20 px-6 max-w-6xl mx-auto border-t border-white/5 ${isPhotoHovered ? 'glitch-skew-active' : ''}`}>
        <h2 className={`text-4xl font-black uppercase tracking-tighter mb-12 ${isPhotoHovered ? 'glitch-active' : ''}`}>Timeline</h2>
        <div className="space-y-16">
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className={`flex flex-col md:flex-row gap-8 ${isPhotoHovered ? 'float-chaos' : ''}`} style={{ animationDelay: `${i * 100}ms` }}>
              <div className="md:w-1/3">
                <div className={`text-[#bfff00] font-mono text-sm mb-1 ${isPhotoHovered ? 'glitch-color-active' : ''}`}>{exp.period}</div>
                <h3 className={`text-2xl font-bold ${isPhotoHovered ? 'glitch-active' : ''}`}>{exp.company}</h3>
                <div className={`text-gray-500 text-sm font-mono uppercase ${isPhotoHovered ? 'glitch-active' : ''}`}>{exp.role}</div>
              </div>
              <div className="md:w-2/3 space-y-4">
                <ul className="space-y-3">
                  {exp.points.map((p, j) => (
                    <li key={j} className={`flex gap-4 text-gray-400 leading-relaxed font-light ${isPhotoHovered ? 'glitch-active' : ''}`}>
                      <span className={`text-[#bfff00] mt-1.5 shrink-0 ${isPhotoHovered ? 'float-chaos' : ''}`}><div className="w-1.5 h-1.5 bg-[#bfff00]"></div></span>
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
      <footer id="contact" className={`py-20 px-6 max-w-6xl mx-auto border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 ${isPhotoHovered ? 'glitch-skew-active' : ''}`}>
        <div className="text-center md:text-left">
          <h2 className={`text-4xl font-black uppercase tracking-tighter mb-2 ${isPhotoHovered ? 'glitch-active glitch-color-active' : ''}`}>
            {isPhotoHovered ? '🔥 MAXIMUM OVERDRIVE! 🔥' : 'Wubba Lubba Dub Dub!'}
          </h2>
          <p className={`text-gray-500 font-mono text-xs uppercase ${isPhotoHovered ? 'glitch-active' : ''}`}>
            {isPhotoHovered ? 'CHAOS MODE ACTIVATED // ALL SYSTEMS NOMINAL' : 'No more distress, only code.'}
          </p>
        </div>
        <div className={`flex gap-6 ${isPhotoHovered ? 'glitch-active' : ''}`}>
          <a href="mailto:rankawatrudraksh@gmail.com" className={`p-4 bg-[#111] border border-[#333] hover:border-[#bfff00] transition-colors rounded-full ${isPhotoHovered ? 'float-chaos' : ''}`} style={{ animationDelay: '0ms' }}><Mail size={24} /></a>
          <a href="https://github.com/rudraksh-rankawat" target="_blank" className={`p-4 bg-[#111] border border-[#333] hover:border-[#bfff00] transition-colors rounded-full ${isPhotoHovered ? 'float-chaos' : ''}`} style={{ animationDelay: '100ms' }}><Github size={24} /></a>
          <a href="https://linkedin.com/in/rudraksh-rankawat" target="_blank" className={`p-4 bg-[#111] border border-[#333] hover:border-[#bfff00] transition-colors rounded-full ${isPhotoHovered ? 'float-chaos' : ''}`} style={{ animationDelay: '200ms' }}><Linkedin size={24} /></a>
          <a href="https://x.com/rankawwat" target="_blank" className={`p-4 bg-[#111] border border-[#333] hover:border-[#bfff00] transition-colors rounded-full ${isPhotoHovered ? 'float-chaos' : ''}`} style={{ animationDelay: '300ms' }}><Twitter size={24} /></a>
        </div>
      </footer>

      <div className={`fixed bottom-4 left-4 font-mono text-[8px] text-gray-700 pointer-events-none select-none ${isPhotoHovered ? 'text-[#bfff00] glitch-active' : ''}`}>
        {isPhotoHovered ? '⚡ CHAOS_DIMENSION // REALITY_UNSTABLE ⚡' : `C-137 // ${new Date().getFullYear()} // RUDRAKSH_PROTOCAL`}
      </div>

      {/* Chaos overlay scanlines */}
      {isPhotoHovered && (
        <div
          className="fixed inset-0 pointer-events-none z-[100]"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.1) 2px, rgba(0, 0, 0, 0.1) 4px)',
            animation: 'none'
          }}
        />
      )}
    </div>
  );
};

export default App;
