import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bus, Clock, Users, TrendingUp, Radio } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { TransitOptions } from '@/entities';

export default function TransitPage() {
  const [options, setOptions] = useState<TransitOptions[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    loadOptions();
  }, []);

  const loadOptions = async () => {
    try {
      const result = await BaseCrudService.getAll<TransitOptions>('transitoptions', {}, { limit: 50 });
      setOptions(result.items);
    } catch (error) {
      console.error('Failed to load transit options:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const transitTypes = ['all', ...Array.from(new Set(options.map(o => o.transitType).filter(Boolean)))];

  const filteredOptions = options.filter(option => {
    return filterType === 'all' || option.transitType === filterType;
  });

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'operational': return 'text-secondary';
      case 'delayed': return 'text-primary';
      default: return 'text-destructive';
    }
  };

  const getCapacityColor = (level?: string) => {
    switch (level?.toLowerCase()) {
      case 'low': return 'text-secondary';
      case 'medium': return 'text-primary';
      default: return 'text-destructive';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="relative w-full overflow-hidden bg-gradient-to-br from-accent-blue/10 via-background to-secondary/10">
        <div className="max-w-[120rem] mx-auto px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Radio className="w-6 h-6 text-primary animate-pulse" />
              <span className="font-paragraph text-sm font-medium text-primary">
                Live Transit Data
              </span>
            </div>

            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-foreground mb-6">
              Transportation Intelligence
            </h1>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl">
              Multi-modal journey planning with real-time capacity, optimized routes, and carbon footprint comparison
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-[120rem] mx-auto px-8 py-16">
        <div className="mb-8">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-6 py-4 bg-background border border-primary/20 rounded-xl font-paragraph text-foreground focus:outline-none focus:border-primary/40"
          >
            {transitTypes.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Transit Types' : type}
              </option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]">
          {isLoading ? null : filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <motion.div
                key={option._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-background to-background/50 border border-primary/10 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-accent-blue/10">
                    <Bus className="w-6 h-6 text-accent-blue" />
                  </div>
                  <span className={`text-xs font-paragraph px-3 py-1 rounded-full ${
                    option.operationalStatus?.toLowerCase() === 'operational' ? 'bg-secondary/10 text-secondary' :
                    option.operationalStatus?.toLowerCase() === 'delayed' ? 'bg-primary/10 text-primary' :
                    'bg-destructive/10 text-destructive'
                  }`}>
                    {option.operationalStatus || 'Unknown'}
                  </span>
                </div>

                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-paragraph font-medium mb-3">
                    {option.transitType}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    {option.locationName}
                  </h3>
                </div>

                <div className="space-y-3 text-sm font-paragraph">
                  {option.waitTimeEstimateMinutes !== undefined && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-foreground/60">
                        <Clock className="w-4 h-4" />
                        <span>Wait Time</span>
                      </div>
                      <span className="font-medium text-foreground">{option.waitTimeEstimateMinutes} min</span>
                    </div>
                  )}
                  {option.capacityLevel && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-foreground/60">
                        <Users className="w-4 h-4" />
                        <span>Capacity</span>
                      </div>
                      <span className={`font-medium ${getCapacityColor(option.capacityLevel)}`}>
                        {option.capacityLevel}
                      </span>
                    </div>
                  )}
                  {option.lastUpdated && (
                    <div className="flex items-center gap-2 text-foreground/50 text-xs pt-2 border-t border-primary/10">
                      <TrendingUp className="w-3 h-3" />
                      <span>Updated {new Date(option.lastUpdated).toLocaleTimeString()}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-24">
              <Bus className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
              <p className="font-paragraph text-foreground/40">
                {filterType !== 'all' ? 'No transit options match your filter' : 'No transit options available'}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
