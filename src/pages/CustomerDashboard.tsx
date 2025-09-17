import React, { useState } from 'react';
import { User, Package, Heart, Settings, LogOut, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const CustomerDashboard: React.FC = () => {
  // Mock customer data
  const customer = {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 98765 43210',
    address: '123, Green Valley, Ratnagiri, Maharashtra - 415612',
    joinDate: new Date('2023-01-15'),
    totalOrders: 12,
    totalSpent: 15699,
  };

  const orders = [
    {
      id: 'ORD001',
      date: new Date('2024-01-15'),
      status: 'delivered' as const,
      total: 1299,
      items: ['Monstera Deliciosa', 'Snake Plant'],
      estimatedDelivery: new Date('2024-01-18'),
    },
    {
      id: 'ORD002',
      date: new Date('2024-01-10'),
      status: 'shipped' as const,
      total: 599,
      items: ['Fiddle Leaf Fig'],
      estimatedDelivery: new Date('2024-01-17'),
    },
    {
      id: 'ORD003',
      date: new Date('2024-01-05'),
      status: 'processing' as const,
      total: 899,
      items: ['Bird of Paradise', 'Orchid Collection'],
      estimatedDelivery: new Date('2024-01-20'),
    },
  ];

  const wishlist = [
    { id: '1', name: 'Rubber Tree', price: 799, image: '/placeholder.svg' },
    { id: '2', name: 'Peace Lily', price: 599, image: '/placeholder.svg' },
    { id: '3', name: 'Bamboo Plant', price: 399, image: '/placeholder.svg' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Account</h1>
        <p className="text-muted-foreground">Manage your orders, wishlist, and account settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">{customer.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Member since {customer.joinDate.getFullYear()}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{customer.totalOrders}</div>
                  <div className="text-sm text-muted-foreground">Total Orders</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">₹{customer.totalSpent}</div>
                  <div className="text-sm text-muted-foreground">Total Spent</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Order History</h2>
                <Badge variant="secondary">{orders.length} orders</Badge>
              </div>

              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold">Order #{order.id}</h3>
                          <p className="text-sm text-muted-foreground">
                            Placed on {order.date.toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium mb-2">Items</h4>
                          <ul className="text-sm text-muted-foreground">
                            {order.items.map((item, index) => (
                              <li key={index}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Total</h4>
                          <p className="text-lg font-semibold">₹{order.total}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Delivery</h4>
                          <p className="text-sm text-muted-foreground">
                            Expected: {order.estimatedDelivery.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Track Order</Button>
                        <Button variant="outline" size="sm">Download Invoice</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">My Wishlist</h2>
                <Badge variant="secondary">{wishlist.length} items</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlist.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-semibold mb-2">{item.name}</h3>
                      <p className="text-lg font-semibold text-primary mb-3">₹{item.price}</p>
                      <div className="flex gap-2">
                        <Button variant="nature" size="sm" className="flex-1">
                          Add to Cart
                        </Button>
                        <Button variant="outline" size="sm">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <h2 className="text-xl font-semibold">Profile Settings</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={customer.name} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={customer.email} />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue={customer.phone} />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" defaultValue={customer.address} />
                  </div>
                  
                  <Button variant="nature">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Feedback Tab */}
            <TabsContent value="feedback" className="space-y-6">
              <h2 className="text-xl font-semibold">Share Your Feedback</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle>How was your experience?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Rate your overall experience</Label>
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Button
                          key={star}
                          variant="ghost"
                          size="sm"
                          className="p-0 w-8 h-8"
                        >
                          <Star className="w-5 h-5 text-accent fill-accent" />
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="feedback">Your Feedback</Label>
                    <Textarea
                      id="feedback"
                      placeholder="Tell us about your experience with Vrukshavalli..."
                      rows={4}
                    />
                  </div>
                  
                  <Button variant="nature">Submit Feedback</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;