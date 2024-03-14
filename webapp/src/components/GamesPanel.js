import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Typography, Button} from '@mui/material';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GameView from "./GameView";

function Game({ title }) {
    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
    const question = async () => {
        const response = await axios.post(`${apiEndpoint}/question`);
    };

    return (
        <Grid item xs={4}>
            <Paper sx={{ p: 2, bgcolor: 'red' }}>
                <Typography variant="h6">{title}</Typography>
                <Button variant="contained" color="primary" onClick={question}>
                    <Link to="/game">Play</Link>
                </Button>
            </Paper>
        </Grid>
    );
}

function GamesPanel() {
    return (

        <Grid container spacing={2}>
            <Game title="Saber y ganar" />
            <Game title=" " />
            <Game title=" " />
        </Grid>
    );
}

export default GamesPanel;