import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Algebra = () => {
    return (
        <Card className="w-full sm:w-3/4 lg:w-1/2 border-0 shadow-none mx-auto">
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-3xl text-center">Algebraa</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Your content here */}
            </CardContent>
        </Card>
    );
};

export default Algebra;