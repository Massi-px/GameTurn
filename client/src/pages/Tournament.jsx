import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import {Box, Button, Typography} from '@mui/material';
import authManagerInstance from "../utils/api/auth";
import apiInstance from "../utils/api/apiService";

export default function Tournament() {
    const [selectedTournament, setSelectedTournament] = useState(null);
    const {tournamentId} = useParams();
    const userId = authManagerInstance.getUserId()

    const fetchSelectTournaments = async () => {
        let tournament = await apiInstance.exec(`tournaments/${tournamentId}`, 'GET')
        setSelectedTournament(tournament);
    }
    useEffect(() => {
        fetchSelectTournaments();
    }, []);

    const handleClick = async () => {
        await apiInstance.exec(
            `tournaments/${tournamentId}/join`,
            'POST')
    }

    const details = () => {
    }

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
                        Tournament ID: {selectedTournament.id}
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

                    <Typography> Username = {userId}</Typography>

                    <Button onClick = {handleClick}> Join Tournament </Button>

                    <Link
                        to={{
                            pathname: `/home/tournament/status`,
                        }}
                        style={{ textDecoration: 'none' }}
                    >
                        <Button>Details</Button>
                    </Link>

                </Box>
            )}
        </Box>
    );
}
