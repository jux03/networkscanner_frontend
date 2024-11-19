import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Typography, Grid, Paper } from '@mui/material';
import NetworkList from './components/NetworkList';

const App = () => {
  const [scannedNetworks, setScannedNetworks] = useState([]); // Networks from scanning
  const [savedNetworks, setSavedNetworks] = useState([]); // Networks from the database

  // Scan all networks (Wi-Fi, Bluetooth, Mobile)
  const scanAllNetworks = async () => {
    try {
      const response = await axios.get('http://localhost:4800/api/scan-all');
      setScannedNetworks(response.data);
    } catch (error) {
      console.error('Error scanning networks:', error);
    }
  };

  // Fetch saved networks from the database
  const fetchSavedNetworks = async () => {
    try {
      const response = await axios.get('http://localhost:4800/api/scans');
      setSavedNetworks(response.data);
    } catch (error) {
      console.error('Error fetching saved networks:', error);
    }
  };

  // Save a scanned network to the database
  const saveNetwork = async (network) => {
    try {
      await axios.post('http://localhost:4800/api/save', network);
      console.log('Network saved:', network);
      fetchSavedNetworks(); // Refresh saved networks after saving
    } catch (error) {
      console.error('Error saving network:', error);
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
      <Button
        variant="contained"
        color="primary"
        onClick={scanAllNetworks}
        style={{ marginBottom: '1rem' }}
      >
        Scan All Networks
      </Button>
      <Grid container spacing={3}>
  <Grid item xs={12} md={6}>
    <Paper elevation={3} style={{ padding: '1rem' }}>
      <NetworkList
        networks={scannedNetworks}
        onSave={fetchSavedNetworks}
        isScanned={true} // Scanned networks
      />
    </Paper>
  </Grid>
  <Grid item xs={12} md={6}>
    <Paper elevation={3} style={{ padding: '1rem' }}>
      <NetworkList networks={savedNetworks} isScanned={false} /> {/* Saved networks */}
    </Paper>
  </Grid>
</Grid>

    </Container>
  );
};

export default App;
