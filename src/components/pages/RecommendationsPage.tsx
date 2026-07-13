import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, MapPin, Utensils, ShoppingBag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { EventsMatches, FoodVendors, MerchandiseOffers } from '@/entities';

export default function RecommendationsPage() {
  const [events, setEvents] = useState<EventsMatches[]>([]);
  const [vendors, setVendors] = useState<FoodVendors[]>([]);
  const [merchandise, setMerchandise] = useState<MerchandiseOffers[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      const [eventsResult, vendorsResult, merchResult] = await Promise.all([
        BaseCrudService.getAll<EventsMatches>('events', {}, { limit: 3 }),
        BaseCrudService.getAll<FoodVendors>('foodvendors', {}, { limit: 3 }),
        BaseCrudService.getAll<MerchandiseOffers>('merchandiseoffers', {}, { limit: 3 })
      ]);
      
      setEvents(eventsResult.items);
      setVendors(vendorsResult.items);
      setMerchandise(merchResult.items);
    } catch (error) {
      console.error('Failed to load recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="relative w-full overflow-hidden bg-gradient-to-br from-accent-purple/10 via-background to-primary/10">
        <div className="max-w-[120rem] mx-auto px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-accent-purple animate-pulse" />
              <span className="font-paragraph text-sm font-medium text-accent-purple">
                AI-Powered Recommendations
              </span>
            </div>

            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-foreground mb-6">
              Personalized For You
            </h1>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl">
              AI-curated matches, food vendors, and activities based on your preferences, location, and real-time availability
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-[120rem] mx-auto px-8 py-16">
        <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
          Recommended Events
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mb-24 min-h-[300px]">
          {isLoading ? null : events.length > 0 ? (
            events.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/events/${event._id}`}>
                  <div className="group h-full p-8 rounded-2xl bg-gradient-to-br from-background to-background/50 border border-primary/10 hover:border-primary/30 transition-all">
                    <Calendar className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {event.eventTitle}
                    </h3>
                    {event.location && (
                      <div className="flex items-center gap-2 text-sm text-foreground/60 font-paragraph">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-16">
              <Calendar className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
              <p className="font-paragraph text-foreground/40">No event recommendations available</p>
            </div>
          )}
        </div>

        <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
          Recommended Food Vendors
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mb-24 min-h-[300px]">
          {isLoading ? null : vendors.length > 0 ? (
            vendors.map((vendor, index) => (
              <motion.div
                key={vendor._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group h-full p-8 rounded-2xl bg-gradient-to-br from-background to-background/50 border border-primary/10 hover:border-primary/30 transition-all"
              >
                <Utensils className="w-8 h-8 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors">
                  {vendor.vendorName}
                </h3>
                <div className="space-y-2 text-sm font-paragraph text-foreground/60">
                  {vendor.cuisineType && (
                    <div>Cuisine: {vendor.cuisineType}</div>
                  )}
                  {vendor.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{vendor.location}</span>
                    </div>
                  )}
                  {vendor.averageRating && (
                    <div className="text-primary font-medium">★ {vendor.averageRating.toFixed(1)}</div>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-16">
              <Utensils className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
              <p className="font-paragraph text-foreground/40">No vendor recommendations available</p>
            </div>
          )}
        </div>

        <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
          Recommended Merchandise
        </h2>
        <div className="grid md:grid-cols-3 gap-8 min-h-[300px]">
          {isLoading ? null : merchandise.length > 0 ? (
            merchandise.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/merchandise/${item._id}`}>
                  <div className="group h-full p-8 rounded-2xl bg-gradient-to-br from-background to-background/50 border border-primary/10 hover:border-primary/30 transition-all">
                    <ShoppingBag className="w-8 h-8 text-accent-blue mb-4" />
                    <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-accent-blue transition-colors">
                      {item.itemName}
                    </h3>
                    <div className="font-heading text-2xl font-bold text-primary">
                      ${item.itemPrice?.toFixed(2)}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-16">
              <ShoppingBag className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
              <p className="font-paragraph text-foreground/40">No merchandise recommendations available</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
