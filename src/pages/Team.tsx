import { } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Team = () => {
  const teamMembers = [
    {
      name: "Aarush Kadira",
      role: "Founder",
      bio: "Visionary leader dedicated to empowering students and creating opportunities for the next generation of scholars.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    {
      name: "Joshua Castelino",
      role: "Secretary",
      bio: "Organizational expert ensuring smooth operations and effective communication across all initiatives.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    },
    {
      name: "Saatvik Santosh",
      role: "Public Affairs and Development Officer",
      bio: "Designed this website and manages all technical infrastructure. Building digital solutions for community impact.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    },
    {
      name: "Kabir Baig",
      role: "Design Manager",
      bio: "Creative visionary crafting compelling visual experiences and brand identity for maximum engagement.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    },
    {
      name: "Ketav Karthikeyan",
      role: "Community and Partnership Manager",
      bio: "Building meaningful relationships and strategic partnerships to expand our reach and community impact.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gold rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-slide-up">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-medium border border-gold/20">
                Leadership Team
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground">
              Meet the{" "}
              <span className="text-5xl md:text-6xl font-bold text-primary-foreground">
                Dreamers & Doers
              </span>
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Passionate individuals working together to make education accessible
              and empower the next generation of leaders.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid - Equal Size Cards */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-glow bg-card/80 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                
                <div className="p-6 space-y-4">
                  {/* Profile Image Container */}
                  <div className="relative mx-auto w-32 h-32">
                    {/* Decorative rings */}
                    <div className="absolute inset-0 rounded-full border-4 border-accent/20 animate-pulse" />
                    <div className="absolute inset-2 rounded-full border-2 border-accent/40" />
                    
                    {/* Profile Image */}
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-elegant">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      {member.name}
                    </h3>
                    <p className="text-sm font-semibold text-accent uppercase tracking-wide">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold">
              Want to{" "}
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Join Our Team?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              We're always looking for passionate individuals who want to make a
              difference in students' lives.
            </p>
            <Button
              size="lg"
              className="bg-gradient-accent text-accent-foreground hover:shadow-glow transition-all"
            >
              Get Involved
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
