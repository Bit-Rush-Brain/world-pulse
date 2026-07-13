import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, AlertTriangle, TrendingUp, MapPin, Radio, RefreshCw } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { StadiumZones } from '@/entities';

export default function CrowdMapPage() {
  const [zones, setZones] = useState<StadiumZones[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedZone, setSelectedZone] = useState<StadiumZones | null>(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    loadZones();
    const interval = setInterval(() => {
      loadZones();
      setLastUpdated(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadZones = async () => {
    try {
      const result = await BaseCrudService.getAll<StadiumZones>('stadiumzones');
      setZones(result.items);
    } catch (error) {
      console.error('Failed to load zones:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDensityColor = (level?: number) => {
    if (!level) return 'bg-foreground/10';
    if (level < 30) return 'bg-secondary';
    if (level < 70) return 'bg-primary';
    return 'bg-destructive';
  };

  const getDensityLabel = (level?: number) => {
    if (!level) return 'Unknown';
    if (level < 30) return 'Low Density';
    if (level < 70) return 'Moderate Density';
    return 'High Density';
  };

  const getDensityTextColor = (level?: number) => {
    if (!level) return 'text-foreground';
    if (level < 30) return 'text-secondary';
    if (level < 70) return 'text-primary';
    return 'text-destructive';
  };

  const averageDensity = zones.length > 0
    ? Math.round(zones.reduce((sum, z) => sum + (z.currentDensityLevel || 0), 0) / zones.length)
    : 0;

  const highDensityZones = zones.filter(z => (z.currentDensityLevel || 0) >= 70).length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent-purple/10">
        <div className="max-w-[120rem] mx-auto px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Radio className="w-6 h-6 text-primary animate-pulse" />
              <span className="font-paragraph text-sm font-medium text-primary">
                Live Data • Updated {lastUpdated.toLocaleTimeString()}
              </span>
            </div>

            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-foreground mb-6">
              Live Crowd Intelligence Map
            </h1>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mb-8">
              Real-time crowd density monitoring across all stadium zones with predictive congestion alerts and AI-powered flow optimization
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={loadZones}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-paragraph font-semibold transition-all hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Data
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="max-w-[120rem] mx-auto px-8 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-background to-background/50 border border-primary/10"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-paragraph text-sm text-foreground/60">Average Density</div>
                <div className="font-heading text-3xl font-bold text-primary">{averageDensity}%</div>
              </div>
            </div>
            <p className="font-paragraph text-sm text-foreground/50">
              Across all monitored zones
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-background to-background/50 border border-primary/10"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-destructive/10">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <div className="font-paragraph text-sm text-foreground/60">High Density Zones</div>
                <div className="font-heading text-3xl font-bold text-destructive">{highDensityZones}</div>
              </div>
            </div>
            <p className="font-paragraph text-sm text-foreground/50">
              Requiring attention
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-background to-background/50 border border-primary/10"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-secondary/10">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <div className="font-paragraph text-sm text-foreground/60">Total Zones</div>
                <div className="font-heading text-3xl font-bold text-secondary">{zones.length}</div>
              </div>
            </div>
            <p className="font-paragraph text-sm text-foreground/50">
              Actively monitored
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Map Visualization */}
      <section className="max-w-[120rem] mx-auto px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Zone List */}
          <div className="lg:col-span-2 space-y-4 min-h-[600px]">
            {isLoading ? null : zones.length > 0 ? (
              zones.map((zone, index) => (
                <motion.div
                  key={zone._id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedZone(zone)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    selectedZone?._id === zone._id
                      ? 'bg-gradient-to-br from-primary/20 to-background border-2 border-primary'
                      : 'bg-gradient-to-br from-background to-background/50 border border-primary/10 hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        <h3 className="font-heading text-xl font-bold text-foreground">
                          {zone.zoneName}
                        </h3>
                      </div>
                      {zone.description && (
                        <p className="font-paragraph text-sm text-foreground/60 mb-3">
                          {zone.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        <span className="font-paragraph text-xs text-foreground/50">
                          Type: {zone.zoneType || 'General'}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`font-heading text-4xl font-bold mb-1 ${getDensityTextColor(zone.currentDensityLevel)}`}>
                        {zone.currentDensityLevel || 0}%
                      </div>
                      <div className={`text-xs font-paragraph font-medium ${getDensityTextColor(zone.currentDensityLevel)}`}>
                        {getDensityLabel(zone.currentDensityLevel)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-paragraph">
                      <span className="text-foreground/60">Max Capacity:</span>
                      <span className="font-medium text-foreground">{zone.maxCapacity || 'N/A'}</span>
                    </div>
                    {zone.locationCoordinates && (
                      <div className="flex justify-between text-sm font-paragraph">
                        <span className="text-foreground/60">Coordinates:</span>
                        <span className="font-medium text-foreground/50 text-xs">{zone.locationCoordinates}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 h-3 bg-background rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${zone.currentDensityLevel || 0}%` }}
                      transition={{ delay: 0.3 + index * 0.05, duration: 0.8 }}
                      className={`h-full ${getDensityColor(zone.currentDensityLevel)}`}
                    />
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Users className="w-16 h-16 text-foreground/20 mb-4" />
                <p className="font-paragraph text-foreground/40">No zone data available</p>
              </div>
            )}
          </div>

          {/* Selected Zone Details */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {selectedZone ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-background border border-primary/20"
                >
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                    Zone Details
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <div className="font-paragraph text-sm text-foreground/60 mb-2">Zone Name</div>
                      <div className="font-heading text-xl font-bold text-primary">
                        {selectedZone.zoneName}
                      </div>
                    </div>

                    <div>
                      <div className="font-paragraph text-sm text-foreground/60 mb-2">Current Density</div>
                      <div className={`font-heading text-4xl font-bold ${getDensityTextColor(selectedZone.currentDensityLevel)}`}>
                        {selectedZone.currentDensityLevel || 0}%
                      </div>
                      <div className={`font-paragraph text-sm font-medium mt-1 ${getDensityTextColor(selectedZone.currentDensityLevel)}`}>
                        {getDensityLabel(selectedZone.currentDensityLevel)}
                      </div>
                    </div>

                    <div>
                      <div className="font-paragraph text-sm text-foreground/60 mb-2">Maximum Capacity</div>
                      <div className="font-heading text-2xl font-bold text-foreground">
                        {selectedZone.maxCapacity || 'N/A'}
                      </div>
                    </div>

                    <div>
                      <div className="font-paragraph text-sm text-foreground/60 mb-2">Zone Type</div>
                      <div className="font-paragraph text-lg text-foreground">
                        {selectedZone.zoneType || 'General'}
                      </div>
                    </div>

                    {selectedZone.description && (
                      <div>
                        <div className="font-paragraph text-sm text-foreground/60 mb-2">Description</div>
                        <div className="font-paragraph text-sm text-foreground/80 leading-relaxed">
                          {selectedZone.description}
                        </div>
                      </div>
                    )}

                    {selectedZone.locationCoordinates && (
                      <div>
                        <div className="font-paragraph text-sm text-foreground/60 mb-2">Location</div>
                        <div className="font-paragraph text-xs text-foreground/50 font-mono">
                          {selectedZone.locationCoordinates}
                        </div>
                      </div>
                    )}

                    <div className="pt-6 border-t border-primary/20">
                      <div className="flex items-center gap-2 text-sm font-paragraph text-foreground/50">
                        <Radio className="w-4 h-4 animate-pulse" />
                        <span>Live monitoring active</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="p-8 rounded-2xl bg-gradient-to-br from-background to-background/50 border border-primary/10 text-center">
                  <MapPin className="w-12 h-12 text-primary/30 mx-auto mb-4" />
                  <p className="font-paragraph text-foreground/60">
                    Select a zone to view detailed information
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
