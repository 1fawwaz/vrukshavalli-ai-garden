import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="container mx-auto px-4 py-16 text-center">
        <Card className="max-w-lg mx-auto">
          <CardContent className="p-12">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-6xl font-bold text-muted-foreground mb-2">404</h1>
              <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
              <p className="text-muted-foreground mb-8">
                Oops! The page you're looking for seems to have grown somewhere else. 
                Let's get you back to our beautiful plant collection.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="nature" asChild>
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/category/indoor">
                  <Search className="w-4 h-4 mr-2" />
                  Browse Plants
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
