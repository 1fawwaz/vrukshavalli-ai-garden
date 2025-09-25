import React, { useState } from 'react';
import { Plus, Edit, Trash2, Package, Users, TrendingUp, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminPlantManager from '@/components/AdminPlantManager';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null);

  // Mock admin data
  const stats = [
    { title: 'Total Plants', value: '500+', icon: Package, color: 'text-blue-600' },
    { title: 'Total Orders', value: '1,234', icon: TrendingUp, color: 'text-green-600' },
    { title: 'Total Customers', value: '856', icon: Users, color: 'text-purple-600' },
    { title: 'Revenue (Month)', value: '₹1,25,000', icon: TrendingUp, color: 'text-orange-600' },
  ];

  const recentOrders = [
    {
      id: 'ORD001',
      customer: 'Priya Sharma',
      items: 2,
      total: 1299,
      status: 'pending',
      date: '2024-01-15'
    },
    {
      id: 'ORD002',
      customer: 'Raj Patel',
      items: 1,
      total: 599,
      status: 'shipped',
      date: '2024-01-14'
    },
    {
      id: 'ORD003',
      customer: 'Anita Kumar',
      items: 3,
      total: 1899,
      status: 'delivered',
      date: '2024-01-13'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Admin Header */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, Admin</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/">
                  <Eye className="w-4 h-4 mr-2" />
                  View Site
                </Link>
              </Button>
              <Button variant="nature" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Plant
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="plants" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="plants">Manage Plants</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Plants Management */}
          <TabsContent value="plants" className="space-y-6">
            <AdminPlantManager />
          </TabsContent>

          {/* Orders Management */}
          <TabsContent value="orders" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Recent Orders</h2>
              <Select defaultValue="all">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold">Order #{order.id}</h3>
                        <p className="text-sm text-muted-foreground">
                          Customer: {order.customer}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Date: {order.date}
                        </p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">{order.items} items</p>
                        <p className="font-semibold">₹{order.total}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Select defaultValue={order.status}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <h2 className="text-xl font-semibold">Customer Management</h2>
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Customer Management</h3>
                <p className="text-muted-foreground">
                  Advanced customer management features coming soon. Track customer activity, 
                  manage support tickets, and view detailed analytics.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-xl font-semibold">Sales Analytics</h2>
            <Card>
              <CardContent className="p-8 text-center">
                <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
                <p className="text-muted-foreground">
                  Comprehensive analytics and reporting features coming soon. Track sales performance, 
                  popular products, customer behavior, and revenue trends.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;