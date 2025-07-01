import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  CircularProgress
} from '@mui/material';

export default function AdminMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/members')
      .then(res => {
        setMembers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch members:', err);
        setLoading(false);
      });
  }, []);

  return (
    <Box maxWidth={700} mx="auto" mt={5} px={2}>
      <Typography variant="h5" gutterBottom>
        Registered Members
      </Typography>

      {loading ? (
        <Box textAlign="center" mt={3}>
          <CircularProgress />
          <Typography variant="body1" mt={2}>Loading members...</Typography>
        </Box>
      ) : members.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No members found.
        </Typography>
      ) : (
        <Paper elevation={2}>
          <List>
            {members.map(member => (
              <ListItem key={member.id} divider>
                <ListItemText
                  primary={member.username}
                  secondary={`Phone: ${member.phone}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}
