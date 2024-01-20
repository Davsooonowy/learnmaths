import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { serverUrl } from '../lib/data';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from './ui/card';
import { Label } from './ui/label';
import { Button } from './ui/button';
import DatePicker from './DatePicker';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';

const today = dayjs().startOf('hour');

const AddTermModal: FC<{ id: number; onClose: () => void }> = ({
    id,
    onClose,
}) => {
    const [duration, setDuration] = useState(15);
    const [start, setStart] = useState<dayjs.Dayjs>(today);

    const authTokenCookie = document.cookie
                                .split('; ')
                                .find(row => row.startsWith('authenticationToken='));

    const authToken = authTokenCookie ? authTokenCookie.split('=')[1] : undefined;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetch(`${serverUrl}/api/terms/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                startDateTime: start.toISOString(),
                duration: duration,
                roomId: id,
            }),
        });
        window.location.reload();
        console.log(res.ok);
        onClose();
    };

    return (
        <div
            className="absolute z-20 flex h-screen w-screen cursor-pointer items-center justify-center bg-black bg-opacity-90"
            onClick={onClose}
        >
            <form onSubmit={handleSubmit}>
                <Card
                    onClick={(e) => e.stopPropagation()}
                    className="cursor-auto"
                >
                    <CardHeader>
                        <CardTitle className="text-2xl">Edit Room</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-5 items-center gap-4">
                                <Label htmlFor="title" className="text-left">
                                    Start
                                </Label>
                                <DatePicker start={start} setStart={setStart} />
                            </div>
                            <div className="grid grid-cols-5 items-center gap-4">
                                <Label
                                    htmlFor="title"
                                    className="col-span-2 text-left"
                                >
                                    Duration
                                </Label>
                                <Select onValueChange={(e) => setDuration(+e)}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="15">
                                                15 minutes
                                            </SelectItem>
                                            <SelectItem value="30">
                                                30 minutes
                                            </SelectItem>
                                            <SelectItem value="45">
                                                45 minutes
                                            </SelectItem>
                                            <SelectItem value="60">
                                                60 minutes
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-end gap-5">
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Change</Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};

export default AddTermModal;
