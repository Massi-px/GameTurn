import React, { useState } from 'react';
import imgTurnament from '../assets/img/tournois-esport.jpg'
import {
    TextField,
    Button,
    Box,
    Link,
    ThemeProvider,
    Grid,
    CssBaseline,
    Avatar,
    FormControlLabel,
    Checkbox, Typography, Paper, useTheme
} from '@mui/material';
import "../App.css"
import apiInstance from "../utils/api/apiService";

function Copyright(props) {
    return (
        <Typography variant="body2" color="#FFFF" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Login({ setIsAuthenticated }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const theme = useTheme();

    const handleClick = async () => {
            await apiInstance.exec('login','POST',{username,password,remember})
            window.location.href="/home";
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh', color:'#FFFF'}}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${imgTurnament})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{bgcolor: '#252422', color:'#FFFF'}}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '10px',
                                bgcolor: '#403D39',
                            borderRadius:'15px',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#ED4545' }}>

                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="div" sx={{ mt: 1, }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}

                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FormControlLabel
                                control={<Checkbox value={remember} onChange={(e) => setRemember(e.target.value)} color ="primary" />}
                                label="Remember me"
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleClick}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs >
                                    <Link href="#" variant="body2" >
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/sign-up" variant="body2">
                                        {"Don't have an account? Sign Up" }
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}