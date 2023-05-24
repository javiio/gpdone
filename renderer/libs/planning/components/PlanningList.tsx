import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import type { DateTime } from 'luxon';
import { usePlanning } from '~planning';
import { useDailyBlocks, type Block } from '~blocks';

export const PlanningList = ({ date }: { date?: DateTime }) => {
  const { planning } = usePlanning(date);
  const { blocks } = useDailyBlocks(date);
  const [highlightedPlanning, setHighlightedPlanning] = useState<boolean[]>([]);

  useEffect(() => {
    if (planning && blocks) {
      const newHighlightedPlanning: boolean[] = [];
      const projectBlockCount = new Map<string, number>();

      // Count number of blocks per project
      blocks.forEach((block: Block) => {
        projectBlockCount.set(block.projectId, (projectBlockCount.get(block.projectId) ?? 0) + 1);
      });

      // Set project plan to be highlighted if there are blocks for it
      planning.forEach((project) => {
        const count = projectBlockCount.get(project?.id) ?? 0;
        newHighlightedPlanning.push(count > 0);
        if (count > 0) {
          projectBlockCount.set(project?.id, count - 1);
        }
      });

      setHighlightedPlanning(newHighlightedPlanning);
    }
  }, [planning, blocks]);

  return (
    <ul>
      {planning.map((project, i) => (
        <li
          key={i}
          className={cn(
            'border rounded-md overflow-hidden w-32 my-2 py-3 text-center',
            highlightedPlanning[i] ? `border-${project?.color}/50 bg-${project?.color}/50` : `border-${project?.color}/75 bg-${project?.color}/10`,
            highlightedPlanning[i] ? '' : 'opacity-80'
          )}
        >
          {project?.name}
        </li>
      ))}
    </ul>
  );
};
