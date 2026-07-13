import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Phone, MapPin, Camera, Send, CheckCircle, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { EmergencyRequests } from '@/entities';

export default function EmergencyPage() {
  const [requests, setRequests] = useState<EmergencyRequests[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    requestType: 'Medical',
    locationData: '',
    description: '',
    mediaAttachment: ''
  });

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const result = await BaseCrudService.getAll<EmergencyRequests>('emergencyrequests', {}, { limit: 10 });
      setRequests(result.items);
    } catch (error) {
      console.error('Failed to load requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await BaseCrudService.create('emergencyrequests', {
        _id: crypto.randomUUID(),
        requestType: formData.requestType,
        locationData: formData.locationData,
        description: formData.description,
        mediaAttachment: formData.mediaAttachment || 'https://static.wixstatic.com/media/d80ea8_0ad0001ef7be4c0daf0db1300fda1289~mv2.png?originWidth=768&originHeight=576',
        resolutionStatus: 'Pending',
        submissionTime: new Date().toISOString()
      });

      setShowSuccess(true);
      setFormData({
        requestType: 'Medical',
        locationData: '',
        description: '',
        mediaAttachment: ''
      });
      
      setTimeout(() => {
        setShowSuccess(false);
        loadRequests();
      }, 3000);
    } catch (error) {
      console.error('Failed to submit request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Resolved': return 'text-secondary';
      case 'In Progress': return 'text-primary';
      default: return 'text-destructive';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="relative w-full overflow-hidden bg-gradient-to-br from-destructive/10 via-background to-destructive/5">
        <div className="max-w-[120rem] mx-auto px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-8 h-8 text-destructive animate-pulse" />
              <span className="font-paragraph text-sm font-medium text-destructive">
                24/7 Emergency Response Active
              </span>
            </div>

            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-foreground mb-6">
              Emergency Response Center
            </h1>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mb-8">
              Instant emergency request submission with real-time tracking and response coordination
            </p>

            <div className="flex items-center gap-6 p-6 rounded-2xl bg-destructive/10 border border-destructive/20 max-w-2xl">
              <Phone className="w-8 h-8 text-destructive" />
              <div>
                <div className="font-paragraph text-sm text-foreground/60 mb-1">Emergency Hotline</div>
                <div className="font-heading text-3xl font-bold text-destructive">+1-800-FIFA-911</div>
              </div>
            </div>
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
              Submit Emergency Request
            </h2>

            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-6 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center gap-3"
              >
                <CheckCircle className="w-6 h-6 text-secondary" />
                <div>
                  <div className="font-heading text-lg font-bold text-secondary">Request Submitted</div>
                  <div className="font-paragraph text-sm text-foreground/60">Emergency response team has been notified</div>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                  Emergency Type *
                </label>
                <select
                  value={formData.requestType}
                  onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-primary/20 rounded-xl font-paragraph text-foreground focus:outline-none focus:border-primary/40"
                  required
                >
                  <option value="Medical">Medical Emergency</option>
                  <option value="Security">Security Incident</option>
                  <option value="Accessibility">Accessibility Assistance</option>
                  <option value="Fire">Fire Emergency</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                  <input
                    type="text"
                    value={formData.locationData}
                    onChange={(e) => setFormData({ ...formData, locationData: e.target.value })}
                    placeholder="Enter your current location or zone"
                    className="w-full pl-12 pr-4 py-3 bg-background border border-primary/20 rounded-xl font-paragraph text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/40"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the emergency situation in detail..."
                  rows={5}
                  className="w-full px-4 py-3 bg-background border border-primary/20 rounded-xl font-paragraph text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/40 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                  Photo/Video (Optional)
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
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-destructive text-destructive-foreground rounded-xl font-paragraph font-semibold text-lg transition-all hover:shadow-[0_0_30px_rgba(255,0,0,0.3)] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Emergency Request
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
              Recent Requests
            </h2>

            <div className="space-y-4 min-h-[400px]">
              {isLoading ? null : requests.length > 0 ? (
                requests.map((request, index) => (
                  <motion.div
                    key={request._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-background to-background/50 border border-primary/10"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-paragraph font-medium">
                        {request.requestType}
                      </span>
                      <span className={`text-sm font-paragraph font-medium ${getStatusColor(request.resolutionStatus)}`}>
                        {request.resolutionStatus || 'Pending'}
                      </span>
                    </div>

                    <p className="font-paragraph text-sm text-foreground/70 mb-3">
                      {request.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs font-paragraph text-foreground/50">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{request.locationData}</span>
                      </div>
                      {request.submissionTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(request.submissionTime).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-16">
                  <AlertTriangle className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
                  <p className="font-paragraph text-foreground/40">No recent emergency requests</p>
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
