
// This file contains mock data to simulate API responses
// In a real implementation, this would be replaced with actual API calls

// Crop recommendation data
export const getCropRecommendations = (params: {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  temperature: number;
  humidity: number;
  rainfall: number;
}) => {
  // Simple logic to determine crops based on parameters
  const recommendations = [];
  
  if (params.temperature > 25 && params.humidity > 50 && params.rainfall > 200) {
    recommendations.push("Rice (Paddy)");
  }
  
  if (params.nitrogen > 80 && params.phosphorus > 40 && params.temperature > 20) {
    recommendations.push("Wheat");
  }
  
  if (params.ph >= 6 && params.ph <= 7.5 && params.temperature > 20 && params.temperature < 35) {
    recommendations.push("Cotton");
  }
  
  if (params.nitrogen > 60 && params.ph >= 5.5 && params.ph <= 7 && params.rainfall < 150) {
    recommendations.push("Maize (Corn)");
  }
  
  if (params.phosphorus > 60 && params.potassium > 40 && params.temperature > 30) {
    recommendations.push("Sugarcane");
  }
  
  // If no specific recommendations, add some defaults
  if (recommendations.length === 0) {
    if (params.ph < 6) {
      recommendations.push("Potato");
      recommendations.push("Sweet Potato");
    } else {
      recommendations.push("Millet");
      recommendations.push("Sorghum");
    }
  }
  
  return recommendations;
};

// Fertilizer recommendation data
export const getFertilizerRecommendations = (params: {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
}) => {
  const recommendations = [];
  
  // Nitrogen recommendations
  if (params.nitrogen < 30) {
    recommendations.push("Apply Urea (46-0-0) at 100-150 kg/ha");
  } else if (params.nitrogen < 60) {
    recommendations.push("Apply Urea (46-0-0) at 50-100 kg/ha");
  }
  
  // Phosphorus recommendations
  if (params.phosphorus < 30) {
    recommendations.push("Apply DAP (18-46-0) at 100-120 kg/ha");
  } else if (params.phosphorus < 60) {
    recommendations.push("Apply DAP (18-46-0) at 50-80 kg/ha");
  }
  
  // Potassium recommendations
  if (params.potassium < 30) {
    recommendations.push("Apply MOP (0-0-60) at 80-100 kg/ha");
  } else if (params.potassium < 60) {
    recommendations.push("Apply MOP (0-0-60) at 40-60 kg/ha");
  }
  
  // pH adjustments
  if (params.ph < 5.5) {
    recommendations.push("Apply agricultural lime at 2-3 tonnes/ha to increase soil pH");
  } else if (params.ph > 7.5) {
    recommendations.push("Apply gypsum or elemental sulfur to decrease soil pH");
  }
  
  return recommendations;
};

// Weather data
export const getWeatherData = (location: string) => {
  // Mock weather data for different locations
  const weatherData: {
    [key: string]: { temperature: number; condition: 'sunny' | 'cloudy' | 'rainy'; humidity: number }
  } = {
    'Mumbai': { temperature: 32, condition: 'cloudy', humidity: 78 },
    'Delhi': { temperature: 38, condition: 'sunny', humidity: 45 },
    'Bangalore': { temperature: 26, condition: 'cloudy', humidity: 65 },
    'Hyderabad': { temperature: 33, condition: 'sunny', humidity: 50 },
    'Chennai': { temperature: 34, condition: 'sunny', humidity: 72 },
    'Kolkata': { temperature: 31, condition: 'rainy', humidity: 80 },
    'Pune': { temperature: 29, condition: 'cloudy', humidity: 60 },
    'Ahmedabad': { temperature: 36, condition: 'sunny', humidity: 43 },
    'Jaipur': { temperature: 37, condition: 'sunny', humidity: 38 },
    'Lucknow': { temperature: 34, condition: 'cloudy', humidity: 55 },
  };
  
  // Return data for the requested location, or default if not found
  return weatherData[location] || { temperature: 30, condition: 'sunny', humidity: 60 };
};

// FAQ chatbot data
export const getFarmerChatResponse = (query: string) => {
  // Simple keyword-based responses
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('paddy') || lowerQuery.includes('rice')) {
    if (lowerQuery.includes('plant') || lowerQuery.includes('sow') || lowerQuery.includes('when')) {
      return "Rice (paddy) is typically planted during the monsoon season (June to July) in most parts of India. Ensure your fields are well-leveled and have good irrigation. Transplant seedlings when they're 21-25 days old.";
    }
    if (lowerQuery.includes('water') || lowerQuery.includes('irrigation')) {
      return "Rice requires 5-7.5cm of standing water during the growing period. Reduce water during the final ripening stage. Overall, rice requires about 1,000-1,500mm of water throughout its growing season.";
    }
  }
  
  if (lowerQuery.includes('wheat')) {
    if (lowerQuery.includes('plant') || lowerQuery.includes('sow') || lowerQuery.includes('when')) {
      return "Wheat should be sown from late October to early December depending on your region. The optimal temperature for germination is 20-25°C. Prepare a fine seedbed and sow seeds 4-5cm deep.";
    }
    if (lowerQuery.includes('water') || lowerQuery.includes('irrigation')) {
      return "Wheat needs 4-6 irrigations depending on soil type. Critical irrigation stages are Crown Root Initiation (20-25 days), tillering, jointing, flowering, and grain filling stages.";
    }
  }
  
  if (lowerQuery.includes('pest') || lowerQuery.includes('insect')) {
    if (lowerQuery.includes('cotton')) {
      return "For cotton, watch for bollworms, aphids, and whiteflies. Use neem-based pesticides or recommended insecticides. Implement Integrated Pest Management (IPM) practices like crop rotation and beneficial insects.";
    }
    if (lowerQuery.includes('brinjal') || lowerQuery.includes('eggplant')) {
      return "For brinjal (eggplant), protect against fruit and shoot borer by using pheromone traps, removing affected shoots, and applying neem oil or recommended insecticides at appropriate intervals.";
    }
    return "Monitor your fields regularly for pest infestations. Use natural predators, crop rotation, and resistant varieties as first line of defense. Apply appropriate pesticides only when necessary, following proper dosage and safety precautions.";
  }
  
  if (lowerQuery.includes('fertilizer')) {
    return "Apply fertilizers based on soil testing results. As a general guideline, most crops need NPK (Nitrogen, Phosphorus, Potassium) in varying amounts. Apply nitrogen fertilizers in split doses, phosphorus at sowing time, and potassium based on crop requirements.";
  }
  
  if (lowerQuery.includes('organic')) {
    return "For organic farming, use compost, vermicompost, green manure, and crop rotation. Apply neem cake for pest management. Growing leguminous crops helps in nitrogen fixation. Maintain proper crop diversity to naturally manage pests and diseases.";
  }
  
  if (lowerQuery.includes('sugarcane') && lowerQuery.includes('water')) {
    return "Sugarcane requires about 1500-3000mm of water throughout its growing period. Critical irrigation periods are germination, tillering, grand growth, and maturity phases. Use drip irrigation for water efficiency.";
  }
  
  // Default response
  return "I'm here to help with your farming questions about crops, fertilizers, pest management, and weather. Please ask a specific question about farming practices, and I'll provide the information you need.";
};
