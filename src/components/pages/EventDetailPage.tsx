import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowLeft, Navigation as NavigationIcon } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BaseCrudService } from '@/integrations';
import { EventsMatches } from '@/entities';

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventsMatches | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEvent();
  }, [id]);

  const loadEvent = async () => {
    if (!id) return;
    try {
      const data = await BaseCrudService.getById<EventsMatches>('events', id);
      setEvent(data);
    } catch (error) {
      console.error('Failed to load event:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="max-w-[120rem] mx-auto px-8 py-16 min-h-[600px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <LoadingSpinner />
          </div>
        ) : !event ? (
          <div className="text-center py-24">
            <Calendar className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Event Not Found</h2>
            <Link to="/events" className="text-primary hover:underline font-paragraph">
              Back to Events
            </Link>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/events" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-paragraph mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Events
            </Link>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 rounded-full bg-accent-blue/10 text-accent-blue text-sm font-paragraph font-medium mb-4">
                    {event.eventType || 'Match'}
                  </span>
                  <h1 className="font-heading text-4xl lg:text-6xl font-bold text-foreground mb-6">
                    {event.eventTitle}
                  </h1>
                </div>

                {event.description && (
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-background to-background/50 border border-primary/10 mb-8">
                    <h2 className="font-heading text-2xl font-bold text-foreground mb-4">About This Event</h2>
                    <p className="font-paragraph text-lg text-foreground/70 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-background border border-primary/20">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-6">Event Details</h3>
                    
                    <div className="space-y-4">
                      {event.eventDateTime && (
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <div className="font-paragraph text-sm text-foreground/60 mb-1">Date & Time</div>
                            <div className="font-paragraph text-foreground">
                              {new Date(event.eventDateTime).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      )}

                      {event.location && (
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <div className="font-paragraph text-sm text-foreground/60 mb-1">Location</div>
                            <div className="font-paragraph text-foreground">
                              {event.location}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-8 pt-6 border-t border-primary/20">
                      <Link to="/navigation">
                        <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-lg font-paragraph font-semibold transition-all hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]">
                          <NavigationIcon className="w-5 h-5" />
                          Get Directions
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      <Footer />
    </div>
  );
}
