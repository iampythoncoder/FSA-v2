import { useState } from "react";
import { Heart, DollarSign, BookOpen, Users, CheckCircle2, Zap, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Assistance = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    assistanceType: "",
    description: "",
  });

  const assistanceTypes = [
    {
      icon: DollarSign,
      title: "Financial Support",
      description: "Scholarships and emergency funds to help cover tuition, books, and living expenses.",
      gradient: "from-gold/10 to-gold/5",
      iconColor: "text-gold",
    },
    {
      icon: BookOpen,
      title: "Academic Mentorship",
      description: "One-on-one tutoring and study support from experienced mentors.",
      gradient: "from-accent/10 to-accent/5",
      iconColor: "text-accent",
    },
    {
      icon: Users,
      title: "Career Guidance",
      description: "Resume reviews, interview prep, and professional networking opportunities.",
      gradient: "from-primary/10 to-primary/5",
      iconColor: "text-primary",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: "Application Submitted!",
      description: "We'll review your request and get back to you within 48 hours.",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const completionPercentage = (Object.values(formData).filter((v) => v !== "").length / Object.keys(formData).length) * 100;

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-gold/5">
        <Card className="max-w-2xl mx-6 p-12 text-center space-y-8 border-2 border-accent/50 shadow-glow animate-slide-up relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-accent opacity-10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-gold opacity-10 rounded-full blur-3xl" />
          
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-2 shadow-glow">
              <CheckCircle2 className="w-14 h-14 text-accent-foreground animate-scale-in" />
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-pulse" />
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-accent bg-clip-text text-transparent">
              Application Received!
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
              Thank you for reaching out. Our team will carefully review your request
              and respond within 48 hours. We're here to support you on your journey!
            </p>
          </div>

          <div className="flex gap-4 justify-center pt-4">
            <Button
              onClick={() => setIsSubmitted(false)}
              className="bg-gradient-accent text-accent-foreground hover:shadow-glow"
            >
              Submit Another Request
            </Button>
            <Button
              variant="outline"
              className="border-2 hover:bg-accent/5 hover:border-accent"
              onClick={() => window.location.href = '/'}
            >
              Back to Home
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section with Pattern */}
      <section className="relative py-32 bg-gradient-hero overflow-hidden">
        {/* SVG Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="assistance-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="2" fill="currentColor" className="text-primary-foreground" />
                <circle cx="0" cy="40" r="2" fill="currentColor" className="text-primary-foreground" />
                <circle cx="80" cy="40" r="2" fill="currentColor" className="text-primary-foreground" />
                <circle cx="40" cy="0" r="2" fill="currentColor" className="text-primary-foreground" />
                <circle cx="40" cy="80" r="2" fill="currentColor" className="text-primary-foreground" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#assistance-pattern)" />
          </svg>
        </div>

        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gold rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold/20 text-gold text-sm font-medium border-2 border-gold/40 backdrop-blur-sm">
              <Heart className="w-4 h-4" />
              We're Here to Help
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-primary-foreground leading-tight">
              Request{" "}
              <span className="bg-gradient-gold bg-clip-text text-transparent">
                Assistance
              </span>
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed max-w-2xl mx-auto">
              Don't let financial or academic challenges hold you back. We're committed
              to supporting your educational journey every step of the way.
            </p>
          </div>
        </div>

        {/* Diagonal Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20" preserveAspectRatio="none" viewBox="0 0 1200 120">
            <path d="M0,0 L1200,40 L1200,120 L0,120 Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Types of Assistance - Organic Blob Cards */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4">
              How We Can{" "}
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Support You
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We offer various forms of assistance tailored to your unique needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {assistanceTypes.map((type, index) => (
              <Card
                key={index}
                className={`group relative p-8 text-center hover:shadow-glow transition-all duration-500 hover:-translate-y-3 border-2 hover:border-accent/50 animate-slide-up overflow-hidden`}
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                  transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)`,
                }}
              >
                {/* Blob Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-50 group-hover:opacity-70 transition-opacity`} 
                     style={{ 
                       clipPath: "polygon(0% 10%, 10% 0%, 90% 5%, 100% 20%, 95% 90%, 85% 100%, 10% 95%, 0% 80%)" 
                     }} />
                
                <div className="relative space-y-6">
                  <div className="relative inline-block">
                    <type.icon className={`w-14 h-14 ${type.iconColor} transition-transform group-hover:scale-110 group-hover:rotate-12 relative z-10`} />
                    <div className={`absolute inset-0 ${type.iconColor} opacity-20 rounded-full blur-xl group-hover:opacity-40 transition-all`} />
                  </div>
                  <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">
                    {type.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {type.description}
                  </p>
                </div>

                {/* Decorative Corner Brackets */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-accent/30 group-hover:border-accent transition-colors" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-accent/30 group-hover:border-accent transition-colors" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form - Wizard Style */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-accent/5 to-gold/5 relative overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="form-grid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#form-grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 md:p-12 border-2 shadow-elegant animate-slide-up relative overflow-hidden bg-card/95 backdrop-blur-sm">
              {/* Progress Ring */}
              <div className="absolute top-8 right-8 w-16 h-16">
                <svg className="transform -rotate-90" viewBox="0 0 64 64">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="4"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke="hsl(var(--accent))"
                    strokeWidth="4"
                    strokeDasharray={`${completionPercentage * 1.76} 176`}
                    className="transition-all duration-300"
                  />
                  <text
                    x="32"
                    y="38"
                    textAnchor="middle"
                    className="text-xs font-bold fill-accent"
                    transform="rotate(90 32 32)"
                  >
                    {Math.round(completionPercentage)}%
                  </text>
                </svg>
              </div>

              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h2 className="text-3xl font-bold">Application Form</h2>
                </div>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you soon
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step Indicator */}
                <div className="flex items-center justify-center gap-3 pb-6 border-b-2 border-accent/20">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      formData.name && formData.email && formData.phone 
                        ? 'bg-accent text-accent-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      1
                    </div>
                    <span className="text-sm font-medium hidden sm:inline">Personal Info</span>
                  </div>
                  <div className="w-12 h-1 bg-muted" />
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      formData.assistanceType 
                        ? 'bg-accent text-accent-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      2
                    </div>
                    <span className="text-sm font-medium hidden sm:inline">Assistance Type</span>
                  </div>
                  <div className="w-12 h-1 bg-muted" />
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      formData.description 
                        ? 'bg-accent text-accent-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      3
                    </div>
                    <span className="text-sm font-medium hidden sm:inline">Details</span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  <div className="relative">
                    <Label htmlFor="name" className="text-base font-semibold flex items-center gap-2">
                      Full Name <span className="text-accent">*</span>
                    </Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="mt-2 border-2 focus:border-accent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <Label htmlFor="email" className="text-base font-semibold flex items-center gap-2">
                        Email <span className="text-accent">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="mt-2 border-2 focus:border-accent"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="relative">
                      <Label htmlFor="phone" className="text-base font-semibold flex items-center gap-2">
                        Phone <span className="text-accent">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="mt-2 border-2 focus:border-accent"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Label htmlFor="assistanceType" className="text-base font-semibold flex items-center gap-2">
                      Type of Assistance <span className="text-accent">*</span>
                    </Label>
                    <Select
                      required
                      value={formData.assistanceType}
                      onValueChange={(value) => handleChange("assistanceType", value)}
                    >
                      <SelectTrigger className="mt-2 border-2">
                        <SelectValue placeholder="Select assistance type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="financial">Financial Support</SelectItem>
                        <SelectItem value="academic">Academic Mentorship</SelectItem>
                        <SelectItem value="career">Career Guidance</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="relative">
                    <Label htmlFor="description" className="text-base font-semibold flex items-center gap-2">
                      Tell Us Your Story <span className="text-accent">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      required
                      value={formData.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      className="mt-2 min-h-36 border-2 focus:border-accent"
                      placeholder="Please describe your situation and how we can best support you..."
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-accent text-accent-foreground hover:shadow-glow transition-all text-lg"
                >
                  Submit Application
                  <Zap className="ml-2 w-5 h-5" />
                </Button>

                <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <p>All information is confidential and secure</p>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto animate-slide-up">
            <h2 className="text-4xl font-bold text-center mb-16">
              Frequently Asked{" "}
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Questions
              </span>
            </h2>

            <div className="space-y-6">
              {[
                {
                  question: "How long does the review process take?",
                  answer: "We typically review applications within 48 hours and will reach out via email with next steps.",
                },
                {
                  question: "Who is eligible for assistance?",
                  answer: "All students facing financial, academic, or career-related challenges are welcome to apply. We evaluate each case individually.",
                },
                {
                  question: "Is my information kept confidential?",
                  answer: "Absolutely. All information shared is kept strictly confidential and will only be used for your assistance application.",
                },
              ].map((faq, index) => (
                <Card 
                  key={index} 
                  className="p-6 border-2 hover:border-accent/50 transition-all hover:shadow-glow group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="font-bold text-lg mb-3 group-hover:text-accent transition-colors">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Assistance;
