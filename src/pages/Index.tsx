import { useState, useMemo } from 'react';
import { HeatMap } from '@/components/HeatMap';
import { FilterSidebar } from '@/components/FilterSidebar';
import { LocationDetailPanel } from '@/components/LocationDetailPanel';
import { locationData, getFilteredData, FilterState, LocationData } from '@/data/demographicData';
import { Menu, X } from 'lucide-react';

const Index = () => {
  const [filters, setFilters] = useState<Partial<FilterState>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filteredData = useMemo(() => {
    let data = getFilteredData(filters);
    
    if (searchQuery) {
      data = data.filter(loc => 
        loc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.state.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return data;
  }, [filters, searchQuery]);

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-background">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-card border border-border rounded-lg shadow-lg"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed lg:relative z-40 h-full w-80 transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:overflow-hidden'}
        `}
      >
        <FilterSidebar
          data={filteredData}
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={setSearchQuery}
          onLocationSelect={setSelectedLocation}
          selectedLocation={selectedLocation}
        />
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <HeatMap
          data={filteredData}
          onLocationSelect={setSelectedLocation}
          selectedLocation={selectedLocation}
        />

        {/* Legend */}
        <div className="absolute bottom-6 right-6 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-4 z-10">
          <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
            Population Density
          </p>
          <div className="flex items-center gap-2">
            <div className="w-32 h-3 rounded-full" style={{
              background: 'linear-gradient(to right, #67A9CF, #D1E5F0, #FDDBC7, #EF8A62, #FF6B35)'
            }} />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>

        {/* Location Detail Panel */}
        {selectedLocation && (
          <LocationDetailPanel
            location={selectedLocation}
            onClose={() => setSelectedLocation(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
