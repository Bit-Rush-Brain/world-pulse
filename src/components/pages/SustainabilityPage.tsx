import { motion } from 'framer-motion';
import { Leaf, TrendingDown, Award, Users, Zap, Droplet } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SustainabilityPage() {
  const personalStats = {
    carbonSaved: 12.4,
    ecoTrips: 8,
    rank: 247,
    totalUsers: 15000
  };

  const stadiumStats = {
    totalCarbon: 2847,
    renewableEnergy: 78,
    waterSaved: 45000,
    wasteRecycled: 92
  };

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
            <div className="flex items-center gap-3 mb-6">
              <Leaf className="w-6 h-6 text-secondary animate-pulse" />
              <span className="font-paragraph text-sm font-medium text-secondary">
                Real-Time Impact Tracking
              </span>
            </div>

            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-foreground mb-6">
              Sustainability Tracker
            </h1>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl">
              Personal carbon footprint tracking with eco-friendly transportation incentives and gamified sustainability challenges
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-[120rem] mx-auto px-8 py-16">
        <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
          Your Impact
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-secondary/10 to-background border border-secondary/20"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-secondary/10">
                <TrendingDown className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <div className="font-paragraph text-sm text-foreground/60">Carbon Saved</div>
                <div className="font-heading text-3xl font-bold text-secondary">{personalStats.carbonSaved} kg</div>
              </div>
            </div>
            <p className="font-paragraph text-xs text-foreground/50">CO₂ emissions reduced</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-accent-blue/10 to-background border border-accent-blue/20"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-accent-blue/10">
                <Users className="w-6 h-6 text-accent-blue" />
              </div>
              <div>
                <div className="font-paragraph text-sm text-foreground/60">Eco Trips</div>
                <div className="font-heading text-3xl font-bold text-accent-blue">{personalStats.ecoTrips}</div>
              </div>
            </div>
            <p className="font-paragraph text-xs text-foreground/50">Public transit journeys</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-background border border-primary/20"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-paragraph text-sm text-foreground/60">Global Rank</div>
                <div className="font-heading text-3xl font-bold text-primary">#{personalStats.rank}</div>
              </div>
            </div>
            <p className="font-paragraph text-xs text-foreground/50">Out of {personalStats.totalUsers.toLocaleString()} users</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-accent-purple/10 to-background border border-accent-purple/20"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-accent-purple/10">
                <Leaf className="w-6 h-6 text-accent-purple" />
              </div>
              <div>
                <div className="font-paragraph text-sm text-foreground/60">Achievement</div>
                <div className="font-heading text-xl font-bold text-accent-purple">Eco Warrior</div>
              </div>
            </div>
            <p className="font-paragraph text-xs text-foreground/50">Level 3 unlocked</p>
          </motion.div>
        </div>

        <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
          Stadium-Wide Impact
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-background to-background/50 border border-primary/10"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-xl bg-secondary/10">
                <TrendingDown className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <div className="font-paragraph text-sm text-foreground/60 mb-1">Total Carbon Saved Today</div>
                <div className="font-heading text-4xl font-bold text-secondary">{stadiumStats.totalCarbon} kg</div>
              </div>
            </div>
            <div className="h-3 bg-background rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ delay: 0.8, duration: 1 }}
                className="h-full bg-secondary"
              />
            </div>
            <p className="font-paragraph text-xs text-foreground/50 mt-2">75% of daily goal achieved</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-background to-background/50 border border-primary/10"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-xl bg-primary/10">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <div>
                <div className="font-paragraph text-sm text-foreground/60 mb-1">Renewable Energy Usage</div>
                <div className="font-heading text-4xl font-bold text-primary">{stadiumStats.renewableEnergy}%</div>
              </div>
            </div>
            <div className="h-3 bg-background rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stadiumStats.renewableEnergy}%` }}
                transition={{ delay: 0.8, duration: 1 }}
                className="h-full bg-primary"
              />
            </div>
            <p className="font-paragraph text-xs text-foreground/50 mt-2">Solar and wind power</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-accent-blue/10 to-background border border-accent-blue/20"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-xl bg-accent-blue/10">
                <Droplet className="w-8 h-8 text-accent-blue" />
              </div>
              <div>
                <div className="font-paragraph text-sm text-foreground/60 mb-1">Water Saved</div>
                <div className="font-heading text-4xl font-bold text-accent-blue">{stadiumStats.waterSaved.toLocaleString()} L</div>
              </div>
            </div>
            <p className="font-paragraph text-sm text-foreground/60">Through efficient systems and recycling</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-secondary/10 to-background border border-secondary/20"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-xl bg-secondary/10">
                <Leaf className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <div className="font-paragraph text-sm text-foreground/60 mb-1">Waste Recycled</div>
                <div className="font-heading text-4xl font-bold text-secondary">{stadiumStats.wasteRecycled}%</div>
              </div>
            </div>
            <p className="font-paragraph text-sm text-foreground/60">Comprehensive recycling program</p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-[120rem] mx-auto px-8 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-12 rounded-3xl bg-gradient-to-br from-secondary/20 via-background to-accent-blue/20 border border-secondary/20 text-center"
        >
          <Leaf className="w-16 h-16 text-secondary mx-auto mb-6" />
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
            Join the Green Movement
          </h2>
          <p className="font-paragraph text-lg text-foreground/70 max-w-2xl mx-auto mb-8">
            Every eco-friendly choice counts. Use public transit, recycle, and track your impact to make FIFA World Cup 2026 the most sustainable tournament in history.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-4 bg-secondary text-secondary-foreground rounded-xl font-paragraph font-semibold transition-all hover:shadow-[0_0_30px_rgba(57,255,20,0.3)]">
              View Challenges
            </button>
            <button className="px-8 py-4 bg-transparent border border-foreground/20 text-foreground rounded-xl font-paragraph font-semibold transition-all hover:border-foreground/40">
              Learn More
            </button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
