
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun, CloudSun, CloudRain } from 'lucide-react';

interface WeatherCardProps {
  location?: string;
  temperature?: number | null;
  condition?: 'sunny' | 'cloudy' | 'rainy' | 'unknown';
  humidity?: number | null;
}

const WeatherCard = ({ 
  location = 'Unknown',
  temperature = null, 
  condition = 'unknown',
  humidity = null
}: WeatherCardProps) => {
  
  const getWeatherIcon = () => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-8 w-8 text-amber-400" />;
      case 'cloudy':
        return <CloudSun className="h-8 w-8 text-gray-400" />;
      case 'rainy':
        return <CloudRain className="h-8 w-8 text-agri-blue" />;
      default:
        return <Sun className="h-8 w-8 text-muted-foreground" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <span>Weather - {location}</span>
          {getWeatherIcon()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {temperature !== null ? (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Temperature</span>
              <span className="font-medium">{temperature}°C</span>
            </div>
          ) : (
            <div className="text-muted-foreground text-sm">Weather data not available</div>
          )}
          
          {humidity !== null && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Humidity</span>
              <span className="font-medium">{humidity}%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
