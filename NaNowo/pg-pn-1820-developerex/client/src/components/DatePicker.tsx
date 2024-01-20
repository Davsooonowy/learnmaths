'use client';

import * as React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from './ui/input';
import dayjs from 'dayjs';
import { preprocess, set } from 'zod';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';

const DatePicker: React.FC<{
    start: dayjs.Dayjs;
    setStart: React.Dispatch<dayjs.Dayjs>;
}> = ({ start, setStart }) => {
    const [date, setDate] = React.useState<Date | undefined>(start.toDate());
    const [minutes, setMinutes] = React.useState<number>(0);
    const [hour, setHour] = React.useState<number>(dayjs().hour());
    React.useEffect(() => {
        if (!date) return;
        setStart(
            start
                .set('date', date.getDate())
                .set('month', date.getMonth())
                .set('year', date.getFullYear())
        );
    }, [date]);

    React.useEffect(() => {
        setStart(start.set('hour', hour).set('minute', minutes));
    }, [hour, minutes]);
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'col-span-4 w-[240px] justify-start text-left font-normal',
                        !start && 'text-muted-foreground'
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {start ? (
                        start.format('DD-MM-YYYY, HH:mm')
                    ) : (
                        <span>Pick a date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={start.toDate()}
                    onSelect={setDate}
                    initialFocus
                />
                <div className="flex gap-1 px-1 py-2">
                    <Input
                        type="number"
                        placeholder="Hour"
                        min="-1"
                        max="24"
                        value={hour}
                        onChange={(e) => {
                            const h = +e.target.value;
                            if (h == 24) setHour(0);
                            else if (h == -1) setHour(23);
                            else if (h >= 0 && h <= 23) setHour(h);
                        }}
                    />
                    <Select onValueChange={(e) => setMinutes(+e)}>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="00" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="0">00</SelectItem>
                                <SelectItem value="15">15</SelectItem>
                                <SelectItem value="30">30</SelectItem>
                                <SelectItem value="45">45</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default DatePicker;
