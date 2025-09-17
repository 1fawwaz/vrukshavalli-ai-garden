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
      'Place in bright, indirect sunlight near east or west-facing windows',
      'Water when top 1-2 inches of soil feels dry (usually weekly)',
      'Maintain humidity levels between 60-70% using a humidifier or pebble tray',
      'Keep temperature between 18-27°C for optimal growth',
      'Provide moss pole or trellis for aerial roots to climb',
      'Feed with balanced liquid fertilizer monthly during growing season'
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
      'Position in bright, indirect light - avoid harsh direct sunlight',
      'Water weekly in summer, less frequently in winter',
      'Wipe leaves weekly with damp cloth to remove dust and improve photosynthesis',
      'Keep away from cold drafts, air conditioners, and heating vents',
      'Rotate plant weekly for even growth',
      'Use well-draining potting mix and ensure proper drainage'
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
      'Tolerates low to bright indirect light - perfect for any room',
      'Water sparingly every 2-3 weeks, allowing soil to dry completely',
      'Extremely drought tolerant - overwatering is the main cause of problems',
      'Perfect for beginners and frequent travelers',
      'Can survive in temperatures from 15-29°C',
      'Rarely needs repotting - only when severely rootbound'
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
      'Plant in location receiving 6+ hours of direct sunlight daily',
      'Water daily during summer, especially in hot weather',
      'Prune regularly to encourage bushy growth and more flowers',
      'Feed with phosphorus-rich fertilizer monthly for better blooms',
      'Protect from strong winds which can damage delicate flowers',
      'Mulch around base to retain moisture and regulate soil temperature'
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
      'Requires full sun (6+ hours) for best flowering and growth',
      'Once established, very drought tolerant - avoid overwatering',
      'Prune after flowering season to maintain shape and size',
      'Provide sturdy trellis, fence, or wall support for climbing',
      'Pinch growing tips to encourage bushier growth',
      'Protect from frost in winter months'
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
      'Provide bright indirect to partial direct sunlight for 4-6 hours',
      'Maintain high humidity (50-60%) with regular misting or humidifier',
      'Water when top inch of soil starts to dry - keep consistently moist',
      'Mist leaves regularly to increase humidity and clean foliage',
      'Use well-draining, organic-rich potting mix',
      'Flowering requires plant maturity (3-5 years) and optimal conditions'
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
      'Place in bright, filtered light - never direct sunlight',
      'Use specialized orchid bark medium for proper drainage',
      'Water with 2-3 ice cubes weekly or lukewarm water sparingly',
      'Maintain high humidity environment (40-70%)',
      'Ensure good air circulation around plants',
      'Fertilize monthly with diluted orchid fertilizer during growing season'
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
      'Provide bright indirect light or use grow lights for 12-14 hours',
      'Use only distilled, rainwater, or reverse osmosis water',
      'Maintain high humidity (50-80%) with humidity domes or terrariums',
      'Never fertilize - they get nutrients from insects they catch',
      'Keep soil consistently moist but not waterlogged',
      'Allow 2-3 month winter dormancy period for temperate species'
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