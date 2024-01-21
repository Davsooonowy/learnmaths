import { useAtomValue } from 'jotai';
import { userAtom } from '../lib/user';
import { serverUrl } from '../lib/data';
import { useQuery } from '@tanstack/react-query';
import RoomThumbnail from '../components/RoomThumbnail';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import AddRoomModal from '../components/AddRoomModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Home = () => {
    const user = useAtomValue(userAtom);
    const [data, setData] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);


    const authTokenCookie = document.cookie
                                .split('; ')
                                .find(row => row.startsWith('authenticationToken='));

    const authToken = authTokenCookie ? authTokenCookie.split('=')[1] : undefined;


    // TODO: Fix types

    const queryRooms = async ({ queryKey }: { queryKey: any }) => {

        const res = await fetch(`${serverUrl}/api/rooms/${queryKey}/${user}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${authToken}`
            },
        });
        if (!res.ok) throw new Error('Network response was not ok');

        return res.json();
    };

    const queryOne = useQuery({
        queryKey: ['get-participation-rooms'],
        queryFn: queryRooms,
    });

    const queryTwo = useQuery({
        queryKey: ['get-owned-rooms'],
        queryFn: queryRooms,
    });

    useEffect(() => {
        if (queryOne.data && queryTwo.data) {
            setData([...queryOne.data, ...queryTwo.data]);
        }
    }, [queryOne.data, queryTwo.data]);

    if (queryOne.isLoading || queryTwo.isLoading) return <p>Loading...</p>;
    if (queryOne.error || queryTwo.error) return <p>Error :(</p>;

    return (
        <>
            <Card className="w-1/2 border-0 shadow-none">
                <CardHeader className="flex-row items-center justify-between">
                    <CardTitle className="text-3xl">Your rooms</CardTitle>
                    <Button onClick={() => setShowModal(true)}>
                        Create Room
                    </Button>
                </CardHeader>
                <CardContent>
                    <ul>
                        {data.map((room: any) => (
                            <RoomThumbnail room={room} key={room.id} />
                        ))}
                    </ul>
                </CardContent>
            </Card>
            {showModal &&
                createPortal(
                    <AddRoomModal onClose={() => setShowModal(false)} />,
                    document.querySelector('#modal') as HTMLElement
                )}
        </>
    );
};

export default Home;
