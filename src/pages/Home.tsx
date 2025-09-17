import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Shield, Truck, HeadphonesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import HeroSection from '@/components/HeroSection';
import PlantCard from '@/components/PlantCard';
import { plants, categories } from '@/data/plants';
import indoorPlantsImage from '@/assets/indoor-plants.jpg';
import outdoorPlantsImage from '@/assets/outdoor-plants.jpg';
import exoticPlantsImage from '@/assets/exotic-plants.jpg';

const Home: React.FC = () => {
  const featuredPlants = plants.slice(0, 6);
  
  const categoryImages = {
    indoor: indoorPlantsImage,
    outdoor: outdoorPlantsImage,
    exotic: exoticPlantsImage,
  };

  const benefits = [
    {
      icon: Leaf,
      title: 'Premium Quality',
      description: 'Hand-picked, healthy plants with quality guarantee'
    },
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'Free delivery within Ratnagiri city limits'
    },
    {
      icon: Shield,
      title: 'Plant Guarantee',
      description: '30-day replacement guarantee on all plants'
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Plant Care Support',
      description: 'Expert advice via WhatsApp & AI chatbot'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Shop by Category
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our curated collection of plants perfect for every space and occasion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group block"
              >
                <Card className="overflow-hidden border-border hover:shadow-nature transition-all duration-300 hover:-translate-y-2 bg-gradient-card">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={categoryImages[category.id as keyof typeof categoryImages]}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
                      <p className="text-white/90 mb-2">{category.description}</p>
                      <p className="text-sm text-white/80">{category.count} varieties available</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <Button variant="nature" className="w-full group-hover:shadow-soft">
                      Explore {category.name}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Plants Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Featured Plants
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our most popular and bestselling plants, loved by plant enthusiasts
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredPlants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onAddToCart={(plant) => console.log('Add to cart:', plant)}
              />
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/plants">
                View All Plants
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Why Choose Vrukshavalli?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're committed to bringing you the healthiest plants and the best service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="text-center border-border hover:shadow-soft transition-all duration-300 bg-background/50">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Plant Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of happy customers who have transformed their spaces with our premium plants
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              <Link to="/category/indoor">
                Shop Now
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
              <Link to="/contact">
                Get Plant Advice
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;