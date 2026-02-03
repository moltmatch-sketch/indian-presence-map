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

// Mock data for major US and Canadian cities with significant Indian populations
export const mockLocationData: LocationData[] = [
  // United States - Major metros
  {
    id: 'us-sanjose',
    city: 'San Jose',
    state: 'California',
    country: 'US',
    latitude: 37.3382,
    longitude: -121.8863,
    indianPopulation: 195000,
    totalPopulation: 1030000,
    percentIndian: 18.9,
    communities: ['Telugu', 'Tamil', 'Gujarati', 'Hindi-speaking'],
    pointsOfInterest: [
      { name: 'Temples', type: 'temple', count: 12 },
      { name: 'Grocery Stores', type: 'grocery', count: 45 },
      { name: 'Restaurants', type: 'restaurant', count: 120 },
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
    communities: ['Gujarati', 'Telugu', 'Tamil'],
    pointsOfInterest: [
      { name: 'Temples', type: 'temple', count: 8 },
      { name: 'Grocery Stores', type: 'grocery', count: 25 },
      { name: 'Restaurants', type: 'restaurant', count: 65 },
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
    communities: ['Gujarati', 'Hindi-speaking', 'Punjabi'],
    pointsOfInterest: [
      { name: 'Temples', type: 'temple', count: 15 },
      { name: 'Grocery Stores', type: 'grocery', count: 35 },
      { name: 'Restaurants', type: 'restaurant', count: 85 },
    ],
  },
  {
    id: 'us-jersey-city',
    city: 'Jersey City',
    state: 'New Jersey',
    country: 'US',
    latitude: 40.7178,
    longitude: -74.0431,
    indianPopulation: 45000,
    totalPopulation: 292000,
    percentIndian: 15.4,
    communities: ['Gujarati', 'Hindi-speaking', 'Bengali'],
    pointsOfInterest: [
      { name: 'Temples', type: 'temple', count: 6 },
      { name: 'Grocery Stores', type: 'grocery', count: 20 },
      { name: 'Restaurants', type: 'restaurant', count: 55 },
    ],
  },
  {
    id: 'us-sunnyvale',
    city: 'Sunnyvale',
    state: 'California',
    country: 'US',
    latitude: 37.3688,
    longitude: -122.0363,
    indianPopulation: 42000,
    totalPopulation: 155000,
    percentIndian: 27.1,
    communities: ['Telugu', 'Tamil', 'Kannada'],
    pointsOfInterest: [
      { name: 'Temples', type: 'temple', count: 5 },
      { name: 'Grocery Stores', type: 'grocery', count: 18 },
      { name: 'Restaurants', type: 'restaurant', count: 45 },
    ],
  },
  {
    id: 'us-chicago',
    city: 'Chicago',
    state: 'Illinois',
    country: 'US',
    latitude: 41.8781,
    longitude: -87.6298,
    indianPopulation: 125000,
    totalPopulation: 2700000,
    percentIndian: 4.6,
    communities: ['Gujarati', 'Hindi-speaking', 'Punjabi', 'Mixed'],
    pointsOfInterest: [
      { name: 'Temples', type: 'temple', count: 20 },
      { name: 'Grocery Stores', type: 'grocery', count: 40 },
      { name: 'Restaurants', type: 'restaurant', count: 150 },
    ],
  },
  {
    id: 'us-houston',
    city: 'Houston',
    state: 'Texas',
    country: 'US',
    latitude: 29.7604,
    longitude: -95.3698,
    indianPopulation: 150000,
    totalPopulation: 2300000,
    percentIndian: 6.5,
    communities: ['Telugu', 'Tamil', 'Gujarati', 'Hindi-speaking'],
    pointsOfInterest: [
      { name: 'Temples', type: 'temple', count: 25 },
      { name: 'Grocery Stores', type: 'grocery', count: 50 },
      { name: 'Restaurants', type: 'restaurant', count: 180 },
    ],
  },
  {
    id: 'us-dallas',
    city: 'Dallas',
    state: 'Texas',
    country: 'US',
    latitude: 32.7767,
    longitude: -96.7970,
    indianPopulation: 110000,
    totalPopulation: 1340000,
    percentIndian: 8.2,
    communities: ['Telugu', 'Tamil', 'Hindi-speaking'],
    pointsOfInterest: [
      { name: 'Temples', type: 'temple', count: 18 },
      { name: 'Grocery Stores', type: 'grocery', count: 35 },
      { name: 'Restaurants', type: 'restaurant', count: 95 },
    ],
  },
  {
    id: 'us-seattle',
    city: 'Seattle',
    state: 'Washington',
    country: 'US',
    latitude: 47.6062,
    longitude: -122.3321,
    indianPopulation: 75000,
    totalPopulation: 750000,
    percentIndian: 10.0,
    communities: ['Telugu', 'Tamil', 'Hindi-speaking', 'Kannada'],
    pointsOfInterest: [
      { name: 'Temples', type: 'temple', count: 10 },
      { name: 'Grocery Stores', type: 'grocery', count: 25 },
      { name: 'Restaurants', type: 'restaurant', count: 70 },
    ],
  },
  {
    id: 'us-atlanta',
    city: 'Atlanta',
    state: 'Georgia',
    country: 'US',
    latitude: 33.7490,
    longitude: -84.3880,
    indianPopulation: 85000,
    totalPopulation: 500000,
    percentIndian: 17.0,
    communities: ['Telugu', 'Tamil', 'Gujarati'],
    pointsOfInterest: [
      { name: 'Temples', type: 'temple', count: 14 },
      { name: 'Grocery Stores', type: 'grocery', count: 30 },
      { name: 'Restaurants', type: 'restaurant', count: 85 },
    ],
  },
  {
    id: 'us-phoenix',
    city: 'Phoenix',
    state: 'Arizona',
    country: 'US',
    latitude: 33.4484,
    longitude: -112.0740,
    indianPopulation: 45000,
    totalPopulation: 1680000,
    percentIndian: 2.7,
    communities: ['Hindi-speaking', 'Gujarati', 'Mixed'],
    pointsOfInterest: [
      { name: 'Temples', type: 'temple', count: 8 },
      { name: 'Grocery Stores', type: 'grocery', count: 15 },
      { name: 'Restaurants', type: 'restaurant', count: 40 },
    ],
  },
  {
    id: 'us-nyc',
    city: 'New York City',
    state: 'New York',
    country: 'US',
    latitude: 40.7128,
    longitude: -74.0060,
    indianPopulation: 280000,
    totalPopulation: 8400000,
    percentIndian: 3.3,
    communities: ['Punjabi', 'Gujarati', 'Bengali', 'Hindi-speaking', 'Mixed'],
    pointsOfInterest: [
      { name: 'Temples', type: 'temple', count: 35 },
      { name: 'Grocery Stores', type: 'grocery', count: 120 },
      { name: 'Restaurants', type: 'restaurant', count: 350 },
    ],
  },
  {
    id: 'us-la',
    city: 'Los Angeles',
    state: 'California',
    country: 'US',
    latitude: 34.0522,
    longitude: -118.2437,
    indianPopulation: 120000,
    totalPopulation: 3900000,
    percentIndian: 3.1,
    communities: ['Hindi-speaking', 'Punjabi', 'Gujarati', 'Mixed'],
    pointsOfInterest: [
      { name: 'Temples', type: 'temple', count: 22 },
      { name: 'Grocery Stores', type: 'grocery', count: 55 },
      { name: 'Restaurants', type: 'restaurant', count: 180 },
    ],
  },
  
  // Canada - Major metros
  {
    id: 'ca-brampton',
    city: 'Brampton',
    state: 'Ontario',
    country: 'CA',
    latitude: 43.7315,
    longitude: -79.7624,
    indianPopulation: 235000,
    totalPopulation: 656000,
    percentIndian: 35.8,
    communities: ['Punjabi', 'Gujarati', 'Hindi-speaking'],
    pointsOfInterest: [
      { name: 'Gurdwaras', type: 'temple', count: 18 },
      { name: 'Grocery Stores', type: 'grocery', count: 65 },
      { name: 'Restaurants', type: 'restaurant', count: 140 },
    ],
  },
  {
    id: 'ca-surrey',
    city: 'Surrey',
    state: 'British Columbia',
    country: 'CA',
    latitude: 49.1913,
    longitude: -122.8490,
    indianPopulation: 180000,
    totalPopulation: 570000,
    percentIndian: 31.6,
    communities: ['Punjabi', 'Hindi-speaking'],
    pointsOfInterest: [
      { name: 'Gurdwaras', type: 'temple', count: 22 },
      { name: 'Grocery Stores', type: 'grocery', count: 55 },
      { name: 'Restaurants', type: 'restaurant', count: 120 },
    ],
  },
  {
    id: 'ca-mississauga',
    city: 'Mississauga',
    state: 'Ontario',
    country: 'CA',
    latitude: 43.5890,
    longitude: -79.6441,
    indianPopulation: 145000,
    totalPopulation: 720000,
    percentIndian: 20.1,
    communities: ['Punjabi', 'Gujarati', 'Tamil', 'Hindi-speaking'],
    pointsOfInterest: [
      { name: 'Temples', type: 'temple', count: 14 },
      { name: 'Grocery Stores', type: 'grocery', count: 45 },
      { name: 'Restaurants', type: 'restaurant', count: 95 },
    ],
  },
  {
    id: 'ca-toronto',
    city: 'Toronto',
    state: 'Ontario',
    country: 'CA',
    latitude: 43.6532,
    longitude: -79.3832,
    indianPopulation: 210000,
    totalPopulation: 2930000,
    percentIndian: 7.2,
    communities: ['Tamil', 'Gujarati', 'Punjabi', 'Hindi-speaking', 'Mixed'],
    pointsOfInterest: [
      { name: 'Temples', type: 'temple', count: 28 },
      { name: 'Grocery Stores', type: 'grocery', count: 85 },
      { name: 'Restaurants', type: 'restaurant', count: 250 },
    ],
  },
  {
    id: 'ca-vancouver',
    city: 'Vancouver',
    state: 'British Columbia',
    country: 'CA',
    latitude: 49.2827,
    longitude: -123.1207,
    indianPopulation: 75000,
    totalPopulation: 675000,
    percentIndian: 11.1,
    communities: ['Punjabi', 'Hindi-speaking', 'Gujarati'],
    pointsOfInterest: [
      { name: 'Temples', type: 'temple', count: 12 },
      { name: 'Grocery Stores', type: 'grocery', count: 35 },
      { name: 'Restaurants', type: 'restaurant', count: 85 },
    ],
  },
  {
    id: 'ca-calgary',
    city: 'Calgary',
    state: 'Alberta',
    country: 'CA',
    latitude: 51.0447,
    longitude: -114.0719,
    indianPopulation: 65000,
    totalPopulation: 1340000,
    percentIndian: 4.9,
    communities: ['Punjabi', 'Gujarati', 'Hindi-speaking'],
    pointsOfInterest: [
      { name: 'Temples', type: 'temple', count: 10 },
      { name: 'Grocery Stores', type: 'grocery', count: 25 },
      { name: 'Restaurants', type: 'restaurant', count: 55 },
    ],
  },
  {
    id: 'ca-edmonton',
    city: 'Edmonton',
    state: 'Alberta',
    country: 'CA',
    latitude: 53.5461,
    longitude: -113.4938,
    indianPopulation: 55000,
    totalPopulation: 1010000,
    percentIndian: 5.4,
    communities: ['Punjabi', 'Hindi-speaking', 'Gujarati'],
    pointsOfInterest: [
      { name: 'Temples', type: 'temple', count: 8 },
      { name: 'Grocery Stores', type: 'grocery', count: 20 },
      { name: 'Restaurants', type: 'restaurant', count: 45 },
    ],
  },
  {
    id: 'ca-winnipeg',
    city: 'Winnipeg',
    state: 'Manitoba',
    country: 'CA',
    latitude: 49.8951,
    longitude: -97.1384,
    indianPopulation: 28000,
    totalPopulation: 750000,
    percentIndian: 3.7,
    communities: ['Punjabi', 'Hindi-speaking'],
    pointsOfInterest: [
      { name: 'Temples', type: 'temple', count: 5 },
      { name: 'Grocery Stores', type: 'grocery', count: 12 },
      { name: 'Restaurants', type: 'restaurant', count: 28 },
    ],
  },
  {
    id: 'ca-ottawa',
    city: 'Ottawa',
    state: 'Ontario',
    country: 'CA',
    latitude: 45.4215,
    longitude: -75.6972,
    indianPopulation: 35000,
    totalPopulation: 1000000,
    percentIndian: 3.5,
    communities: ['Tamil', 'Hindi-speaking', 'Telugu'],
    pointsOfInterest: [
      { name: 'Temples', type: 'temple', count: 6 },
      { name: 'Grocery Stores', type: 'grocery', count: 15 },
      { name: 'Restaurants', type: 'restaurant', count: 35 },
    ],
  },
  {
    id: 'ca-montreal',
    city: 'Montreal',
    state: 'Quebec',
    country: 'CA',
    latitude: 45.5017,
    longitude: -73.5673,
    indianPopulation: 42000,
    totalPopulation: 1780000,
    percentIndian: 2.4,
    communities: ['Punjabi', 'Gujarati', 'Hindi-speaking', 'Tamil'],
    pointsOfInterest: [
      { name: 'Temples', type: 'temple', count: 8 },
      { name: 'Grocery Stores', type: 'grocery', count: 22 },
      { name: 'Restaurants', type: 'restaurant', count: 48 },
    ],
  },
];

// Get unique states/provinces
export const getUniqueStates = (country?: 'US' | 'CA'): string[] => {
  const filtered = country 
    ? mockLocationData.filter(loc => loc.country === country)
    : mockLocationData;
  return [...new Set(filtered.map(loc => loc.state))].sort();
};

// Get filtered data
export const getFilteredData = (filters: Partial<FilterState>): LocationData[] => {
  return mockLocationData.filter(location => {
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
