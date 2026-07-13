import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Filter, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { EventsMatches } from '@/entities';

export default function EventsPage() {
  const [events, setEvents] = useState<EventsMatches[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const result = await BaseCrudService.getAll<EventsMatches>('events', {}, { limit: 50 });
      setEvents(result.items);
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.eventTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || event.eventType === filterType;
    return matchesSearch && matchesFilter;
  });

  const eventTypes = ['all', ...Array.from(new Set(events.map(e => e.eventType).filter(Boolean)))];

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
              Events & Matches
            </h1>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl">
              Your personalized schedule for FIFA World Cup 2026 matches, fan zones, and special events
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-[120rem] mx-auto px-8 py-16">
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <input
              type="text"
              placeholder="Search events or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-background border border-primary/20 rounded-xl font-paragraph text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/40"
            />
          </div>

          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-primary" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-6 py-4 bg-background border border-primary/20 rounded-xl font-paragraph text-foreground focus:outline-none focus:border-primary/40"
            >
              {eventTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Events' : type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]">
          {isLoading ? null : filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/events/${event._id}`}>
                  <div className="group h-full p-8 rounded-2xl bg-gradient-to-br from-background to-background/50 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,255,0.1)]">
                    <div className="flex items-start justify-between mb-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-xs font-paragraph font-medium">
                        {event.eventType || 'Match'}
                      </span>
                      <Calendar className="w-5 h-5 text-primary/50 group-hover:text-primary transition-colors" />
                    </div>

                    <h3 className="font-heading text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {event.eventTitle}
                    </h3>

                    <div className="space-y-3 mb-6">
                      {event.eventDateTime && (
                        <div className="flex items-center gap-3 text-foreground/60 font-paragraph text-sm">
                          <Clock className="w-4 h-4" />
                          <span>{new Date(event.eventDateTime).toLocaleString()}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-3 text-foreground/60 font-paragraph text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>

                    {event.description && (
                      <p className="font-paragraph text-sm text-foreground/50 line-clamp-3">
                        {event.description}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-24">
              <Calendar className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
              <p className="font-paragraph text-foreground/40">
                {searchQuery || filterType !== 'all' ? 'No events match your filters' : 'No events available'}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
