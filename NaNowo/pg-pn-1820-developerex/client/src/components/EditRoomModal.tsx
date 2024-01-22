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
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Input } from './ui/input';

const fieldsetClass = 'w-96 flex justify-between';

const EditRoomModal: FC<{
    title: string;
    description: string;
    id: number;
    onClose: () => void;
}> = ({ title: title_, description: description_, onClose, id }) => {
    const [title, setTitle] = useState(title_);
    const [description, setDescription] = useState(description_);


    const authTokenCookie = document.cookie
                                .split('; ')
                                .find(row => row.startsWith('authenticationToken='));

    const authToken = authTokenCookie ? authTokenCookie.split('=')[1] : undefined;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let res = await fetch(`${serverUrl}/api/rooms`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                id,
                title,
                description,
            }),
        });

        if (res.ok) {
            window.location.reload();
            console.log(await res.json());
        } else {
            console.log(await res.text());
        }
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
                        <CardTitle className="text-2xl">Edytuj zajecia</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-5 items-center gap-4">
                                <Label htmlFor="title" className="text-left">
                                    Temat
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
                                    Opis
                                </Label>
                                <Textarea
                                    className="col-span-4 max-h-[120px]"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.currentTarget.value)
                                    }
                                ></Textarea>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-end gap-5">
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={onClose}
                        >
                            Anuluj
                        </Button>
                        <Button type="submit">Zapisz</Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};

export default EditRoomModal;
