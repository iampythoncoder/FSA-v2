import { useEffect, useRef, useState } from "react";

import {
  Award,
  ArrowRight,
  Target,
  Heart,
  Users,
  Rocket,
  BookOpen,
  Globe,
  Lightbulb,
  TrendingUp,
  Star,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [duration, value]);

  const formatted = format ? format(displayValue) : displayValue.toLocaleString();

  return (
    <span ref={displayRef}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

const heroImageUrl =
  "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80";

const storyImageUrl =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80";

  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for the highest standards in education and leadership development.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Embracing new ideas and creative solutions to empower students.",
    },
    {
      icon: Heart,
      title: "Community",
      description: "Building a supportive network where every member can thrive.",
    },
    {
      icon: Rocket,
      title: "Impact",
      description: "Creating meaningful change in the lives of students and communities.",
    },
  ];

  const milestones = [
  {
    year: "2020",
    title: "Foundation",
    description: "Future Scholars Association is founded by a small group of students with a bold vision.",
    highlight:
      "We began with two classrooms and a simple belief: opportunity should not depend on zip code.",
    metric: "2 pilot classrooms",
  },
  {
    year: "2021",
    title: "First Campaign",
    description: "Launched our first fundraising campaign, raising $2,000 for student scholarships.",
    highlight: "Dozens of local donors rallied to support a technology upgrade for a partner school.",
    metric: "$2,000 raised",
  },
  {
    year: "2022",
    title: "Community Growth",
    description: "Expanded to 20 active members and partnered with 5 local schools.",
    highlight: "We built mentorship circles that connected college volunteers with middle schoolers.",
    metric: "5 partner schools",
  },
  {
    year: "2023",
    title: "Major Impact",
    description: "Reached $15,000 in total funds raised, impacting over 1500 students' lives.",
    highlight: "Our projects funded STEM labs, reading corners, and field experiences for students.",
    metric: "1,500+ students",
  },
];

const stats = [
  { id: "students", label: "Students Reached", value: 1500, suffix: "+", icon: Users },
  { id: "projects", label: "Projects Funded", value: 42, icon: Star },
  { id: "schools", label: "Partner Schools", value: 12, icon: Globe },
  { id: "hours", label: "Volunteer Hours", value: 3200, suffix: "+", icon: TrendingUp },
];

const impactPillars = [
  {
    title: "Fuel their curiosity",
    description: "Provide classrooms with the tools and experiences that spark a lifelong love of learning.",
    icon: BookOpen,
  },
  {
    title: "Invest in educators",
    description: "Give teachers the resources and community they need to create transformative lessons.",
    icon: Award,
  },
  {
    title: "Grow opportunity",
    description: "Break down barriers by connecting donors, mentors, and students across our network.",
    icon: Rocket,
  },
];

const About = () => {
  const [activeMilestone, setActiveMilestone] = useState(0);
  const currentMilestone = milestones[activeMilestone];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/95 via-accent to-primary/90 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.2),_transparent_50%)]" />
        <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="container relative z-10 mx-auto px-6 py-24 md:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6 animate-slide-in-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">Our Story</span>
            </div>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Building Brighter
                  <br />
                  <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    Futures Together
              </span>
            </h1>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-xl">
                  From a small group of students with a vision to a thriving community making real change—discover how we're breaking down barriers and opening doors for the next generation.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 sm:gap-5 lg:max-w-xl">
                {stats.map((stat) => (
                  <div
                    key={stat.id}
                    className="group rounded-2xl bg-white/15 p-5 backdrop-blur transition-all duration-300 hover:bg-white/25 hover:shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-white/20 p-3">
                        <stat.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-3xl font-semibold tracking-tight">
                          <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                        </p>
                        <p className="text-sm text-white/80">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
                </div>

              <div className="flex flex-col items-start gap-4 pt-6 sm:flex-row sm:items-center">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 hover:scale-105 px-8 py-6 shadow-2xl transition-all">
                  <Heart className="mr-2 h-5 w-5" />
                  Our Mission
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/70 bg-transparent px-8 py-6 text-white hover:bg-white hover:text-primary transition-all"
                >
                  Meet the Team
                  <Users className="ml-2 h-5 w-5" />
                </Button>
              </div>
                </div>

            <div className="relative animate-fade-in">
              <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-white/30 via-accent/25 to-transparent blur-3xl" />
              <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-white/30 shadow-2xl backdrop-blur-sm">
                <img
                  src={heroImageUrl}
                  alt="Students learning and growing together"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-transparent to-accent/30" />
                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 backdrop-blur-sm shadow-xl">
                    <Star className="h-4 w-4 text-primary fill-primary" />
                    <span className="text-sm font-bold text-primary">Empowering 1,500+ Students</span>
                  </div>
                  <p className="text-sm font-medium text-white drop-shadow-2xl">Creating opportunities, one student at a time</p>
                </div>
              </div>
              <div className="absolute -bottom-12 left-1/2 flex w-[88%] -translate-x-1/2 flex-col gap-4 rounded-3xl bg-white/95 p-6 text-primary shadow-2xl shadow-primary/30 backdrop-blur-sm border border-white/40">
                <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-wider text-primary/70">
                  <span>Our Journey So Far</span>
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">Scholar support delivered</p>
                    <p className="text-sm text-primary/70">From emergency supplies to new STEM labs.</p>
              </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
  <div className="container mx-auto px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr,0.95fr]">
            <div className="space-y-6">
              <Badge variant="outline" className="w-fit border-primary/30 bg-primary/5 text-primary">
                Where it began
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                A grassroots movement led by students who refused to wait for change.
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                We started with a simple Google Form and a borrowed conference room. Teachers told us what they needed,
                we shared their stories, and neighbors stepped up. There was no big launch—just consistency, empathy,
                and a vision for what education could look like with the right support.
              </p>
              <div className="grid gap-4">
                <Card className="border-primary/20 bg-primary/5 p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-start gap-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <div className="space-y-2">
                      <p className="text-sm font-semibold uppercase tracking-wider text-primary">First project funded</p>
                      <p className="text-foreground/80">
                        A classroom library for beginning readers sparked a chain of giving that still inspires us.
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="border-border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-start gap-4">
                    <Users className="h-6 w-6 text-primary" />
                    <div className="space-y-2">
                      <p className="text-sm font-semibold uppercase tracking-wider text-primary">Community powered</p>
                      <p className="text-foreground/80">
                        College mentors, local businesses, and families teamed up to make sure no classroom was left
                        behind.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
              <p className="text-lg font-semibold text-primary">
                Today we keep the same energy: listen first, act fast, celebrate every win.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -top-6 -left-4 hidden h-24 w-24 rounded-full bg-primary/10 blur-3xl sm:block" />
              <div className="relative overflow-hidden rounded-[2.5rem] shadow-xl">
                <img
                  src={storyImageUrl}
                  alt="Volunteers collaborating"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-primary/20" />
              </div>
              <div className="absolute -bottom-10 right-6 w-64 rounded-2xl bg-white p-5 shadow-2xl shadow-primary/30">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary/70">Volunteer Spotlight</p>
                <p className="mt-2 text-base text-foreground">
                  “The best part is seeing a student realize we’re cheering for them.” — Maya, mentor since 2021
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Milestone Timeline */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-4 text-center lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <Badge variant="outline" className="mx-auto lg:mx-0 border-primary/30 bg-primary/5 text-primary">
                Our journey
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                A timeline of momentum built by students, teachers, and supporters.
              </h2>
            </div>
            <p className="text-base text-foreground/70 lg:max-w-md">
              Hover or tap on a year to explore how Future Scholars grew from a single classroom to a multi-school
              movement.
            </p>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[280px,1fr]">
            <div className="flex gap-4 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
              {milestones.map((milestone, index) => {
                const isActive = activeMilestone === index;
                return (
                  <button
                    key={milestone.year}
                    type="button"
                    onMouseEnter={() => setActiveMilestone(index)}
                    onFocus={() => setActiveMilestone(index)}
                    onClick={() => setActiveMilestone(index)}
                    aria-pressed={isActive}
                    className={`flex min-w-[220px] flex-col gap-1 rounded-2xl border px-5 py-4 text-left transition-all duration-300 lg:min-w-0 ${
                      isActive
                        ? "border-primary/40 bg-white text-primary shadow-lg shadow-primary/20"
                        : "border-transparent bg-white/70 text-primary/70 hover:bg-white"
                    }`}
                  >
                    <span className="text-xs font-semibold uppercase tracking-widest">{milestone.year}</span>
                    <span className="text-lg font-semibold">{milestone.title}</span>
                  </button>
                );
              })}
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-white p-10 shadow-xl">
              <div className="pointer-events-none absolute -top-32 -right-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-accent/30 blur-2xl" />
              <div className="relative z-10 space-y-6">
                <Badge className="w-fit border-transparent bg-primary/10 text-primary">{currentMilestone.metric}</Badge>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground">{currentMilestone.description}</h3>
                  <p className="text-foreground/70 leading-relaxed">{currentMilestone.highlight}</p>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                  <Rocket className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary/70">What's next</p>
                    <p className="text-foreground/80">
                      Each milestone funds new classrooms, mentorship hours, and educator training for the year ahead.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Pillars */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <Badge variant="outline" className="mx-auto border-primary/30 bg-primary/5 text-primary">
              How we create impact
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Three pillars guide every initiative we launch.</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              From fundraising to mentorship, we focus on holistic support that lets students and teachers thrive.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {impactPillars.map((pillar) => (
              <Card
                key={pillar.title}
                className="group relative overflow-hidden border-none bg-gradient-to-br from-primary/5 via-white to-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="absolute -top-16 -right-14 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-transform duration-300 group-hover:scale-125" />
                <div className="relative z-10 space-y-4">
                  <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
                    <pillar.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">{pillar.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{pillar.description}</p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-gradient-to-br from-accent/5 to-primary/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <Badge variant="outline" className="mx-auto border-primary/30 bg-primary/5 text-primary">
              The heartbeat of our work
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Values that keep us bold, empathetic, and relentless.</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Each value shows up in how we listen to teachers, protect students, and rally our supporters.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className="group relative overflow-hidden border border-primary/10 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute -top-20 -right-16 h-44 w-44 rounded-full bg-primary/5 blur-3xl transition-transform duration-300 group-hover:scale-125" />
                <div className="relative z-10 space-y-4">
                  <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
                    <value.icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{value.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission CTA */}
      <section className="py-32 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="outline" className="mx-auto border-primary/30 bg-primary/5 text-primary">
              Join the mission
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Let’s build brighter futures, one classroom at a time.
            </h2>

            <p className="text-xl text-foreground/70 leading-relaxed max-w-3xl mx-auto">
              Your generosity funds real projects, supports dedicated teachers, and fuels life-changing moments for
              students. Partner with us and watch what’s possible.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white hover:scale-105 transition-all">
                <Heart className="w-5 h-5 mr-2" />
                Support a Project
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-border hover:bg-white hover:scale-105 transition-all"
              >
                See Our Impact
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
