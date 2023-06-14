import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

export default function Home() {

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: '#1A1C21', p: 3}}
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
