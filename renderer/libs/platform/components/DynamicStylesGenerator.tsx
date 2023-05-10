import cn from 'classnames';

export function DynamicStylesGenerator() {
  return (
    <div
      className={cn(
        'hidden',
        'border-yellow-500 bg-yellow-500 bg-yellow-500/10 bg-yellow-500/50 hover:bg-yellow-500/25',
        'border-green-500 bg-green-500 bg-green-500/10 bg-green-500/50 hover:bg-green-500/25',
        'border-sky-500 bg-sky-500 bg-sky-500/10 bg-sky-500/50 hover:bg-sky-500/25',
        'border-orange-500 bg-orange-500 bg-orange-500/10 bg-orange-500/50 hover:bg-orange-500/25',
        'border-purple-500 bg-purple-500 bg-purple-500/10 bg-purple-500/50 hover:bg-purple-500/25'
      )}
    />
  );
}