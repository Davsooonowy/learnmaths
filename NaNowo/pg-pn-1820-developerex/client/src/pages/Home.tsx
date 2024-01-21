import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import image1 from '../pages/images/przybylo.png'
import image2 from '../pages/images/frydrychkox.png'
import image3 from '../pages/images/meszka1.jpg'

const Home = () => {
    const tiles = [
        { title: "Matematyka dyskretna", image: image3, link: "/matematyka_dyskretna" },
        { title: "Analiza matematyczna", image: image2, link: "/analiza_matematyczna" },
        { title: "Algebra", image: image1, link: "/algebra" },
    ];

    return (
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
    );
};

export default Home;