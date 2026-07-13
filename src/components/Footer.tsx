import { Link } from 'react-router-dom';
import { 
  Accessibility, 
  Leaf, 
  Phone, 
  Mail, 
  MapPin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Radio
} from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: 'Crowd Map', path: '/crowd-map' },
    { name: 'Navigation', path: '/navigation' },
    { name: 'Events', path: '/events' },
    { name: 'Emergency', path: '/emergency' },
  ];

  const services = [
    { name: 'Volunteer Hub', path: '/volunteer' },
    { name: 'Accessibility', path: '/accessibility' },
    { name: 'Transit', path: '/transit' },
    { name: 'Sustainability', path: '/sustainability' },
  ];

  const resources = [
    { name: 'Security', path: '/security' },
    { name: 'Feedback', path: '/feedback' },
    { name: 'Recommendations', path: '/recommendations' },
    { name: 'Merchandise', path: '/merchandise' },
  ];

  return (
    <footer className="bg-background border-t border-primary/10">
      {/* Accessibility Quick Access Toolbar */}
      <div className="bg-gradient-to-r from-primary/5 via-accent-purple/5 to-secondary/5 border-b border-primary/10">
        <div className="max-w-[120rem] mx-auto px-8 py-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Accessibility className="w-5 h-5 text-primary" />
              <span className="font-paragraph text-sm font-medium text-foreground">
                Quick Access:
              </span>
              <Link 
                to="/accessibility" 
                className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-paragraph text-sm font-medium hover:bg-primary/20 transition-colors"
              >
                Accessibility Services
              </Link>
              <Link 
                to="/emergency" 
                className="px-4 py-2 rounded-lg bg-destructive/10 text-destructive font-paragraph text-sm font-medium hover:bg-destructive/20 transition-colors"
              >
                Emergency Help
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <Leaf className="w-5 h-5 text-secondary" />
              <div className="font-paragraph text-sm">
                <span className="text-foreground/60">Carbon Saved Today: </span>
                <span className="font-bold text-secondary">2,847 kg CO₂</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[120rem] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="font-heading text-xl font-bold text-background">N</span>
                </div>
              </div>
              <div>
                <div className="font-heading text-2xl font-bold text-foreground">
                  Project Nexus
                </div>
                <div className="font-paragraph text-sm text-foreground/50">
                  FIFA World Cup 2026
                </div>
              </div>
            </div>
            
            <p className="font-paragraph text-foreground/60 mb-6 leading-relaxed max-w-md">
              The unified ecosystem transforming the FIFA World Cup 2026 experience through real-time intelligence, predictive AI, and seamless coordination for millions worldwide.
            </p>
            
            <div className="flex items-center gap-2 text-sm font-paragraph text-foreground/50">
              <Radio className="w-4 h-4 text-primary animate-pulse" />
              <span>Live Intelligence Active • All Systems Operational</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-paragraph text-foreground/60 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-paragraph text-foreground/60 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground mb-6">
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-paragraph text-foreground/60 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Emergency Contact Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 p-8 rounded-2xl bg-gradient-to-br from-destructive/5 to-transparent border border-destructive/20">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-destructive/10">
              <Phone className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <div className="font-heading text-sm font-bold text-foreground mb-1">
                Emergency Hotline
              </div>
              <div className="font-paragraph text-lg font-bold text-destructive">
                +1-800-FIFA-911
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-heading text-sm font-bold text-foreground mb-1">
                Support Email
              </div>
              <div className="font-paragraph text-sm text-primary">
                support@projectnexus.fifa
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-secondary/10">
              <MapPin className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <div className="font-heading text-sm font-bold text-foreground mb-1">
                Operations Center
              </div>
              <div className="font-paragraph text-sm text-foreground/60">
                16 Cities • 3 Nations
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-primary/10">
          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm font-paragraph text-foreground/50">
            <span>© 2026 Project Nexus. All rights reserved.</span>
            <span>•</span>
            <span>FIFA World Cup 2026™</span>
            <span>•</span>
            <span>Powered by AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
