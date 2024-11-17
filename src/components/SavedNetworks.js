import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const SavedNetworks = ({ networks }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Saved Networks
      </Typography>
      {networks.length === 0 ? (
        <Typography>No networks saved yet.</Typography>
      ) : (
        networks.map((network) => (
          <Card key={network.id} style={{ marginBottom: '1rem' }}>
            <CardContent>
              <Typography variant="h6">{network.ssid || 'Unknown SSID'}</Typography>
              <Typography variant="body2">Signal: {network.signal} dBm</Typography>
              <Typography variant="body2">Frequency: {network.frequency} MHz</Typography>
              <Typography variant="body2">Saved On: {new Date(network.timestamp).toLocaleString()}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default SavedNetworks;
