import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle, Clock, MapPin, AlertCircle, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { VolunteerTasks, TrainingMaterials } from '@/entities';

export default function VolunteerPage() {
  const [tasks, setTasks] = useState<VolunteerTasks[]>([]);
  const [materials, setMaterials] = useState<TrainingMaterials[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [tasksResult, materialsResult] = await Promise.all([
        BaseCrudService.getAll<VolunteerTasks>('volunteertasks', {}, { limit: 20 }),
        BaseCrudService.getAll<TrainingMaterials>('trainingmaterials', {}, { limit: 10 })
      ]);
      setTasks(tasksResult.items);
      setMaterials(materialsResult.items);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-primary';
      default: return 'text-secondary';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'text-secondary';
      case 'in progress': return 'text-primary';
      default: return 'text-foreground/60';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="relative w-full overflow-hidden bg-gradient-to-br from-accent-purple/10 via-background to-secondary/10">
        <div className="max-w-[120rem] mx-auto px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-foreground mb-6">
              Volunteer Operations Hub
            </h1>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl">
              Task management, training resources, and real-time coordination for volunteer teams
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-[120rem] mx-auto px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
              Active Tasks
            </h2>

            <div className="space-y-4 min-h-[600px]">
              {isLoading ? null : tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <motion.div
                    key={task._id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-background to-background/50 border border-primary/10 hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-paragraph font-medium ${
                            task.priorityLevel?.toLowerCase() === 'high' ? 'bg-destructive/10 text-destructive' :
                            task.priorityLevel?.toLowerCase() === 'medium' ? 'bg-primary/10 text-primary' :
                            'bg-secondary/10 text-secondary'
                          }`}>
                            {task.priorityLevel || 'Normal'} Priority
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-paragraph font-medium ${
                            task.completionStatus?.toLowerCase() === 'completed' ? 'bg-secondary/10 text-secondary' :
                            task.completionStatus?.toLowerCase() === 'in progress' ? 'bg-primary/10 text-primary' :
                            'bg-foreground/10 text-foreground/60'
                          }`}>
                            {task.completionStatus || 'Pending'}
                          </span>
                        </div>
                        <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                          {task.taskTitle}
                        </h3>
                        {task.description && (
                          <p className="font-paragraph text-sm text-foreground/60 mb-3">
                            {task.description}
                          </p>
                        )}
                        {task.location && (
                          <div className="flex items-center gap-2 text-sm font-paragraph text-foreground/50">
                            <MapPin className="w-4 h-4" />
                            <span>{task.location}</span>
                          </div>
                        )}
                      </div>
                      {task.completionStatus?.toLowerCase() === 'completed' ? (
                        <CheckCircle className="w-6 h-6 text-secondary" />
                      ) : (
                        <Clock className="w-6 h-6 text-primary" />
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-24">
                  <Users className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
                  <p className="font-paragraph text-foreground/40">No tasks available</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-background border border-primary/20">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                  Training Resources
                </h3>
                <div className="space-y-3 min-h-[200px]">
                  {isLoading ? null : materials.length > 0 ? (
                    materials.slice(0, 5).map((material) => (
                      <a
                        key={material._id}
                        href={material.fileUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 rounded-lg bg-background/50 hover:bg-background transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <BookOpen className="w-5 h-5 text-primary mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <div className="font-paragraph text-sm font-medium text-foreground truncate">
                              {material.resourceTitle}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              {material.category && (
                                <span className="text-xs text-foreground/50">{material.category}</span>
                              )}
                              {material.language && (
                                <>
                                  <span className="text-xs text-foreground/30">•</span>
                                  <span className="text-xs text-foreground/50">{material.language}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </a>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 text-foreground/20 mx-auto mb-2" />
                      <p className="font-paragraph text-sm text-foreground/40">No resources available</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-secondary/10 to-background border border-secondary/20">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm font-paragraph text-foreground/60 mb-1">
                      <span>Completed Tasks</span>
                      <span className="font-bold text-secondary">
                        {tasks.filter(t => t.completionStatus?.toLowerCase() === 'completed').length}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-paragraph text-foreground/60 mb-1">
                      <span>In Progress</span>
                      <span className="font-bold text-primary">
                        {tasks.filter(t => t.completionStatus?.toLowerCase() === 'in progress').length}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-paragraph text-foreground/60 mb-1">
                      <span>High Priority</span>
                      <span className="font-bold text-destructive">
                        {tasks.filter(t => t.priorityLevel?.toLowerCase() === 'high').length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
