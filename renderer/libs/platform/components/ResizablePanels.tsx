import React, { useState, useRef, useEffect } from 'react';

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

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: vertical ? 'column' : 'row',
    height: vertical ? '100%' : undefined,
    width: vertical ? undefined : '100%',
  };

  const panelStyle: React.CSSProperties = {
    flex: '1 1 auto',
    overflow: 'auto',
  };

  const panelAStyle: React.CSSProperties = {
    ...panelStyle,
    flexBasis: panelASize,
  };

  const panelBStyle: React.CSSProperties = {
    ...panelStyle,
    flexBasis: panelBSize,
  };

  const dividerStyle: React.CSSProperties = {
    cursor: vertical ? 'row-resize' : 'col-resize',
    width: vertical ? '100%' : '4px',
    height: vertical ? '4px' : '100%',
  };

  return (
    <div className="flex h-full" style={containerStyle} ref={containerRef}>
      <div style={panelAStyle}>{React.Children.toArray(children)[0]}</div>
      <div
        className="bg-slate-400"
        style={dividerStyle}
        onMouseDown={handleMouseDown}
      />
      <div style={panelBStyle}>{React.Children.toArray(children)[1]}</div>
    </div>
  );
};
