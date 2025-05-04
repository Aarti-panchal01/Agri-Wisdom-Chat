
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun, CloudSun, CloudRain, HelpCircle, Droplets } from 'lucide-react';

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
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      default:
        return <HelpCircle className="h-8 w-8 text-muted-foreground" />;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <span>Weather - {location}</span>
          {getWeatherIcon()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {temperature !== null ? (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Temperature</span>
              <span className="font-medium text-lg">{temperature}°C</span>
            </div>
          ) : (
            <div className="text-muted-foreground text-sm py-2 bg-muted/30 rounded px-3">
              {location === 'Unknown' ? 
                "Select a location to see weather data" : 
                "Weather data not available"}
            </div>
          )}
          
          {humidity !== null && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center">
                <Droplets className="h-4 w-4 mr-1 text-blue-400" />
                Humidity
              </span>
              <span className="font-medium">{humidity}%</span>
            </div>
          )}
          
          {temperature !== null && (
            <div className="mt-2 text-xs text-muted-foreground">
              Last updated: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
