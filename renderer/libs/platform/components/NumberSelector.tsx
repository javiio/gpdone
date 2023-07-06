import React from 'react';
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline';

interface Props {
  value: number
  setValue: (number) => void
}
export const NumberSelector = ({ value, setValue }: Props) => {
  return (
    <div className="flex items-center">
      <MinusCircleIcon className="h-5 w-5" onClick={() => { value > 0 && setValue(value - 1); }} />
      <div className="w-5 text-center">{value}</div>
      <PlusCircleIcon className="h-5 w-5" onClick={() => { setValue(value + 1); }} />
    </div>
  );
};
