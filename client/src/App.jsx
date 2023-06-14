import React from 'react';
import AppRouter from "./routes/Routes";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <AppRouter />
            </ThemeProvider>
        </div>
    );
}

export default App;
