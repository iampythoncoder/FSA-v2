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
    year: "2025",
    title: "Foundation & Vision",
    description:
      "Future Scholars Association is founded by a small group of students with a bold vision.",
    highlight:
      "We began with two classrooms and a simple belief: opportunity should not depend on zip code.",
    metric: "2 pilot classrooms",
    color: "from-blue-500 to-cyan-400",
    icon: Award,
  },
  {
    year: "2025",
    title: "First Campaign",
    description:
      "Launched our first fundraising campaign, raising $2,000 for student scholarships.",
    highlight:
      "Dozens of local donors rallied to support a technology upgrade for a partner school.",
    metric: "$2,000 raised",
    color: "from-emerald-500 to-teal-400",
    icon: TrendingUp,
  },
  {
    year: "2025",
    title: "Community Growth",
    description:
      "Expanded to 20 active members and partnered with 5 local schools.",
    highlight:
      "We built mentorship circles that connected college volunteers with middle schoolers.",
    metric: "5 partner schools",
    color: "from-orange-500 to-amber-400",
    icon: Users,
  },
  {
    year: "2025",
    title: "Major Impact",
    description:
      "Reached $15,000 in total funds raised, impacting over 1500 students' lives.",
    highlight:
      "Our projects funded STEM labs, reading corners, and field experiences for students.",
    metric: "1,500+ students",
    color: "from-rose-500 to-pink-400",
    icon: Star,
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

type TimelineItemType = typeof milestones[0];

const TimelineItem = ({ milestone, index, isActive, onClick }: {
  milestone: TimelineItemType;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) => {
  const Icon = milestone.icon;

  return (
    <div className="relative group cursor-pointer" onClick={onClick}>
      <div className={`transition-all duration-300 transform ${isActive ? 'scale-105' : 'scale-100 hover:scale-102'}`}>
        <div className={`bg-gradient-to-br ${milestone.color} rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[300px] flex flex-col justify-between border border-white/20 backdrop-blur-sm`}>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 rounded-full p-3 backdrop-blur-sm">
                <Icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest opacity-90">
                {milestone.year}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2">{milestone.title}</h3>
            <p className="text-white/90 text-sm leading-relaxed mb-4">
              {milestone.description}
            </p>
            <div className="border-t border-white/20 pt-4">
              <p className="text-white/80 text-xs italic">
                {milestone.highlight}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <p className="text-sm font-semibold">{milestone.metric}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full transition-all duration-300 ${
        isActive
          ? 'bg-white shadow-lg scale-125'
          : 'bg-gray-300 group-hover:bg-gray-400'
      }`} />
    </div>
  );
};

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

      {/* Timeline Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-emerald-50/30 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our 2025 Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From vision to impact—witness the milestones that shaped our mission this year
            </p>
          </div>

          {/* Desktop Grid Timeline */}
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
            {milestones.map((m, i) => (
              <TimelineItem
                key={i}
                milestone={m}
                index={i}
                isActive={activeMilestone === i}
                onClick={() => setActiveMilestone(i)}
              />
            ))}
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-6 mb-12">
            {milestones.map((m, i) => (
              <TimelineItem
                key={i}
                milestone={m}
                index={i}
                isActive={activeMilestone === i}
                onClick={() => setActiveMilestone(i)}
              />
            ))}
          </div>

          {/* Timeline Navigation Dots */}
          <div className="flex justify-center gap-3 mb-8">
            {milestones.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveMilestone(i)}
                className={`transition-all duration-300 ${
                  activeMilestone === i
                    ? 'w-10 h-2 bg-gray-900 rounded-full'
                    : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-500'
                }`}
                aria-label={`Go to milestone ${i + 1}`}
              />
            ))}
          </div>

          {/* Active Milestone Details */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {currentMilestone.title}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {currentMilestone.description}
                </p>
                <div className="bg-gray-50 border-l-4 border-gray-900 pl-6 py-4 rounded">
                  <p className="text-gray-700 italic">
                    {currentMilestone.highlight}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8">
                <div className={`bg-gradient-to-br ${currentMilestone.color} rounded-full p-6 mb-4`}>
                  <currentMilestone.icon className="h-12 w-12 text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-900 text-center">
                  {currentMilestone.metric}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
