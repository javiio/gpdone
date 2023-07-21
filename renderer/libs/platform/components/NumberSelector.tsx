import React from 'react';
import { IconButton } from './IconButton';

interface Props {
  value: number
  setValue: (number) => void
}
export const NumberSelector = ({ value, setValue }: Props) => {
  return (
    <div className="flex items-center">
      <IconButton name="minusCircle" onClick={() => { value > 0 && setValue(value - 1); }} />
      <div className="w-5 text-center">{value}</div>
      <IconButton name="plusCircle" onClick={() => { setValue(value + 1); }} />
    </div>
  );
};
