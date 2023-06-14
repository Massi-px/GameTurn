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
import apiInstance from "../utils/api/apiService";

const gameOptions = ['FPS', 'Stratégie', 'Combat', 'Autre'];

export default function CreateTournament() {
    const [name, setName] = useState('');
    const [selectedGame, setSelectedGame] = useState('');
    const [maxNmbrParticipants, setMaxNmbrParticipants] = useState('');
    const [startDateTournament, setStartDateTournament] = useState(dayjs(new Date()));
    const [endDateTournament, setEndDateTournament] = useState(dayjs(new Date()));
    const [formErrors, setFormErrors] = useState({
        name: false,
        selectedGame: false,
        nmbrParticipants: false,
        startDate: false,
        endDate: false,
    });
    const startDateString = startDateTournament.toISOString().split('T')[0];
    const endDateString = endDateTournament.toISOString().split('T')[0];

    const handleGameChange = (event) => {
        setSelectedGame(event.target.value);
    };

    const handleCreateTournament = async () => {
        const errors = {
            name: !name,
            selectedGame: !selectedGame,
            maxNmbrParticipants: !maxNmbrParticipants,
            startDate: !startDateTournament,
            endDate: !endDateTournament,
        };

        setFormErrors(errors);

        if (Object.values(errors).some((error) => error)) {
            return;
        }


        //console.log('Tournoi créé avec succès !');

            await apiInstance.exec(
                'tournaments',
                'POST',
                {
                    name,
                    start_date: startDateString,
                    end_date: endDateString,
                    maxNmbrParticipants,
                    game: selectedGame
                })
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
                    error={formErrors.name}
                    helperText={formErrors.name && 'Veuillez entrer le nom du tournoi.'}
                />

                <FormControl fullWidth margin="normal" required>
                    <InputLabel sx={{ color: '#FFF' }}>Type de jeu</InputLabel>
                    <Select
                        id="game"
                        value={selectedGame}
                        label="Type de jeu"
                        onChange={handleGameChange}
                        inputProps={{ style: { color: '#FFF' } }}
                        error={formErrors.selectedGame}
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
                    sx={{ color: '#FFF' }}
                    InputLabelProps={{
                        style: { color: '#FFF' },
                    }}
                    value={maxNmbrParticipants}
                    onChange={(e) => setMaxNmbrParticipants(e.target.value)}
                    error={formErrors.nmbrParticipants}
                    helperText={formErrors.nmbrParticipants && 'Veuillez entrer le nombre de participants.'}
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
                                        style: { paddingRight: 0, },
                                    }}
                                    error={formErrors.startDate}
                                />
                            )}
                        />

                        <DatePicker
                            label="Fin du tournoi"
                            value={endDateTournament}
                            onChange={(newValue) => setEndDateTournament(newValue)}
                            renderInput={({ inputProps }) => (
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    required
                                    InputProps={{
                                        ...inputProps,
                                        style: { paddingRight: 0 },
                                    }}
                                    error={formErrors.endDate}
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
    );
}