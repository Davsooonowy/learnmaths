import { Link } from 'react-router-dom';
import image1 from '../pages/images/przybylo.png'
import image2 from '../pages/images/frydrychkox.png'
import image3 from '../pages/images/meszka1.jpg'
import {serverUrl} from "@/lib/data.ts";
import {useQuery} from "@tanstack/react-query";
import {Button} from "@/components/ui/button.tsx";
import { useAtomValue } from 'jotai';
import { userAtom } from '../lib/user';
import RoomThumbnail from '../components/RoomThumbnail';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import AddRoomModal from '../components/AddRoomModal';
import { Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

const Home = () => {
    const user = useAtomValue(userAtom);
    const [data, setData] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);


    const authTokenCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('authenticationToken='));

    const authToken = authTokenCookie ? authTokenCookie.split('=')[1] : undefined;

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


    const tiles = [
        { title: "Matematyka dyskretna", image: image3, link: "/matematyka_dyskretna" },
        { title: "Analiza matematyczna", image: image2, link: "/analiza_matematyczna" },
        { title: "Algebra", image: image1, link: "/algebra" },
    ];

    return (
        <>
        <div>
            <div>
                <Card className="w-full sm:w-3/4 lg:w-1/2 border-0 shadow-none mx-auto">
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {tiles.map((tile, index) => (
                                <Link to={tile.link} className="border-2 border-[#3F51B5] p-4 rounded-lg m-2 flex flex-col justify-start items-center hover:border-pulse" key={index}>
                                    <div
                                        className=" rounded-lg flex flex-col justify-start items-center"
                                        key={index}>
                                        <img src={tile.image} alt={tile.title}
                                             className="object-contain w-full h-full rounded-lg mb-2"/>
                                        <p className="text-2xl font-bold text-[#3F51B5] text-center">{tile.title}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="mt-4 text-center">
                <Card className="w-1/2 border-0 shadow-none mx-auto">
                    <CardHeader className="flex-row items-center justify-between">
                        <CardTitle className="text-3xl">Your rooms</CardTitle>
                        <Button onClick={() => setShowModal(true)}>
                            Add lesson
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
            </div>
        </div>
        </>
    );
};

export default Home;