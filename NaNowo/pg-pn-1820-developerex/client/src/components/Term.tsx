import { FC, useState } from 'react';
import { Term as TermType } from './CalendarTerm';
import dayjs from 'dayjs';
import { createPortal } from 'react-dom';
import VoteModal from './VoteModal';
import { Card, CardDescription } from './ui/card';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from './ui/tooltip';
import { useEffect } from 'react';

const Term: FC<{ term: TermType; monday: dayjs.Dayjs; minHour: number }> = ({
    term,
    monday,
    minHour,
}) => {
    const [showModal, setShowModal] = useState(false);

    const startTime = dayjs(term.startDateTime);
    const endTime = startTime.add(term.duration, 'm');
    const startHour = startTime.format('HH:mm');
    const endHour = endTime.format('HH:mm');

    const hour = term.startDateTime.get('hour');
    let minute = term.startDateTime.get('minute');
    if (minute < 15) {
        minute = 0;
    } else if (minute < 30) {
        minute = 1;
    } else if (minute < 45) {
        minute = 2;
    } else if (minute < 60) {
        minute = 3;
    }
    const duration = term.duration / 15;
    const column = term.startDateTime.diff(monday, 'day') + 3;

    const available = term.votes.filter((v) => v === 'AVAILABLE').length;
    const notAvailable = term.votes.filter((v) => v === 'NOT_AVAILABLE').length;
    const maybe = term.votes.filter((v) => v === 'MAYBE').length;
    const pending = term.votes.filter((v) => v === 'PENDING').length;

    const [color, setColor] = useState('bg-emerald-200');

    useEffect(() => {
        setColor('bg-emerald-300');

        console.log( 100 + (available - notAvailable) * 100 );
        console.log(color);
    }, [notAvailable, available]);

    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger
                        className="z-[2] mx-4 my-1 "
                        style={{
                            gridRow: 1 + (hour - minHour) * 4 + minute,
                            gridRowEnd:
                                1 + (hour - minHour) * 4 + minute + duration,
                            gridColumn: column,
                        }}
                    >
                        <Card
                            className={`flex h-full w-full flex-col items-center justify-center rounded ${ color } font-medium dark:${ color }`}
                        
                            onClick={() => setShowModal(true)}
                        >
                            <CardDescription className="flex justify-between">
                                <span className="">{startHour}</span>
                                <span className="text-md">-</span>
                                <span className="">{endHour}</span>
                            </CardDescription>
                        </Card>
                    </TooltipTrigger>
                    <TooltipContent className="text-base font-semibold">
                        <p>Dostepny: {available}</p>
                        <p>Niemozliwosc: {notAvailable}</p>
                        <p>Moze: {maybe}</p>
                        <p>spodziewam sie: {pending}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            
            {showModal &&
                createPortal(
                    <VoteModal
                        onClose={() => {
                            setShowModal(false);
                        }}
                        id={term.id}
                    />,
                    document.querySelector('#modal') as HTMLElement
                )}
        </>
    );
};

export default Term;
