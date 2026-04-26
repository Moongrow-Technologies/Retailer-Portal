import React from 'react';

export default function SegmentedProgress({ value, segments = 10, color = '#6B7280', bgColor = '#D1D5DB', className = '' }) {
  const filled = Math.round((value / 100) * segments);

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: segments }).map((_, i) => (
        <div
          key={i}
          className="h-1.5 flex-1 rounded-full"
          style={{ backgroundColor: i < filled ? color : bgColor }}
        />
      ))}
    </div>
  );
}