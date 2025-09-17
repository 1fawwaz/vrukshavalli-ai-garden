import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Heart, Share2, ShoppingCart, Minus, Plus, Shield, Truck, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PlantCard from '@/components/PlantCard';
import { plants } from '@/data/plants';
import { useCart } from '@/contexts/CartContext';

const PlantDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  const plant = plants.find(p => p.id === id);
  
  if (!plant) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Plant not found</h2>
          <Button asChild>
            <Link to="/">Go back home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const relatedPlants = plants
    .filter(p => p.category === plant.category && p.id !== plant.id)
    .slice(0, 3);

  const discountPercentage = plant.originalPrice 
    ? Math.round(((plant.originalPrice - plant.price) / plant.originalPrice) * 100)
    : 0;

  const benefits = [
    {
      icon: Shield,
      title: '30-Day Guarantee',
      description: 'Replacement guarantee for unhealthy plants'
    },
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'Free delivery within Ratnagiri city'
    },
    {
      icon: Leaf,
      title: 'Expert Care Tips',
      description: '24/7 plant care support via WhatsApp'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </Button>
        <span className="text-muted-foreground">/</span>
        <Link to={`/category/${plant.category}`} className="text-muted-foreground hover:text-primary">
          {plant.category.charAt(0).toUpperCase() + plant.category.slice(1)} Plants
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium">{plant.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-full object-cover"
            />
            {discountPercentage > 0 && (
              <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                {discountPercentage}% OFF
              </Badge>
            )}
            {!plant.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="destructive" className="text-lg px-6 py-2">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-3">
              {plant.category.charAt(0).toUpperCase() + plant.category.slice(1)} Plant
            </Badge>
            <h1 className="text-3xl font-bold mb-4">{plant.name}</h1>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(plant.rating)
                        ? 'text-accent fill-accent'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                {plant.rating} ({plant.reviews} reviews)
              </span>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {plant.description}
            </p>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-3xl font-bold text-primary">₹{plant.price}</span>
              {plant.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{plant.originalPrice}
                  </span>
                  <Badge className="bg-accent text-accent-foreground">
                    Save ₹{plant.originalPrice - plant.price}
                  </Badge>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {plant.features.map((feature) => (
                <Badge key={feature} variant="outline">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border border-border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="rounded-r-none"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 border-x border-border min-w-[3rem] text-center">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-l-none"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="nature"
                size="lg"
                disabled={!plant.inStock}
                className="flex-1"
                onClick={() => addToCart(plant, quantity)}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - ₹{plant.price * quantity}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={isWishlisted ? 'text-red-500 border-red-200' : ''}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </Button>
              
              <Button variant="outline" size="lg">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {!plant.inStock && (
              <p className="text-destructive font-medium">
                This plant is currently out of stock. We'll notify you when it's available again.
              </p>
            )}
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 gap-4 pt-6 border-t border-border">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex items-start gap-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{benefit.title}</h4>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Information Tabs */}
      <div className="mb-16">
        <Tabs defaultValue="care" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="care">Care Instructions</TabsTrigger>
            <TabsTrigger value="features">Features & Benefits</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({plant.reviews})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="care" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Plant Care Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {plant.careTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground">{tip}</p>
                    </div>
                  ))}
                </div>
                <Separator className="my-6" />
                <p className="text-muted-foreground">
                  Need more help? Contact our plant experts via WhatsApp at +91 07719890777 
                  for personalized care advice.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="features" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Why Choose This Plant?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {plant.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Leaf className="w-5 h-5 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Reviews feature coming soon! This plant has {plant.reviews} verified reviews 
                    with an average rating of {plant.rating} stars.
                  </p>
                  <Button variant="outline">
                    Write a Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Plants */}
      {relatedPlants.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPlants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onAddToCart={(plant) => console.log('Add to cart:', plant)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantDetailPage;