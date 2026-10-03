export interface Farmer {
  id: string;
  name: string;
  phone: string;
  location: {
    lat: number;
    lon: number;
    address: string;
    region: string;
  };
  farmDetails: {
    area: number; // in acres
    primaryCrop: string;
    soilType: string;
    irrigationType: string;
  };
  preferredLanguage: string;
  avatarUrl?: string;
}

export type FarmerProfile = Omit<Farmer, 'id'>;

export interface WeatherData {
  lat: number;
  lon: number;
  temp: number;
  condition: string; // e.g., 'Sunny', 'Rainy', 'Cloudy'
  rainProbability: number;
  humidity: number;
  windSpeed: number;
  forecast: WeatherForecast[];
}

export interface WeatherForecast {
  date: string;
  temp: number;
  condition: string;
  rainProbability: number;
}

export interface WeatherAlert {
  id: string;
  type: 'rain' | 'storm' | 'heat' | 'frost' | 'wind';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  date: string;
}

export interface MarketPrice {
  id: string;
  crop: string;
  market: string;
  price: number;
  unit: string;
  date: string;
  trend: 'up' | 'down' | 'stable';
  changePercentage: number;
}

export interface TrendData {
  date: string;
  price: number;
}

export interface BestPrice {
  crop: string;
  market: string;
  price: number;
  distance: number; // km
  transportCost: number; // estimated
  netProfit: number;
}

export interface CropHealthZone {
  id: string;
  row: number;
  col: number;
  healthScore: number; // 0-100
  status: 'healthy' | 'warning' | 'critical';
  issues?: string[];
}

export interface CropHealthGrid {
  farmId: string;
  rows: number;
  cols: number;
  zones: CropHealthZone[];
  overallHealth: number;
}

export interface DiseaseInfo {
  name: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  treatment: string[];
}

export interface ZoneDetail {
  zoneId: string;
  healthScore: number;
  moistureLevel: number;
  nitrogenLevel: number;
  diseases: DiseaseInfo[];
  recommendation: string;
  image?: string;
}

export interface WaterBody {
  id: string;
  name: string;
  type: 'dam' | 'river' | 'well' | 'reservoir';
  lat: number;
  lon: number;
  currentLevel: number; // percentage
  capacity: number;
  status: 'normal' | 'low' | 'overflow' | 'releasing';
}

export interface Dam extends WaterBody {
  type: 'dam';
  releaseRate: number; // cusecs
  nextReleaseDate?: string;
}

export interface River extends WaterBody {
  type: 'river';
  flowRate: number;
}

export interface Well extends WaterBody {
  type: 'well';
  depth: number;
}

export interface Reservoir extends WaterBody {
  type: 'reservoir';
}

export interface WaterRisk {
  farmId: string;
  riskLevel: 'low' | 'medium' | 'high';
  riskType: 'drought' | 'flood' | 'none';
  factors: string[];
  recommendations: string[];
}

export interface SimulationResult {
  damId: string;
  releaseAmount: number; // cusecs
  impactedFarms: string[];
  estimatedWaterLevelRise: number; // meters
  timeToReach: number; // hours
}

export interface Scheme {
  id: string;
  title: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  deadline: string;
  applicationUrl?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'planting' | 'harvest' | 'fertilizer' | 'pesticide' | 'irrigation';
  status: 'pending' | 'completed' | 'overdue';
  description?: string;
}

export interface CalendarData {
  region: string;
  crop: string;
  season: string;
  events: CalendarEvent[];
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'weather' | 'disease' | 'water' | 'market' | 'system';
  severity: 'info' | 'warning' | 'critical';
  date: string;
  read: boolean;
  actionLink?: string;
}

export type Notification = Alert;

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export interface ChatResponse {
  text: string;
  suggestions?: string[];
  action?: {
    type: string;
    payload: any;
  };
}

export interface SeedVariety {
  id: string;
  name: string;
  crop: string;
  duration: number; // days
  yieldPotential: string;
  resistance: string[];
  pricePerKg: number;
}

export interface SoilAnalysis {
  ph: number;
  nitrogen: number; // kg/ha
  phosphorus: number; // kg/ha
  potassium: number; // kg/ha
  organicCarbon: number; // percentage
  moisture: number; // percentage
  status: 'poor' | 'fair' | 'good' | 'excellent';
}

export interface FertilizerRec {
  name: string;
  type: 'organic' | 'chemical';
  dosage: string;
  timing: string;
  priceEstimate: number;
}

export interface PestControlRec {
  pest: string;
  symptoms: string[];
  chemicalControl: string;
  organicControl: string;
  preventiveMeasures: string[];
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: 'action' | 'info' | 'warning';
  priority: 'low' | 'medium' | 'high';
}

export interface OnboardingData {
  name: string;
  phone: string;
  region: string;
  crop: string;
  area: number;
}
