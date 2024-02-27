import React, {useState} from 'react';
import NavBar from "./NavBar";
import GamesPanel from "./GamesPanel";
import Container from "@mui/material/Container";

const Home = (props) => {
    // userData contiene los datos del usuario que fueron pasados como props desde el componente Login

    return (
        <Container component="main" maxWidth={false} style={{ height: '100vh' }}>
            <NavBar/>
            <GamesPanel/>
        </Container>
    );
};

export default Home;