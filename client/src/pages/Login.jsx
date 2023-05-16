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
    Checkbox, Typography, createTheme, Paper
} from '@mui/material';
import "../App.css"
import authManagerInstance from "../utils/api/auth.js";

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

const theme = createTheme({
    overrides: {
        MuiTextField: { // Name of the component ⚛️ / style sheet
            root: { // Name of the rule
                color: "orange",
            }
        }
    }
});

export default function Login({ setIsAuthenticated }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = async () => {
        authManagerInstance.login(username, password)
            .then(message => {
                console.log(message);
                window.location.href = "/Home";
            })
            .catch(error => {
                console.error(error);
                window.location.href = "/";
            })
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
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{bgcolor: '#050517', color:'#FFFF'}}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '10px',
                            bgcolor: '#7E858B',
                            borderRadius:'15px',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#CF5C36' }}>

                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="div" sx={{ mt: 1}}>
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
                                control={<Checkbox value="remember" color ="primary" />}
                                label="Remember me"
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, bgcolor: '#CF5C36' }}
                                onClick={handleClick}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs sx={{color: '#CF5C36'}}>
                                    <Link href="#" variant="body2" >
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/SignUp" variant="body2">
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