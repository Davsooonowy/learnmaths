import { FC } from 'react';
import { type Term as TermType } from './CalendarTerm';
import { CardDescription, CardTitle } from './ui/card';
import Term from '@/components/Term';

const CalendarWeek: FC<{ terms: TermType[] }> = ({ terms }) => {
    if (terms.length === 0) {
        return (
            <div
                className="grid grid-cols-7"
                style={{
                    gridTemplateRows: `repeat(2, minmax(0, 1fr)`,
                }}
            >
                <div className="col-span-1"></div>
                <div className="col-span-6 text-center">No terms</div>
            </div>
        );
    }
    const monday = terms[0].startDateTime.startOf('week').add(1, 'day');

    const minHour = Math.max(
        terms.reduce(
            (acc, cur) => Math.min(acc, cur.startDateTime.get('hour')),
            24
        ) - 1,
        0
    );
    const maxHour = Math.min(
        terms.reduce(
            (acc, cur) => Math.max(acc, cur.startDateTime.get('hour')),
            0
        ) + 1,
        23
    );

    return (
        <div className="relative h-[60vh] overflow-x-hidden overflow-y-scroll">
            <div
                className="scrollbar sticky left-0 top-0 z-[3] grid w-full bg-white dark:bg-neutral-950"
                style={{
                    gridTemplateColumns: `1fr 1fr repeat(7, 3fr)`,
                }}
            >
                <div className="col-span-2 col-start-1 row-start-1 row-end-3"></div>
                {Array.from(Array(7).keys()).map((dayDiff) => {
                    const day = monday.add(dayDiff, 'day');
                    return (
                        <div
                            className="row-start-1 row-end-3 px-2 py-1 text-center border-b-2 border-neutral-200 dark:border-neutral-800"
                            key={dayDiff}
                        >
                            <CardTitle>{day.format('dddd')}</CardTitle>
                            <CardDescription>
                                {day.format('DD.MM.YYYY')}
                            </CardDescription>
                        </div>
                    );
                })}
            </div>
            <div
                className="grid pt-4"
                style={{
                    gridTemplateColumns: `1fr 1fr repeat(7, 3fr)`,
                    gridTemplateRows: `repeat(${
                        (maxHour + 1 - minHour) * 4
                    }, minmax(0, 3fr)`,
                }}
            >
                {Array.from(Array(maxHour + 1 - minHour).keys()).map(
                    (hourDiff) => {
                        const hour = minHour + hourDiff;
                        return (
                            <CardTitle
                                className="relative col-start-1 col-end-1 row-span-4 text-2xl
                                after:absolute after:left-0 after:z-[1]
                                after:h-full after:w-[9000px] after:border-b-2"
                                key={hourDiff}
                            >
                                {`${hour}`.padStart(2, '0')}
                            </CardTitle>
                        );
                    }
                )}
                {Array.from(Array((maxHour + 1 - minHour) * 4).keys()).map(
                    (i) => {
                        return (
                            <CardDescription
                                className="after:z-1 relative col-start-2 
                                text-right after:absolute after:left-1/2
                                after:h-full after:w-[9000px] after:border-b-[1px] after:dark:border-neutral-800"
                                style={{ gridRow: 1 + i }}
                                key={i}
                            >
                                {`${(i % 4) * 15}`.padStart(2, '0')}
                            </CardDescription>
                        );
                    }
                )}

                {terms.map((term) => (
                    <Term term={term} monday={monday} minHour={minHour} />
                ))}
            </div>
        </div>
    );
};

export default CalendarWeek;
