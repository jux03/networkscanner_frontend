import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import axios from 'axios';

const NetworkList = ({ networks, onSave, isScanned = false }) => {
  const saveNetwork = async (network) => {
    try {
      await axios.post('http://localhost:4800/api/save', network);
      alert('Network saved!');
      if (onSave) onSave(); // Refresh saved networks
    } catch (error) {
      console.error('Error saving network:', error);
      alert('Failed to save network. Please try again.');
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        {isScanned ? 'Scanned Networks' : 'Saved Networks'}
      </Typography>
      {networks.length === 0 ? (
        <Typography>
          {isScanned
            ? 'No networks found. Click "Scan Networks" to start.'
            : 'No saved networks found.'}
        </Typography>
      ) : (
        networks.map((network, index) => (
          <Card key={index} style={{ marginBottom: '1rem' }}>
            <CardContent>
              <Typography variant="h6">
                {network.name || network.ssid || 'Unknown Name'}
              </Typography>
              <Typography variant="body2">
                Type: {network.type || 'Unknown'}
              </Typography>
              <Typography variant="body2">Address: {network.address || network.bssid || 'N/A'}</Typography>
              <Typography variant="body2">
                Signal Strength: {network.signal || network.signal_level || 'N/A'} dBm
              </Typography>
              <Typography variant="body2">Frequency: {network.frequency || 'N/A'} MHz</Typography>
              <Typography variant="body2">Channel: {network.channel || 'N/A'}</Typography>
              <Typography variant="body2">Encryption: {network.encryption || 'Unknown'}</Typography>
              <Typography variant="body2">MAC Address: {network.macAddress || 'N/A'}</Typography>
              <Typography variant="body2">Vendor: {network.vendor || 'N/A'}</Typography>
              {isScanned && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => saveNetwork(network)}
                  style={{ marginTop: '0.5rem' }}
                >
                  Save
                </Button>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default NetworkList;
