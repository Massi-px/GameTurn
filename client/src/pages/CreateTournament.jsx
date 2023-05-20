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
    const [selectedGame, setSelectedGame] = useState('');
    const [startDateTournament, setStartDateTournament] = useState(dayjs(new Date()));

    const handleGameChange = (event) => {
        setSelectedGame(event.target.value);
    };

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
                            <MenuItem key={option} value={option} sx={{ color: '#FFF' }}>
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
                    InputLabelProps={{
                        style: { color: '#FFF' },
                    }}
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
                                        style: { color: '#FFF', paddingRight: 0 },
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
                                        style: { color: '#FFF', paddingRight: 0 },
                                    }}
                                />
                            )}
                        />
                    </DemoContainer>
                </LocalizationProvider>

                <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" color="primary">
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