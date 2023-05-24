import React from 'react';
import cn from 'classnames';
import type { DateTime } from 'luxon';
import { usePlanning } from '../';

export const PlanningList = ({ date }: { date?: DateTime }) => {
  const { planning } = usePlanning(date);

  return (
    <ul>
      {planning.map((project, i) => (
        <li
          key={i}
          className={cn(
            'border rounded-md overflow-hidden w-32 my-2 py-3 text-center opacity-80',
            `border-${project?.color}/75 bg-${project?.color}/10`
          )}
        >
          {project?.name}
        </li>
      ))}
    </ul>
  );
};
