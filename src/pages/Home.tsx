import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Heart, Users, Search, TrendingUp, Award, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

type AnimatedNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  format?: (value: number) => string;
};

const AnimatedNumber = ({ value, prefix = "", suffix = "", duration = 1200, format }: AnimatedNumberProps) => {
  const displayRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number>();
  const hasAnimatedRef = useRef(false);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const element = displayRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            const start = performance.now();

            const animate = (currentTime: number) => {
              const elapsed = currentTime - start;
              const progress = Math.min(elapsed / duration, 1);
              const currentValue = Math.round(progress * value);
              setDisplayValue(currentValue);

              if (progress < 1) {
                frameRef.current = requestAnimationFrame(animate);
              } else {
                setDisplayValue(value);
              }
            };

            frameRef.current = requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [duration, value]);

  const formattedValue = format ? format(displayValue) : displayValue.toLocaleString();

  return (
    <span ref={displayRef}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
};

const Home = () => {
  const heroImageUrl =
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80";

  const stats = [
    {
      id: "projects",
      Icon: BookOpen,
      value: 3,
      label: "Projects Funded",
      sublabel: "Since founded",
    },
    {
      id: "students",
      Icon: Users,
      value: 1500,
      label: "Students Helped",
      sublabel: "Across 2 states",
      suffix: "+",
    },
    {
      id: "donations",
      Icon: Heart,
      value: 15000,
      label: "Total Donated",
      sublabel: "By people like you",
      prefix: "$",
      format: (val: number) => val.toLocaleString(),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-primary text-white pt-32 pb-24 flex items-center">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold uppercase tracking-wide shadow-lg shadow-primary/40 animate-slide-in-left">
                <Sparkles className="h-4 w-4" />
                Building brighter classrooms together
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 mt-6 leading-tight animate-fade-in">
                Empower Classrooms.
                <br />
                <span className="text-white/90">Support Future Scholars.</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 animate-slide-up">
                Every classroom deserves the resources to thrive. From books and supplies to transformative technology,
                your support fuels real classrooms led by passionate teachers. Discover projects that inspire you and
                help students unlock their potential.
              </p>
              <div className="grid gap-3 sm:grid-cols-2 mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-start gap-3 rounded-xl bg-white/10 p-4 backdrop-blur">
                  <ShieldCheck className="h-6 w-6 text-white/90" />
                  <div>
                    <p className="font-semibold text-white">Verified classroom needs</p>
                    <p className="text-sm text-white/80">
                      Every campaign is reviewed for impact before it reaches our community.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-white/10 p-4 backdrop-blur">
                  <Heart className="h-6 w-6 text-white/90" />
                  <div>
                    <p className="font-semibold text-white">Transparent giving</p>
                    <p className="text-sm text-white/80">Track progress and hear updates from the teachers you support.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <Link to="/projects">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-lg shadow-primary/40">
                    See classroom projects
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/submit-project">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 text-white hover:bg-white/20 text-lg px-8 py-6 border border-white/50"
                  >
                    I'm a teacher
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative animate-slide-in-right" style={{ animationDelay: "0.15s" }}>
              <div className="pointer-events-none absolute -top-16 -right-14 h-60 w-60 rounded-full bg-white/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
              <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[2.75rem] shadow-3xl shadow-primary/30 ring-2 ring-white/40">
                <img
                  src={heroImageUrl}
                  alt="Teacher encouraging students"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-10 left-8 right-8 rounded-3xl bg-white/90 p-6 shadow-2xl shadow-primary/30 text-primary">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary/70">Trusted by schools</p>
                <p className="mt-2 text-xl font-semibold">1,500+ students reached this year alone.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-primary/40" />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Making an impact together</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of people who believe every student deserves access to quality education resources
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {stats.map(({ id, Icon, value, label, sublabel, prefix, suffix, format }) => (
              <div key={id} className="text-center bg-white p-8 rounded-lg shadow-lg border border-border/70 transition-transform duration-500 hover:-translate-y-1 hover:shadow-xl">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">
                  <AnimatedNumber value={value} prefix={prefix} suffix={suffix} format={format} />
                </div>
                <p className="text-foreground font-semibold text-lg">{label}</p>
                <p className="text-sm text-foreground/70 mt-2">{sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Three simple steps</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Supporting a classroom project is easy and rewarding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 border-2 bg-white">
              <CardHeader>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 mx-auto">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">1. Find a project</CardTitle>
                <CardDescription className="text-base text-foreground/70">
                  Browse projects from real teachers in schools across the country. Filter by subject, location, or urgency.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 border-2 bg-white">
              <CardHeader>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 mx-auto">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">2. Make a donation</CardTitle>
                <CardDescription className="text-base text-foreground/70">
                  Every dollar counts. Choose an amount that works for you, from $5 to fully funding a project.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 border-2 bg-white">
              <CardHeader>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 mx-auto">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">3. See the impact</CardTitle>
                <CardDescription className="text-base text-foreground/70">
                  Teachers send thank-you notes and photos showing how your support made a real difference.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Projects that need you</h2>
              <p className="text-foreground/70">These classrooms are almost there - your donation could make all the difference</p>
            </div>
            <Link to="/projects">
              <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary/10">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Books for Beginning Readers", school: "Lincoln Elementary" },
              { title: "STEM Lab Equipment", school: "Washington Middle School" },
              { title: "Art Supplies for All", school: "Roosevelt High School" }
            ].map((project, i) => (
              <Card key={i} className="hover:shadow-lg transition-all duration-300 border-2 bg-white">
                <div className="aspect-video w-full bg-gradient-to-br from-primary to-primary/70 rounded-t-lg" />
                <CardHeader>
                  <CardTitle className="line-clamp-2 text-foreground">{project.title}</CardTitle>
                  <CardDescription className="text-foreground/70">{project.school}</CardDescription>
                </CardHeader>
                <CardContent>
                  <a href="https://gofundme.com" target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-primary text-white hover:bg-primary/90">
                      <Heart className="h-4 w-4 mr-2" />
                      Support This Project
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <Award className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your support changes lives</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Every donation helps a teacher create a better learning environment. Start browsing projects and see where you can make an impact today.
          </p>
          <Link to="/projects">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
              Find a Project to Support
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
