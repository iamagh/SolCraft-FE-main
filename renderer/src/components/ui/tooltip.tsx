// components/Tooltip.tsx
import React from 'react';

type TooltipProps = {
  title: string; // Text to show in the tooltip
  children: React.ReactNode; // The content that will have the tooltip
  placement: string;
};

export default function Tooltip({ title, children, placement }: TooltipProps) {

  return (
    <div className="relative group">
      {/* Content with tooltip */}
      {children}

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex items-center p-2 rounded-md bg-gray-800 text-white text-sm">
        {title}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 transform rotate-45"></div>
      </div>
    </div>
  );
}
