import { useEffect, useRef, useState } from "react";
import {
  Award,
  ArrowRight,
  Target,
  Heart,
  Users,
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

const AnimatedNumber = ({
  value,
  prefix = "",
  suffix = "",
  duration = 1200,
  format,
}: AnimatedNumberProps) => {
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

  const formatted = format
    ? format(displayValue)
    : displayValue.toLocaleString();

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
    description:
      "We strive for the highest standards in education and leadership development.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Embracing new ideas and creative solutions to empower students.",
  },
  {
    icon: Heart,
    title: "Community",
    description:
      "Building a supportive network where every member can thrive.",
  },
  {
    icon: Target,
    title: "Impact",
    description:
      "Creating meaningful change in the lives of students and communities.",
  },
];

const milestones = [
  {
    year: "2020",
    title: "Foundation",
    description:
      "Future Scholars Association is founded by a small group of students with a bold vision.",
    highlight:
      "We began with two classrooms and a simple belief: opportunity should not depend on zip code.",
    metric: "2 pilot classrooms",
  },
  {
    year: "2021",
    title: "First Campaign",
    description:
      "Launched our first fundraising campaign, raising $2,000 for student scholarships.",
    highlight:
      "Dozens of local donors rallied to support a technology upgrade for a partner school.",
    metric: "$2,000 raised",
  },
  {
    year: "2022",
    title: "Community Growth",
    description:
      "Expanded to 20 active members and partnered with 5 local schools.",
    highlight:
      "We built mentorship circles that connected college volunteers with middle schoolers.",
    metric: "5 partner schools",
  },
  {
    year: "2023",
    title: "Major Impact",
    description:
      "Reached $15,000 in total funds raised, impacting over 1500 students' lives.",
    highlight:
      "Our projects funded STEM labs, reading corners, and field experiences for students.",
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
    description:
      "Provide classrooms with the tools and experiences that spark a lifelong love of learning.",
    icon: BookOpen,
  },
  {
    title: "Invest in educators",
    description:
      "Give teachers the resources and community they need to create transformative lessons.",
    icon: Award,
  },
  {
    title: "Grow opportunity",
    description:
      "Break down barriers by connecting donors, mentors, and students across our network.",
    icon: Target,
  },
];

const About = () => {
  const [activeMilestone, setActiveMilestone] = useState(0);
  const currentMilestone = milestones[activeMilestone];

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white text-gray-900">
        <div className="container relative z-10 mx-auto px-6 py-24 md:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6 animate-slide-in-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2">
                <Sparkles className="h-4 w-4 text-gray-700" />
                <span className="text-sm font-medium">Our Story</span>
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900">
                  Building Brighter
                  <br />
                  <span className="text-gray-600">Futures Together</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-xl">
                  From a small group of students with a vision to a thriving community making real change—discover how we're breaking down barriers and opening doors for the next generation.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 sm:gap-5 lg:max-w-xl">
                {stats.map((stat) => (
                  <div
                    key={stat.id}
                    className="rounded-2xl bg-gray-50 p-5 hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-gray-200 p-3">
                        <stat.icon className="h-5 w-5 text-gray-700" />
                      </div>
                      <div>
                        <p className="text-3xl font-semibold text-gray-900">
                          <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                        </p>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-start gap-4 pt-6 sm:flex-row sm:items-center">
                <Button
                  size="lg"
                  className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Our Mission
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-800 text-gray-900 hover:bg-gray-100 px-8 py-6"
                >
                  Meet the Team
                  <Users className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-[2.5rem] border shadow-2xl">
                <img
                  src={heroImageUrl}
                  alt="Students learning and growing together"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section (NO gradients, neutral colors only) */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-6 text-gray-900">
          <h2 className="text-4xl font-bold text-center mb-16">Our Journey</h2>

          <div className="relative">
            <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-300 transform -translate-x-1/2"></div>

            {milestones.map((m, i) => (
              <div
                key={i}
                className={`mb-12 flex flex-col items-center ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className="w-full lg:w-1/2 p-6">
                  <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition">
                    <h3 className="text-2xl font-semibold mb-2">{m.year}</h3>
                    <p className="text-lg text-gray-700 font-medium mb-2">
                      {m.title}
                    </p>
                    <p className="text-gray-600 mb-4">{m.description}</p>
                    <p className="text-gray-500 italic">{m.highlight}</p>
                    <div className="mt-4 text-sm text-gray-800 font-semibold">
                      {m.metric}
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
