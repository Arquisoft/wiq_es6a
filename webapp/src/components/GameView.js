import React, {useState} from 'react';
import NavBar from "./NavBar";
import GamesPanel from "./GamesPanel";
import AddQuestion from "./AddQuestion";
import GetQuestion from "./GetQuestion";
import Container from "@mui/material/Container";

const Home = () => {
    // userData contiene los datos del usuario que fueron pasados como props desde el componente Login

    const [type, setType] = useState('');
    const [attr, setAttr] = useState('');

    const sendType = (typeSend) => {
        setType(typeSend);
    }

    const sendAttribute = (attribute) => {
        setAttr(attribute);
    }

    return (
        <Container component="main" maxWidth={false} style={{ height: '100vh' }}>
            <NavBar/>

        </Container>
    );
};

export default Home;