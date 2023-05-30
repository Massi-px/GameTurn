import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

export default function Tournament() {
    const [selectedTournament, setSelectedTournament] = useState(null);
    const tournamentId = useParams();

    const fetchSelectTournaments = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/select-tournament', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(tournamentId),
            });
            const data = await response.json();
            setSelectedTournament(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des tournois :', error);
        }
    };

    useEffect(() => {
        fetchSelectTournaments();
    }, []);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
        >
            {selectedTournament && (
                <Box
                    border={1}
                    borderRadius={8}
                    padding={4}
                    maxWidth={400}
                    textAlign="center"
                >
                    <Typography variant="h5" component="h1" gutterBottom>
                        Tournament Details
                    </Typography>
                    <Typography variant="body1" component="p">
                        Tournament ID: {selectedTournament.tournament_id}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Name: {selectedTournament.name}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Start Date: {selectedTournament.start_date}
                    </Typography>
                    <Typography variant="body1" component="p">
                        End Date: {selectedTournament.end_date}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Number of Participants: {selectedTournament.nmbrParticipants}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Game: {selectedTournament.game}
                    </Typography>
                </Box>
            )}
        </Box>
    );
}
