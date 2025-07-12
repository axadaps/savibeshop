'use client';

import React, { useState, useEffect } from 'react';
import { Instagram, MessageCircle, ShoppingCart, Sparkles, Leaf, DollarSign, CheckCircle, Menu, X } from 'lucide-react';

// Type definitions
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  speedX: number;
  speedY: number;
}

interface ParticlesProps {
  particleCount?: number;
  particleColors?: string[];
}

interface NavLink {
  href: string;
  text: string;
}

interface NavbarProps {
  links: NavLink[];
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

interface ContactButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  className?: string;
  delay?: number;
}

// Komponen Particles Background
const Particles: React.FC<ParticlesProps> = ({ particleCount = 100, particleColors = ['#8B5CF6', '#EC4899', '#6366F1'] }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        opacity: Math.random() * 0.5 + 0.2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      });
    }
    setParticles(newParticles);
  }, [particleCount, particleColors]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map((particle: Particle) => ({
        ...particle,
        x: (particle.x + particle.speedX + 100) % 100,
        y: (particle.y + particle.speedY + 100) % 100,
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle: Particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transform: `scale(${particle.size})`,
            animation: `float ${3 + Math.random() * 2}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
};

// Komponen Navbar
const Navbar: React.FC<NavbarProps> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#home" className="flex-shrink-0">
            <img 
              src="/logo.svg" 
              alt="SavibeShop Logo" 
              className="h-12 w-auto" // Ukuran disesuaikan untuk navbar
            />
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {links.map((link: NavLink) => (
              <a
                key={link.href}
                href={link.href}
                className={`transition-colors duration-200 ${
                  isScrolled ? 'text-slate-700 hover:text-purple-600' : 'text-white hover:text-purple-300'
                }`}
              >
                {link.text}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 transition-colors duration-200 ${
              isScrolled ? 'text-slate-700' : 'text-white'
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md rounded-lg mt-2 p-4 shadow-lg">
            {links.map((link: NavLink) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-2 text-slate-700 hover:text-purple-600 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.text}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

// Komponen untuk Kartu Fitur dengan Motion
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border border-purple-100/50 h-full hover:shadow-2xl hover:shadow-purple-300/25 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } hover:-translate-y-2`}
    >
      <div className="inline-block p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="font-bold text-lg sm:text-xl text-slate-800 mb-3 leading-tight">{title}</h3>
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{description}</p>
    </div>
  );
};

// Komponen untuk Tombol Kontak dengan Motion
const ContactButton: React.FC<ContactButtonProps> = ({ href, icon, label, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-3 px-6 py-4 rounded-full font-bold text-white relative overflow-hidden group min-w-[160px] transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } hover:scale-105 hover:shadow-xl ${className}`}
    >
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <span className="relative z-10 text-lg transform group-hover:scale-110 transition-transform duration-300">{icon}</span>
      <span className="relative z-10 text-sm sm:text-base">{label}</span>
    </a>
  );
};

// Komponen Utama Landing Page
export default function SavibeShopLanding() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const navLinks: NavLink[] = [
    { href: "#home", text: "Home" },
    { href: "#features", text: "Features" },
    { href: "#about", text: "About" },
    { href: "#contact", text: "Contact" }
  ];

  return (
    <div className="min-h-screen w-full font-sans bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 text-white overflow-x-hidden scrollbar-hide">
      {/* Navbar */}
      <Navbar links={navLinks} />

      {/* Particles Background */}
      <div className="absolute top-0 right-0 left-0 bottom-0 w-full h-full">
        <Particles
          particleColors={['#8B5CF6', '#EC4899', '#6366F1']}
          particleCount={150}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Home Section */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
            {/* LEFT - Logo */}
            <div 
              className={`md:col-span-6 flex justify-center items-center transition-all duration-800 ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-50 animate-pulse"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                  <img 
                    src="/logo.svg" 
                    alt="SavibeShop Logo" 
                    className="w-64 sm:w-80 lg:w-96 mx-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-300" 
                  />
                </div>
              </div>
            </div>

            {/* RIGHT - Intro Text */}
            <div 
              className={`md:col-span-6 flex flex-col justify-center items-center md:items-start text-center md:text-left transition-all duration-800 delay-200 ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent mb-4">
                𝑇𝑟𝑒𝑛𝑑𝑦 𝑆𝑡𝑦𝑙𝑒𝑠 𝐴𝑓𝑓𝑜𝑟𝑑𝑎𝑏𝑙𝑒 𝐹𝑎𝑠ℎ𝑖𝑜𝑛
              </h1>
              <p className="text-lg sm:text-xl text-purple-200 font-medium tracking-wide bg-black/20 rounded-lg px-4 py-2 mb-6">
                Fashion Preloved | Sustainable Style | Unique Collections
              </p>
              <p className="text-base sm:text-lg text-white/80 mb-8 leading-relaxed">
                Selamat datang di SavibeShop. Kami menghadirkan fashion preloved pilihan yang tak hanya mendefinisikan gaya, tapi juga merawat dunia.
              </p>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <a 
                  href="#features" 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 inline-block"
                >
                  Jelajahi Keunggulan Kami
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Kenapa 
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                SavibeShop?
              </span>
            </h2>
            <p className="text-purple-200 text-lg font-medium">
              Investasi gaya yang berkelanjutan dan penuh makna
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<CheckCircle size={32} className="text-purple-600"/>}
              title="Kualitas Terkurasi"
              description="Setiap item melewati seleksi ketat untuk memastikan Anda mendapatkan kualitas dan kondisi terbaik."
              delay={0}
            />
            <FeatureCard 
              icon={<Leaf size={32} className="text-green-600"/>}
              title="Pilihan Sadar Lingkungan"
              description="Dengan memilih preloved, Anda secara aktif mengurangi jejak karbon dan limbah industri fashion."
              delay={100}
            />
            <FeatureCard 
              icon={<DollarSign size={32} className="text-yellow-600"/>}
              title="Nilai Terbaik"
              description="Tampil menawan dengan brand favorit dan kualitas premium, dengan harga yang lebih bijaksana."
              delay={200}
            />
            <FeatureCard 
              icon={<Sparkles size={32} className="text-pink-600"/>}
              title="Koleksi Unik & Langka"
              description="Temukan harta karun fashion yang akan membuat gaya Anda berbeda dan tak terlupakan."
              delay={300}
            />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24">
          <div className="bg-white/10 backdrop-blur-sm p-8 sm:p-12 rounded-3xl border border-white/20">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Tentang 
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  SavibeShop
                </span>
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  SavibeShop adalah pioneer dalam fashion preloved berkualitas tinggi. Kami percaya bahwa setiap pakaian memiliki cerita, dan setiap cerita layak untuk dilanjutkan.
                </p>
                <p className="text-white/80 text-lg leading-relaxed">
                  Dengan kurasi yang cermat dan standar kualitas yang tinggi, kami memastikan setiap item yang sampai ke tangan Anda tidak hanya indah, tetapi juga bermakna.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 p-8 rounded-2xl">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">1000+</div>
                    <div className="text-purple-200">Happy Customers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24">
          <div className="bg-white/10 backdrop-blur-sm p-8 sm:p-12 rounded-3xl border border-white/20 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Mulai 
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Petualangan Gayamu!
              </span>
            </h2>
            <p className="text-white/80 text-lg mb-12 max-w-3xl mx-auto leading-relaxed">
              Kunjungi kami di platform favorit Anda. Koleksi terbaru menanti untuk menjadi bagian dari cerita gaya Anda.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 max-w-2xl mx-auto">
              <ContactButton 
                href="https://instagram.com/savibeshop"
                icon={<Instagram />}
                label="Instagram"
                className="bg-gradient-to-br from-pink-500 to-rose-600 w-full sm:w-auto hover:from-pink-600 hover:to-rose-700"
                delay={0}
              />
              <ContactButton 
                href="https://wa.me/6285855217216"
                icon={<MessageCircle />}
                label="WhatsApp"
                className="bg-gradient-to-br from-green-500 to-green-600 w-full sm:w-auto hover:from-green-600 hover:to-green-700"
                delay={100}
              />
              <ContactButton 
                href="https://shopee.co.id/babaluana"
                icon={<ShoppingCart />}
                label="Shopee"
                className="bg-gradient-to-br from-orange-500 to-orange-600 w-full sm:w-auto hover:from-orange-600 hover:to-orange-700"
                delay={200}
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-12 border-t border-white/20">
          <p className="text-white/60 text-sm sm:text-base">
            © {new Date().getFullYear()} SavibeShop. 𝑇𝑟𝑒𝑛𝑑𝑦 𝑆𝑡𝑦𝑙𝑒𝑠 | 𝐴𝑓𝑓𝑜𝑟𝑑𝑎𝑏𝑙𝑒 𝐹𝑎𝑠ℎ𝑖𝑜𝑛
          </p>
        </footer>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}