import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface NavigationProps {
  cartItems?: number;
}

const Navigation: React.FC<NavigationProps> = ({ cartItems = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Indoor Plants', path: '/category/indoor' },
    { name: 'Outdoor Plants', path: '/category/outdoor' },
    { name: 'Exotic Plants', path: '/category/exotic' },
    { name: 'Care Guide', path: '/care-guide' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="hidden md:flex items-center justify-between py-2 text-sm text-muted-foreground border-b border-border">
          <div className="flex items-center gap-6">
            <span>📞 +91 98765 43210</span>
            <span>📍 Ratnagiri, Maharashtra</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Follow us:</span>
            <Link to="#" className="hover:text-primary transition-colors">
              @Vrukshavalli_Ratnagiri
            </Link>
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Vrukshavalli</h1>
              <p className="text-xs text-muted-foreground">Passionate Gardeners</p>
            </div>
          </Link>

          {/* Search bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search plants..."
                className="pl-10 bg-muted/50 border-border"
              />
            </div>
          </div>

          {/* Navigation items - Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                  isActive(item.path)
                    ? 'bg-accent text-accent-foreground'
                    : 'text-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <User className="w-4 h-4 mr-2" />
              Account
            </Button>
            
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart
              {cartItems > 0 && (
                <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs bg-accent text-accent-foreground">
                  {cartItems}
                </Badge>
              )}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border py-4 space-y-2">
            {/* Mobile search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search plants..."
                className="pl-10 bg-muted/50 border-border"
              />
            </div>

            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                  isActive(item.path)
                    ? 'bg-accent text-accent-foreground'
                    : 'text-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-border">
              <Link
                to="/account"
                className="block px-4 py-3 rounded-md text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                My Account
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;