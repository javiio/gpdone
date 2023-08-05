import React from 'react';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'link'
  color?: string
};

export const Button = ({ className, variant = 'primary', color, children, ...props }: ButtonProps) => {
  const classes = [
    'text-sm py-1 px-3 rounded-md',
    variant === 'primary' && `bg-${color ?? 'purple-500'}`,
    variant === 'secondary' && 'border border-white',
    className && className,
  ];

  return (
    <button className={classes.join(' ')} {...props}>
      {children}
    </button>
  );
};
