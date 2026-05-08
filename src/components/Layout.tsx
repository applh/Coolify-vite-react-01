import { Outlet, Link, useLocation } from "react-router-dom";
import { Box, Menu, X } from "lucide-react";
import { useState } from "react";
import { ContactSection } from "./ContactSection";

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Pricing", path: "/pricing" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isContactPage = location.pathname === "/contact";

  return (
    <div className="min-h-screen bg-base-950 text-white overflow-hidden flex flex-col">
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none bg-grid-white/[0.02] bg-[size:40px_40px] mask-fade-out z-[-1]" />
      
      {/* Radial Gradient */}
      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[120px] pointer-events-none z-[-1]" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[100px] pointer-events-none z-[-1]" />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-base-950">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md">
            <Box className="w-6 h-6 text-primary" aria-hidden="true" />
            <span>Coolify<span className="text-white/80">Starter</span></span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2 py-1 ${isActive(link.path) ? "text-white font-semibold" : "text-white/90 hover:text-white"}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="px-4 py-1.5 rounded-full text-sm font-medium bg-white text-black hover:bg-white/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-950">
              Deploy
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 -mr-2 text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-base-950/95 backdrop-blur-md">
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.path) ? "bg-white/10 text-white" : "text-white/90 hover:bg-white/5 hover:text-white"}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-white/10 px-3 flex flex-col gap-4">
                <button className="w-full px-4 py-2 rounded-full text-sm font-medium bg-white text-black hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-950">
                  Deploy
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative pt-16">
        <Outlet />
      </main>

      {/* Global Contact Section */}
      {!isContactPage && <ContactSection />}

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 mt-auto bg-base-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 font-display font-bold text-lg tracking-tight mb-4">
                <Box className="w-5 h-5 text-primary" aria-hidden="true" />
                <span>Coolify<span className="text-white/80">Starter</span></span>
              </div>
              <p className="text-sm text-white/70 max-w-sm leading-relaxed">
                A blazingly fast Coolify starter template built with React, Vite, and Tailwind CSS.
                Ship your applications on your own infrastructure with zero friction.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white tracking-wide mb-4 text-sm uppercase">Company</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link to="/about" className="hover:text-primary transition-colors focus:outline-none focus:text-primary">About Us</Link></li>
                <li><Link to="/services" className="hover:text-primary transition-colors focus:outline-none focus:text-primary">Services</Link></li>
                <li><Link to="/pricing" className="hover:text-primary transition-colors focus:outline-none focus:text-primary">Pricing</Link></li>
                <li><Link to="/blog" className="hover:text-primary transition-colors focus:outline-none focus:text-primary">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white tracking-wide mb-4 text-sm uppercase">Legal</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link to="/privacy" className="hover:text-primary transition-colors focus:outline-none focus:text-primary">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-primary transition-colors focus:outline-none focus:text-primary">Terms of Service</Link></li>
                <li><Link to="/legal" className="hover:text-primary transition-colors focus:outline-none focus:text-primary">Mentions Légales</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors focus:outline-none focus:text-primary">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
            <p>© {new Date().getFullYear()} Coolify Starter. MIT License.</p>
            <div className="flex items-center gap-4">
               <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><span className="sr-only">Twitter</span><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg></a>
               <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><span className="sr-only">GitHub</span><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
