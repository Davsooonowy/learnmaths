import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import image1 from '../pages/images/przybylo.png'
import image2 from '../pages/images/frydrychkox.png'
import image3 from '../pages/images/meszka1.jpg'

const Home = () => {
    const tiles = [
        { title: "Matematyka dyskretna", image: image3 },
        { title: "Analiza matematyczna", image: image2 },
        { title: "Algebra", image: image1 },
    ];

    return (
        <Card className="w-full sm:w-3/4 lg:w-1/2 border-0 shadow-none mx-auto">
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-3xl text-center">Interactive Tiles</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {tiles.map((tile, index) => (
                        <div className="border border-gray-200 p-4 rounded-lg m-2 flex flex-col justify-start items-center" key={index}>
                            <p>{tile.title}</p>
                            <img src={tile.image} alt={tile.title} className="object-contain w-full h-full" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default Home;