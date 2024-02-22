import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function Game({ title }) {
    return (
        <Grid item xs={4}>
            <Paper sx={{ p: 2, bgcolor: 'red' }}>
                <Typography variant="h6">{title}</Typography>
            </Paper>
        </Grid>
    );
}

function GamesPanel() {
    return (
        <Grid container spacing={2}>
            <Game title="Saber y ganar" />
            <Game title="Elemento 2" />
            <Game title="Elemento 3" />
        </Grid>
    );
}

export default GamesPanel;