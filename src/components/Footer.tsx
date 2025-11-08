import { Link } from "react-router-dom";
import { Instagram, Linkedin, Twitter, Mail, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-gold" />
              <span className="text-xl font-bold">
                Future Scholars
                <span className="ml-1 text-primary-foreground/70">Association</span>
              </span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Empowering tomorrow's leaders through education, mentorship, and
              community support.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-gold transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-all hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gold">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-primary-foreground/80 hover:text-gold transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-primary-foreground/80 hover:text-gold transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/team"
                className="text-primary-foreground/80 hover:text-gold transition-colors"
              >
                Our Team
              </Link>
              <Link
                to="/events"
                className="text-primary-foreground/80 hover:text-gold transition-colors"
              >
                Events
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gold">Get Support</h3>
            <nav className="flex flex-col gap-2">
              <Link
                to="/assistance"
                className="text-primary-foreground/80 hover:text-gold transition-colors"
              >
                Request Assistance
              </Link>
              <a
                href="mailto:contact@futurescholars.org"
                className="text-primary-foreground/80 hover:text-gold transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                contact@futurescholars.org
              </a>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gold">Stay Updated</h3>
            <p className="text-primary-foreground/80 text-sm">
              Subscribe to our newsletter for the latest updates and opportunities.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button className="bg-gold text-gold-foreground hover:bg-gold/90 shrink-0">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>© 2024 Future Scholars Association. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gold transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gold transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
