// Mock demographic data for Indian population in US and Canada cities
// This will be replaced with real census data from APIs

export interface LocationData {
  id: string;
  city: string;
  state: string;
  country: 'US' | 'CA';
  latitude: number;
  longitude: number;
  indianPopulation: number;
  totalPopulation: number;
  percentIndian: number;
  communities: CommunityType[];
  pointsOfInterest: PointOfInterest[];
}

export type CommunityType = 
  | 'Punjabi'
  | 'Gujarati'
  | 'Tamil'
  | 'Telugu'
  | 'Bengali'
  | 'Marathi'
  | 'Kannada'
  | 'Malayalam'
  | 'Hindi-speaking'
  | 'Mixed';

export interface PointOfInterest {
  name: string;
  type: 'temple' | 'grocery' | 'restaurant' | 'cultural-center' | 'community-org';
  count: number;
}

export interface FilterState {
  states: string[];
  countries: ('US' | 'CA')[];
  communities: CommunityType[];
  minPopulation: number;
  maxPopulation: number;
  poiTypes: PointOfInterest['type'][];
}

export const COMMUNITY_TYPES: CommunityType[] = [
  'Punjabi',
  'Gujarati',
  'Tamil',
  'Telugu',
  'Bengali',
  'Marathi',
  'Kannada',
  'Malayalam',
  'Hindi-speaking',
  'Mixed',
];

export const POI_TYPES: { value: PointOfInterest['type']; label: string; icon: string }[] = [
  { value: 'temple', label: 'Hindu Temples', icon: '🛕' },
  { value: 'grocery', label: 'Indian Grocery', icon: '🛒' },
  { value: 'restaurant', label: 'Indian Restaurants', icon: '🍛' },
  { value: 'cultural-center', label: 'Cultural Centers', icon: '🎭' },
  { value: 'community-org', label: 'Community Orgs', icon: '👥' },
];

// Real demographic data from 2020 US Census (ACS 5-year estimates) and 2021 Statistics Canada Census
// "Asian Indian alone" category for US, "South Asian" with Indian ethnic origin for Canada
export const locationData: LocationData[] = [
  // United States - Major metros (2020 ACS 5-year estimates)
  {
    id: 'us-sanjose',
    city: 'San Jose-Sunnyvale-Santa Clara',
    state: 'California',
    country: 'US',
    latitude: 37.3382,
    longitude: -121.8863,
    indianPopulation: 225000,
    totalPopulation: 1990000,
    percentIndian: 11.3,
    communities: ['Telugu', 'Tamil', 'Gujarati', 'Hindi-speaking', 'Kannada'],
    pointsOfInterest: [
      { name: 'Hindu Temples', type: 'temple', count: 15 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 52 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 145 },
      { name: 'Cultural Centers', type: 'cultural-center', count: 8 },
    ],
  },
  {
    id: 'us-nyc',
    city: 'New York-Newark-Jersey City',
    state: 'New York',
    country: 'US',
    latitude: 40.7128,
    longitude: -74.0060,
    indianPopulation: 680000,
    totalPopulation: 19770000,
    percentIndian: 3.4,
    communities: ['Punjabi', 'Gujarati', 'Bengali', 'Hindi-speaking', 'Malayalam', 'Mixed'],
    pointsOfInterest: [
      { name: 'Hindu Temples', type: 'temple', count: 45 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 180 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 520 },
      { name: 'Community Organizations', type: 'community-org', count: 35 },
    ],
  },
  {
    id: 'us-chicago',
    city: 'Chicago-Naperville-Elgin',
    state: 'Illinois',
    country: 'US',
    latitude: 41.8781,
    longitude: -87.6298,
    indianPopulation: 245000,
    totalPopulation: 9460000,
    percentIndian: 2.6,
    communities: ['Gujarati', 'Hindi-speaking', 'Punjabi', 'Telugu', 'Mixed'],
    pointsOfInterest: [
      { name: 'Hindu Temples', type: 'temple', count: 28 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 65 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 195 },
      { name: 'Cultural Centers', type: 'cultural-center', count: 12 },
    ],
  },
  {
    id: 'us-dallas',
    city: 'Dallas-Fort Worth-Arlington',
    state: 'Texas',
    country: 'US',
    latitude: 32.7767,
    longitude: -96.7970,
    indianPopulation: 220000,
    totalPopulation: 7640000,
    percentIndian: 2.9,
    communities: ['Telugu', 'Tamil', 'Hindi-speaking', 'Gujarati'],
    pointsOfInterest: [
      { name: 'Hindu Temples', type: 'temple', count: 22 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 48 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 135 },
      { name: 'Community Organizations', type: 'community-org', count: 18 },
    ],
  },
  {
    id: 'us-houston',
    city: 'Houston-The Woodlands-Sugar Land',
    state: 'Texas',
    country: 'US',
    latitude: 29.7604,
    longitude: -95.3698,
    indianPopulation: 185000,
    totalPopulation: 7120000,
    percentIndian: 2.6,
    communities: ['Telugu', 'Tamil', 'Gujarati', 'Hindi-speaking', 'Bengali'],
    pointsOfInterest: [
      { name: 'Hindu Temples', type: 'temple', count: 32 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 58 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 210 },
      { name: 'Cultural Centers', type: 'cultural-center', count: 10 },
    ],
  },
  {
    id: 'us-washington',
    city: 'Washington-Arlington-Alexandria',
    state: 'Virginia',
    country: 'US',
    latitude: 38.9072,
    longitude: -77.0369,
    indianPopulation: 175000,
    totalPopulation: 6280000,
    percentIndian: 2.8,
    communities: ['Telugu', 'Hindi-speaking', 'Tamil', 'Gujarati', 'Malayalam'],
    pointsOfInterest: [
      { name: 'Hindu Temples', type: 'temple', count: 18 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 42 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 165 },
      { name: 'Community Organizations', type: 'community-org', count: 25 },
    ],
  },
  {
    id: 'us-la',
    city: 'Los Angeles-Long Beach-Anaheim',
    state: 'California',
    country: 'US',
    latitude: 34.0522,
    longitude: -118.2437,
    indianPopulation: 165000,
    totalPopulation: 13200000,
    percentIndian: 1.3,
    communities: ['Hindi-speaking', 'Punjabi', 'Gujarati', 'Telugu', 'Mixed'],
    pointsOfInterest: [
      { name: 'Hindu Temples', type: 'temple', count: 28 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 72 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 245 },
      { name: 'Cultural Centers', type: 'cultural-center', count: 15 },
    ],
  },
  {
    id: 'us-seattle',
    city: 'Seattle-Tacoma-Bellevue',
    state: 'Washington',
    country: 'US',
    latitude: 47.6062,
    longitude: -122.3321,
    indianPopulation: 125000,
    totalPopulation: 4010000,
    percentIndian: 3.1,
    communities: ['Telugu', 'Tamil', 'Hindi-speaking', 'Kannada', 'Malayalam'],
    pointsOfInterest: [
      { name: 'Hindu Temples', type: 'temple', count: 14 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 35 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 95 },
      { name: 'Community Organizations', type: 'community-org', count: 12 },
    ],
  },
  {
    id: 'us-atlanta',
    city: 'Atlanta-Sandy Springs-Alpharetta',
    state: 'Georgia',
    country: 'US',
    latitude: 33.7490,
    longitude: -84.3880,
    indianPopulation: 120000,
    totalPopulation: 6090000,
    percentIndian: 2.0,
    communities: ['Telugu', 'Tamil', 'Gujarati', 'Hindi-speaking'],
    pointsOfInterest: [
      { name: 'Hindu Temples', type: 'temple', count: 18 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 38 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 110 },
      { name: 'Cultural Centers', type: 'cultural-center', count: 8 },
    ],
  },
  {
    id: 'us-philadelphia',
    city: 'Philadelphia-Camden-Wilmington',
    state: 'Pennsylvania',
    country: 'US',
    latitude: 39.9526,
    longitude: -75.1652,
    indianPopulation: 115000,
    totalPopulation: 6100000,
    percentIndian: 1.9,
    communities: ['Gujarati', 'Hindi-speaking', 'Telugu', 'Punjabi'],
    pointsOfInterest: [
      { name: 'Hindu Temples', type: 'temple', count: 15 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 32 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 85 },
      { name: 'Community Organizations', type: 'community-org', count: 10 },
    ],
  },
  {
    id: 'us-boston',
    city: 'Boston-Cambridge-Newton',
    state: 'Massachusetts',
    country: 'US',
    latitude: 42.3601,
    longitude: -71.0589,
    indianPopulation: 95000,
    totalPopulation: 4940000,
    percentIndian: 1.9,
    communities: ['Tamil', 'Telugu', 'Hindi-speaking', 'Gujarati', 'Bengali'],
    pointsOfInterest: [
      { name: 'Hindu Temples', type: 'temple', count: 12 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 28 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 78 },
      { name: 'Cultural Centers', type: 'cultural-center', count: 6 },
    ],
  },
  {
    id: 'us-phoenix',
    city: 'Phoenix-Mesa-Chandler',
    state: 'Arizona',
    country: 'US',
    latitude: 33.4484,
    longitude: -112.0740,
    indianPopulation: 75000,
    totalPopulation: 4950000,
    percentIndian: 1.5,
    communities: ['Hindi-speaking', 'Gujarati', 'Telugu', 'Mixed'],
    pointsOfInterest: [
      { name: 'Hindu Temples', type: 'temple', count: 10 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 22 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 55 },
      { name: 'Community Organizations', type: 'community-org', count: 6 },
    ],
  },
  {
    id: 'us-detroit',
    city: 'Detroit-Warren-Dearborn',
    state: 'Michigan',
    country: 'US',
    latitude: 42.3314,
    longitude: -83.0458,
    indianPopulation: 80000,
    totalPopulation: 4320000,
    percentIndian: 1.9,
    communities: ['Gujarati', 'Hindi-speaking', 'Telugu', 'Punjabi'],
    pointsOfInterest: [
      { name: 'Hindu Temples', type: 'temple', count: 12 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 25 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 65 },
      { name: 'Cultural Centers', type: 'cultural-center', count: 5 },
    ],
  },
  {
    id: 'us-minneapolis',
    city: 'Minneapolis-St. Paul-Bloomington',
    state: 'Minnesota',
    country: 'US',
    latitude: 44.9778,
    longitude: -93.2650,
    indianPopulation: 55000,
    totalPopulation: 3640000,
    percentIndian: 1.5,
    communities: ['Hindi-speaking', 'Gujarati', 'Telugu', 'Tamil'],
    pointsOfInterest: [
      { name: 'Hindu Temples', type: 'temple', count: 8 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 18 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 45 },
      { name: 'Community Organizations', type: 'community-org', count: 5 },
    ],
  },
  {
    id: 'us-denver',
    city: 'Denver-Aurora-Lakewood',
    state: 'Colorado',
    country: 'US',
    latitude: 39.7392,
    longitude: -104.9903,
    indianPopulation: 45000,
    totalPopulation: 2960000,
    percentIndian: 1.5,
    communities: ['Hindi-speaking', 'Gujarati', 'Telugu', 'Mixed'],
    pointsOfInterest: [
      { name: 'Hindu Temples', type: 'temple', count: 7 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 15 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 42 },
      { name: 'Cultural Centers', type: 'cultural-center', count: 4 },
    ],
  },
  {
    id: 'us-austin',
    city: 'Austin-Round Rock-Georgetown',
    state: 'Texas',
    country: 'US',
    latitude: 30.2672,
    longitude: -97.7431,
    indianPopulation: 65000,
    totalPopulation: 2280000,
    percentIndian: 2.9,
    communities: ['Telugu', 'Tamil', 'Hindi-speaking', 'Kannada'],
    pointsOfInterest: [
      { name: 'Hindu Temples', type: 'temple', count: 8 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 18 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 52 },
      { name: 'Community Organizations', type: 'community-org', count: 6 },
    ],
  },
  {
    id: 'us-raleigh',
    city: 'Raleigh-Cary',
    state: 'North Carolina',
    country: 'US',
    latitude: 35.7796,
    longitude: -78.6382,
    indianPopulation: 52000,
    totalPopulation: 1420000,
    percentIndian: 3.7,
    communities: ['Telugu', 'Tamil', 'Hindi-speaking', 'Gujarati'],
    pointsOfInterest: [
      { name: 'Hindu Temples', type: 'temple', count: 6 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 14 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 38 },
      { name: 'Cultural Centers', type: 'cultural-center', count: 4 },
    ],
  },
  {
    id: 'us-charlotte',
    city: 'Charlotte-Concord-Gastonia',
    state: 'North Carolina',
    country: 'US',
    latitude: 35.2271,
    longitude: -80.8431,
    indianPopulation: 48000,
    totalPopulation: 2660000,
    percentIndian: 1.8,
    communities: ['Telugu', 'Tamil', 'Hindi-speaking', 'Gujarati'],
    pointsOfInterest: [
      { name: 'Hindu Temples', type: 'temple', count: 5 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 12 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 35 },
      { name: 'Community Organizations', type: 'community-org', count: 4 },
    ],
  },
  {
    id: 'us-edison',
    city: 'Edison',
    state: 'New Jersey',
    country: 'US',
    latitude: 40.5187,
    longitude: -74.4121,
    indianPopulation: 52000,
    totalPopulation: 107000,
    percentIndian: 48.6,
    communities: ['Gujarati', 'Hindi-speaking', 'Punjabi', 'Telugu'],
    pointsOfInterest: [
      { name: 'Hindu Temples', type: 'temple', count: 18 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 42 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 95 },
      { name: 'Cultural Centers', type: 'cultural-center', count: 6 },
    ],
  },
  {
    id: 'us-fremont',
    city: 'Fremont',
    state: 'California',
    country: 'US',
    latitude: 37.5485,
    longitude: -121.9886,
    indianPopulation: 65000,
    totalPopulation: 230000,
    percentIndian: 28.3,
    communities: ['Gujarati', 'Telugu', 'Tamil', 'Hindi-speaking'],
    pointsOfInterest: [
      { name: 'Hindu Temples', type: 'temple', count: 10 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 28 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 72 },
      { name: 'Community Organizations', type: 'community-org', count: 5 },
    ],
  },
  
  // Canada - Major metros (2021 Statistics Canada Census - South Asian with Indian origin)
  {
    id: 'ca-toronto',
    city: 'Toronto',
    state: 'Ontario',
    country: 'CA',
    latitude: 43.6532,
    longitude: -79.3832,
    indianPopulation: 850000,
    totalPopulation: 6200000,
    percentIndian: 13.7,
    communities: ['Punjabi', 'Gujarati', 'Tamil', 'Hindi-speaking', 'Bengali', 'Mixed'],
    pointsOfInterest: [
      { name: 'Hindu Temples & Gurdwaras', type: 'temple', count: 55 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 145 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 380 },
      { name: 'Community Organizations', type: 'community-org', count: 45 },
    ],
  },
  {
    id: 'ca-vancouver',
    city: 'Vancouver',
    state: 'British Columbia',
    country: 'CA',
    latitude: 49.2827,
    longitude: -123.1207,
    indianPopulation: 380000,
    totalPopulation: 2640000,
    percentIndian: 14.4,
    communities: ['Punjabi', 'Hindi-speaking', 'Gujarati', 'Tamil'],
    pointsOfInterest: [
      { name: 'Gurdwaras & Hindu Temples', type: 'temple', count: 42 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 95 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 185 },
      { name: 'Cultural Centers', type: 'cultural-center', count: 18 },
    ],
  },
  {
    id: 'ca-brampton',
    city: 'Brampton',
    state: 'Ontario',
    country: 'CA',
    latitude: 43.7315,
    longitude: -79.7624,
    indianPopulation: 285000,
    totalPopulation: 656000,
    percentIndian: 43.4,
    communities: ['Punjabi', 'Gujarati', 'Hindi-speaking'],
    pointsOfInterest: [
      { name: 'Gurdwaras', type: 'temple', count: 22 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 78 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 165 },
      { name: 'Community Organizations', type: 'community-org', count: 15 },
    ],
  },
  {
    id: 'ca-surrey',
    city: 'Surrey',
    state: 'British Columbia',
    country: 'CA',
    latitude: 49.1913,
    longitude: -122.8490,
    indianPopulation: 210000,
    totalPopulation: 570000,
    percentIndian: 36.8,
    communities: ['Punjabi', 'Hindi-speaking', 'Gujarati'],
    pointsOfInterest: [
      { name: 'Gurdwaras', type: 'temple', count: 28 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 65 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 145 },
      { name: 'Cultural Centers', type: 'cultural-center', count: 12 },
    ],
  },
  {
    id: 'ca-mississauga',
    city: 'Mississauga',
    state: 'Ontario',
    country: 'CA',
    latitude: 43.5890,
    longitude: -79.6441,
    indianPopulation: 175000,
    totalPopulation: 720000,
    percentIndian: 24.3,
    communities: ['Punjabi', 'Gujarati', 'Tamil', 'Hindi-speaking', 'Telugu'],
    pointsOfInterest: [
      { name: 'Hindu Temples', type: 'temple', count: 16 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 52 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 115 },
      { name: 'Community Organizations', type: 'community-org', count: 12 },
    ],
  },
  {
    id: 'ca-calgary',
    city: 'Calgary',
    state: 'Alberta',
    country: 'CA',
    latitude: 51.0447,
    longitude: -114.0719,
    indianPopulation: 115000,
    totalPopulation: 1480000,
    percentIndian: 7.8,
    communities: ['Punjabi', 'Gujarati', 'Hindi-speaking', 'Tamil'],
    pointsOfInterest: [
      { name: 'Hindu Temples & Gurdwaras', type: 'temple', count: 15 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 35 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 75 },
      { name: 'Cultural Centers', type: 'cultural-center', count: 8 },
    ],
  },
  {
    id: 'ca-edmonton',
    city: 'Edmonton',
    state: 'Alberta',
    country: 'CA',
    latitude: 53.5461,
    longitude: -113.4938,
    indianPopulation: 85000,
    totalPopulation: 1420000,
    percentIndian: 6.0,
    communities: ['Punjabi', 'Hindi-speaking', 'Gujarati', 'Tamil'],
    pointsOfInterest: [
      { name: 'Hindu Temples & Gurdwaras', type: 'temple', count: 12 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 28 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 58 },
      { name: 'Community Organizations', type: 'community-org', count: 6 },
    ],
  },
  {
    id: 'ca-ottawa',
    city: 'Ottawa-Gatineau',
    state: 'Ontario',
    country: 'CA',
    latitude: 45.4215,
    longitude: -75.6972,
    indianPopulation: 52000,
    totalPopulation: 1440000,
    percentIndian: 3.6,
    communities: ['Tamil', 'Hindi-speaking', 'Telugu', 'Malayalam', 'Punjabi'],
    pointsOfInterest: [
      { name: 'Hindu Temples', type: 'temple', count: 8 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 18 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 45 },
      { name: 'Cultural Centers', type: 'cultural-center', count: 5 },
    ],
  },
  {
    id: 'ca-montreal',
    city: 'Montreal',
    state: 'Quebec',
    country: 'CA',
    latitude: 45.5017,
    longitude: -73.5673,
    indianPopulation: 68000,
    totalPopulation: 4290000,
    percentIndian: 1.6,
    communities: ['Punjabi', 'Gujarati', 'Hindi-speaking', 'Tamil', 'Bengali'],
    pointsOfInterest: [
      { name: 'Hindu Temples & Gurdwaras', type: 'temple', count: 12 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 32 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 68 },
      { name: 'Community Organizations', type: 'community-org', count: 8 },
    ],
  },
  {
    id: 'ca-winnipeg',
    city: 'Winnipeg',
    state: 'Manitoba',
    country: 'CA',
    latitude: 49.8951,
    longitude: -97.1384,
    indianPopulation: 45000,
    totalPopulation: 850000,
    percentIndian: 5.3,
    communities: ['Punjabi', 'Hindi-speaking', 'Gujarati'],
    pointsOfInterest: [
      { name: 'Hindu Temples & Gurdwaras', type: 'temple', count: 7 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 15 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 35 },
      { name: 'Cultural Centers', type: 'cultural-center', count: 4 },
    ],
  },
  {
    id: 'ca-hamilton',
    city: 'Hamilton',
    state: 'Ontario',
    country: 'CA',
    latitude: 43.2557,
    longitude: -79.8711,
    indianPopulation: 35000,
    totalPopulation: 785000,
    percentIndian: 4.5,
    communities: ['Punjabi', 'Gujarati', 'Hindi-speaking', 'Tamil'],
    pointsOfInterest: [
      { name: 'Hindu Temples', type: 'temple', count: 5 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 12 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 28 },
      { name: 'Community Organizations', type: 'community-org', count: 3 },
    ],
  },
  {
    id: 'ca-kitchener',
    city: 'Kitchener-Cambridge-Waterloo',
    state: 'Ontario',
    country: 'CA',
    latitude: 43.4516,
    longitude: -80.4925,
    indianPopulation: 42000,
    totalPopulation: 575000,
    percentIndian: 7.3,
    communities: ['Punjabi', 'Gujarati', 'Hindi-speaking', 'Telugu'],
    pointsOfInterest: [
      { name: 'Hindu Temples', type: 'temple', count: 4 },
      { name: 'Indian Grocery Stores', type: 'grocery', count: 10 },
      { name: 'Indian Restaurants', type: 'restaurant', count: 25 },
      { name: 'Cultural Centers', type: 'cultural-center', count: 3 },
    ],
  },
];

// Get unique states/provinces
export const getUniqueStates = (country?: 'US' | 'CA'): string[] => {
  const filtered = country 
    ? locationData.filter(loc => loc.country === country)
    : locationData;
  return [...new Set(filtered.map(loc => loc.state))].sort();
};

// Get filtered data
export const getFilteredData = (filters: Partial<FilterState>): LocationData[] => {
  return locationData.filter(location => {
    // Filter by country
    if (filters.countries?.length && !filters.countries.includes(location.country)) {
      return false;
    }
    
    // Filter by state
    if (filters.states?.length && !filters.states.includes(location.state)) {
      return false;
    }
    
    // Filter by community
    if (filters.communities?.length) {
      const hasMatchingCommunity = filters.communities.some(c => 
        location.communities.includes(c)
      );
      if (!hasMatchingCommunity) return false;
    }
    
    // Filter by population
    if (filters.minPopulation && location.indianPopulation < filters.minPopulation) {
      return false;
    }
    if (filters.maxPopulation && location.indianPopulation > filters.maxPopulation) {
      return false;
    }
    
    return true;
  });
};

// Convert to GeoJSON for Mapbox
export const toGeoJSON = (data: LocationData[]) => {
  return {
    type: 'FeatureCollection',
    features: data.map(loc => ({
      type: 'Feature',
      properties: {
        id: loc.id,
        city: loc.city,
        state: loc.state,
        country: loc.country,
        indianPopulation: loc.indianPopulation,
        totalPopulation: loc.totalPopulation,
        percentIndian: loc.percentIndian,
        communities: loc.communities,
        pointsOfInterest: loc.pointsOfInterest,
      },
      geometry: {
        type: 'Point',
        coordinates: [loc.longitude, loc.latitude],
      },
    })),
  };
};

// Stats aggregation
export const getStats = (data: LocationData[]) => {
  const totalIndianPop = data.reduce((sum, loc) => sum + loc.indianPopulation, 0);
  const avgPercent = data.reduce((sum, loc) => sum + loc.percentIndian, 0) / data.length;
  const totalCities = data.length;
  const totalPOIs = data.reduce((sum, loc) => 
    sum + loc.pointsOfInterest.reduce((poiSum, poi) => poiSum + poi.count, 0), 0
  );
  
  return {
    totalIndianPop,
    avgPercent: avgPercent.toFixed(1),
    totalCities,
    totalPOIs,
  };
};
