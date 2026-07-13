import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation as NavigationIcon, MapPin, Compass, Globe, Volume2, Accessibility } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NavigationPage() {
  const [destination, setDestination] = useState('');
  const [language, setLanguage] = useState('English');
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [voiceGuidance, setVoiceGuidance] = useState(false);

  const languages = ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Arabic', 'Chinese', 'Japanese', 'Korean'];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="relative w-full overflow-hidden bg-gradient-to-br from-accent-blue/10 via-background to-primary/10">
        <div className="max-w-[120rem] mx-auto px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-foreground mb-6">
              AI-Powered Navigation
            </h1>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl">
              Multilingual turn-by-turn guidance with AR wayfinding, voice assistance, and accessibility-aware routing across all stadium zones
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-[120rem] mx-auto px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
              Plan Your Route
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Enter destination or zone..."
                    className="w-full pl-12 pr-4 py-4 bg-background border border-primary/20 rounded-xl font-paragraph text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/40"
                  />
                </div>
              </div>

              <div>
                <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                  Language
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-background border border-primary/20 rounded-xl font-paragraph text-foreground focus:outline-none focus:border-primary/40"
                  >
                    {languages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-background to-background/50 border border-primary/10">
                  <div className="flex items-center gap-3">
                    <Accessibility className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-paragraph text-sm font-medium text-foreground">Accessibility Mode</div>
                      <div className="font-paragraph text-xs text-foreground/60">Wheelchair-friendly routes</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setAccessibilityMode(!accessibilityMode)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      accessibilityMode ? 'bg-primary' : 'bg-foreground/20'
                    }`}
                  >
                    <motion.div
                      animate={{ x: accessibilityMode ? 24 : 0 }}
                      className="absolute top-1 left-1 w-4 h-4 bg-background rounded-full"
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-background to-background/50 border border-primary/10">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-paragraph text-sm font-medium text-foreground">Voice Guidance</div>
                      <div className="font-paragraph text-xs text-foreground/60">Turn-by-turn audio instructions</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setVoiceGuidance(!voiceGuidance)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      voiceGuidance ? 'bg-primary' : 'bg-foreground/20'
                    }`}
                  >
                    <motion.div
                      animate={{ x: voiceGuidance ? 24 : 0 }}
                      className="absolute top-1 left-1 w-4 h-4 bg-background rounded-full"
                    />
                  </button>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-paragraph font-semibold text-lg transition-all hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]">
                <NavigationIcon className="w-5 h-5" />
                Start Navigation
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
              Features
            </h2>

            <div className="space-y-4">
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-background border border-primary/20">
                <Compass className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">Real-Time Optimization</h3>
                <p className="font-paragraph text-foreground/70">
                  Routes automatically adjust based on live crowd density and congestion data
                </p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-secondary/10 to-background border border-secondary/20">
                <Globe className="w-8 h-8 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">50+ Languages</h3>
                <p className="font-paragraph text-foreground/70">
                  Full navigation support in over 50 languages with native voice guidance
                </p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-accent-blue/10 to-background border border-accent-blue/20">
                <Accessibility className="w-8 h-8 text-accent-blue mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">Accessibility First</h3>
                <p className="font-paragraph text-foreground/70">
                  Wheelchair-accessible routes, elevator locations, and assistance points
                </p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-accent-purple/10 to-background border border-accent-purple/20">
                <NavigationIcon className="w-8 h-8 text-accent-purple mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">AR Wayfinding</h3>
                <p className="font-paragraph text-foreground/70">
                  Augmented reality overlays for intuitive visual guidance through complex areas
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
