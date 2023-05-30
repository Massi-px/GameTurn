import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Tournament from './Tournament';

export default function ListTournament() {
    const [tournaments, setTournaments] = useState([]);

    const fetchTournaments = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/list-tournament', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await response.json();
            setTournaments(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des tournois :', error);
        }
    };

    useEffect(() => {
        fetchTournaments();
    }, []);

    return (
        <Container maxWidth="sm" style={{ padding: '70px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Liste des tournois
            </Typography>
            {tournaments.map((tournament) => (
                <Box key={tournament.tournament_id} border={1} borderRadius={8} padding={2} marginBottom={2} style={{ cursor: 'pointer' }}>
                    <Link
                        to={{
                            pathname: `/home/tournament/${tournament.tournament_id}`,
                        }}
                        style={{ textDecoration: 'none' }}
                    >
                        <Typography variant="h5">{tournament.name}</Typography>
                        <Typography>Nombre de participants : {tournament.nmbrParticipants}</Typography>
                        <Typography>Nom du jeu : {tournament.game}</Typography>
                        <Typography>Date de début : {tournament.start_date}</Typography>
                        <Typography>Date de fin : {tournament.end_date}</Typography>
                    </Link>
                </Box>
            ))}
        </Container>
    );
}
