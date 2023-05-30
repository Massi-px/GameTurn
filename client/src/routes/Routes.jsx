import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import CreateTournament from "../pages/CreateTournament";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import {Games} from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import {Link} from "@mui/material";
import authManagerInstance from "../utils/api/auth";
import LogoutIcon from '@mui/icons-material/Logout';
import ListTournament from "../pages/ListTournament";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Tournament from "../pages/Tournament";


const drawerWidth = 240;
function handleLogout() {
    if (authManagerInstance.logout()) {
        return window.location.href='/';
    }
    // Retourner ou rendre quelque chose d'autre si la condition n'est pas satisfaite
    return null;
}

const HomeRoutes = () => {
    return (
        <>
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, bgcolor: '#0A192F' }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Permanent drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        bgcolor: '#1A1C21',
                        color: '#FFF'
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <List>
                    <ListItem key='createTournament' >
                        <ListItemButton component={Link} to="/home/create-tournament">
                            <ListItemIcon>
                                <Games />
                            </ListItemIcon>
                            <ListItemText primary='Créer un tournoi' />
                        </ListItemButton>
                    </ListItem>

                    <ListItem key='listTournament' >
                        <ListItemButton component={Link} to="/home/list-tournament">
                            <ListItemIcon>
                                <FormatListBulletedIcon />
                            </ListItemIcon>
                            <ListItemText primary='Liste des tournois' />
                        </ListItemButton>
                    </ListItem>

                    <ListItem key='logout' >
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Déconnexion" />
                        </ListItemButton>
                    </ListItem>

                </List>
                <Divider />
            </Drawer>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-tournament" element={<CreateTournament />} />
                <Route path="/list-tournament" element={<ListTournament />} />
                <Route path="tournament/:tournamentId" element={<Tournament />} />
            </Routes>
        </>
    );
};


const AppRouter = () => {
    return authManagerInstance.isAuthenticated() ?
        (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/home/*" element={<HomeRoutes />} />
            </Routes>
        </BrowserRouter>
    ):
        (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                </Routes>
            </BrowserRouter>
        )
};

export default AppRouter;
