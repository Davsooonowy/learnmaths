import { FC, useEffect, useState } from 'react';
import { Term as Term_ } from '@/lib/response';
import dayjs from 'dayjs';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from './ui/pagination';
import { Card, CardContent, CardFooter } from './ui/card';
import CalendarWeek from './CalendarWeek';

type Term = {
    startDateTime: dayjs.Dayjs;
    id: number;
    duration: number;
    votes: ('AVAILABLE' | 'NOT_AVAILABLE' | 'MAYBE' | 'PENDING')[];
};

const CalendarTerm: FC<{ terms: Term_[] }> = ({ terms: terms_ }) => {
    const [curWeek, setCurWeek] = useState(0);
    const [weeks, setWeeks] = useState<{ start: string; terms: Term[] }[]>([]);
    const [maxWeek, setMaxWeek] = useState(0);
    const [availableWeeks, setAvailableWeeks] = useState<number[]>([]);

    useEffect(() => {
        const terms = terms_.map((term) => {
            return { ...term, startDateTime: dayjs(term.startDateTime) };
        });

        let weeks_ = new Map<string, Term[]>();
        terms.forEach((term) => {
            const monday = term.startDateTime.startOf('week').add(2, 'day');
            if (weeks_.get(monday.toString()) === undefined) {
                weeks_.set(monday.toString(), [term]);
            } else {
                weeks_.get(monday.toString())!.push(term);
            }
        });
        const weeksTmp = Array.from(weeks_.entries()).map(([key, value]) => {
            return { start: key, terms: value };
        });
        weeksTmp.sort((a, b) =>
            dayjs(a.start).isAfter(dayjs(b.start)) ? 1 : -1
        );
        setWeeks(weeksTmp);
        setMaxWeek(weeksTmp.length);
        setAvailableWeeks([...Array(weeksTmp.length).keys()]);
    }, []);

    return (
        <Card className="border-0 shadow-none">
            <CardContent>
                <CalendarWeek
                    terms={weeks.length > 0 ? weeks[curWeek].terms : []}
                />
            </CardContent>
            <CardFooter>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() =>
                                    setCurWeek(Math.max(curWeek - 1, 0))
                                }
                            />
                        </PaginationItem>
                        {availableWeeks.map((week) => (
                            <PaginationItem key={week}>
                                <PaginationLink
                                    href="#"
                                    onClick={() => setCurWeek(week)}
                                    isActive={curWeek === week}
                                >
                                    {week + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() =>
                                    setCurWeek(
                                        Math.min(curWeek + 1, maxWeek - 1)
                                    )
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </CardFooter>
        </Card>
    );
};

export { CalendarTerm, type Term };
