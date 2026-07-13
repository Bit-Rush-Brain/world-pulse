import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Accessibility, MapPin, Clock, CheckCircle, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { AccessibilityServices } from '@/entities';

export default function AccessibilityPage() {
  const [services, setServices] = useState<AccessibilityServices[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const result = await BaseCrudService.getAll<AccessibilityServices>('accessibilityservices', {}, { limit: 50 });
      setServices(result.items);
    } catch (error) {
      console.error('Failed to load services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const serviceTypes = ['all', ...Array.from(new Set(services.map(s => s.serviceName).filter(Boolean)))];

  const filteredServices = services.filter(service => {
    return filterType === 'all' || service.serviceName === filterType;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="relative w-full overflow-hidden bg-gradient-to-br from-secondary/10 via-background to-accent-blue/10">
        <div className="max-w-[120rem] mx-auto px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-foreground mb-6">
              Accessibility Services
            </h1>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mb-8">
              Comprehensive directory of wheelchair assistance, sensory-friendly zones, sign language interpreters, and accessible transportation
            </p>

            <div className="flex items-center gap-6 p-6 rounded-2xl bg-accent-blue/10 border border-accent-blue/20 max-w-2xl">
              <Phone className="w-8 h-8 text-accent-blue" />
              <div>
                <div className="font-paragraph text-sm text-foreground/60 mb-1">Accessibility Support Line</div>
                <div className="font-heading text-2xl font-bold text-accent-blue">+1-800-ACCESS</div>
              </div>
            </div>
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
            {serviceTypes.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Services' : type}
              </option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]">
          {isLoading ? null : filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-background to-background/50 border border-primary/10 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-accent-blue/10">
                    <Accessibility className="w-6 h-6 text-accent-blue" />
                  </div>
                  {service.isAvailable ? (
                    <CheckCircle className="w-5 h-5 text-secondary" />
                  ) : (
                    <span className="text-xs font-paragraph px-3 py-1 rounded-full bg-destructive/10 text-destructive">
                      Unavailable
                    </span>
                  )}
                </div>

                <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                  {service.serviceName}
                </h3>

                {service.description && (
                  <p className="font-paragraph text-sm text-foreground/60 mb-4">
                    {service.description}
                  </p>
                )}

                <div className="space-y-2 text-sm font-paragraph">
                  {service.location && (
                    <div className="flex items-center gap-2 text-foreground/60">
                      <MapPin className="w-4 h-4" />
                      <span>{service.location}</span>
                    </div>
                  )}
                  {service.operatingHours && (
                    <div className="flex items-center gap-2 text-foreground/60">
                      <Clock className="w-4 h-4" />
                      <span>{service.operatingHours}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-24">
              <Accessibility className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
              <p className="font-paragraph text-foreground/40">
                {filterType !== 'all' ? 'No services match your filter' : 'No services available'}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
