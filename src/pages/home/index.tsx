import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import configs from '@/configs';

const sections = [
    {
        id: 'a1',
        title: 'A1: Layout Implementation',
        description: 'Implement 3 Figma Screens',
        items: [
            { label: 'Screen 1', route: configs.routes.ticket },
            { label: 'Screen 2', route: configs.routes.work },
            { label: 'Screen 3', route: configs.routes.admin },
        ],
    },
    {
        id: 'a2',
        title: 'A2: JSON Form Rendering Components',
        description: 'Render address form from JSON Schema',
        items: [{ label: 'Dynamic Form', route: configs.routes.form }],
    },
    {
        id: 'a3',
        title: 'A3: Paginated Component',
        description: 'Render data as paginated tables',
        items: [{ label: 'Paginated Component', route: configs.routes.table }],
    },
];

const Home = () => {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-extrabold tracking-tight mb-10 text-center">
                Junior Front‑end Engineer Assignment <span className="text-muted-foreground">— May 2025</span>
            </h1>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {sections.map((section) => (
                    <Card key={section.id} className="flex flex-col p-5">
                        <CardHeader>
                            <CardTitle className="text-lg">{section.title}</CardTitle>
                            {section.description && (
                                <p className="text-sm text-muted-foreground">{section.description}</p>
                            )}
                        </CardHeader>
                        <CardContent className="flex flex-1 flex-col gap-2">
                            {section.items.map((item) => (
                                <Button asChild variant="outline" className="w-full justify-between" key={item.route}>
                                    <Link to={item.route} target="_blank" rel="noopener noreferrer">
                                        {item.label}
                                        <ArrowUpRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </Button>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Home;
