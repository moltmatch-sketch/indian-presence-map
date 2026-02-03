import { useState } from 'react';
import { Search, X, MapPin, Users, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  LocationData,
  FilterState,
  COMMUNITY_TYPES,
  POI_TYPES,
  getUniqueStates,
  getStats,
} from '@/data/demographicData';

interface FilterSidebarProps {
  data: LocationData[];
  filters: Partial<FilterState>;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  onSearch: (query: string) => void;
  onLocationSelect: (location: LocationData) => void;
  selectedLocation: LocationData | null;
}

const US_STATES = getUniqueStates('US');
const CA_PROVINCES = getUniqueStates('CA');

export const FilterSidebar = ({
  data,
  filters,
  onFiltersChange,
  onSearch,
  onLocationSelect,
  selectedLocation,
}: FilterSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    regions: true,
    communities: false,
    population: true,
    pois: false,
  });

  const stats = getStats(data);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const toggleCountry = (country: 'US' | 'CA') => {
    const current = filters.countries || [];
    const newCountries = current.includes(country)
      ? current.filter(c => c !== country)
      : [...current, country];
    onFiltersChange({ ...filters, countries: newCountries });
  };

  const toggleState = (state: string) => {
    const current = filters.states || [];
    const newStates = current.includes(state)
      ? current.filter(s => s !== state)
      : [...current, state];
    onFiltersChange({ ...filters, states: newStates });
  };

  const toggleCommunity = (community: string) => {
    const current = filters.communities || [];
    const newCommunities = current.includes(community as any)
      ? current.filter(c => c !== community)
      : [...current, community as any];
    onFiltersChange({ ...filters, communities: newCommunities });
  };

  const handlePopulationChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      minPopulation: value[0] * 1000,
      maxPopulation: value[1] * 1000,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
    setSearchQuery('');
    onSearch('');
  };

  const hasActiveFilters = 
    (filters.countries?.length ?? 0) > 0 ||
    (filters.states?.length ?? 0) > 0 ||
    (filters.communities?.length ?? 0) > 0 ||
    filters.minPopulation !== undefined ||
    filters.maxPopulation !== undefined;

  const filteredCities = searchQuery
    ? data.filter(loc => 
        loc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.state.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-card to-background border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-xl font-display font-bold text-gradient-saffron mb-1">
          Indian Diaspora Map
        </h1>
        <p className="text-xs text-muted-foreground">
          Explore Indian communities across North America
        </p>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search city or state..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 bg-secondary border-border focus:border-primary"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {filteredCities.length > 0 && (
          <div className="absolute z-50 mt-2 w-[calc(100%-2rem)] bg-popover border border-border rounded-lg shadow-xl max-h-60 overflow-auto">
            {filteredCities.map(city => (
              <button
                key={city.id}
                onClick={() => {
                  onLocationSelect(city);
                  setSearchQuery('');
                }}
                className="w-full px-4 py-3 text-left hover:bg-secondary flex items-center gap-3 border-b border-border last:border-0"
              >
                <MapPin className="w-4 h-4 text-primary" />
                <div>
                  <p className="font-medium">{city.city}</p>
                  <p className="text-xs text-muted-foreground">
                    {city.state}, {city.country === 'US' ? 'USA' : 'Canada'}
                  </p>
                </div>
                <span className="ml-auto text-primary font-semibold">
                  {city.indianPopulation.toLocaleString()}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Stats Bar */}
      <div className="p-4 border-b border-border bg-secondary/50">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <p className="text-2xl font-display font-bold text-primary">
              {(stats.totalIndianPop / 1000000).toFixed(1)}M
            </p>
            <p className="text-xs text-muted-foreground">Total Population</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-display font-bold text-foreground">
              {stats.totalCities}
            </p>
            <p className="text-xs text-muted-foreground">Cities</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <ScrollArea className="flex-1 custom-scrollbar">
        <div className="p-4 space-y-4">
          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <X className="w-4 h-4 mr-2" />
              Clear All Filters
            </Button>
          )}

          {/* Country Filter */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Country
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => toggleCountry('US')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  filters.countries?.includes('US')
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                🇺🇸 USA
              </button>
              <button
                onClick={() => toggleCountry('CA')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  filters.countries?.includes('CA')
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                🇨🇦 Canada
              </button>
            </div>
          </div>

          {/* State/Province Filter */}
          <Collapsible open={expandedSections.regions} onOpenChange={() => toggleSection('regions')}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Regions
              </span>
              {expandedSections.regions ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-2">
              {(!filters.countries?.length || filters.countries.includes('US')) && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">US States</p>
                  <div className="flex flex-wrap gap-1.5">
                    {US_STATES.map(state => (
                      <button
                        key={state}
                        onClick={() => toggleState(state)}
                        className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                          filters.states?.includes(state)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        }`}
                      >
                        {state}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {(!filters.countries?.length || filters.countries.includes('CA')) && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Canadian Provinces</p>
                  <div className="flex flex-wrap gap-1.5">
                    {CA_PROVINCES.map(province => (
                      <button
                        key={province}
                        onClick={() => toggleState(province)}
                        className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                          filters.states?.includes(province)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        }`}
                      >
                        {province}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>

          {/* Population Filter */}
          <Collapsible open={expandedSections.population} onOpenChange={() => toggleSection('population')}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                <Users className="w-4 h-4 inline mr-2" />
                Population Size
              </span>
              {expandedSections.population ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4 pb-2">
              <Slider
                defaultValue={[0, 300]}
                min={0}
                max={300}
                step={10}
                onValueChange={handlePopulationChange}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{filters.minPopulation ? `${(filters.minPopulation / 1000).toFixed(0)}K` : '0'}</span>
                <span>{filters.maxPopulation ? `${(filters.maxPopulation / 1000).toFixed(0)}K` : '300K+'}</span>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Community Type Filter */}
          <Collapsible open={expandedSections.communities} onOpenChange={() => toggleSection('communities')}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Communities
              </span>
              {expandedSections.communities ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
              {COMMUNITY_TYPES.map(community => (
                <label
                  key={community}
                  className="flex items-center gap-3 py-1.5 cursor-pointer group"
                >
                  <Checkbox
                    checked={filters.communities?.includes(community)}
                    onCheckedChange={() => toggleCommunity(community)}
                    className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <span className="text-sm group-hover:text-foreground text-muted-foreground transition-colors">
                    {community}
                  </span>
                </label>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* POI Filter */}
          <Collapsible open={expandedSections.pois} onOpenChange={() => toggleSection('pois')}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Points of Interest
              </span>
              {expandedSections.pois ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
              {POI_TYPES.map(poi => (
                <label
                  key={poi.value}
                  className="flex items-center gap-3 py-1.5 cursor-pointer group"
                >
                  <Checkbox className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                  <span className="text-lg">{poi.icon}</span>
                  <span className="text-sm group-hover:text-foreground text-muted-foreground transition-colors">
                    {poi.label}
                  </span>
                </label>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">
          Data from US Census & Statistics Canada
        </p>
      </div>
    </div>
  );
};
