import { 
  Farmer, WeatherData, MarketPrice, CropHealthGrid, WaterBody, 
  Scheme, CalendarData, Alert, ChatResponse 
} from '../types';

export const demoFarmers: Farmer[] = [
  {
    id: 'f1',
    name: 'Ramesh Goud',
    phone: '+91 9876543210',
    location: {
      lat: 17.9689,
      lon: 79.5941,
      address: 'Warangal, Telangana',
      region: 'Telangana'
    },
    farmDetails: {
      area: 3.5,
      primaryCrop: 'Rice',
      soilType: 'Black Cotton',
      irrigationType: 'Borewell'
    },
    preferredLanguage: 'en',
  },
  {
    id: 'f2',
    name: 'Laxman Reddy',
    phone: '+91 9876543211',
    location: {
      lat: 18.4386,
      lon: 79.1288,
      address: 'Karimnagar, Telangana',
      region: 'Telangana'
    },
    farmDetails: {
      area: 5,
      primaryCrop: 'Cotton',
      soilType: 'Red Soil',
      irrigationType: 'Canal'
    },
    preferredLanguage: 'te',
  },
  {
    id: 'f3',
    name: 'Rajesh Sharma',
    phone: '+91 9876543212',
    location: {
      lat: 16.3067,
      lon: 80.4365,
      address: 'Guntur, Andhra Pradesh',
      region: 'Andhra Pradesh'
    },
    farmDetails: {
      area: 4,
      primaryCrop: 'Chilli',
      soilType: 'Loamy',
      irrigationType: 'Drip'
    },
    preferredLanguage: 'hi',
  }
];

export const demoWeather: WeatherData = {
  lat: 17.9689,
  lon: 79.5941,
  temp: 31,
  condition: 'Cloudy',
  rainProbability: 68,
  humidity: 72,
  windSpeed: 14,
  forecast: [
    { date: '2023-10-03', temp: 31, condition: 'Cloudy', rainProbability: 68 },
    { date: '2023-10-04', temp: 29, condition: 'Rainy', rainProbability: 85 },
    { date: '2023-10-05', temp: 30, condition: 'Partly Cloudy', rainProbability: 40 },
    { date: '2023-10-06', temp: 32, condition: 'Sunny', rainProbability: 10 },
    { date: '2023-10-07', temp: 33, condition: 'Sunny', rainProbability: 5 },
  ]
};

export const demoMarketPrices: MarketPrice[] = Array.from({ length: 30 }).map((_, i) => {
  const crops = ['Paddy', 'Cotton', 'Maize', 'Chilli', 'Groundnut', 'Turmeric'];
  const markets = ['Warangal', 'Khammam', 'Nizamabad', 'Karimnagar', 'Suryapet'];
  const basePrice = [2200, 7500, 2100, 18000, 6000, 7200];
  
  const cropIdx = i % crops.length;
  const marketIdx = (i + Math.floor(i / crops.length)) % markets.length;
  const priceVar = Math.floor(Math.random() * 500) - 250;
  
  return {
    id: `mp-${i}`,
    crop: crops[cropIdx],
    market: markets[marketIdx],
    price: basePrice[cropIdx] + priceVar,
    unit: 'Quintal',
    date: new Date().toISOString(),
    trend: priceVar > 0 ? 'up' : priceVar < 0 ? 'down' : 'stable',
    changePercentage: Math.abs(parseFloat(((priceVar / basePrice[cropIdx]) * 100).toFixed(1)))
  };
});

export const demoCropHealth: CropHealthGrid = {
  farmId: 'f1',
  rows: 4,
  cols: 4,
  overallHealth: 82,
  zones: Array.from({ length: 16 }).map((_, i) => {
    const row = Math.floor(i / 4);
    const col = i % 4;
    const isProblemZone = i === 7; // Zone B7 (row 1, col 3) is index 7
    return {
      id: `${String.fromCharCode(65 + row)}${i}`,
      row,
      col,
      healthScore: isProblemZone ? 45 : 85 + Math.random() * 10,
      status: isProblemZone ? 'critical' : (Math.random() > 0.8 ? 'warning' : 'healthy'),
      issues: isProblemZone ? ['Leaf Blight detected'] : undefined
    };
  })
};

export const demoWaterBodies: WaterBody[] = [
  { id: 'wb1', name: 'Sriram Sagar Dam', type: 'dam', lat: 18.9667, lon: 78.3333, currentLevel: 85, capacity: 100, status: 'releasing' },
  { id: 'wb2', name: 'Godavari River', type: 'river', lat: 18.5, lon: 79.0, currentLevel: 60, capacity: 100, status: 'normal' },
  { id: 'wb3', name: 'Farm Borewell', type: 'well', lat: 17.9690, lon: 79.5940, currentLevel: 40, capacity: 100, status: 'low' },
  { id: 'wb4', name: 'Kakatiya Canal', type: 'reservoir', lat: 17.9800, lon: 79.6000, currentLevel: 75, capacity: 100, status: 'normal' }
];

export const demoSchemes: Scheme[] = [
  { id: 's1', title: 'Rythu Bandhu', description: 'Investment support for agriculture', eligibility: ['Land-owning farmers'], benefits: ['₹5000 per acre per season'], deadline: '2023-11-30' },
  { id: 's2', title: 'PM-KISAN', description: 'Income support scheme', eligibility: ['Small/marginal farmers'], benefits: ['₹6000 per year'], deadline: 'Ongoing' },
  { id: 's3', title: 'Crop Insurance (PMFBY)', description: 'Insurance against crop failure', eligibility: ['All farmers'], benefits: ['Coverage for yield losses'], deadline: '2023-10-15' },
  { id: 's4', title: 'Drip Irrigation Subsidy', description: 'Micro-irrigation support', eligibility: ['Telangana farmers'], benefits: ['Up to 90% subsidy'], deadline: '2024-03-31' },
  { id: 's5', title: 'Seed Subsidy Scheme', description: 'Subsidized seeds for Kharif/Rabi', eligibility: ['Registered farmers'], benefits: ['50% off on certified seeds'], deadline: '2023-10-10' },
  { id: 's6', title: 'Farm Mechanization', description: 'Support for buying tractors/tools', eligibility: ['Groups/FPOs'], benefits: ['Subsidies on machinery'], deadline: '2023-12-31' },
  { id: 's7', title: 'Soil Health Card', description: 'Free soil testing', eligibility: ['All farmers'], benefits: ['Detailed nutrient report'], deadline: 'Ongoing' },
  { id: 's8', title: 'Rythu Bima', description: 'Farmers Group Life Insurance', eligibility: ['Age 18-59', 'Pattadar passbook'], benefits: ['₹5 Lakhs life cover'], deadline: 'Ongoing' }
];

export const demoCalendar: CalendarData = {
  region: 'Telangana',
  crop: 'Paddy',
  season: 'Kharif',
  events: [
    { id: 'e1', title: 'Nursery Preparation', date: '2023-06-15', type: 'planting', status: 'completed' },
    { id: 'e2', title: 'Transplanting', date: '2023-07-10', type: 'planting', status: 'completed' },
    { id: 'e3', title: 'First Fertilizer Dose', date: '2023-07-25', type: 'fertilizer', status: 'completed' },
    { id: 'e4', title: 'Weed Control', date: '2023-08-10', type: 'pesticide', status: 'completed' },
    { id: 'e5', title: 'Second Fertilizer Dose', date: '2023-09-05', type: 'fertilizer', status: 'completed' },
    { id: 'e6', title: 'Disease Inspection', date: '2023-10-05', type: 'pesticide', status: 'pending', description: 'Check for leaf blight after rains' },
    { id: 'e7', title: 'Drain Water', date: '2023-11-01', type: 'irrigation', status: 'pending' },
    { id: 'e8', title: 'Harvesting', date: '2023-11-15', type: 'harvest', status: 'pending' },
  ]
};

export const demoAlerts: Alert[] = [
  { id: 'a1', title: 'Disease Detected', message: 'Leaf Blight detected in Zone B7 with 85% confidence.', type: 'disease', severity: 'critical', date: new Date().toISOString(), read: false },
  { id: 'a2', title: 'Heavy Rain Warning', message: '68% chance of heavy rain in the next 48 hours.', type: 'weather', severity: 'warning', date: new Date().toISOString(), read: false },
  { id: 'a3', title: 'Dam Release Alert', message: 'Sriram Sagar is releasing 5000 cusecs. Monitor downstream drainage.', type: 'water', severity: 'warning', date: new Date(Date.now() - 86400000).toISOString(), read: true }
];

export const getDemoBhumiResponse = (message: string): ChatResponse => {
  const lowerMsg = message.toLowerCase();
  if (lowerMsg.includes('price') || lowerMsg.includes('market')) {
    return { text: 'Current Paddy prices in Warangal are around ₹2,350/Quintal, trending upwards. Would you like me to find the nearest mandi with the best price?' };
  }
  if (lowerMsg.includes('disease') || lowerMsg.includes('blight') || lowerMsg.includes('sick')) {
    return { text: 'Based on your recent field scan, there is a risk of Leaf Blight in Zone B7. I recommend applying a Mancozeb-based fungicide before the upcoming rains.' };
  }
  if (lowerMsg.includes('scheme') || lowerMsg.includes('rythu bandhu')) {
    return { text: 'The Rythu Bandhu scheme provides ₹5,000 per acre. The next disbursement is expected by November. Ensure your Pattadar Passbook details are updated.' };
  }
  return { text: 'I understand you need assistance. As your Krishi Mithra, I can help with market prices, weather forecasts, crop health, or schemes. Could you provide more details?' };
};
