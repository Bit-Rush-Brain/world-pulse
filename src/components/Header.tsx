import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Radio, 
  Globe, 
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import Cart from '@/components/Cart';
import { useCart } from '@/integrations';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const location = useLocation();
  const { itemCount, actions } = useCart();

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Crowd Map', path: '/crowd-map' },
    { name: 'Navigation', path: '/navigation' },
    { name: 'Events', path: '/events' },
    { name: 'Emergency', path: '/emergency' },
    { name: 'Volunteer', path: '/volunteer' },
    { name: 'Accessibility', path: '/accessibility' },
    { name: 'Transit', path: '/transit' },
    { name: 'Merchandise', path: '/merchandise' },
  ];

  const languages = ['EN', 'ES', 'FR', 'DE', 'PT', 'AR', 'ZH', 'JA', 'KO'];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Emergency Alert Banner */}
      <div className="bg-destructive text-destructive-foreground">
        <div className="max-w-[120rem] mx-auto px-8 py-3">
          <div className="flex items-center justify-center gap-3">
            <Radio className="w-4 h-4 animate-pulse" />
            <span className="font-paragraph text-sm font-medium">
              Emergency Services Active • 24/7 Support Available
            </span>
            <Link to="/emergency" className="underline hover:no-underline text-sm font-semibold">
              Access Now
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-primary/10">
        <div className="max-w-[120rem] mx-auto px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-all" />
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="font-heading text-lg font-bold text-background">N</span>
                </div>
              </div>
              <div>
                <div className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  Project Nexus
                </div>
                <div className="font-paragraph text-xs text-foreground/50">
                  FIFA World Cup 2026
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 font-paragraph text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  {item.name}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors"
                >
                  <Globe className="w-4 h-4 text-primary" />
                  <span className="font-paragraph text-sm font-medium text-foreground">
                    {selectedLanguage}
                  </span>
                  <ChevronDown className="w-4 h-4 text-foreground/50" />
                </button>

                <AnimatePresence>
                  {isLanguageOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full right-0 mt-2 w-32 rounded-lg bg-background border border-primary/20 shadow-xl overflow-hidden"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            setSelectedLanguage(lang);
                            setIsLanguageOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left font-paragraph text-sm transition-colors ${
                            selectedLanguage === lang
                              ? 'bg-primary/10 text-primary'
                              : 'text-foreground/70 hover:bg-primary/5'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Emergency Button */}
              <Link to="/emergency">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg font-paragraph text-sm font-semibold transition-all hover:shadow-[0_0_20px_rgba(255,0,0,0.3)]"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Emergency</span>
                </motion.button>
              </Link>

              {/* Cart Button */}
              <button
                onClick={actions.toggleCart}
                className="relative p-2 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {itemCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-xs font-bold"
                  >
                    {itemCount}
                  </motion.div>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-foreground" />
                ) : (
                  <Menu className="w-5 h-5 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-primary/10 bg-background/95 backdrop-blur-xl"
            >
              <nav className="max-w-[120rem] mx-auto px-8 py-6 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg font-paragraph text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground/70 hover:bg-primary/5'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="pt-4 border-t border-primary/10">
                  <Link to="/emergency" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-destructive text-destructive-foreground rounded-lg font-paragraph text-sm font-semibold">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Emergency Access</span>
                    </button>
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Cart Component */}
      <Cart />
    </>
  );
}
