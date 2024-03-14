import React, { useState } from 'react';
import AddUser from './components/AddUser';
import Login from './components/Login';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Home from "./components/Home";
import { RouterProvider } from 'react-router-dom';
import GameView from "./components/GameView";
import router from "./routers/AppRouter";

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState('');
  const handleToggleView = () => {
    setShowLogin(!showLogin);
  };
  
  const sendLogin = (loginSuccess) => {
    setLogin(loginSuccess)
  }

  const sendUsername = (username) => {
    setUser(username)
  }

  return (
      <RouterProvider router={ router }>
    <Container component="main" maxWidth="xs">
        {login ? <Home username={user}/> : (
            <>
            <CssBaseline />
            <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
        Welcome to the 2024 edition of the Software Architecture course
    </Typography>
    {showLogin ? <Login sendLogin={sendLogin} sendUsername={sendUsername}/> : <AddUser />}
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
      </RouterProvider>
  );
}

export default App;

