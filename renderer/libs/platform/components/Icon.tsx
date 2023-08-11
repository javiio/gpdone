import React from 'react';
import {
  PlusIcon,
  XMarkIcon,
  ArrowPathIcon,
  LinkIcon,
  PencilIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  CheckIcon,
  ChevronUpDownIcon,
  HomeIcon,
  QueueListIcon,
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowTopRightOnSquareIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';

interface IconProps {
  name: string
  size?: string | number
  className?: string
}

const ICONS_MAP = {
  plus: PlusIcon,
  x: XMarkIcon,
  refresh: ArrowPathIcon,
  link: LinkIcon,
  pencil: PencilIcon,
  plusCircle: PlusCircleIcon,
  minusCircle: MinusCircleIcon,
  check: CheckIcon,
  chevronUpDown: ChevronUpDownIcon,
  home: HomeIcon,
  tasks: QueueListIcon,
  calendar: CalendarDaysIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  sendArrow: ArrowTopRightOnSquareIcon,
  copy: DocumentDuplicateIcon,
  trash: TrashIcon,
  dots: EllipsisHorizontalIcon,
};

export const Icon = ({ name, size = '5', className = '', ...props }: IconProps) => {
  const IconComp = ICONS_MAP[name];

  if (!IconComp) {
    return null;
  }

  return (
    <IconComp
      className={`h-${size} w-${size} ${className}`}
      {...props}
    />
  );
};
