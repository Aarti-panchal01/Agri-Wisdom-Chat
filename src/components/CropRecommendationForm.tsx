
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface CropRecommendationFormProps {
  onSubmit: (data: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    ph: number;
    temperature: number;
    humidity: number;
    rainfall: number;
    location: string;
  }) => void;
}

const CropRecommendationForm = ({ onSubmit }: CropRecommendationFormProps) => {
  const [formData, setFormData] = useState({
    nitrogen: 50,
    phosphorus: 50,
    potassium: 50,
    ph: 6.5,
    temperature: 25,
    humidity: 60,
    rainfall: 200,
    location: "",
  });

  const handleChange = (field: string, value: number | string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const locations = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", 
    "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Other"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crop Recommendation</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Location</Label>
            <Select 
              value={formData.location}
              onValueChange={(value) => handleChange('location', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Nitrogen (N) - {formData.nitrogen} kg/ha</Label>
            <Slider
              value={[formData.nitrogen]}
              min={0}
              max={150}
              step={1}
              onValueChange={(value) => handleChange('nitrogen', value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Phosphorus (P) - {formData.phosphorus} kg/ha</Label>
            <Slider
              value={[formData.phosphorus]}
              min={0}
              max={150}
              step={1}
              onValueChange={(value) => handleChange('phosphorus', value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Potassium (K) - {formData.potassium} kg/ha</Label>
            <Slider
              value={[formData.potassium]}
              min={0}
              max={150}
              step={1}
              onValueChange={(value) => handleChange('potassium', value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label>pH Value - {formData.ph}</Label>
            <Slider
              value={[formData.ph]}
              min={3}
              max={10}
              step={0.1}
              onValueChange={(value) => handleChange('ph', value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Temperature (°C) - {formData.temperature}°C</Label>
            <Slider
              value={[formData.temperature]}
              min={5}
              max={45}
              step={0.5}
              onValueChange={(value) => handleChange('temperature', value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Humidity (%) - {formData.humidity}%</Label>
            <Slider
              value={[formData.humidity]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => handleChange('humidity', value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Rainfall (mm) - {formData.rainfall} mm</Label>
            <Slider
              value={[formData.rainfall]}
              min={0}
              max={500}
              step={1}
              onValueChange={(value) => handleChange('rainfall', value[0])}
            />
          </div>

          <Button type="submit" className="w-full">Get Recommendations</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CropRecommendationForm;
