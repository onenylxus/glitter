'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Heading = () => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl">
        Write notes<br />in a minimal style.
      </h1>
      <h3 className="font-medium text-base sm:text-xl md:text-2xl">
        Glitter is a minimal, flexible and personal note-taking application.
      </h3>
      <Button>
        Get Glitter free
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default Heading;
