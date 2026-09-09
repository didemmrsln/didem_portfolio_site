import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, FileDown, Github, Linkedin, Search } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery = '',
  onSearchChange,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'technical-skills', 'featured-work', 'bootcamp-projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const el = document.getElementById('featured-work');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Featured Work', href: '#featured-work', id: 'featured-work' },
    { label: 'Bootcamp Projects', href: '#bootcamp-projects', id: 'bootcamp-projects' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#141414]/92 backdrop-blur-md border-b border-[#262220] py-3.5 shadow-2xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between gap-4">
        {/* Monogram / Logo */}
        <a
          href="#hero"
          className="group flex items-center space-x-3 text-left focus:outline-none shrink-0"
          aria-label="Home"
        >
          <div className="w-8 h-8 rounded-sm bg-[#1C1A18] border border-[#38322C] text-[#EDE8E1] flex items-center justify-center font-display text-xs font-semibold group-hover:border-[#C8442C] transition-colors">
            DAY
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm font-medium tracking-tight text-[#EDE8E1] group-hover:text-[#C8442C] transition-colors">
              {PERSONAL_INFO.name}
            </span>
            <span className="font-mono-code text-[10px] text-[#8E867E] uppercase tracking-widest hidden sm:inline">
              Data Science & Research
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-1 bg-[#181615]/80 border border-[#2B2724] px-2 py-1 rounded-sm text-xs font-mono-code text-[#A8A096]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`px-3 py-1.5 rounded-sm transition-all duration-300 ${
                  isActive
                    ? 'bg-[#262220] text-[#EDE8E1] border border-[#3E3833]'
                    : 'text-[#8E867E] hover:text-[#EDE8E1] hover:bg-[#1E1C1B]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Global Search Input (Desktop) */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden sm:flex items-center relative max-w-xs w-44 md:w-56 focus-within:w-64 transition-all duration-300"
        >
          <Search className="w-3.5 h-3.5 text-[#8E867E] absolute left-3 pointer-events-none" />
          <input
            id="navbar-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search projects & tags..."
            className="w-full bg-[#181615] border border-[#2E2925] focus:border-[#C8442C] focus:bg-[#1C1A18] text-[#EDE8E1] placeholder-[#7A726A] text-xs font-mono-code rounded-sm pl-8.5 pr-7 py-1.5 outline-none transition-colors"
            aria-label="Search projects by title, tags, or keywords"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange?.('')}
              className="absolute right-2 text-[#8E867E] hover:text-[#EDE8E1] p-0.5 rounded transition-colors"
              aria-label="Clear search query"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </form>

        {/* Right Actions: Download CV + Social Profiles + Contact Link */}
        <div className="hidden md:flex items-center space-x-3 shrink-0">
          {/* Download CV (PDF) Anchor */}
          <a
            id="navbar-download-cv-btn"
            href="/Didem_Arslan_Yenihayat_CV.pdf"
            download="Didem_Arslan_Yenihayat_CV.pdf"
            className="group inline-flex items-center space-x-2 px-3.5 py-1.5 text-xs font-mono-code rounded-sm border bg-[#181615] border-[#2E2925] hover:border-[#B8976C] text-[#C5BEB5] hover:text-[#EDE8E1] transition-all duration-300"
            aria-label="Download CV (PDF)"
            title="Download Curriculum Vitae (PDF)"
          >
            <FileDown className="w-3.5 h-3.5 text-[#B8976C] group-hover:text-[#EDE8E1] transition-colors" />
            <span>CV</span>
          </a>

          {/* Social Profiles */}
          <div className="flex items-center space-x-1 border-l border-[#2B2724] pl-3">
            <a
              href="https://github.com/didemmrsln"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-[#A8A096] hover:text-[#EDE8E1] hover:bg-[#1E1C1B] rounded-sm transition-colors"
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4 text-[#B8976C] hover:text-[#EDE8E1] transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/in/didem-arslan-yenihayat-24303688"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-[#A8A096] hover:text-[#EDE8E1] hover:bg-[#1E1C1B] rounded-sm transition-colors"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4 text-[#B8976C] hover:text-[#EDE8E1] transition-colors" />
            </a>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center space-x-1.5 text-xs font-mono-code text-[#C8442C] hover:text-[#EDE8E1] transition-colors pl-1"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#EDE8E1] hover:bg-[#201D1A] rounded-sm transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-[#EDE8E1]" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#161514] border-b border-[#262220] px-6 py-6 space-y-4">
          {/* Mobile Search Bar */}
          <form
            onSubmit={(e) => {
              handleSearchSubmit(e);
              setMobileMenuOpen(false);
            }}
            className="relative w-full"
          >
            <Search className="w-4 h-4 text-[#8E867E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search projects & tags..."
              className="w-full bg-[#1A1817] border border-[#302B27] focus:border-[#C8442C] text-[#EDE8E1] placeholder-[#7A726A] text-xs font-mono-code rounded-sm pl-10 pr-8 py-2.5 outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange?.('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E867E] hover:text-[#EDE8E1] p-1"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          <div className="flex flex-col space-y-2 text-xs font-mono-code">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-sm transition-colors ${
                  activeSection === link.id
                    ? 'bg-[#C8442C] text-white'
                    : 'text-[#A8A096] hover:bg-[#1F1D1B]'
                }`}
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 border-t border-[#262220] space-y-2">
              <a
                href="/Didem_Arslan_Yenihayat_CV.pdf"
                download="Didem_Arslan_Yenihayat_CV.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#1C1A18] border border-[#2E2925] hover:border-[#B8976C] text-xs font-mono-code text-[#EDE8E1] rounded-sm transition-colors"
                aria-label="Download CV (PDF)"
              >
                <FileDown className="w-4 h-4 text-[#B8976C]" />
                <span>Download CV (PDF)</span>
              </a>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href="https://github.com/didemmrsln"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 px-3 py-2 bg-[#141312] border border-[#2B2724] text-xs font-mono-code text-[#C5BEB5] rounded-sm"
                >
                  <Github className="w-3.5 h-3.5 text-[#B8976C]" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/didem-arslan-yenihayat-24303688"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 px-3 py-2 bg-[#141312] border border-[#2B2724] text-xs font-mono-code text-[#C5BEB5] rounded-sm"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#B8976C]" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
