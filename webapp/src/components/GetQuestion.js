// src/components/GetQuestion.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';

const GetQuestion = () => {
//  const [type, setType] = useState('');
//  const [value, setValue] = useState('');
  const [error, setError] = useState('');
//  const [loginSuccess, setLoginSuccess] = useState(false);
//  const [createdAt, setCreatedAt] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
  
  const getQuestion = async () => {
      const type = 'capital';
      const attribute = 'Colombia';
      console.log('GetQuestion');
      try {  
        const response = await axios.post(`${apiEndpoint}/getquestion`, { type, attribute } );
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
      <Button variant="contained" color="primary" onClick={getQuestion}>
        GetQuestion
      </Button>
    </div> 
  );
};

export default GetQuestion;
