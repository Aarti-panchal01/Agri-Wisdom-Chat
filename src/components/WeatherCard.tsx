
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun, CloudSun, CloudRain, HelpCircle, Droplets, ThermometerSun } from 'lucide-react';

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
        return <Sun className="h-10 w-10 text-amber-400" />;
      case 'cloudy':
        return <CloudSun className="h-10 w-10 text-gray-400" />;
      case 'rainy':
        return <CloudRain className="h-10 w-10 text-blue-500" />;
      default:
        return <HelpCircle className="h-10 w-10 text-muted-foreground" />;
    }
  };

  const getWeatherColor = () => {
    switch (condition) {
      case 'sunny':
        return 'bg-amber-50 border-amber-200';
      case 'cloudy':
        return 'bg-slate-50 border-slate-200';
      case 'rainy':
        return 'bg-blue-50 border-blue-200';
      default:
        return '';
    }
  };

  return (
    <Card className={`h-full ${temperature !== null ? getWeatherColor() : ''}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <span>Weather - {location}</span>
          {getWeatherIcon()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {temperature !== null ? (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center gap-1">
                <ThermometerSun className="h-4 w-4 text-amber-500" />
                Temperature
              </span>
              <span className="font-medium text-2xl">{temperature}°C</span>
            </div>
          ) : (
            <div className="text-center py-6 bg-muted/30 rounded-lg px-3">
              <HelpCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-muted-foreground">
                {location === 'Unknown' ? 
                  "Select a location to see weather data" : 
                  "Weather data not available"}
              </p>
            </div>
          )}
          
          {humidity !== null && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center gap-1">
                <Droplets className="h-4 w-4 text-blue-400" />
                Humidity
              </span>
              <span className="font-medium text-lg">{humidity}%</span>
            </div>
          )}
          
          {temperature !== null && (
            <div className="mt-2 text-xs text-muted-foreground border-t pt-2 text-right">
              Last updated: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
