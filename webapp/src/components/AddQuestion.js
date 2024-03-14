// src/components/AddQuestion.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';

const AddQuestion = ({sendType, sendAtribute}) => {
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';


  const addQuestion = async () => {
      console.log('AddQuestion');
      try {
        const response = await axios.post(`${apiEndpoint}/addquestion`);
        const { type, attribute } = response.data;
        sendType(type);
        sendAtribute(attribute);
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
      <Button variant="contained" color="primary" onClick={addQuestion}>
        addQuestion
      </Button>
    </div> 
  );
};

export default AddQuestion;
