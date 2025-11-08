import { useState } from "react";
import { Calendar, Clock, MapPin, Users, ArrowRight, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const events = [
    {
      title: "TO BE DECIDED",
      date: "TBD",
      time: "TBD",
      location: "TBD",
      type: "Event",
      attendees: 0,
      description: "Event details coming soon. Stay tuned for updates on our upcoming initiatives and community activities.",
      status: "upcoming",
      color: "accent",
    },
    {
      title: "TO BE DECIDED",
      date: "TBD",
      time: "TBD",
      location: "TBD",
      type: "Event",
      attendees: 0,
      description: "Event details coming soon. Stay tuned for updates on our upcoming initiatives and community activities.",
      status: "upcoming",
      color: "gold",
    },
    {
      title: "TO BE DECIDED",
      date: "TBD",
      time: "TBD",
      location: "TBD",
      type: "Event",
      attendees: 0,
      description: "Event details coming soon. Stay tuned for updates on our upcoming initiatives and community activities.",
      status: "upcoming",
      color: "accent",
    },
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || event.type.toLowerCase() === filterType;
    return matchesSearch && matchesType;
  });

  const upcomingEvents = filteredEvents.filter(e => e.status === "upcoming");
  const pastEvents = filteredEvents.filter(e => e.status === "past");

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gold rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold/20 text-gold text-sm font-medium border-2 border-gold/40 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              What's Happening
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-primary-foreground leading-tight">
              Upcoming{" "}
              <span className="bg-gradient-gold bg-clip-text text-transparent">
                Events
              </span>
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Join us for inspiring workshops, networking opportunities, and
              community-building events designed to support your growth.
            </p>
          </div>
        </div>

        {/* Curved Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20" preserveAspectRatio="none" viewBox="0 0 1200 120">
            <path d="M0,60 Q300,120 600,60 T1200,60 L1200,120 L0,120 Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-background border-b-2 border-accent/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
            <Input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border-2 focus:border-accent"
            />
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48 border-2">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="panel">Panel</SelectItem>
                <SelectItem value="program">Program</SelectItem>
                <SelectItem value="service">Service</SelectItem>
                <SelectItem value="gala">Gala</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Upcoming Events - Vertical Timeline */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-center">
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Coming Soon
            </span>
          </h2>

          <div className="max-w-5xl mx-auto relative">
            {/* Timeline Connector - Curved Path */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-gold to-accent/20 hidden md:block" />

            <div className="space-y-16">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className={`relative animate-slide-up ${
                    index % 2 === 0 ? 'md:ml-24' : 'md:ml-24 md:pl-20'
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Timeline Dot with Pulse */}
                  <div className="absolute -left-[88px] top-12 w-12 h-12 hidden md:flex items-center justify-center">
                    <div className={`absolute w-12 h-12 rounded-full ${
                      event.color === 'gold' ? 'bg-gold/30' : 'bg-accent/30'
                    } animate-ping`} />
                    <div className={`relative w-8 h-8 rounded-full ${
                      event.color === 'gold' ? 'bg-gradient-gold' : 'bg-gradient-accent'
                    } border-4 border-background flex items-center justify-center shadow-glow`}>
                      <div className="w-2 h-2 bg-background rounded-full" />
                    </div>
                  </div>

                  {/* Date Ribbon */}
                  <div className={`absolute -top-4 ${
                    index % 2 === 0 ? '-right-4' : '-left-4'
                  } px-6 py-2 rounded-full ${
                    event.color === 'gold' 
                      ? 'bg-gradient-gold text-gold-foreground shadow-gold' 
                      : 'bg-gradient-accent text-accent-foreground shadow-glow'
                  } font-bold text-sm z-10 whitespace-nowrap transform -rotate-3 hover:rotate-0 transition-transform`}>
                    {event.date}
                  </div>

                  {/* Event Card - Glassmorphism */}
                  <Card
                    className={`group relative overflow-hidden border-2 transition-all duration-500 backdrop-blur-sm ${
                      event.color === 'gold'
                        ? 'bg-gold/5 hover:border-gold/50 hover:shadow-gold'
                        : 'bg-accent/5 hover:border-accent/50 hover:shadow-glow'
                    } hover:-translate-y-2`}
                  >
                    {/* Decorative Corner Cut */}
                    <div className={`absolute top-0 left-0 w-32 h-32 ${
                      event.color === 'gold' ? 'bg-gold/10' : 'bg-accent/10'
                    } group-hover:opacity-20 transition-opacity`}
                         style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
                    
                    <div className="p-8 space-y-6 relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-3">
                          <span className={`px-4 py-1.5 rounded-full text-xs font-bold border-2 ${
                            event.color === 'gold'
                              ? 'bg-gold/10 text-gold border-gold/30'
                              : 'bg-accent/10 text-accent border-accent/30'
                          }`}>
                            {event.type}
                          </span>
                        </div>
                        {event.attendees > 0 && (
                          <span className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                            <Users className={`w-5 h-5 ${
                              event.color === 'gold' ? 'text-gold' : 'text-accent'
                            }`} />
                            {event.attendees} attending
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className={`text-2xl md:text-3xl font-bold transition-colors ${
                        event.color === 'gold'
                          ? 'group-hover:text-gold'
                          : 'group-hover:text-accent'
                      }`}>
                        {event.title}
                      </h3>

                      {/* Details Grid */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            event.color === 'gold' ? 'bg-gold/10' : 'bg-accent/10'
                          }`}>
                            <Clock className={`w-5 h-5 ${
                              event.color === 'gold' ? 'text-gold' : 'text-accent'
                            }`} />
                          </div>
                          <span className="text-muted-foreground font-medium">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            event.color === 'gold' ? 'bg-gold/10' : 'bg-accent/10'
                          }`}>
                            <MapPin className={`w-5 h-5 ${
                              event.color === 'gold' ? 'text-gold' : 'text-accent'
                            }`} />
                          </div>
                          <span className="text-muted-foreground font-medium">{event.location}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {event.description}
                      </p>

                      {/* CTA */}
                      <Button className={`w-full group/btn ${
                        event.color === 'gold'
                          ? 'bg-gradient-gold text-gold-foreground hover:shadow-gold'
                          : 'bg-gradient-accent text-accent-foreground hover:shadow-glow'
                      } transition-all`}>
                        Register Now
                        <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                      </Button>
                    </div>

                    {/* Decorative Bottom Stripe */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 ${
                      event.color === 'gold' ? 'bg-gradient-gold' : 'bg-gradient-accent'
                    }`} />
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden bg-gradient-primary">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-10 animate-slide-up">
            <h2 className="text-5xl md:text-6xl font-bold text-primary-foreground leading-tight">
              Have an Event Idea?
            </h2>
            <p className="text-xl text-primary-foreground/90">
              We're always looking for new ways to engage our community. Share your
              suggestions with us!
            </p>
            <Button
              size="lg"
              className="bg-gold text-gold-foreground hover:shadow-gold transition-all hover:scale-105 px-8 text-lg"
            >
              Suggest an Event
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
