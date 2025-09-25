import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { plants } from '@/data/plants';
import { Plant } from '@/types';
import { Link } from 'react-router-dom';

interface ProductSearchProps {
  onClose?: () => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Plant[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (query.trim().length > 2) {
      const filtered = plants.filter(plant =>
        plant.name.toLowerCase().includes(query.toLowerCase()) ||
        plant.description.toLowerCase().includes(query.toLowerCase()) ||
        plant.category.toLowerCase().includes(query.toLowerCase()) ||
        plant.features.some(feature => feature.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 5);
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleClose = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    onClose?.();
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search plants..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 bg-background"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
            onClick={() => setQuery('')}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs text-muted-foreground mb-2 px-2">
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </div>
            {results.map((plant) => (
              <Link
                key={plant.id}
                to={`/plant/${plant.id}`}
                className="flex items-center gap-3 p-2 hover:bg-muted rounded-md transition-colors"
                onClick={handleClose}
              >
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{plant.name}</div>
                  <div className="text-sm text-muted-foreground truncate">
                    {plant.description}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {plant.category}
                    </Badge>
                    <span className="font-semibold text-primary">₹{plant.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSearch;