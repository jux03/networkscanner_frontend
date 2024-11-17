import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Typography, Grid, Paper } from '@mui/material';
import NetworkList from './components/NetworkList';
const App = () => {
  const [networks, setNetworks] = useState([]);
  const [savedNetworks, setSavedNetworks] = useState([]);

  // Fetch scanned networks
  const scanNetworks = async () => {
    try {
      const response = await axios.get('http://localhost:4800/api/scan');
      setNetworks(response.data);
    } catch (error) {
      console.error('Error scanning networks:', error);
    }
  };

  // Fetch saved networks from the backend
  const fetchSavedNetworks = async () => {
    try {
      const response = await axios.get('http://localhost:4800/api/networks');
      setSavedNetworks(response.data);
    } catch (error) {
      console.error('Error fetching saved networks:', error);
    }
  };

  useEffect(() => {
    fetchSavedNetworks();
  }, []);

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Network Scanner
      </Typography>
      <Button variant="contained" color="primary" onClick={scanNetworks} style={{ marginBottom: '1rem' }}>
        Scan Networks
      </Button>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '1rem' }}>
            <NetworkList networks={networks} onSave={fetchSavedNetworks} />
          </Paper>
        </Grid>
        
      </Grid>
    </Container>
  );
};

export default App;
