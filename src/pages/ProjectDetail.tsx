import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft, Calendar, Heart, MapPin, Share2, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Project = Tables<"projects">;

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProject = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setProject(data);
    } catch (error) {
      const message =
        typeof error === "object" && error !== null && "message" in error && typeof (error as { message?: unknown }).message === "string"
          ? (error as { message: string }).message
          : "Could not load project details";
      console.error("Error fetching project:", error);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [id, toast]);

  useEffect(() => {
    if (id) {
      void fetchProject();
    }
  }, [id, fetchProject]);

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project?.title,
        text: `Support this classroom project: ${project?.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Project link copied to clipboard",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-muted-foreground">Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Project not found</h2>
            <Button onClick={() => navigate("/projects")}>
              View All Projects
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/projects")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {project.image_url && (
              <div className="aspect-video w-full overflow-hidden rounded-lg shadow-card">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div>
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 capitalize">
                {project.category}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                {project.school_name && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{project.school_name}</span>
                  </div>
                )}
                {project.student_count && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{project.student_count} students</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Created {new Date(project.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-4">About this project</h2>
                <p className="text-muted-foreground whitespace-pre-wrap">{project.description}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-elegant">
              <CardHeader>
                <CardTitle>Support This Project</CardTitle>
                <CardDescription>Help make a difference in students' lives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-2xl font-bold text-primary">
                      ${project.current_amount.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground self-end">
                      of ${project.goal_amount.toLocaleString()}
                    </span>
                  </div>
                  <Progress 
                    value={getProgressPercentage(project.current_amount, project.goal_amount)} 
                    className="h-3"
                  />
                  <p className="text-sm text-muted-foreground">
                    {Math.round(getProgressPercentage(project.current_amount, project.goal_amount))}% funded
                  </p>
                </div>

                {project.gofundme_link ? (
                  <Button 
                    className="w-full bg-gradient-primary hover:shadow-glow text-lg py-6"
                    size="lg"
                    asChild
                  >
                    <a href={project.gofundme_link} target="_blank" rel="noopener noreferrer">
                      <Heart className="h-5 w-5 mr-2" />
                      Donate on GoFundMe
                    </a>
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-gradient-primary hover:shadow-glow text-lg py-6"
                    size="lg"
                    disabled
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    No Donation Link
                  </Button>
                )}

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Project
                </Button>

                <Separator />

                <div className="space-y-3 text-sm">
                  <h3 className="font-semibold">Why support this project?</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Heart className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                      <span>100% of donations go directly to the classroom</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                      <span>Every contribution makes a real impact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                      <span>Tax receipts provided for all donations</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
