import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, AlertTriangle, TrendingUp, Radio, Activity } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { StadiumZones, EmergencyRequests, FeedbackIncidentReports } from '@/entities';

export default function SecurityPage() {
  const [zones, setZones] = useState<StadiumZones[]>([]);
  const [emergencies, setEmergencies] = useState<EmergencyRequests[]>([]);
  const [incidents, setIncidents] = useState<FeedbackIncidentReports[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const [zonesResult, emergenciesResult, incidentsResult] = await Promise.all([
        BaseCrudService.getAll<StadiumZones>('stadiumzones', {}, { limit: 10 }),
        BaseCrudService.getAll<EmergencyRequests>('emergencyrequests', {}, { limit: 5 }),
        BaseCrudService.getAll<FeedbackIncidentReports>('feedbackreports', {}, { limit: 5 })
      ]);
      
      setZones(zonesResult.items);
      setEmergencies(emergenciesResult.items);
      setIncidents(incidentsResult.items);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const averageDensity = zones.length > 0
    ? Math.round(zones.reduce((sum, z) => sum + (z.currentDensityLevel || 0), 0) / zones.length)
    : 0;

  const highDensityZones = zones.filter(z => (z.currentDensityLevel || 0) >= 70).length;
  const activeEmergencies = emergencies.filter(e => e.resolutionStatus !== 'Resolved').length;
  const pendingIncidents = incidents.filter(i => i.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="relative w-full overflow-hidden bg-gradient-to-br from-destructive/10 via-background to-primary/10">
        <div className="max-w-[120rem] mx-auto px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Radio className="w-6 h-6 text-primary animate-pulse" />
              <span className="font-paragraph text-sm font-medium text-primary">
                Live Security Operations
              </span>
            </div>

            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-foreground mb-6">
              Security Command Center
            </h1>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl">
              Unified operations dashboard with predictive risk analytics, emergency coordination, and resource allocation
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-[120rem] mx-auto px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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
                <div className="font-paragraph text-sm text-foreground/60">Avg Crowd Density</div>
                <div className="font-heading text-3xl font-bold text-primary">{averageDensity}%</div>
              </div>
            </div>
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-background to-background/50 border border-primary/10"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-destructive/10">
                <Activity className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <div className="font-paragraph text-sm text-foreground/60">Active Emergencies</div>
                <div className="font-heading text-3xl font-bold text-destructive">{activeEmergencies}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-background to-background/50 border border-primary/10"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-paragraph text-sm text-foreground/60">Pending Incidents</div>
                <div className="font-heading text-3xl font-bold text-primary">{pendingIncidents}</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
              Active Emergencies
            </h2>
            <div className="space-y-4 min-h-[400px]">
              {isLoading ? null : emergencies.length > 0 ? (
                emergencies.map((emergency, index) => (
                  <motion.div
                    key={emergency._id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-destructive/10 to-background border border-destructive/20"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="px-3 py-1 rounded-full bg-destructive/20 text-destructive text-xs font-paragraph font-medium">
                        {emergency.requestType}
                      </span>
                      <span className={`text-sm font-paragraph font-medium ${
                        emergency.resolutionStatus === 'Resolved' ? 'text-secondary' :
                        emergency.resolutionStatus === 'In Progress' ? 'text-primary' :
                        'text-destructive'
                      }`}>
                        {emergency.resolutionStatus || 'Pending'}
                      </span>
                    </div>
                    <p className="font-paragraph text-sm text-foreground/70 mb-2">
                      {emergency.description}
                    </p>
                    <div className="text-xs font-paragraph text-foreground/50">
                      Location: {emergency.locationData}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-16">
                  <AlertTriangle className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
                  <p className="font-paragraph text-foreground/40">No active emergencies</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
              Recent Incidents
            </h2>
            <div className="space-y-4 min-h-[400px]">
              {isLoading ? null : incidents.length > 0 ? (
                incidents.map((incident, index) => (
                  <motion.div
                    key={incident._id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-background to-background/50 border border-primary/10"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-paragraph font-medium">
                        {incident.category}
                      </span>
                      <span className={`text-sm font-paragraph font-medium ${
                        incident.status === 'Resolved' ? 'text-secondary' :
                        incident.status === 'In Progress' ? 'text-primary' :
                        'text-foreground/60'
                      }`}>
                        {incident.status || 'Pending'}
                      </span>
                    </div>
                    <p className="font-paragraph text-sm text-foreground/70">
                      {incident.description}
                    </p>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-16">
                  <ShieldCheck className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
                  <p className="font-paragraph text-foreground/40">No recent incidents</p>
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
