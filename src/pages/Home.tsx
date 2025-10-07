import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import HeroSection from '@/components/HeroSection';
import PlantCard from '@/components/PlantCard';
import { plants, categories } from '@/data/plants';
import indoorPlantsImage from '@/assets/indoor-plants.jpg';
import outdoorPlantsImage from '@/assets/outdoor-plants.jpg';
import exoticPlantsImage from '@/assets/exotic-plants.jpg';
import foundersImage from '@/assets/vrukshavalli-founders.png';

const Home: React.FC = () => {
  const featuredPlants = plants.slice(0, 6);
  
  const categoryImages = {
    indoor: indoorPlantsImage,
    outdoor: outdoorPlantsImage,
    exotic: exoticPlantsImage,
  };

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

      {/* Story Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Story of Vrukshavalli
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 lg:order-1">
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  What started as a shared love for plants during Madhuri's B.Tech in Agricultural Engineering and Pratik's B.Sc in Horticulture soon turned into a life mission.
                </p>
                <p>
                  Leaving behind a well-settled corporate job, Madhuri chose to follow her heart and joined Pratik in the family nursery business at Ratnagiri — combining technical knowledge with hands-on passion.
                </p>
                <p>
                  In 2017, they started Vrukshavalli, the first-of-its-kind plant boutique in the entire Konkan region, specially created for urban plant lovers who wanted to experience gardening in simple and modern ways.
                </p>
                <p>
                  From indoor and outdoor plants, gardening tools, and decorative planters, to balcony garden makeovers, vertical gardens, and landscape designing, Vrukshavalli has become a trusted destination for everything green.
                </p>
                <p>
                  Our mission goes beyond selling plants — we want to inspire every Indian home to bring a touch of nature indoors, live sustainably, and celebrate the joy of growing something with their own hands.
                </p>
                <p className="font-semibold text-foreground">
                  Today, with a thriving online community of 14,000+ followers and 5,000+ happy customers, Vrukshavalli continues to grow —
                </p>
                <p className="text-primary font-semibold text-lg italic">
                  "Adding green touch to your life."
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Card className="overflow-hidden border-border shadow-nature">
                <img
                  src={foundersImage}
                  alt="Madhuri and Pratik - Founders of Vrukshavalli"
                  className="w-full h-full object-cover"
                />
              </Card>
            </div>
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