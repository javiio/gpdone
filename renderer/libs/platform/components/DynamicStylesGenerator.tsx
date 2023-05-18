import React from 'react';
import cn from 'classnames';

export const DynamicStylesGenerator = () => {
  return (
    <div
      className={cn(
        'hidden',
        'border-gray-400 bg-gray-400 bg-gray-400/10 bg-gray-400/50 hover:bg-gray-400/25 focus:outline-gray-400',
        'border-yellow-500 bg-yellow-500 bg-yellow-500/10 bg-yellow-500/50 hover:bg-yellow-500/25 focus:outline-yellow-500',
        'border-green-500 bg-green-500 bg-green-500/10 bg-green-500/50 hover:bg-green-500/25 focus:outline-green-500',
        'border-sky-500 bg-sky-500 bg-sky-500/10 bg-sky-500/50 hover:bg-sky-500/25 focus:outline-sky-500',
        'border-orange-500 bg-orange-500 bg-orange-500/10 bg-orange-500/50 hover:bg-orange-500/25 focus:outline-orange-500',
        'border-purple-500 bg-purple-500 bg-purple-500/10 bg-purple-500/50 hover:bg-purple-500/25 focus:outline-purple-500'
      )}
    />
  );
};
