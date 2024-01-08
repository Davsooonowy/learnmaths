import React from 'react';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const topics = [
    'Wprowadzenie do algebry',
    'Równania liniowe',
    'Macierze i wyznaczniki',
    'Równania kwadratowe',
    'Funkcje kwadratowe',
    'I nierówności',
    'II nierówności',
    // Dodaj więcej tematów według potrzeb
];

const Algebra = () => {
    return (
        <Grid container spacing={2}>
            {/* Sidebar z tematami do nauki */}
            <Grid item xs={3}>
                <Drawer
                    variant="persistent"
                    anchor="left"
                    open={true}
                    PaperProps={{ style: { width: '200px', backgroundColor: '#f0f0f0', padding: '10px', position: 'sticky', top: '64px' } }}
                >
                    <Typography variant="h5">Tematy</Typography>
                    <ul>
                        {topics.map((topic, index) => (
                            <li key={index}>{topic}</li>
                        ))}
                    </ul>
                </Drawer>
            </Grid>

            {/* Główna zawartość */}
            <Grid item xs={9}>
                <Typography variant="h3">Wprowadzenie do algebry</Typography>
                {/* ... (reszta treści) */}

                {/* Miejsce na filmik */}
                <div>
                    <Typography variant="h4">Filmik: Wprowadzenie do algebry</Typography>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
                        title="Wprowadzenie do algebry"
                        allowFullScreen
                    />
                </div>
            </Grid>
        </Grid>
    );
}

export default Algebra;
