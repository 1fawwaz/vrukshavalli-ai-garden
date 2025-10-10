import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const CheckoutPage: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState(profile?.full_name || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const subtotal = getTotalPrice();
  const shipping = subtotal > 1000 ? 0 : 100;
  const tax = subtotal * 0.18;
  const total = useMemo(() => subtotal + shipping + tax, [subtotal, shipping, tax]);

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      toast({ title: 'Missing details', description: 'Please fill name, phone and address.', variant: 'destructive' });
      return;
    }
    if (items.length === 0) {
      toast({ title: 'Cart is empty', description: 'Add items before checkout.', variant: 'destructive' });
      return;
    }

    if (!user) {
      toast({ title: 'Please log in', description: 'You need to be logged in to place an order.', variant: 'destructive' });
      navigate('/auth');
      return;
    }

    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      // Create order in database
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: Math.round(total),
          status: 'pending',
          shipping_name: name,
          shipping_phone: phone,
          shipping_email: user.email || '',
          shipping_address: address,
          shipping_city: address.split(',')[0] || '',
          shipping_state: 'Maharashtra',
          shipping_pincode: '415612',
          payment_method: 'COD'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: orderData.id,
        plant_id: item.plant.id,
        quantity: item.quantity,
        price_at_time: item.plant.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Send confirmation email
      await supabase.functions.invoke('send-order-email', {
        body: {
          to: user.email,
          orderId: orderData.id.substring(0, 8),
          type: 'confirmation',
          customerName: name,
          items: items.map(item => ({
            name: item.plant.name,
            quantity: item.quantity,
            price: item.plant.price
          })),
          total: Math.round(total),
          shippingAddress: `${name}\n${address}\n${phone}`
        }
      });

      clearCart();
      toast({ 
        title: 'Yay! Order placed! 🌱', 
        description: `Your order ${orderData.id.substring(0, 8)} is confirmed. Check your email!` 
      });
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Order error:', err);
      toast({ 
        title: 'Oops—our plant got shy', 
        description: 'Could not place order. Try again in a moment.', 
        variant: 'destructive' 
      });
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Button asChild>
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/cart">← Back to Cart</Link>
        </Button>
        <h1 className="text-3xl font-bold">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={placeOrder}>
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="07719890777" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <Textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={3} placeholder="House no, street, area, city, pincode" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Notes (optional)</label>
                  <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="Any specific instructions for delivery" />
                </div>
                <Button type="submit" variant="nature" className="w-full">Place Order (COD)</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.plant.id} className="flex justify-between text-sm">
                  <span>{item.plant.name} × {item.quantity}</span>
                  <span>₹{item.plant.price * item.quantity}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (18% GST)</span>
                <span>₹{Math.round(tax)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{Math.round(total)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
