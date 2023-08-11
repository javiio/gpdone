import React from 'react';
import { Icon, Loading } from '../';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'clear' | 'link'
  theme?: 'light' | 'dark'
  icon?: string
  color?: string
  isLoading?: boolean
};

export const Button = ({
  className,
  size = 'md',
  variant = 'primary',
  color,
  theme = 'dark',
  icon,
  children,
  isLoading,
  ...props
}: ButtonProps) => {
  const classes = [
    'rounded-md flex space-x-1.5 items-center',
    size === 'sm' && 'text-sm py-1 px-3',
    size === 'md' && 'text-md py-2 px-4',
    variant === 'primary' && `bg-${color ?? 'purple-500'}`,
    variant === 'clear' && 'border border-white',
    variant === 'link' && 'text-blue-500 hover:underline',
    theme === 'light' && '!text-slate-900 !border-slate-900',
    className && className,
  ];

  return (
    <button className={classes.join(' ')} {...props} disabled={isLoading}>
      {isLoading
        ? <Loading />
        : <>
          {icon && <Icon name={icon} size={4} />}
          <span>{children}</span>
        </>
      }
    </button>
  );
};
