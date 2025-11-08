import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  Mail,
  Phone,
  User,
  XCircle,
} from 'lucide-react';
type Project = Tables<'projects'>;

const AdminDashboard = () => {
  const { isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/');
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin dashboard.",
        variant: "destructive",
      });
    }
  }, [isAdmin, authLoading, navigate, toast]);

  const fetchPendingProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'pending')
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to load pending projects.",
        variant: "destructive",
      });
    }
    finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (isAdmin) {
      void fetchPendingProjects();
    }
  }, [isAdmin, fetchPendingProjects]);

  const handleApprove = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ status: 'active' })
        .eq('id', projectId);

      if (error) throw error;

      toast({
        title: "Project Approved",
        description: "The project is now live on the platform.",
      });

      await fetchPendingProjects();
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  const handleReject = async () => {
    if (!selectedProject || !rejectionReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for rejection.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('projects')
        .update({ 
          status: 'rejected',
          rejection_reason: rejectionReason
        })
        .eq('id', selectedProject.id);

      if (error) throw error;

      toast({
        title: "Project Rejected",
        description: "The submitter will be notified.",
      });

      setShowRejectDialog(false);
      setRejectionReason('');
      setSelectedProject(null);
      await fetchPendingProjects();
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  if (authLoading || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Review and moderate campaign submissions
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{projects.length}</p>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">-</p>
                  <p className="text-sm text-muted-foreground">Approved Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">-</p>
                  <p className="text-sm text-muted-foreground">Rejected Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Projects */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Pending Submissions</h2>
          
          {isLoading ? (
            <Card>
              <CardContent className="py-12 text-center">
                <div className="inline-block w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
                <p className="text-muted-foreground">Loading submissions...</p>
              </CardContent>
            </Card>
          ) : projects.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">All Caught Up!</h3>
                <p className="text-muted-foreground">No pending submissions to review.</p>
              </CardContent>
            </Card>
          ) : (
            projects.map((project) => (
              <Card key={project.id} className="border-2">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-2xl">{project.title}</CardTitle>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </Badge>
                      </div>
                      <CardDescription className="text-base">
                        <div className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(project.submitted_at ?? project.created_at).toLocaleDateString()}
                          </span>
                          <Badge>{project.category}</Badge>
                        </div>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {project.image_url && (
                    <div className="aspect-video w-full overflow-hidden rounded-lg">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Goal Amount</h4>
                      <p className="text-2xl font-bold text-primary">
                        ${project.goal_amount.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">GoFundMe Link</h4>
                      <a
                        href={project.gofundme_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        View Campaign
                      </a>
                    </div>
                  </div>

                  {(project.contact_name || project.contact_email || project.contact_phone) && (
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Contact Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        {project.contact_name && (
                          <p className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            {project.contact_name}
                          </p>
                        )}
                        {project.contact_email && (
                          <p className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            {project.contact_email}
                          </p>
                        )}
                        {project.contact_phone && (
                          <p className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            {project.contact_phone}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() => handleApprove(project.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Project
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedProject(project);
                        setShowRejectDialog(true);
                      }}
                      variant="destructive"
                      className="flex-1"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject Project
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Project</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this project. The submitter will receive this feedback.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rejection-reason">Rejection Reason *</Label>
              <Textarea
                id="rejection-reason"
                placeholder="Explain why this project cannot be approved..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={5}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowRejectDialog(false);
                setRejectionReason('');
                setSelectedProject(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={!rejectionReason.trim()}
            >
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
