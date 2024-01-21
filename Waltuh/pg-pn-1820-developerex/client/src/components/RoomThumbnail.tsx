import { useAtom } from 'jotai';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { userAtom } from '../lib/user';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './ui/card';

const RoomThumbnail: FC<any> = ({ room }) => {
    const [user, _] = useAtom(userAtom);
    return (
        <li>
            <Link to={`/room/${room.id}`}>
                <Card className="mb-4 flex flex-row items-center justify-between">
                    <CardHeader>
                        <CardTitle>{room.title}</CardTitle>
                        <CardDescription>{room.description}</CardDescription>
                    </CardHeader>
                    {room.owner.id == user && (
                        <span className="pr-6 font-semibold italic">Yours</span>
                    )}
                </Card>
            </Link>
        </li>
    );
};

export default RoomThumbnail;
