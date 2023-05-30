import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Container,
} from '@mui/material';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

const gameOptions = ['FPS', 'Stratégie', 'Combat', 'Autre'];

export default function CreateTournament() {
    const [name, setName] = useState('');
    const [selectedGame, setSelectedGame] = useState('');
    const [nmbrParticipants, setNmbrParticipants] = useState('');
    const [startDateTournament, setStartDateTournament] = useState(dayjs(new Date()));
    const [endDateTournament, setEndDateTournament] = useState(dayjs(new Date()));

    const handleGameChange = (event) => {
        setSelectedGame(event.target.value);
    };

    const handleCreateTournament = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/create-tournament', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Assurez-vous d'inclure le cookie contenant le token JWT dans l'en-tête
                },
                credentials:'include',
                body: JSON.stringify({
                    name,
                    start_date: startDateTournament.format('YYYY-MM-DD'),
                    end_date: endDateTournament.format('YYYY-MM-DD'),
                    nmbrParticipants,
                    game: selectedGame
                }),
            });

            const data = await response.json(); // Attendre la résolution de response.json() et obtenir les données

            console.log(data);
            console.log('Tournoi créé avec succès !');
        } catch (error) {
            console.log('Erreur lors de la requête de création du tournoi :', error);
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#333',
                minHeight: '100vh',
                padding: '20px',
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="h4" sx={{ marginBottom: 2, color: '#FFF' }}>
                    Créer un tournoi
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    required
                    id="nameTournament"
                    label="Nom du tournoi"
                    name="nom du tournoi"
                    autoComplete="nom du tournoi"
                    autoFocus
                    InputLabelProps={{
                        style: { color: '#FFF' },
                    }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <FormControl fullWidth margin="normal" required>
                    <InputLabel sx={{ color: '#FFF' }}>Type de jeu</InputLabel>
                    <Select
                        id="game"
                        value={selectedGame}
                        label="Type de jeu"
                        onChange={handleGameChange}
                        inputProps={{ style: { color: '#FFF' } }}
                    >
                        {gameOptions.map((option) => (
                            <MenuItem key={option} value={option} sx={{ color: '#000' }}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {selectedGame === 'Autre' && (
                    <TextField
                        fullWidth
                        margin="normal"
                        required
                        id="customGame"
                        label="Jeu personnalisé"
                        name="customGame"
                        autoComplete="customGame"
                        InputLabelProps={{
                            style: { color: '#FFF' },
                        }}
                    />
                )}

                <TextField
                    fullWidth
                    margin="normal"
                    required
                    id="nmbrParticipants"
                    label="Nombre de participants"
                    name="nmbrParticipants"
                    autoComplete="nmbrParticipants"
                    sx={{color:'#FFF'}}
                    InputLabelProps={{
                        style: { color: '#FFF' },
                    }}
                    value={nmbrParticipants}
                    onChange={(e) => setNmbrParticipants(e.target.value)}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                        <DatePicker
                            label="Démarrage du tournoi"
                            value={startDateTournament}
                            onChange={(newValue) => setStartDateTournament(newValue)}
                            renderInput={({ inputProps }) => (
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    required
                                    InputProps={{
                                        ...inputProps,
                                        style: {paddingRight: 0 },
                                    }}
                                />
                            )}
                        />

                        <DatePicker
                            label="Fin du tournoi"
                            renderInput={({ inputProps }) => (
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    required
                                    InputProps={{
                                        ...inputProps,
                                        style: {paddingRight: 0 },
                                    }}
                                    value={endDateTournament}
                                    onChange={(newValue) => setEndDateTournament(newValue)}
                                />
                            )}
                        />
                    </DemoContainer>
                </LocalizationProvider>

                <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" color="primary" onClick={handleCreateTournament}>
                            Créer le tournoi
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="outlined" color="primary">
                            Annuler
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}