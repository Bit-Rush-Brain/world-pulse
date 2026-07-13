// HPI 1.7-G
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Users, 
  AlertTriangle, 
  Sparkles, 
  ShieldCheck, 
  Navigation, 
  Heart,
  Bus,
  Leaf,
  MessageSquare,
  Radio,
  Accessibility,
  ShoppingBag,
  Calendar,
  ArrowRight,
  Activity,
  Cpu,
  Globe,
  Zap,
  ChevronRight
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { EventsMatches, StadiumZones, MerchandiseOffers } from '@/entities';
import { Image } from '@/components/ui/image';

const PLACEHOLDER_IMAGE = "https://static.wixstatic.com/media/d80ea8_58342fd7dfd9446d980309fc06a8b9b2~mv2.png?originWidth=768&originHeight=960";

export default function HomePage() {
  const [upcomingEvents, setUpcomingEvents] = useState<EventsMatches[]>([]);
  const [crowdZones, setCrowdZones] = useState<StadiumZones[]>([]);
  const [featuredMerch, setFeaturedMerch] = useState<MerchandiseOffers[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [eventsResult, zonesResult, merchResult] = await Promise.all([
        BaseCrudService.getAll<EventsMatches>('events', {}, { limit: 3 }),
        BaseCrudService.getAll<StadiumZones>('stadiumzones', {}, { limit: 4 }),
        BaseCrudService.getAll<MerchandiseOffers>('merchandiseoffers', {}, { limit: 3 })
      ]);
      
      setUpcomingEvents(eventsResult.items);
      setCrowdZones(zonesResult.items);
      setFeaturedMerch(merchResult.items);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: MapPin,
      title: 'Live Crowd Intelligence',
      description: 'Real-time heatmaps showing crowd density across all zones with predictive congestion alerts',
      link: '/crowd-map',
      color: 'text-primary',
      bg: 'bg-primary/10',
      border: 'border-primary/20',
      span: 'col-span-1 md:col-span-2 lg:col-span-2'
    },
    {
      icon: Navigation,
      title: 'AI Navigation',
      description: 'Multilingual turn-by-turn guidance with AR wayfinding and accessibility-aware routing',
      link: '/navigation',
      color: 'text-secondary',
      bg: 'bg-secondary/10',
      border: 'border-secondary/20',
      span: 'col-span-1'
    },
    {
      icon: AlertTriangle,
      title: 'Emergency Response',
      description: 'Instant emergency request submission with real-time tracking and response coordination',
      link: '/emergency',
      color: 'text-destructive',
      bg: 'bg-destructive/10',
      border: 'border-destructive/20',
      span: 'col-span-1'
    },
    {
      icon: ShieldCheck,
      title: 'Security Command',
      description: 'Unified operations dashboard with predictive risk analytics and resource allocation',
      link: '/security',
      color: 'text-primary',
      bg: 'bg-primary/10',
      border: 'border-primary/20',
      span: 'col-span-1 md:col-span-2 lg:col-span-1'
    },
    {
      icon: Sparkles,
      title: 'AI Recommendations',
      description: 'Personalized match, food, and activity suggestions powered by predictive intelligence',
      link: '/recommendations',
      color: 'text-accent-blue',
      bg: 'bg-accent-blue/10',
      border: 'border-accent-blue/20',
      span: 'col-span-1'
    },
    {
      icon: Users,
      title: 'Volunteer Hub',
      description: 'Task management, training resources, and real-time coordination for volunteer teams',
      link: '/volunteer',
      color: 'text-accent-purple',
      bg: 'bg-accent-purple/10',
      border: 'border-accent-purple/20',
      span: 'col-span-1 md:col-span-2 lg:col-span-2'
    }
  ];

  const getDensityColor = (level?: number) => {
    if (!level) return 'text-foreground';
    if (level < 30) return 'text-secondary';
    if (level < 70) return 'text-primary';
    return 'text-destructive';
  };

  const getDensityBg = (level?: number) => {
    if (!level) return 'bg-foreground/20';
    if (level < 30) return 'bg-secondary';
    if (level < 70) return 'bg-primary';
    return 'bg-destructive';
  };

  const getDensityLabel = (level?: number) => {
    if (!level) return 'Unknown';
    if (level < 30) return 'Optimal';
    if (level < 70) return 'Elevated';
    return 'Critical';
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary overflow-clip font-paragraph">
      <style>{`
        .tech-grid {
          background-image: 
            linear-gradient(to right, rgba(0, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 4rem 4rem;
          mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
        }
        .radar-sweep {
          background: conic-gradient(from 0deg, transparent 70%, rgba(0, 255, 255, 0.2) 100%);
          animation: spin 4s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
        .glow-text {
          text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
        }
        .glass-panel {
          background: rgba(10, 10, 10, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .data-stream {
          background: linear-gradient(180deg, transparent, rgba(0, 255, 255, 0.1), transparent);
          background-size: 100% 200%;
          animation: stream 3s linear infinite;
        }
        @keyframes stream {
          0% { background-position: 0% -100%; }
          100% { background-position: 0% 200%; }
        }
      `}</style>

      <Header />
      
      {/* HERO SECTION - The Command Center */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 tech-grid z-0" />
        
        {/* Dynamic Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-accent-purple/10 rounded-full blur-[150px] mix-blend-screen" style={{ animation: 'pulse 8s infinite alternate' }} />

        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-8 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-md mb-12"
          >
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </div>
            <span className="text-xs font-heading tracking-[0.2em] text-primary uppercase">Global Systems Online</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <h1 className="font-heading text-7xl md:text-8xl lg:text-[10rem] font-black leading-[0.85] tracking-tighter mb-6">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50">PROJECT</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary glow-text">NEXUS</span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-paragraph text-lg md:text-2xl text-foreground/60 max-w-3xl mb-16 font-light tracking-wide"
          >
            The unified intelligence ecosystem for FIFA World Cup 2026. Predictive analytics, real-time crowd control, and seamless global coordination.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <Link to="/crowd-map" className="w-full sm:w-auto">
              <button className="w-full group relative px-8 py-5 bg-primary text-primary-foreground font-heading font-bold text-lg tracking-wider overflow-hidden rounded-none clip-path-slant">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                <span className="relative flex items-center justify-center gap-3">
                  <Activity className="w-5 h-5" />
                  INITIALIZE DASHBOARD
                </span>
              </button>
            </Link>
            
            <Link to="/emergency" className="w-full sm:w-auto">
              <button className="w-full group relative px-8 py-5 bg-transparent border border-foreground/20 text-foreground font-heading font-bold text-lg tracking-wider overflow-hidden rounded-none hover:border-primary/50 transition-colors">
                <div className="absolute inset-0 bg-primary/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative flex items-center justify-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  SECURITY PROTOCOL
                </span>
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Decorative Data Lines */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent blur-[2px]" />
      </section>

      {/* LIVE TELEMETRY BAR */}
      <section className="relative z-20 border-b border-white/5 bg-background/80 backdrop-blur-2xl sticky top-0">
        <div className="max-w-[120rem] mx-auto px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
            {[
              { label: 'ACTIVE NODES', value: '48', icon: Globe, color: 'text-primary' },
              { label: 'HOST CITIES', value: '16', icon: MapPin, color: 'text-secondary' },
              { label: 'SYSTEM STATUS', value: 'OPTIMAL', icon: Zap, color: 'text-accent-blue' },
              { label: 'AI PREDICTION', value: '99.9%', icon: Cpu, color: 'text-accent-purple' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col items-center justify-center ${i !== 0 ? 'pl-8' : ''}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-[10px] font-heading tracking-[0.2em] text-foreground/50">{stat.label}</span>
                </div>
                <div className={`text-3xl font-heading font-bold ${stat.color}`}>
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE CROWD INTELLIGENCE - Sticky Spatial Layout */}
      <section className="relative w-full bg-background py-32">
        <div className="max-w-[120rem] mx-auto px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Sticky Left Column - Radar Visual */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="font-heading text-5xl font-bold mb-4">
                  Spatial <span className="text-primary">Intelligence</span>
                </h2>
                <p className="font-paragraph text-foreground/60 text-lg">
                  Real-time density mapping and predictive flow analysis across all stadium sectors.
                </p>
              </motion.div>

              <div className="relative aspect-square w-full max-w-md mx-auto lg:mx-0 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 radar-sweep" />
                <div className="absolute inset-4 rounded-full border border-primary/10" />
                <div className="absolute inset-12 rounded-full border border-primary/10" />
                <div className="absolute inset-20 rounded-full border border-primary/10" />
                
                {/* Simulated Data Points on Radar */}
                <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-secondary rounded-full shadow-[0_0_10px_#39FF14] animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_#00FFFF] animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-destructive rounded-full shadow-[0_0_10px_#FF0000] animate-pulse" style={{ animationDelay: '1s' }} />
                
                <div className="relative z-10 flex flex-col items-center">
                  <Radio className="w-8 h-8 text-primary mb-2" />
                  <span className="text-xs font-heading tracking-widest text-primary">SCANNING</span>
                </div>
              </div>
            </div>

            {/* Scrolling Right Column - Data Cards */}
            <div className="lg:col-span-7 space-y-6">
              <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                {crowdZones.length > 0 ? (
                  crowdZones.map((zone, index) => (
                    <motion.div
                      key={zone._id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="glass-panel p-8 relative overflow-hidden group"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 data-stream opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="px-2 py-1 bg-white/5 text-[10px] font-heading tracking-widest text-foreground/70 border border-white/10">
                              SECTOR {index + 1}
                            </span>
                            <span className={`text-xs font-heading tracking-widest ${getDensityColor(zone.currentDensityLevel)}`}>
                              {getDensityLabel(zone.currentDensityLevel)}
                            </span>
                          </div>
                          <h3 className="font-heading text-3xl font-bold text-foreground">
                            {zone.zoneName}
                          </h3>
                        </div>
                        
                        <div className="text-right">
                          <div className={`text-5xl font-heading font-bold ${getDensityColor(zone.currentDensityLevel)}`}>
                            {zone.currentDensityLevel || 0}%
                          </div>
                          <div className="text-xs font-paragraph text-foreground/50 uppercase tracking-wider mt-1">
                            Current Density
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="h-1 w-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${zone.currentDensityLevel || 0}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className={`h-full ${getDensityBg(zone.currentDensityLevel)}`}
                          />
                        </div>
                        
                        <div className="flex justify-between text-sm font-paragraph text-foreground/60">
                          <span className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Capacity: {zone.maxCapacity?.toLocaleString() || 'N/A'}
                          </span>
                          <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {zone.zoneType || 'General'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="glass-panel p-12 text-center border-dashed border-white/10">
                    <Activity className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
                    <p className="font-heading tracking-widest text-foreground/40">AWAITING TELEMETRY DATA</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS - Holographic Grid */}
      <section className="relative w-full py-32 border-y border-white/5 bg-black/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,255,0.05),transparent_70%)]" />
        
        <div className="max-w-[120rem] mx-auto px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-secondary" />
                <span className="text-xs font-heading tracking-[0.2em] text-secondary uppercase">Schedule</span>
              </div>
              <h2 className="font-heading text-5xl font-bold">
                Global <span className="text-foreground/50">Operations</span>
              </h2>
            </motion.div>
            
            <Link to="/events">
              <motion.button
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-sm font-heading tracking-widest text-primary hover:text-primary/80 transition-colors"
              >
                VIEW FULL MANIFEST <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>

          <div className={`grid lg:grid-cols-3 gap-8 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative h-full"
                >
                  {/* Holographic border effect */}
                  <div className="absolute -inset-[1px] bg-gradient-to-b from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative h-full bg-background border border-white/10 p-8 flex flex-col">
                    <div className="flex justify-between items-start mb-8">
                      <div className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-heading tracking-widest text-foreground/70">
                        {event.eventType || 'MATCH'}
                      </div>
                      <Calendar className="w-5 h-5 text-primary/40 group-hover:text-primary transition-colors duration-300" />
                    </div>
                    
                    <h3 className="font-heading text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                      {event.eventTitle}
                    </h3>
                    
                    <div className="mt-auto space-y-3 pt-8 border-t border-white/5">
                      <div className="flex items-center gap-3 text-sm font-paragraph text-foreground/60">
                        <MapPin className="w-4 h-4 text-secondary" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm font-paragraph text-foreground/60">
                        <Activity className="w-4 h-4 text-accent-blue" />
                        <span>{event.eventDateTime ? new Date(event.eventDateTime).toLocaleString() : 'TBA'}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 glass-panel p-12 text-center">
                <p className="font-heading tracking-widest text-foreground/40">NO OPERATIONS SCHEDULED</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* INTELLIGENT ECOSYSTEM - Bento Grid */}
      <section className="relative w-full py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(175,82,222,0.05),transparent_50%)]" />
        
        <div className="max-w-[120rem] mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-heading text-5xl lg:text-6xl font-bold mb-6">
              System <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-primary">Architecture</span>
            </h2>
            <p className="font-paragraph text-xl text-foreground/60 max-w-2xl mx-auto">
              Modular AI components designed for absolute operational superiority.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[250px]">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`${feature.span} group relative`}
                >
                  <Link to={feature.link} className="block h-full">
                    <div className={`absolute inset-0 border ${feature.border} bg-background/50 backdrop-blur-sm transition-all duration-500 group-hover:bg-background/80`} />
                    
                    {/* Hover Gradient Reveal */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-transparent via-transparent to-${feature.color.split('-')[1]} transition-opacity duration-500`} />
                    
                    <div className="relative h-full p-8 flex flex-col">
                      <div className={`w-12 h-12 rounded-none flex items-center justify-center mb-6 ${feature.bg} border ${feature.border} group-hover:scale-110 transition-transform duration-500`}>
                        <Icon className={`w-6 h-6 ${feature.color}`} />
                      </div>
                      
                      <h3 className="font-heading text-2xl font-bold mb-3 mt-auto">
                        {feature.title}
                      </h3>
                      
                      <p className="font-paragraph text-sm text-foreground/60 line-clamp-2 group-hover:text-foreground/80 transition-colors">
                        {feature.description}
                      </p>
                      
                      <div className="absolute top-8 right-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <ChevronRight className={`w-6 h-6 ${feature.color}`} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OFFICIAL MERCHANDISE - Media-First Layout */}
      <section className="relative w-full py-32 bg-black">
        <div className="max-w-[120rem] mx-auto px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-accent-purple" />
                <span className="text-xs font-heading tracking-[0.2em] text-accent-purple uppercase">Equipment</span>
              </div>
              <h2 className="font-heading text-5xl font-bold">
                Authorized <span className="text-foreground/50">Gear</span>
              </h2>
            </motion.div>
            
            <Link to="/merchandise">
              <motion.button
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-sm font-heading tracking-widest text-accent-purple hover:text-accent-purple/80 transition-colors"
              >
                ACCESS ARMORY <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>

          <div className={`grid md:grid-cols-3 gap-8 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            {featuredMerch.length > 0 ? (
              featuredMerch.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                >
                  <Link to={`/merchandise/${item._id}`} className="block">
                    <div className="relative aspect-[4/5] overflow-hidden bg-white/5 border border-white/10 mb-6">
                      <Image
                        src={PLACEHOLDER_IMAGE}
                        alt={item.itemName || 'Merchandise'}
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal"
                      />
                      
                      {/* Tech Overlay */}
                      <div className="absolute inset-0 border-[20px] border-background/50 mix-blend-overlay pointer-events-none" />
                      <div className="absolute top-4 left-4 w-2 h-2 bg-primary rounded-full animate-pulse" />
                      
                      {!item.isAvailable && (
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                          <span className="px-4 py-2 border border-destructive text-destructive font-heading tracking-widest text-sm">
                            DEPLETED
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                          {item.itemName}
                        </h3>
                        <p className="font-paragraph text-sm text-foreground/50 line-clamp-1">
                          {item.itemDescription || 'Standard Issue'}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-heading text-xl font-bold text-foreground">
                          ${item.itemPrice?.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 glass-panel p-12 text-center">
                <p className="font-heading tracking-widest text-foreground/40">ARMORY CURRENTLY EMPTY</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FINAL ACTIVATION - CTA */}
      <section className="relative w-full py-40 overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/5" />
        <div className="absolute inset-0 tech-grid opacity-50" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border border-primary/30 bg-primary/10 mb-8">
              <Globe className="w-10 h-10 text-primary" />
            </div>
            
            <h2 className="font-heading text-5xl md:text-7xl font-black mb-8 tracking-tight">
              ENGAGE THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">FUTURE</span>
            </h2>
            
            <p className="font-paragraph text-xl text-foreground/60 mb-12 max-w-2xl mx-auto">
              Join the most technologically advanced global event in human history. The network is waiting for your connection.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/crowd-map">
                <button className="w-full sm:w-auto px-10 py-5 bg-primary text-primary-foreground font-heading font-bold text-lg tracking-wider hover:bg-white transition-colors">
                  ACCESS NETWORK
                </button>
              </Link>
              <Link to="/volunteer">
                <button className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white/20 text-foreground font-heading font-bold text-lg tracking-wider hover:border-white transition-colors">
                  JOIN PROTOCOL
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}