import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';

interface ResizablePanelsProps {
  vertical?: boolean
  aSize?: string
  bSize?: string
  children: React.ReactNode[]
};

export const ResizablePanels: React.FC<ResizablePanelsProps> = ({
  vertical = false,
  children,
  aSize = '50%',
  bSize = '50%',
}
) => {
  if (React.Children.count(children) !== 2) {
    throw new Error('ResizablePanels component requires exactly two children elements.');
  }

  const [panelASize, setPanelASize] = useState(aSize);
  const [panelBSize, setPanelBSize] = useState(bSize);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragOffset = useRef(0);

  useEffect(() => {
    const handleMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const totalSize = vertical ? containerRect.height : containerRect.width;
      const delta = vertical ? e.clientY - dragOffset.current : e.clientX - dragOffset.current;
      const newSizeA = (panelASize === 'auto' ? 0 : parseFloat(panelASize)) + (delta / totalSize) * 100;
      const newSizeB = (panelBSize === 'auto' ? 0 : parseFloat(panelBSize)) - (delta / totalSize) * 100;

      setPanelASize(`${newSizeA}%`);
      setPanelBSize(`${newSizeB}%`);
      dragOffset.current = vertical ? e.clientY : e.clientX;
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [panelASize, panelBSize, vertical]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    dragOffset.current = vertical ? e.clientY : e.clientX;
  };

  return (
    <span className={cn('flex',
      vertical && 'flex-col h-full',
      !vertical && 'flex-row w-full h-full'
    )}
     ref={containerRef}
    >
      <div
        className="flex-1 overflow-auto"
        style={{ flexBasis: panelASize }}
      >
        {React.Children.toArray(children)[0]}
      </div>

      <div
        className={cn('bg-slate-950 items-center justify-center flex',
          vertical && 'cursor-row-resize w-full h-4',
          !vertical && 'cursor-col-resize h-full w-4'
        )}
        onMouseDown={handleMouseDown}
      >
        <div className={`bg-slate-400 rounded-full ${vertical ? 'w-28 h-[3px]' : 'h-20 w-[3px]'}`}
        />
      </div>

      <div
        className="flex-1 overflow-auto bg-slate-700"
        style={{ flexBasis: panelBSize }}
      >
        {React.Children.toArray(children)[1]}
      </div>
    </span>
  );
};
