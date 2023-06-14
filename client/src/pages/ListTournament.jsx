import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import apiInstance from "../utils/api/apiService";
export default function ListTournament() {
    const [tournaments, setTournaments] = useState([]);

    const fetchTournaments = async () => {
        let list_tournament = await apiInstance.exec('tournaments','GET')
        setTournaments(list_tournament)

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
                <Box key={tournament.id} border={1} borderRadius={8} padding={2} marginBottom={2} style={{ cursor: 'pointer' }}>
                    <Link
                        to={{
                            pathname: `/home/tournament/${tournament.id}`,
                        }}
                        style={{ textDecoration: 'none' }}
                    >
                        <Typography variant="h5">{tournament.name}</Typography>
                        <Typography>Nombre de participants maximum : {tournament.maxNmbrParticipants}</Typography>
                        <Typography>Nombre de participant inscrit : {tournament.nmbrParticipant}</Typography>
                        <Typography>Nom du jeu : {tournament.game}</Typography>
                        <Typography>Date de début : {tournament.start_date}</Typography>
                        <Typography>Date de fin : {tournament.end_date}</Typography>
                    </Link>
                </Box>
            ))}
        </Container>
    );
}
