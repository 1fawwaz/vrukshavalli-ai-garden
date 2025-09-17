import { Plant } from '@/types';
import indoorPlantsImg from '@/assets/indoor-plants.jpg';
import outdoorPlantsImg from '@/assets/outdoor-plants.jpg';
import exoticPlantsImg from '@/assets/exotic-plants.jpg';

export const plants: Plant[] = [
  // Indoor Plants
  {
    id: '1',
    name: 'Monstera Deliciosa',
    category: 'indoor',
    price: 899,
    originalPrice: 1199,
    image: indoorPlantsImg,
    description: 'The stunning Swiss Cheese Plant with beautiful fenestrated leaves that will transform any indoor space.',
    careTips: [
      'Bright, indirect sunlight',
      'Water when top inch of soil is dry',
      'Humidity 60-70%',
      'Temperature 18-27°C'
    ],
    features: ['Air purifying', 'Easy care', 'Fast growing', 'Instagram worthy'],
    inStock: true,
    rating: 4.8,
    reviews: 234
  },
  {
    id: '2',
    name: 'Fiddle Leaf Fig',
    category: 'indoor',
    price: 1299,
    image: indoorPlantsImg,
    description: 'Large, glossy violin-shaped leaves make this the perfect statement plant for modern homes.',
    careTips: [
      'Bright, indirect light',
      'Water weekly in summer',
      'Wipe leaves regularly',
      'Avoid cold drafts'
    ],
    features: ['Statement piece', 'Large leaves', 'Designer favorite', 'Instagram worthy'],
    inStock: true,
    rating: 4.6,
    reviews: 189
  },
  {
    id: '3',
    name: 'Snake Plant',
    category: 'indoor',
    price: 599,
    image: indoorPlantsImg,
    description: 'The ultimate low-maintenance plant that thrives in any condition and purifies air efficiently.',
    careTips: [
      'Low to bright indirect light',
      'Water every 2-3 weeks',
      'Very drought tolerant',
      'Perfect for beginners'
    ],
    features: ['Nearly indestructible', 'Air purifying', 'Low light tolerant', 'Beginner friendly'],
    inStock: true,
    rating: 4.9,
    reviews: 567
  },
  // Outdoor Plants
  {
    id: '4',
    name: 'Hibiscus Rosa-Sinensis',
    category: 'outdoor',
    price: 799,
    image: outdoorPlantsImg,
    description: 'Vibrant flowering shrub that brings tropical beauty to your garden with continuous blooms.',
    careTips: [
      'Full sun to partial shade',
      'Water daily in summer',
      'Regular pruning needed',
      'Feed monthly'
    ],
    features: ['Continuous blooms', 'Attracts butterflies', 'Heat tolerant', 'Colorful flowers'],
    inStock: true,
    rating: 4.7,
    reviews: 156
  },
  {
    id: '5',
    name: 'Bougainvillea',
    category: 'outdoor',
    price: 699,
    image: outdoorPlantsImg,
    description: 'Stunning flowering vine with papery bracts in brilliant colors that cascade beautifully.',
    careTips: [
      'Full sun required',
      'Drought tolerant once established',
      'Prune after flowering',
      'Support with trellis'
    ],
    features: ['Drought tolerant', 'Colorful bracts', 'Climbing vine', 'Long blooming'],
    inStock: true,
    rating: 4.5,
    reviews: 203
  },
  // Exotic Plants
  {
    id: '6',
    name: 'Bird of Paradise',
    category: 'exotic',
    price: 1899,
    originalPrice: 2299,
    image: exoticPlantsImg,
    description: 'Majestic tropical plant with striking orange and blue flowers that resemble exotic birds.',
    careTips: [
      'Bright indirect to partial direct sun',
      'High humidity required',
      'Water when soil starts to dry',
      'Regular misting'
    ],
    features: ['Exotic flowers', 'Dramatic foliage', 'Conversation starter', 'Premium quality'],
    inStock: true,
    rating: 4.8,
    reviews: 89
  },
  {
    id: '7',
    name: 'Orchid Collection',
    category: 'exotic',
    price: 1499,
    image: exoticPlantsImg,
    description: 'Curated collection of premium orchids featuring Phalaenopsis and Dendrobium varieties.',
    careTips: [
      'Filtered bright light',
      'Special orchid bark medium',
      'Water with ice cubes weekly',
      'High humidity environment'
    ],
    features: ['Premium varieties', 'Long-lasting blooms', 'Gift worthy', 'Care guide included'],
    inStock: true,
    rating: 4.6,
    reviews: 124
  },
  {
    id: '8',
    name: 'Carnivorous Plant Set',
    category: 'exotic',
    price: 1299,
    image: exoticPlantsImg,
    description: 'Fascinating collection including Venus Flytraps, Pitcher Plants, and Sundews.',
    careTips: [
      'Bright indirect light',
      'Use distilled water only',
      'High humidity required',
      'No fertilizer needed'
    ],
    features: ['Unique specimens', 'Educational', 'Natural pest control', 'Conversation piece'],
    inStock: true,
    rating: 4.4,
    reviews: 78
  }
];

export const categories = [
  {
    id: 'indoor',
    name: 'Indoor Plants',
    description: 'Perfect companions for your home and office',
    image: indoorPlantsImg,
    count: plants.filter(p => p.category === 'indoor').length
  },
  {
    id: 'outdoor',
    name: 'Outdoor Plants',
    description: 'Beautiful additions to your garden and patio',
    image: outdoorPlantsImg,
    count: plants.filter(p => p.category === 'outdoor').length
  },
  {
    id: 'exotic',
    name: 'Exotic Plants',
    description: 'Rare and unique specimens for plant enthusiasts',
    image: exoticPlantsImg,
    count: plants.filter(p => p.category === 'exotic').length
  }
];