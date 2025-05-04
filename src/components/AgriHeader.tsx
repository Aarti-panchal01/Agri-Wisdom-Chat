
import React from 'react';
import { Leaf } from 'lucide-react';

const AgriHeader = () => {
  return (
    <header className="flex items-center gap-2 mb-4">
      <div className="bg-primary rounded-full p-2">
        <Leaf className="h-6 w-6 text-primary-foreground" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center">
          AgriBot <span className="text-sm bg-secondary text-secondary-foreground px-2 rounded ml-2">Beta</span>
        </h1>
        <p className="text-sm text-muted-foreground">Your smart farming assistant</p>
      </div>
    </header>
  );
};

export default AgriHeader;
