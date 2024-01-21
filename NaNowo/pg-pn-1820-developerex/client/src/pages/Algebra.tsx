import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import image from '../pages/images/algebra.jpg';
import macierz from '../pages/images/macierz.png';
import { useState } from 'react';

const Algebra = () => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const checkAnswer = () => {
        const correctAnswer = 'A';
        setIsCorrect(selectedAnswer === correctAnswer);
    };

    return (
        <Card className="w-full sm:w-3/4 lg:w-1/2 border-0 shadow-none mx-auto">
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-3xl text-center">Algebra</CardTitle>
            </CardHeader>
            <CardContent>
                <img src={image} alt="Algebra" className="object-contain w-full h-full" />
                <p>Kto wymyślił istnienie takiej matematyki toż to zupełnie nie ma sensu, ale przynajmniej wykładowca spoko.</p>
                <div className="text-center">
                    <p>Oblicz wyznacznik macierzy 3x3:</p>
                    <img src={macierz} alt="Macierz" className="object-contain w-full h-full"/>
                    <input type="radio" id="A" name="answer" value="A" onChange={() => setSelectedAnswer('A')} />
                    <label htmlFor="A">3(65+24e^2+6pi^2)</label><br/>
                    <input type="radio" id="B" name="answer" value="B" onChange={() => setSelectedAnswer('B')} />
                    <label htmlFor="B">65+24e^2+6pi^2</label><br/>
                    <input type="radio" id="C" name="answer" value="C" onChange={() => setSelectedAnswer('C')} />
                    <label htmlFor="C">21+3e^2+7pi^2C</label><br/>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={checkAnswer}>Check Answer</button>
                    {isCorrect !== null && (
                        <p>{isCorrect ? 'Correct!' : 'Incorrect, try again.'}</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default Algebra;