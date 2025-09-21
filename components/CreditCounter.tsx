'use client';

import { Star } from 'lucide-react';
import { cn } from '../lib/utils';

interface CreditCounterProps {
  credits: number;
  variant?: 'iconLeft' | 'plain';
  className?: string;
}

export function CreditCounter({ 
  credits, 
  variant = 'plain', 
  className 
}: CreditCounterProps) {
  return (
    <div className={cn(
      'flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/30',
      className
    )}>
      {variant === 'iconLeft' && (
        <Star className="w-4 h-4 text-accent fill-current" />
      )}
      <span className="text-white font-semibold">
        {credits.toFixed(2)}
      </span>
      {variant === 'plain' && (
        <Star className="w-4 h-4 text-accent fill-current" />
      )}
    </div>
  );
}
