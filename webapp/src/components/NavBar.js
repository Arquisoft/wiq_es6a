import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function NavBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Saber y Ganar
                </Typography>
                <Button color="inherit">Mi Perfil</Button>
                <Button color="inherit">Buscador</Button>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;