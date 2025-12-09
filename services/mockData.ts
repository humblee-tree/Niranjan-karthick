import { Product, CultivationBatch, User, UserRole, Order, Address } from '../types';

export const MOCK_ADDRESSES: Address[] = [
  {
    id: 'addr_1',
    userId: 'u1',
    fullName: 'Nanda Kumar',
    phone: '9360439995',
    addressLine1: 'No. 21, Anna Salai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600001',
    isDefault: true
  },
  {
    id: 'addr_2',
    userId: 'u3',
    fullName: 'John Customer',
    phone: '9876543210',
    addressLine1: 'Flat 4B, Green Valley Apts',
    addressLine2: 'OMR Road',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600097',
    isDefault: true
  }
];

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Nanda Kumar',
    email: 'nkps192365068@gmail.com',
    role: UserRole.FARMER,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nanda',
    isVerified: true,
    addresses: [MOCK_ADDRESSES[0]]
  },
  {
    id: 'u2',
    name: 'Admin User',
    email: 'admin@humbleetrees.in',
    role: UserRole.ADMIN,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
  },
  {
    id: 'u3',
    name: 'John Doe',
    email: 'john@example.com',
    role: UserRole.CUSTOMER,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    addresses: [MOCK_ADDRESSES[1]]
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Oyster Mushroom Grow Kit',
    category: 'Grow Kits',
    price: 499,
    oldPrice: 699,
    rating: 4.5,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1621815180436-7cb521919011?auto=format&fit=crop&q=80&w=400',
    description: 'Start growing your own delicious Oyster mushrooms at home with our easy-to-use kit. Harvest in just 10 days!',
    stock: 50,
    sellerId: 'u1',
    sellerName: 'Nanda Kumar',
    isApproved: true
  },
  {
    id: '2',
    name: 'Dried Shiitake Mushrooms (250g)',
    category: 'Dried Mushrooms',
    price: 350,
    oldPrice: 450,
    rating: 4.8,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1632204566418-5006b5278c7c?auto=format&fit=crop&q=80&w=400',
    description: 'Sun-dried premium Shiitake mushrooms rich in umami flavor. Perfect for soups and stir-frys.',
    stock: 200,
    sellerId: 'u1',
    sellerName: 'Nanda Kumar',
    isApproved: true
  },
  {
    id: '3',
    name: 'Lion\'s Mane Extract Powder',
    category: 'Supplements',
    price: 1200,
    oldPrice: 1500,
    rating: 4.9,
    reviews: 342,
    image: 'https://images.unsplash.com/photo-1615485925763-867862780c10?auto=format&fit=crop&q=80&w=400',
    description: 'Cognitive support supplement made from 100% organic Lion\'s Mane fruiting bodies.',
    stock: 30,
    sellerId: 'u2',
    sellerName: 'HumbleeTrees Official',
    isApproved: true
  },
  {
    id: '4',
    name: 'Fresh Button Mushrooms (500g)',
    category: 'Fresh Produce',
    price: 120,
    rating: 4.2,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1595125348398-75c1a7c569a4?auto=format&fit=crop&q=80&w=400',
    description: 'Farm fresh white button mushrooms, delivered daily from local partners.',
    stock: 0,
    sellerId: 'u1',
    sellerName: 'Nanda Kumar',
    isApproved: true
  },
  {
    id: '5',
    name: 'Reishi Mushroom Tea Bags',
    category: 'Beverages',
    price: 299,
    rating: 4.6,
    reviews: 45,
    image: 'https://images.unsplash.com/photo-1596541655077-d60232490b79?auto=format&fit=crop&q=80&w=400',
    description: 'Calming Reishi mushroom tea blend for better sleep and immunity.',
    stock: 100,
    sellerId: 'u1',
    sellerName: 'Nanda Kumar',
    isApproved: true
  }
];

const generateReadings = (baseTemp: number, baseHum: number, baseCo2: number) => {
  return Array.from({ length: 24 }, (_, i) => ({
    timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
    temperature: baseTemp + Math.sin(i / 3) * 2 + (Math.random() - 0.5),
    humidity: baseHum + Math.cos(i / 4) * 5 + (Math.random() - 0.5) * 2,
    co2: baseCo2 + Math.random() * 50 - 25
  }));
};

export const MOCK_BATCHES: CultivationBatch[] = [
  {
    id: 'B-101',
    farmerId: 'u1',
    name: 'Blue Oyster - Batch A',
    species: 'Pleurotus ostreatus',
    startDate: '2023-10-01',
    estimatedHarvestDate: '2023-10-21',
    status: 'Healthy',
    stage: 'Fruiting',
    location: 'Zone 1 - Shelf A',
    notes: 'Looking vigorous, pins started forming yesterday.',
    readings: generateReadings(22, 85, 600)
  },
  {
    id: 'B-102',
    farmerId: 'u1',
    name: 'Lion\'s Mane - Batch C',
    species: 'Hericium erinaceus',
    startDate: '2023-10-05',
    estimatedHarvestDate: '2023-11-05',
    status: 'Warning',
    stage: 'Spawn Run',
    location: 'Zone 2 - Shelf B',
    notes: 'Mycelium growth slower than expected.',
    readings: generateReadings(25, 70, 850)
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-7829',
    userId: 'u3',
    userName: 'John Customer',
    items: [
      { ...MOCK_PRODUCTS[0], quantity: 1 }
    ],
    total: 499,
    status: 'Delivered',
    date: '2023-10-10T14:30:00Z',
    shippingAddress: MOCK_ADDRESSES[1],
    paymentMethod: 'RAZORPAY',
    timeline: [
      { status: 'Pending', timestamp: '2023-10-10T14:30:00Z' },
      { status: 'Paid', timestamp: '2023-10-10T14:35:00Z' },
      { status: 'Shipped', timestamp: '2023-10-11T09:00:00Z' },
      { status: 'Delivered', timestamp: '2023-10-12T16:00:00Z' }
    ]
  },
  {
    id: 'ORD-8821',
    userId: 'u3',
    userName: 'John Customer',
    items: [
      { ...MOCK_PRODUCTS[1], quantity: 2 }
    ],
    total: 700,
    status: 'Processing',
    date: '2023-10-15T08:15:00Z',
    shippingAddress: MOCK_ADDRESSES[1],
    paymentMethod: 'COD',
    timeline: [
      { status: 'Pending', timestamp: '2023-10-15T08:15:00Z' },
      { status: 'Paid', timestamp: '2023-10-15T08:20:00Z' },
      { status: 'Processing', timestamp: '2023-10-15T09:00:00Z' }
    ]
  }
];
