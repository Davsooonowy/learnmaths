import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    'flex h-10 w-full rounded-lg border border-blue-200 bg-blue-50 text-blue-900 px-4 py-2 text-md shadow-md transition-colors file:border-0 file:bg-transparent file:text-md file:font-medium placeholder:text-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-50 dark:placeholder:text-blue-400 dark:focus-visible:ring-blue-300',
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = 'Input';

export { Input };
