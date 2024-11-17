import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import axios from 'axios';

const NetworkList = ({ networks, onSave }) => {
  const saveNetwork = async (network) => {
    try {
      await axios.post('http://localhost:4800/api/save', network);
      alert('Network saved!');
      onSave();
    } catch (error) {
      console.error('Error saving network:', error);
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Scanned Networks
      </Typography>
      {networks.length === 0 ? (
        <Typography>No networks found. Click "Scan Networks" to start.</Typography>
      ) : (
        networks.map((network, index) => (
          <Card key={index} style={{ marginBottom: '1rem' }}>
            <CardContent>
              <Typography variant="h6">
                {network.ssid || 'Unknown SSID'}
              </Typography>
              <Typography variant="body2">BSSID: {network.bssid || 'N/A'}</Typography>
              <Typography variant="body2">Signal Strength: {network.signal} dBm</Typography>
              <Typography variant="body2">Frequency: {network.frequency} MHz</Typography>
              <Typography variant="body2">Channel: {network.channel || 'N/A'}</Typography>
              <Typography variant="body2">
                Encryption: {network.encryption || 'Unknown'}
              </Typography>
              <Typography variant="body2">
                MAC Address: {network.macAddress || 'N/A'}
              </Typography>
              <Typography variant="body2">
                Vendor: {network.vendor || 'N/A'}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => saveNetwork(network)}
                style={{ marginTop: '0.5rem' }}
              >
                Save
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default NetworkList;
