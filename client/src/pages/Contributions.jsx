import { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, CircularProgress } from '@mui/material';

export default function Contributions() {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('member_token');
    const memberId = token?.split('-').pop(); // e.g. "mock-token-for-member-3" => 3

    if (!memberId) return;

    fetch(`https://chama-system-5.onrender.com/api/users/${memberId}/contributions`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch contributions');
        return res.json();
      })
      .then(data => {
        setContributions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setContributions([]);
        setLoading(false);
      });
  }, []);

  return (
    <Box maxWidth={600} mx="auto" mt={5}>
      <Typography variant="h5" mb={2}>Your Contributions</Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {contributions.length === 0 ? (
            <Typography>No contributions found.</Typography>
          ) : (
            contributions.map((c, i) => (
              <ListItem key={i}>
                {c.amount} KES on {new Date(c.date).toLocaleDateString()}
              </ListItem>
            ))
          )}
        </List>
      )}
    </Box>
  );
}
