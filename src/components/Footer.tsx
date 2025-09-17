import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Indoor Plants', path: '/category/indoor' },
    { name: 'Outdoor Plants', path: '/category/outdoor' },
    { name: 'Exotic Plants', path: '/category/exotic' },
    { name: 'Plant Care Guide', path: '/care-guide' },
    { name: 'About Us', path: '/about' },
  ];

  const customerService = [
    { name: 'Contact Us', path: '/contact' },
    { name: 'Shipping Info', path: '/shipping' },
    { name: 'Return Policy', path: '/returns' },
    { name: 'Plant Guarantee', path: '/guarantee' },
    { name: 'Track Order', path: '/track' },
  ];

  return (
    <footer className="bg-gradient-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-white/20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              Stay Connected with Nature
            </h3>
            <p className="mb-6 opacity-90">
              Get expert plant care tips, new arrivals, and exclusive offers delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border-white/30 text-white placeholder:text-white/70"
              />
              <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Leaf className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Vrukshavalli</h2>
                <p className="text-sm opacity-80">Passionate Gardeners</p>
              </div>
            </Link>
            
            <p className="mb-6 opacity-90 leading-relaxed">
              Bringing nature closer to you with premium quality plants, 
              expert care guidance, and a commitment to green living in Ratnagiri.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <span>+91 07719890777</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span>info@vrukshavalli.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <span>Ratnagiri, Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Shop Plants</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="opacity-90 hover:opacity-100 hover:underline transition-opacity"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Customer Service</h4>
            <ul className="space-y-3">
              {customerService.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="opacity-90 hover:opacity-100 hover:underline transition-opacity"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media & Business Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Follow Us</h4>
            <div className="flex gap-4 mb-6">
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/10 hover:bg-white/20 text-white"
                asChild
              >
                <a href="https://instagram.com/vrukshavalli_ratnagiri" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-5 h-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/10 hover:bg-white/20 text-white"
              >
                <Facebook className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/10 hover:bg-white/20 text-white"
              >
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
            
            <div>
              <h5 className="font-semibold mb-3">Business Hours</h5>
              <div className="space-y-2 text-sm opacity-90">
                <div className="flex justify-between">
                  <span>Mon - Sat:</span>
                  <span>9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>10:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm opacity-80">
              © {currentYear} Vrukshavalli Plant Nursery. All rights reserved.
            </div>
            
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="opacity-80 hover:opacity-100 transition-opacity">
                Privacy Policy
              </Link>
              <Link to="/terms" className="opacity-80 hover:opacity-100 transition-opacity">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="opacity-80 hover:opacity-100 transition-opacity">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;