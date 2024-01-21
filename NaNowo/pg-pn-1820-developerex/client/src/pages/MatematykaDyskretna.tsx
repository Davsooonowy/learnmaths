import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import image from '../pages/images/dyskretna.png'; // replace with your image path
import { useState } from 'react';

const MatematykaDyskretna = () => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const checkAnswer = () => {
        const correctAnswer = 'A'; // replace with the correct answer
        setIsCorrect(selectedAnswer === correctAnswer);
    };

    return (
        <Card className="w-full sm:w-3/4 lg:w-1/2 border-0 shadow-none mx-auto">
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-3xl text-center">Matematyka Dyskretna</CardTitle>
            </CardHeader>
            <CardContent>
                <img src={image} alt="Matematyka Dyskretna" className="object-contain w-full h-full" />
                <p>Your text here</p>
                <div>
                    <p>Question 1:</p>
                    <input type="radio" id="A" name="answer" value="A" onChange={() => setSelectedAnswer('A')} />
                    <label htmlFor="A">Option A</label><br/>
                    <input type="radio" id="B" name="answer" value="B" onChange={() => setSelectedAnswer('B')} />
                    <label htmlFor="B">Option B</label><br/>
                    <input type="radio" id="C" name="answer" value="C" onChange={() => setSelectedAnswer('C')} />
                    <label htmlFor="C">Option C</label><br/>
                    <button onClick={checkAnswer}>Check Answer</button>
                    {isCorrect !== null && (
                        <p>{isCorrect ? 'Correct!' : 'Incorrect, try again.'}</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default MatematykaDyskretna;