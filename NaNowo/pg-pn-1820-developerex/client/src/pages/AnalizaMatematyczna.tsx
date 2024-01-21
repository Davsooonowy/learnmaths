import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import image from '../pages/images/calki.png';
import pytanie from '../pages/images/pytanie.png';
import { useState } from 'react';

const AnalizaMatematyczna = () => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const checkAnswer = () => {
        const correctAnswer = 'A';
        setIsCorrect(selectedAnswer === correctAnswer);
    };

    return (
        <Card className="w-full sm:w-3/4 lg:w-1/2 border-0 shadow-none mx-auto">
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-3xl text-center">Analiza Matematyczna</CardTitle>
            </CardHeader>
            <CardContent>
                <img src={image} alt="Analiza Matematyczna" className="object-contain w-full h-full" />
                <p>Całki służą do całkowania, całki są ciężkie, całki to ból, całki nigdy was nie opuszczą.</p>
                <div className="text-center">
                    <p>Oblicz całkę oznaczoną:</p>
                    <img src={pytanie} alt="Całka" className="object-contain w-full h-full"/>
                    <input type="radio" id="A" name="answer" value="A" onChange={() => setSelectedAnswer('A')} />
                    <label htmlFor="A">2.41634</label><br/>
                    <input type="radio" id="B" name="answer" value="B" onChange={() => setSelectedAnswer('B')} />
                    <label htmlFor="B">2.137</label><br/>
                    <input type="radio" id="C" name="answer" value="C" onChange={() => setSelectedAnswer('C')} />
                    <label htmlFor="C">5.0</label><br/>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={checkAnswer}>Check Answer</button>
                    {isCorrect !== null && (
                        <p>{isCorrect ? 'Correct!' : 'Incorrect, try again.'}</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default AnalizaMatematyczna;