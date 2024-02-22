import React, {useState} from 'react';
import NavBar from "./NavBar";
import GamesPanel from "./GamesPanel";
import Container from "@mui/material/Container";

const Main = (props) => {
    // userData contiene los datos del usuario que fueron pasados como props desde el componente Login

    return (
        <Container component="main" maxWidth="xs">
            <NavBar/>
            <GamesPanel/>
        </Container>
    );
};

export default Main;