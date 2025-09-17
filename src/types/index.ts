export interface Plant {
  id: string;
  name: string;
  category: 'indoor' | 'outdoor' | 'exotic';
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  careTips: string[];
  features: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem {
  plant: Plant;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  orderDate: Date;
  estimatedDelivery: Date;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  orders: Order[];
  joinDate: Date;
}