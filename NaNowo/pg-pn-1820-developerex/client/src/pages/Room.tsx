import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { serverUrl } from '../lib/data';
import { termSchema } from '../lib/response';
import { useAtomValue } from 'jotai';
import { userAtom } from '../lib/user';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import EditRoomModal from '../components/EditRoomModal';
import AddTermModal from '../components/AddTermModal';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarTerm } from '@/components/CalendarTerm';

const Room = () => {
    const { id } = useParams();
    const userId = useAtomValue(userAtom);

    const [editRoom, setEditRoom] = useState(false);
    const [addTerm, setAddTerm] = useState(false);

    const authTokenCookie = document.cookie
                                .split('; ')
                                .find(row => row.startsWith('authenticationToken='));

    const authToken = authTokenCookie ? authTokenCookie.split('=')[1] : undefined;

    const roomQ = useQuery({
        queryKey: ['room'],

        queryFn: async () => {
            
            const res = await fetch(`${serverUrl}/api/rooms/get-room/${id}`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${authToken}`
                },
              });

            if (!res.ok) throw new Error('Network response was not ok');
            return await res.json();
        },
    });

    const roomInfoQ = useQuery({
        queryKey: ['room-info'],
        queryFn: async () => {
            const res = await fetch(
                `${serverUrl}/api/rooms/get-room-info/${id}`, {
                    method: 'GET',
                    headers: {
                      'Authorization': `Bearer ${authToken}`
                    },
                  }
            );

            if (!res.ok) throw new Error('Network response was not ok');
            return await res.json();
        },
    });

    

    if (roomQ.isLoading || roomInfoQ.isLoading) return <p>Loading...</p>;
    if (roomQ.error || roomInfoQ.error) return <p>Error :(</p>;

    const { title, description, terms: terms_, owner, deadline } = roomQ.data;
    const { allVotes } = roomInfoQ.data;
    console.log(terms_);
    const terms = terms_.map((term: any) => {
        const votes = allVotes
            .filter((v: any) => v.term.id === term.id)
            .map((v: any) => v.voteType);
        term = { ...term, votes };
        const tmp = termSchema.safeParse(term);
        console.log(tmp)

        if (tmp.success) {
            return tmp.data;
        }
        throw tmp.error;
    });
    console.log(terms);

    terms.sort((a, b) => {
        const availableA = a.votes.filter(v => v === 'AVAILABLE').length;
        const availableB = b.votes.filter(v => v === 'AVAILABLE').length;
    
        return availableB - availableA;
    });


    const stopVote = async ()=>{
        try {
            const response = await fetch(`${serverUrl}/api/votes/stop-voting/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },

            });

            if (response.ok) {
                window.location.reload();

            } else {

                console.error('Vote stop failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during stopping vote:', error);
        }
    }
    return (
        <>
            {new Date(deadline) > new Date() && ( 
            <Card className="w-3/4 border-0 shadow-none">
                <CardHeader className="flex-row justify-between">
                    <div>
                        <CardTitle className="text-3xl">{title}</CardTitle>
                        <CardDescription className="text-xl">
                            {description}
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                        {userId == owner.id && (
                            <>
                                <Button
                                    onClick={() => setEditRoom(true)}
                                    variant="outline"
                                >
                                    Edit room
                                </Button>
                                <Button onClick={() => setAddTerm(true)}>
                                    Add term
                                </Button>
                                <Button onClick={() => stopVote()}>
                                    Stop voting
                                </Button>
                            </>
                        )}
                        <p>
                            Owner: {userId == owner.id ? `You` : owner.username}
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 p-4">
                    {/* TERMS  */}
                    <CalendarTerm terms={terms} />
                </CardContent>
            </Card>
            )}
            {editRoom &&
                createPortal(
                    <EditRoomModal
                        description={description}
                        id={+id!}
                        title={title}
                        onClose={() => setEditRoom(false)}
                    />,
                    document.querySelector('#modal') as HTMLElement
                )}
            {addTerm &&
                createPortal(
                    <AddTermModal
                        id={+id!}
                        onClose={() => setAddTerm(false)}
                    />,
                    document.querySelector('#modal') as HTMLElement
                )}

            {new Date(deadline) < new Date() && (
                <table className="mt-4 w-full border-collapse border border-gray-400">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">Term</th>
                        <th className="p-2 border">Available</th>
                        <th className="p-2 border">Not Available</th>
                        <th className="p-2 border">Maybe</th>
                        <th className="p-2 border">Pending</th>
                    </tr>
                </thead>
                <tbody>
            {terms.map((term: any) => (
                <tr key={term.id} className="text-center">
                    <td className="p-2 border">{term.startDateTime.toGMTString()}</td>
                    <td className="p-2 border">{term.votes.filter((v) => v === 'AVAILABLE').length}</td>
                    <td className="p-2 border">{term.votes.filter((v) => v === 'NOT_AVAILABLE').length}</td>
                    <td className="p-2 border">{term.votes.filter((v) => v === 'MAYBE').length}</td>
                    <td className="p-2 border">{term.votes.filter((v) => v === 'PENDING').length}</td>
                </tr>
            ))}
            </tbody>
        </table> 
            )}
        </>
    );
};

export default Room;
