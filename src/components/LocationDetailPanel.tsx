import { X, MapPin, Users, TrendingUp, ExternalLink } from 'lucide-react';
import { LocationData } from '@/data/demographicData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface LocationDetailPanelProps {
  location: LocationData;
  onClose: () => void;
}

export const LocationDetailPanel = ({ location, onClose }: LocationDetailPanelProps) => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl animate-fade-in z-10">
      {/* Header */}
      <div className="flex items-start justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold">{location.city}</h2>
            <p className="text-muted-foreground">
              {location.state}, {location.country === 'US' ? 'USA' : 'Canada'}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="text-center p-3 bg-secondary/50 rounded-lg">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-2xl font-display font-bold text-primary">
              {location.indianPopulation.toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Indian Population</p>
        </div>
        <div className="text-center p-3 bg-secondary/50 rounded-lg">
          <div className="flex items-center justify-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-2xl font-display font-bold">{location.percentIndian}%</span>
          </div>
          <p className="text-xs text-muted-foreground">of Total Pop.</p>
        </div>
        <div className="text-center p-3 bg-secondary/50 rounded-lg">
          <span className="text-2xl font-display font-bold">
            {location.totalPopulation.toLocaleString()}
          </span>
          <p className="text-xs text-muted-foreground">Total Population</p>
        </div>
      </div>

      {/* Communities */}
      <div className="px-4 pb-4">
        <p className="text-sm font-medium text-muted-foreground mb-2">Major Communities</p>
        <div className="flex flex-wrap gap-2">
          {location.communities.map(community => (
            <Badge 
              key={community} 
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20"
            >
              {community}
            </Badge>
          ))}
        </div>
      </div>

      {/* Points of Interest */}
      <div className="px-4 pb-4">
        <p className="text-sm font-medium text-muted-foreground mb-2">Points of Interest</p>
        <div className="grid grid-cols-3 gap-2">
          {location.pointsOfInterest.map(poi => (
            <div 
              key={poi.type}
              className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg"
            >
              <span className="text-lg">
                {poi.type === 'temple' ? '🛕' : 
                 poi.type === 'grocery' ? '🛒' : 
                 poi.type === 'restaurant' ? '🍛' : '📍'}
              </span>
              <div>
                <p className="text-sm font-semibold">{poi.count}</p>
                <p className="text-xs text-muted-foreground capitalize">{poi.type}s</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 p-4 border-t border-border">
        <Button variant="outline" className="flex-1" size="sm">
          <ExternalLink className="w-4 h-4 mr-2" />
          View Details
        </Button>
        <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90" size="sm">
          Explore Area
        </Button>
      </div>
    </div>
  );
};
