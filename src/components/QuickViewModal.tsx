import React, { useState } from 'react';
import { Star, X, ShoppingCart, Minus, Plus, Heart } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plant } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

interface QuickViewModalProps {
  plant: Plant | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ plant, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();

  if (!plant) return null;

  const isAdmin = user?.role === 'admin';
  const discountPercentage = plant.originalPrice 
    ? Math.round(((plant.originalPrice - plant.price) / plant.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(plant, quantity);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            {discountPercentage > 0 && (
              <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                {discountPercentage}% OFF
              </Badge>
            )}
            {!plant.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                <Badge variant="destructive" className="text-lg px-6 py-2">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <div>
              <Badge variant="secondary" className="mb-2">
                {plant.category.charAt(0).toUpperCase() + plant.category.slice(1)} Plant
              </Badge>
              <h2 className="text-2xl font-bold mb-2">{plant.name}</h2>
              
              <div className="flex items-center gap-2 mb-3">
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
                <span className="text-sm text-muted-foreground">
                  {plant.rating} ({plant.reviews} reviews)
                </span>
              </div>

              <p className="text-muted-foreground mb-4">
                {plant.description}
              </p>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-bold text-primary">₹{plant.price}</span>
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

              <div className="flex flex-wrap gap-2 mb-4">
                {plant.features.map((feature) => (
                  <Badge key={feature} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Quantity and Actions */}
            {!isAdmin && (
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

                <div className="flex gap-2">
                  <Button
                    variant="nature"
                    size="lg"
                    disabled={!plant.inStock}
                    className="flex-1"
                    onClick={handleAddToCart}
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
                </div>
              </div>
            )}

            {/* Care Tips Preview */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Quick Care Tips:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {plant.careTips.slice(0, 3).map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;