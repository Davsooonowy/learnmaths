import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
                      className,
                      classNames,
                      showOutsideDays = true,
                      ...props
                  }: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn('p-3', className)}
            classNames={{
                ...classNames,
                nav_button: cn(
                    buttonVariants({ variant: 'solid' }),
                    'h-7 w-7 bg-blue-500 p-0 opacity-70 hover:opacity-100'
                ),
                day: cn(
                    buttonVariants({ variant: 'solid' }),
                    'h-8 w-8 p-0 font-normal aria-selected:opacity-100 bg-green-500'
                ),
            }}
            components={{
                IconLeft: ({ ...props }) => (
                    <ChevronLeftIcon className="h-4 w-4 text-white" />
                ),
                IconRight: ({ ...props }) => (
                    <ChevronRightIcon className="h-4 w-4 text-white" />
                ),
            }}
            {...props}
        />
    );
}
Calendar.displayName = 'Calendar';

export { Calendar };
