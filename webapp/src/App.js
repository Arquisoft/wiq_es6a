import React, { useState } from 'react';
import AddUser from './components/AddUser';
import Login from './components/Login';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Main from "./components/Main";

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [login, setLogin] = useState(false);
  const handleToggleView = () => {
    setShowLogin(!showLogin);
  };
  
  const sendLogin = (loginSuccess) => {
    setLogin(loginSuccess)
  }

  return (

    <Container component="main" maxWidth="xs">
        {login ? <Main/> : (
            <>
            <CssBaseline />
            <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
        Welcome to the 2024 edition of the Software Architecture course
    </Typography>
    {showLogin ? <Login sendLogin={sendLogin}/> : <AddUser />}
    <Typography component="div" align="center" sx={{ marginTop: 2 }}>
        {showLogin ? (
            <Link name="gotoregister" component="button" variant="body2" onClick={handleToggleView}>
                Don't have an account? Register here.
            </Link>
        ) : (
            <Link component="button" variant="body2" onClick={handleToggleView}>
                Already have an account? Login here.
            </Link>
        )}
    </Typography>
            </>
            )}

    </Container>
  );
}

export default App;

