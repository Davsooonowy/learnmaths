import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import image from '../pages/images/dyskretna.png';
import { useState } from 'react';

const MatematykaDyskretna = () => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

const checkAnswer = () => {
    const correctAnswers = ['B', 'C'];
    setIsCorrect(selectedAnswer !== null && correctAnswers.includes(selectedAnswer));
};

    const handleAnswerChange = (answer: string, isChecked: boolean) => {
        setSelectedAnswer(isChecked ? answer : null);
    };

    return (
        <Card className="w-full sm:w-3/4 lg:w-1/2 border-0 shadow-none mx-auto">
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-3xl text-center">Matematyka Dyskretna</CardTitle>
            </CardHeader>
            <CardContent>
                <img src={image} alt="Matematyka Dyskretna" className="object-contain w-full h-full" />
                <p>Po co się tego uczyć, ocena z egzaminu to random z przedziału (3,5)</p>
                <div className="text-center">
                    <p>Czy jeśli n+1 obiektów zostanie rozmieszczone w n pudełkach, to czy znajdzie się pudełko, w którym będą 2 przedmioty?:</p>
                    <input type="radio" id="A" name="answer" value="A" onChange={(e) => handleAnswerChange('A', e.target.checked)} />
                    <label htmlFor="A">Nie</label><br/>
                    <input type="radio" id="B" name="answer" value="B" onChange={(e) => handleAnswerChange('B', e.target.checked)} />
                    <label htmlFor="B">Tak</label><br/>
                    <input type="radio" id="C" name="answer" value="C" onChange={(e) => handleAnswerChange('C', e.target.checked)} />
                    <label htmlFor="C">Nie wiem</label><br/>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={checkAnswer}>Check Answer</button>
                    {isCorrect !== null && (
                        <p>{isCorrect ? 'Correct!' : 'Incorrect, try again.'}</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default MatematykaDyskretna;