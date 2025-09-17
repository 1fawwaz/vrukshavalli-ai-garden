import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/hero-plants.jpg';

const HeroSection: React.FC = () => {
  const stats = [
    { icon: Star, value: '10,000+', label: 'Happy Customers' },
    { icon: Users, value: '500+', label: 'Plant Varieties' },
    { icon: Truck, value: 'Free', label: 'Delivery in Ratnagiri' },
  ];

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <Badge className="mb-6 bg-white/20 text-white border-white/30">
          🌿 Passionate Gardeners, Bringing Nature Closer
        </Badge>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Welcome to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-400">
            Vrukshavalli
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 leading-relaxed">
          Discover the perfect plants for your home and garden. From air-purifying indoor plants 
          to vibrant outdoor varieties, we have everything to make your space green and beautiful.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button variant="hero" size="lg" asChild>
            <Link to="/category/indoor">
              Shop Indoor Plants
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
            <Link to="/care-guide">
              Plant Care Guide
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;