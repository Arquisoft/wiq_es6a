// src/components/GetAnswer.js
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
      const attribute = 'Russia';
      console.log('getAnswer');
      try {  
        const response = await axios.post(`${apiEndpoint}/getanswer`, { type, attribute } );
        console.log('La ' + response.data.type + ' de ' + response.data.attribute + ' es ' + response.data.right);
        console.log('y ' + response.data.wrong1 + ', ' + response.data.wrong2 + ' y ' + response.data.wrong3 + ' no lo son ;-)');
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
