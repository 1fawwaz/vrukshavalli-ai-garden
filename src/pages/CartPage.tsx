import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { plants } from '@/data/plants';

const CartPage: React.FC = () => {
  // Mock cart data - in a real app this would come from context/state management
  const [cartItems, setCartItems] = useState([
    { plant: plants[0], quantity: 2 },
    { plant: plants[2], quantity: 1 },
  ]);

  const updateQuantity = (plantId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(plantId);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.plant.id === plantId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeItem = (plantId: string) => {
    setCartItems(prev => prev.filter(item => item.plant.id !== plantId));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.plant.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 100;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingCart className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-muted-foreground mb-6">
            Add some beautiful plants to get started with your green journey!
          </p>
          <Button variant="nature" size="lg" asChild>
            <Link to="/">
              Start Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <Badge variant="secondary">{cartItems.length} items</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.plant.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                    <img
                      src={item.plant.image}
                      alt={item.plant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{item.plant.name}</h3>
                        <p className="text-muted-foreground text-sm">
                          {item.plant.category.charAt(0).toUpperCase() + item.plant.category.slice(1)} Plant
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.plant.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">₹{item.plant.price}</span>
                        <div className="flex items-center border border-border rounded-md">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.plant.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="px-3 py-1 text-sm min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.plant.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold">₹{item.plant.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-600' : ''}>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax (18% GST)</span>
                <span>₹{tax.toFixed(0)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{total.toFixed(0)}</span>
              </div>
              
              {shipping > 0 && (
                <p className="text-sm text-muted-foreground">
                  Add ₹{1000 - subtotal} more for free shipping!
                </p>
              )}
            </CardContent>
            
            <CardFooter className="flex-col gap-4">
              <Button variant="nature" size="lg" className="w-full">
                Proceed to Checkout
              </Button>
              <Button variant="outline" className="w-full">
                Apply Coupon Code
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;