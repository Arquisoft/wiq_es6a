// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';

const GetAnswer = () => {
//  const [type, setType] = useState('');
//  const [value, setValue] = useState('');
  const [error, setError] = useState('');
//  const [loginSuccess, setLoginSuccess] = useState(false);
//  const [createdAt, setCreatedAt] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
  const getAnswer = async () => {
      const type = 'capital';
      const value = 'Francia';
      console.log('GetAnswer');
      try {  
        const response = await axios.post(`${apiEndpoint}/getanswer`, { type, value } );
        console.log('La ' + response.data.type + ' de ' + response.data.value + ' es...');
        setOpenSnackbar(true);
      } catch (error) {
        setError(error.response.data.error);
      }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (   
    <div>         
      <Button variant="contained" color="primary" onClick={getAnswer}>
        GetAnswer
      </Button>
    </div> 
  );
};

export default GetAnswer;
