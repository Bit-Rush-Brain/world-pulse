import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, MapPin, Camera, Send, CheckCircle, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { FeedbackIncidentReports } from '@/entities';

export default function FeedbackPage() {
  const [reports, setReports] = useState<FeedbackIncidentReports[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    category: 'General Feedback',
    description: '',
    latitude: 0,
    longitude: 0,
    mediaAttachment: ''
  });

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const result = await BaseCrudService.getAll<FeedbackIncidentReports>('feedbackreports', {}, { limit: 10 });
      setReports(result.items);
    } catch (error) {
      console.error('Failed to load reports:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await BaseCrudService.create('feedbackreports', {
        _id: crypto.randomUUID(),
        category: formData.category,
        description: formData.description,
        latitude: formData.latitude,
        longitude: formData.longitude,
        mediaAttachment: formData.mediaAttachment || 'https://static.wixstatic.com/media/d80ea8_76d9a3f754df440097eda86df718a9ac~mv2.png?originWidth=768&originHeight=576',
        status: 'Pending',
        submissionTimestamp: new Date().toISOString()
      });

      setShowSuccess(true);
      setFormData({
        category: 'General Feedback',
        description: '',
        latitude: 0,
        longitude: 0,
        mediaAttachment: ''
      });
      
      setTimeout(() => {
        setShowSuccess(false);
        loadReports();
      }, 3000);
    } catch (error) {
      console.error('Failed to submit report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'resolved': return 'text-secondary';
      case 'in progress': return 'text-primary';
      default: return 'text-foreground/60';
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
            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-foreground mb-6">
              Feedback & Incident Reports
            </h1>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl">
              Geo-tagged incident reporting with AI-powered categorization and resolution tracking
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
              Submit Feedback
            </h2>

            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-6 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center gap-3"
              >
                <CheckCircle className="w-6 h-6 text-secondary" />
                <div>
                  <div className="font-heading text-lg font-bold text-secondary">Report Submitted</div>
                  <div className="font-paragraph text-sm text-foreground/60">Thank you for your feedback</div>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-primary/20 rounded-xl font-paragraph text-foreground focus:outline-none focus:border-primary/40"
                  required
                >
                  <option value="General Feedback">General Feedback</option>
                  <option value="Facility Issue">Facility Issue</option>
                  <option value="Safety Concern">Safety Concern</option>
                  <option value="Service Quality">Service Quality</option>
                  <option value="Cleanliness">Cleanliness</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your feedback or incident in detail..."
                  rows={5}
                  className="w-full px-4 py-3 bg-background border border-primary/20 rounded-xl font-paragraph text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/40 resize-none"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
                    placeholder="0.0"
                    className="w-full px-4 py-3 bg-background border border-primary/20 rounded-xl font-paragraph text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/40"
                  />
                </div>
                <div>
                  <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
                    placeholder="0.0"
                    className="w-full px-4 py-3 bg-background border border-primary/20 rounded-xl font-paragraph text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/40"
                  />
                </div>
              </div>

              <div>
                <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                  Photo (Optional)
                </label>
                <div className="flex items-center gap-3">
                  <Camera className="w-5 h-5 text-primary" />
                  <input
                    type="text"
                    value={formData.mediaAttachment}
                    onChange={(e) => setFormData({ ...formData, mediaAttachment: e.target.value })}
                    placeholder="Image URL"
                    className="flex-1 px-4 py-3 bg-background border border-primary/20 rounded-xl font-paragraph text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/40"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-paragraph font-semibold text-lg transition-all hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Report
                  </>
                )}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
              Recent Reports
            </h2>

            <div className="space-y-4 min-h-[400px]">
              {isLoading ? null : reports.length > 0 ? (
                reports.map((report, index) => (
                  <motion.div
                    key={report._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-background to-background/50 border border-primary/10"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-paragraph font-medium">
                        {report.category}
                      </span>
                      <span className={`text-sm font-paragraph font-medium ${getStatusColor(report.status)}`}>
                        {report.status || 'Pending'}
                      </span>
                    </div>

                    <p className="font-paragraph text-sm text-foreground/70 mb-3">
                      {report.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs font-paragraph text-foreground/50">
                      {(report.latitude || report.longitude) && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{report.latitude?.toFixed(4)}, {report.longitude?.toFixed(4)}</span>
                        </div>
                      )}
                      {report.submissionTimestamp && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(report.submissionTimestamp).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-16">
                  <MessageSquare className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
                  <p className="font-paragraph text-foreground/40">No recent reports</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
