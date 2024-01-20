import { FC, useState } from 'react';
import dayjs from 'dayjs';
import { serverUrl } from '../lib/data';
import { userAtom } from '../lib/user';
import { useAtomValue } from 'jotai';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

const fieldsetClass = 'w-96 flex justify-between';
const today = dayjs(new Date());

const AddRoomModal: FC<{
    onClose: () => void;
}> = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [participants, setParticipants] = useState<number[]>([]);

    const day = today.set('hour', +48).set('minute', +60);
    const [deadline, setDeadline] = useState(day);

    const user = useAtomValue(userAtom);
    const [participantsEmails, setParticipantsEmails] = useState<string[]>(['']);


    const authTokenCookie = document.cookie
                                .split('; ')
                                .find(row => row.startsWith('authenticationToken='));

    const authToken = authTokenCookie ? authTokenCookie.split('=')[1] : undefined;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(title, description, deadline, participants);
        
        //TODO: make sure participants does not contain owner
        const res = await fetch(`${serverUrl}/api/rooms/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                title,
                description,
                deadline,
                owner: user,
                usersTermsToAdd: [],
                participants: participantsEmails//participants.filter((e) => e != +user!),
            }),
        });
        console.log(participantsEmails)


        if (!res.ok || participantsEmails.length == 0) {
            console.error(await res.text());
        } else {
            console.log(await res.json());
            window.location.reload();
        }

        onClose();
    };
    const addParticipantInput = () => {
        setParticipantsEmails([...participantsEmails, '']);
    };

    const handleParticipantEmailChange = (index: number, email: string) => {
        const updatedEmails = [...participantsEmails];
        updatedEmails[index] = email;
        setParticipantsEmails(updatedEmails);
    };
    return (
        <div
            className="absolute flex h-screen w-screen cursor-pointer items-center justify-center bg-black bg-opacity-90"
            onClick={onClose}
        >
            <form onSubmit={handleSubmit}>
                <Card
                    onClick={(e) => e.stopPropagation()}
                    className="cursor-auto"
                >
                    <CardHeader>
                        <CardTitle className="text-2xl">Create Room</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-5 items-center gap-4">
                                <Label htmlFor="title" className="text-left">
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    type="text"
                                    value={title}
                                    onChange={(e) =>
                                        setTitle(e.currentTarget.value)
                                    }
                                    className="col-span-4"
                                />
                            </div>
                            <div className="grid grid-cols-5 items-center gap-4">
                                <Label
                                    htmlFor="description"
                                    className="text-left"
                                >
                                    Description
                                </Label>
                                <Textarea
                                    className="col-span-4 max-h-[120px]"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.currentTarget.value)
                                    }
                                ></Textarea>
                            </div>
                            <div className="grid grid-cols-5 items-center gap-4">
                                <Label htmlFor="to-add" className="text-left">
                                    Users to add
                                </Label>
                                {participantsEmails.map((email, index) => (
                                    <div key={index} className="col-span-4 flex gap-2">
                                        <Input
                                            type="text"
                                            value={email}
                                            onChange={(e) =>
                                                handleParticipantEmailChange(index, e.currentTarget.value)
                                            }
                                        />
                                        {index === participantsEmails.length - 1 && (
                                            <Button type="button" onClick={addParticipantInput}>
                                                +
                                            </Button>
                                        )}
                                    </div>
                                ))}

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
                        <Button type="submit">Create Room</Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};

export default AddRoomModal;
