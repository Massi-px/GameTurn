import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {Games} from "@mui/icons-material";

const drawerWidth = 240;

export default function Home() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
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
                        <ListItemButton onClick={() => {window.location.href='/create-tournament'}}>
                            <ListItemIcon>
                                <Games />
                            </ListItemIcon>
                            <ListItemText primary='Créer un tournoi' />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: '#1A1C21', p: 3, color: '#FFF' }}
            >
                <Toolbar />
                <Typography paragraph>
                    test
                </Typography>
                <Typography paragraph>
                    test
                </Typography>
            </Box>
        </Box>
    );
}
