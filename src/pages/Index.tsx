
import React, { useState, useEffect } from 'react';
import AgriHeader from '@/components/AgriHeader';
import ChatContainer, { Message } from '@/components/ChatContainer';
import CropRecommendationForm from '@/components/CropRecommendationForm';
import RecommendationCard from '@/components/RecommendationCard';
import WeatherCard from '@/components/WeatherCard';
import { getFarmerChatResponse, getCropRecommendations, getFertilizerRecommendations, getWeatherData } from '@/mockData';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cropRecommendations, setCropRecommendations] = useState<string[]>([]);
  const [fertilizerRecommendations, setFertilizerRecommendations] = useState<string[]>([]);
  const [weatherData, setWeatherData] = useState({ location: '', temperature: null, condition: 'unknown' as const, humidity: null });
  
  useEffect(() => {
    // Add the welcome message when the component mounts
    const welcomeMessage: Message = {
      id: uuidv4(),
      content: "Hello! I'm AgriBot, your farming assistant. I can help with crop recommendations, fertilizer suggestions, and answer your farming questions. How can I help you today?",
      type: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([welcomeMessage]);
  }, []);
  
  const handleSendMessage = (messageContent: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      content: messageContent,
      type: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);
    
    // Simulate API response delay
    setTimeout(() => {
      const response = getFarmerChatResponse(messageContent);
      
      const botMessage: Message = {
        id: uuidv4(),
        content: response,
        type: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleRecommendationSubmit = (data: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    ph: number;
    temperature: number;
    humidity: number;
    rainfall: number;
    location: string;
  }) => {
    if (!data.location) {
      toast({
        title: "Location Required",
        description: "Please select a location to get recommendations.",
        variant: "destructive",
      });
      return;
    }
    
    // Get crop recommendations
    const crops = getCropRecommendations(data);
    setCropRecommendations(crops);
    
    // Get fertilizer recommendations
    const fertilizers = getFertilizerRecommendations(data);
    setFertilizerRecommendations(fertilizers);
    
    // Get weather data
    const weather = getWeatherData(data.location);
    setWeatherData({
      location: data.location,
      temperature: weather.temperature,
      condition: weather.condition,
      humidity: weather.humidity
    });
    
    toast({
      title: "Recommendations Updated",
      description: `Based on your soil parameters, we've updated your recommendations for ${data.location}.`,
    });
    
    // Add a bot message with the recommendations
    const botMessage: Message = {
      id: uuidv4(),
      content: `Based on your soil parameters (N: ${data.nitrogen}, P: ${data.phosphorus}, K: ${data.potassium}, pH: ${data.ph}), I recommend considering ${crops.join(", ")} for your farm. ${fertilizers.length > 0 ? "For fertilizers, " + fertilizers[0].toLowerCase() : ""}`,
      type: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-4 px-4 md:py-8 md:px-0">
        <AgriHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar - Recommendation Form */}
          <div className="lg:col-span-1 space-y-6">
            <CropRecommendationForm onSubmit={handleRecommendationSubmit} />
            <WeatherCard 
              location={weatherData.location || undefined}
              temperature={weatherData.temperature}
              condition={weatherData.condition}
              humidity={weatherData.humidity}
            />
          </div>
          
          {/* Main chat area */}
          <div className="lg:col-span-1 flex flex-col bg-card rounded-lg shadow-sm border overflow-hidden h-[70vh]">
            <ChatContainer 
              initialMessages={messages} 
              onSendMessage={handleSendMessage} 
              isLoading={isLoading}
            />
          </div>
          
          {/* Right sidebar - Recommendations */}
          <div className="lg:col-span-1 space-y-6">
            <RecommendationCard
              type="crop"
              title="Crop Recommendations"
              recommendations={cropRecommendations}
              className="mb-6"
            />
            <RecommendationCard
              type="fertilizer"
              title="Fertilizer Suggestions"
              recommendations={fertilizerRecommendations}
            />
          </div>
        </div>
        
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>AgriBot - AI-Powered Smart Farming Assistant</p>
          <p className="text-xs">Use this app to get crop recommendations, fertilizer suggestions, weather forecasts, and farming advice.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
