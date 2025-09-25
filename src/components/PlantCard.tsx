import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Plant } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import QuickViewModal from './QuickViewModal';

interface PlantCardProps {
  plant: Plant;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const discountPercentage = plant.originalPrice 
    ? Math.round(((plant.originalPrice - plant.price) / plant.originalPrice) * 100)
    : 0;

  return (
    <Card className="group overflow-hidden border-border hover:shadow-nature transition-all duration-300 hover:-translate-y-1 bg-gradient-card">
      <div className="relative overflow-hidden">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {discountPercentage > 0 && (
          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
            {discountPercentage}% OFF
          </Badge>
        )}
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/80 hover:bg-background"
            onClick={(e) => {
              e.preventDefault();
              setShowQuickView(true);
            }}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/80 hover:bg-background"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>
        {!plant.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive">Out of Stock</Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs">
            {plant.category.charAt(0).toUpperCase() + plant.category.slice(1)}
          </Badge>
        </div>
        
        <Link to={`/plant/${plant.id}`} className="block">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
            {plant.name}
          </h3>
        </Link>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {plant.description}
        </p>

        <div className="flex items-center mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(plant.rating)
                    ? 'text-accent fill-accent'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground ml-2">
            {plant.rating} ({plant.reviews})
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-primary">
            ₹{plant.price}
          </span>
          {plant.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{plant.originalPrice}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {plant.features.slice(0, 2).map((feature) => (
            <Badge key={feature} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Link to={`/plant/${plant.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
          {!isAdmin && (
            <Button
              variant="nature"
              onClick={() => addToCart(plant)}
              disabled={!plant.inStock}
              className="flex-1"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          )}
        </div>
      </CardFooter>
      
      <QuickViewModal
        plant={plant}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </Card>
  );
};

export default PlantCard;