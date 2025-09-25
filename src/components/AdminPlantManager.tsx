import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plant } from '@/types';
import { plants as initialPlants } from '@/data/plants';

const AdminPlantManager: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>(initialPlants);
  const [editingPlant, setEditingPlant] = useState<Plant | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    category: 'indoor' as 'indoor' | 'outdoor' | 'exotic',
    price: 0,
    originalPrice: 0,
    description: '',
    image: '',
    features: [] as string[],
    careTips: [] as string[],
    inStock: true,
    rating: 4.5,
    reviews: 0
  });

  useEffect(() => {
    // Load plants from localStorage if available
    const savedPlants = localStorage.getItem('vrukshavalli_plants');
    if (savedPlants) {
      setPlants(JSON.parse(savedPlants));
    }
  }, []);

  const savePlantsToStorage = (updatedPlants: Plant[]) => {
    localStorage.setItem('vrukshavalli_plants', JSON.stringify(updatedPlants));
    setPlants(updatedPlants);
  };

  const openDialog = (plant?: Plant) => {
    if (plant) {
      setEditingPlant(plant);
      setFormData({
        name: plant.name,
        category: plant.category,
        price: plant.price,
        originalPrice: plant.originalPrice || 0,
        description: plant.description,
        image: plant.image,
        features: plant.features,
        careTips: plant.careTips,
        inStock: plant.inStock,
        rating: plant.rating,
        reviews: plant.reviews
      });
    } else {
      setEditingPlant(null);
      setFormData({
        name: '',
        category: 'indoor',
        price: 0,
        originalPrice: 0,
        description: '',
        image: '',
        features: [],
        careTips: [],
        inStock: true,
        rating: 4.5,
        reviews: 0
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.description || formData.price <= 0) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call

      const plantData: Plant = {
        id: editingPlant?.id || `plant_${Date.now()}`,
        name: formData.name,
        category: formData.category,
        price: formData.price,
        originalPrice: formData.originalPrice > 0 ? formData.originalPrice : undefined,
        description: formData.description,
        image: formData.image || `/assets/${formData.category}-plants.jpg`,
        features: formData.features,
        careTips: formData.careTips,
        inStock: formData.inStock,
        rating: formData.rating,
        reviews: formData.reviews
      };

      let updatedPlants: Plant[];
      if (editingPlant) {
        updatedPlants = plants.map(p => p.id === editingPlant.id ? plantData : p);
        toast({
          title: 'Plant Updated',
          description: `${plantData.name} has been updated successfully`
        });
      } else {
        updatedPlants = [...plants, plantData];
        toast({
          title: 'Plant Added',
          description: `${plantData.name} has been added to the inventory`
        });
      }

      savePlantsToStorage(updatedPlants);
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save plant. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (plantId: string) => {
    if (!confirm('Are you sure you want to delete this plant?')) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const updatedPlants = plants.filter(p => p.id !== plantId);
      savePlantsToStorage(updatedPlants);
      
      toast({
        title: 'Plant Deleted',
        description: 'Plant has been removed from inventory'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete plant',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleArrayInput = (value: string, field: 'features' | 'careTips') => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, [field]: items }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Plant Inventory Management</h2>
        <Button variant="nature" onClick={() => openDialog()}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Plant
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left p-4 font-semibold">Plant</th>
                  <th className="text-left p-4 font-semibold">Category</th>
                  <th className="text-left p-4 font-semibold">Price</th>
                  <th className="text-left p-4 font-semibold">Stock</th>
                  <th className="text-left p-4 font-semibold">Rating</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {plants.map((plant) => (
                  <tr key={plant.id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
                          <img
                            src={plant.image}
                            alt={plant.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold">{plant.name}</p>
                          <p className="text-sm text-muted-foreground">#{plant.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="secondary">
                        {plant.category.charAt(0).toUpperCase() + plant.category.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div>
                        <span className="font-semibold">₹{plant.price}</span>
                        {plant.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            ₹{plant.originalPrice}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={plant.inStock ? 'default' : 'destructive'}>
                        {plant.inStock ? 'In Stock' : 'Out of Stock'}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <span className="text-sm">{plant.rating}</span>
                        <span className="text-muted-foreground text-sm">({plant.reviews})</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openDialog(plant)}
                          disabled={isLoading}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(plant.id)}
                          disabled={isLoading}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Plant Editor Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPlant ? 'Edit Plant' : 'Add New Plant'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Plant Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Fiddle Leaf Fig"
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value: 'indoor' | 'outdoor' | 'exotic') => 
                    setFormData(prev => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indoor">Indoor</SelectItem>
                    <SelectItem value="outdoor">Outdoor</SelectItem>
                    <SelectItem value="exotic">Exotic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                />
              </div>
              
              <div>
                <Label htmlFor="originalPrice">Original Price (₹)</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the plant..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <Label htmlFor="features">Features (comma-separated)</Label>
              <Input
                id="features"
                value={formData.features.join(', ')}
                onChange={(e) => handleArrayInput(e.target.value, 'features')}
                placeholder="Air purifying, Low maintenance, Pet friendly"
              />
            </div>

            <div>
              <Label htmlFor="careTips">Care Tips (comma-separated)</Label>
              <Textarea
                id="careTips"
                value={formData.careTips.join(', ')}
                onChange={(e) => handleArrayInput(e.target.value, 'careTips')}
                placeholder="Water weekly, Bright indirect light, Well-draining soil"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="inStock"
                  checked={formData.inStock}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, inStock: checked }))}
                />
                <Label htmlFor="inStock">In Stock</Label>
              </div>
              
              <div>
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) || 0 }))}
                />
              </div>
              
              <div>
                <Label htmlFor="reviews">Reviews Count</Label>
                <Input
                  id="reviews"
                  type="number"
                  value={formData.reviews}
                  onChange={(e) => setFormData(prev => ({ ...prev, reviews: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="nature" onClick={handleSave} disabled={isLoading}>
                {isLoading ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {editingPlant ? 'Update Plant' : 'Add Plant'}
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPlantManager;