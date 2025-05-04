
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Wheat, Map } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecommendationCardProps {
  type: 'crop' | 'fertilizer';
  title: string;
  recommendations: string[];
  className?: string;
}

const RecommendationCard = ({ 
  type, 
  title, 
  recommendations,
  className
}: RecommendationCardProps) => {
  const getIcon = () => {
    switch (type) {
      case 'crop':
        return <Wheat className="h-5 w-5 text-agri-wheat" />;
      case 'fertilizer':
        return <Leaf className="h-5 w-5 text-agri-green-light" />;
      default:
        return <Map className="h-5 w-5" />;
    }
  };

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-semibold flex items-center gap-2">
          {getIcon()} {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recommendations.length > 0 ? (
          <ul className="space-y-2 list-disc pl-5">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="text-sm break-words hyphens-auto pb-1">
                {recommendation}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No recommendations available. Please provide soil data.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
