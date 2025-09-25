import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import PlantCard from '@/components/PlantCard';
import { plants, categories } from '@/data/plants';
import { Plant } from '@/types';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);

  const categoryData = categories.find(cat => cat.id === category);
  const categoryPlants = plants.filter(plant => plant.category === category);

  const priceRanges = [
    { id: '0-500', label: 'Under ₹500', min: 0, max: 500 },
    { id: '500-1000', label: '₹500 - ₹1000', min: 500, max: 1000 },
    { id: '1000-1500', label: '₹1000 - ₹1500', min: 1000, max: 1500 },
    { id: '1500+', label: 'Above ₹1500', min: 1500, max: Infinity },
  ];

  const availableFeatures = Array.from(
    new Set(categoryPlants.flatMap(plant => plant.features))
  );

  const filteredPlants = categoryPlants.filter(plant => {
    const priceMatch = priceRange.length === 0 || priceRange.some(range => {
      const rangeData = priceRanges.find(r => r.id === range);
      return rangeData && plant.price >= rangeData.min && plant.price <= rangeData.max;
    });

    const featureMatch = features.length === 0 || 
      features.some(feature => plant.features.includes(feature));

    return priceMatch && featureMatch;
  });

  const sortedPlants = [...filteredPlants].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const togglePriceRange = (rangeId: string) => {
    setPriceRange(prev => 
      prev.includes(rangeId) 
        ? prev.filter(id => id !== rangeId)
        : [...prev, rangeId]
    );
  };

  const toggleFeature = (feature: string) => {
    setFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  if (!categoryData) {
    return <div className="container mx-auto px-4 py-8">Category not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary">Home</Badge>
          <span className="text-muted-foreground">/</span>
          <Badge>{categoryData.name}</Badge>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          {categoryData.name}
        </h1>
        <p className="text-muted-foreground text-lg mb-6">
          {categoryData.description}
        </p>
        
        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="text-muted-foreground">
            Showing {sortedPlants.length} of {categoryPlants.length} plants
          </p>
          
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex border border-border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Price Range Filter */}
              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <div key={range.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={range.id}
                        checked={priceRange.includes(range.id)}
                        onCheckedChange={() => togglePriceRange(range.id)}
                      />
                      <Label htmlFor={range.id} className="text-sm">
                        {range.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Filter */}
              <div>
                <h3 className="font-semibold mb-3">Features</h3>
                <div className="space-y-2">
                  {availableFeatures.slice(0, 6).map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature}
                        checked={features.includes(feature)}
                        onCheckedChange={() => toggleFeature(feature)}
                      />
                      <Label htmlFor={feature} className="text-sm">
                        {feature}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(priceRange.length > 0 || features.length > 0) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setPriceRange([]);
                    setFeatures([]);
                  }}
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {sortedPlants.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <h3 className="text-xl font-semibold mb-2">No plants found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters to see more results.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setPriceRange([]);
                    setFeatures([]);
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {sortedPlants.map((plant) => (
                <PlantCard
                  key={plant.id}
                  plant={plant}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;