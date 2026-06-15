import Layout from '../components/Layout';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Shield, DoorOpen, Warehouse, Grid3X3, Layers, Flame, Award, Users, Clock, Phone, MessageCircle } from 'lucide-react';

const categories = [
  { name: 'Rolling Shutter', href: '/rolling-shutter', icon: Shield,    description: 'Manual, gear & remote shutters' },
  { name: 'Doors',           href: '/doors',           icon: DoorOpen,  description: 'Main, safety & interior doors' },
  { name: 'Gates',           href: '/gates',           icon: Warehouse, description: 'Sliding, foldable & swing gates' },
  { name: 'Grills',          href: '/grills',          icon: Grid3X3,   description: 'Window & balcony grills' },
  { name: 'Staircase',       href: '/staircase',       icon: Layers,    description: 'SS & MS staircase railings' },
  { name: 'Welding Works',   href: '/welding-works',   icon: Flame,     description: 'MIG, TIG & on-site welding' },
];

const stats = [
  { value: '25+',   label: 'Years' },
  { value: '5000+', label: 'Projects' },
  { value: '100%',  label: 'Quality' },
  { value: '24hr',  label: 'Turnaround' },
];

// ── Welder Scene: SVG arm+torch + bright sparks at the tip ───────────────────
function WelderScene() {
  const canvasRef = useRef(null);

  // Torch tip position as a fraction of the container (matches the SVG below)
  const TIP_X = 0.655;
  const TIP_Y = 0.32;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Spark {
      constructor() { this.reset(true); }

      reset(initial = false) {
        const ox = canvas.width  * TIP_X;
        const oy = canvas.height * TIP_Y;
        this.x = ox + (Math.random() - 0.5) * 8;
        this.y = oy + (Math.random() - 0.5) * 8;

        // Fountain spray — mostly upward (-135° to -45°)
        const angle = -Math.PI * 0.75 + Math.random() * Math.PI * 0.5;
        const speed = initial ? Math.random() * 4 + 1 : Math.random() * 7.5 + 2.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.gravity = 0.15 + Math.random() * 0.1;
        this.drag    = 0.99;

        this.life    = 0;
        this.maxLife = 40 + Math.random() * 65;
        this.size    = 3 + Math.random() * 5;

        // Mostly bright white-hot / yellow, some orange, occasional red
        const r = Math.random();
        this.hue = r < 0.55 ? 48 : r < 0.85 ? 30 : 12;
        this.trail = [];
      }

      update() {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 7) this.trail.shift();

        this.vx *= this.drag;
        this.vy *= this.drag;
        this.vy += this.gravity;
        this.x  += this.vx;
        this.y  += this.vy;
        this.life++;

        if (this.life > this.maxLife) this.reset();
      }

      draw(ctx) {
        const alpha = 1 - this.life / this.maxLife;

        if (this.trail.length > 1) {
          ctx.save();
          ctx.globalAlpha = Math.min(1, alpha);
          ctx.strokeStyle = `hsl(${this.hue}, 100%, 78%)`;
          ctx.lineWidth   = this.size * 0.7;
          ctx.lineCap     = 'round';
          ctx.beginPath();
          this.trail.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
          ctx.stroke();
          ctx.restore();
        }

        ctx.save();
        ctx.globalAlpha = Math.min(1, alpha * 1.3);
        const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4);
        grd.addColorStop(0,    `hsl(${this.hue}, 100%, 98%)`);
        grd.addColorStop(0.35, `hsl(${this.hue}, 100%, 70%)`);
        grd.addColorStop(1,    `hsla(${this.hue}, 100%, 45%, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Bright arc-flash glow at the torch tip
    const drawArc = (x, y) => {
      const r = 38;
      const flash = ctx.createRadialGradient(x, y, 0, x, y, r);
      flash.addColorStop(0,    'rgba(255,255,240,1)');
      flash.addColorStop(0.25, 'rgba(255,215,100,0.9)');
      flash.addColorStop(1,    'rgba(255,120,0,0)');
      ctx.save();
      ctx.globalAlpha = 0.8 + Math.random() * 0.2; // flicker
      ctx.fillStyle   = flash;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const isMobile   = window.innerWidth < 640;
    const sparkCount = isMobile ? 55 : 100;
    const sparks = Array.from({ length: sparkCount }, () => {
      const s = new Spark();
      s.life = Math.floor(Math.random() * s.maxLife);
      return s;
    });

    let raf;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawArc(canvas.width * TIP_X, canvas.height * TIP_Y);
      sparks.forEach(s => { s.update(); s.draw(ctx); });
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 pointer-events-none">
      {/* Welder's arm, glove & torch */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full" aria-hidden="true">
        {/* Forearm in sleeve, entering from bottom-right corner */}
        <path d="M400,400 L228,228" stroke="#262626" strokeWidth="92" strokeLinecap="round" fill="none" />
        {/* Orange cuff band near the glove */}
        <path d="M272,272 L226,226" stroke="#f97316" strokeWidth="90" strokeLinecap="round" fill="none" opacity="0.95" />
        {/* Gloved fist */}
        <circle cx="223" cy="223" r="54" fill="#1c1310" />
        {/* Torch barrel */}
        <path d="M223,223 L259,134" stroke="#3a3a3a" strokeWidth="24" strokeLinecap="round" fill="none" />
        {/* Trigger detail */}
        <circle cx="236" cy="193" r="7" fill="#dc2626" />
        {/* Copper nozzle / tip */}
        <path d="M248,160 L262,128" stroke="#c97b3c" strokeWidth="13" strokeLinecap="round" fill="none" />
      </svg>

      {/* Spark canvas — aligned to torch tip via TIP_X / TIP_Y */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const phone    = process.env.NEXT_PUBLIC_BUSINESS_PHONE  || '+91 9966552243';
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919966552243';

  return (
    <Layout title="Metro Fabrication Works — Rolling Shutters, Gates & Fabrication in Hyderabad">

      {/* ── HERO ── */}
      <section className="relative bg-primary overflow-hidden" style={{ minHeight: '420px' }}>
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, #f97316 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        {/* 🔥 Welder figure with bright sparks — bottom-right corner */}
        <WelderScene />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 md:py-20">
          <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/30 text-secondary px-3 py-1 rounded-full text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
            Hyderabad&apos;s Trusted Fabrication Shop Since 2000
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-white leading-none tracking-wide mb-4">
            STEEL STRONG.<br />
            <span className="text-secondary">BUILT TO LAST.</span>
          </h1>

          <p className="text-gray-300 text-base md:text-xl mb-6 max-w-lg leading-relaxed">
            Rolling shutters, gates, doors, grills & welding work.<br className="hidden sm:block" />
            Musheerabad, Hyderabad.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a href={`tel:${phone}`}
              className="flex items-center justify-center gap-2 bg-secondary hover:bg-orange-600 text-white font-semibold px-6 py-3.5 rounded-xl transition text-base">
              <Phone size={18} /> Call: {phone}
            </a>
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3.5 rounded-xl transition text-base">
              <MessageCircle size={18} /> WhatsApp Us
            </a>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative z-10 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-4">
              {stats.map((stat, i) => (
                <div key={i} className={`py-4 text-center ${i < stats.length - 1 ? 'border-r border-gray-800' : ''}`}>
                  <div className="font-display text-2xl md:text-3xl text-secondary">{stat.value}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-5xl text-primary tracking-wide mb-1">OUR SERVICES</h2>
          <p className="text-gray-400 text-sm md:text-base mb-6">Tap a category to see products &amp; pricing</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link key={cat.name} href={cat.href}
                  className="group bg-white rounded-2xl border border-gray-100 hover:border-secondary/40 transition-all overflow-hidden card-hover">
                  <div className="flex flex-col items-center justify-center p-5 md:p-7 text-center h-full">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-primary group-hover:bg-secondary rounded-xl flex items-center justify-center mb-3 transition-colors duration-300">
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-secondary group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm md:text-lg leading-tight group-hover:text-secondary transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-gray-400 text-xs mt-1 leading-snug hidden md:block">{cat.description}</p>
                    <div className="hidden md:block mt-4 text-secondary text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      View Products →
                    </div>
                  </div>
                  <div className="h-1 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-12 md:py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, #f97316 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-5xl text-white tracking-wide mb-2">WHY CHOOSE US?</h2>
          <p className="text-gray-400 text-sm md:text-lg mb-8">Trusted fabrication in Musheerabad, Hyderabad</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {[
              { icon: Award, title: 'Premium Quality',  desc: 'High-grade MS, SS & galvanised materials. Every weld and finish is inspected before delivery.' },
              { icon: Users, title: 'Expert Craftsmen', desc: '25+ years of hands-on experience in metal fabrication and on-site installation across Hyderabad.' },
              { icon: Clock, title: 'Fast Turnaround',  desc: 'Most projects are completed and installed within the committed timeline — no delays.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-800 hover:border-secondary/40 transition-colors">
                  <div className="w-11 h-11 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-secondary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-5xl text-white tracking-wide mb-3">GET A FREE QUOTE</h2>
          <p className="text-orange-100 text-base mb-6">Call or WhatsApp — we respond fast.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={`tel:${phone}`}
              className="flex items-center justify-center gap-2 bg-white text-secondary font-semibold px-7 py-3.5 rounded-xl hover:bg-gray-100 transition">
              <Phone size={18} /> {phone}
            </a>
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-green-600 transition">
              <MessageCircle size={18} /> WhatsApp Now
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
