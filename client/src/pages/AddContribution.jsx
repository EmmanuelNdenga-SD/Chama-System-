import { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, MenuItem,
  Button, CircularProgress, Alert
} from '@mui/material';

export default function AddContribution() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ userId: '', amount: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch members
  useEffect(() => {
    fetch('https://chama-system-5.onrender.com/api/members')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load members');
        return res.json();
      })
      .then(data => {
        setMembers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching members:', err);
        setError('Failed to load members. Please try again.');
        setLoading(false);
      });
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!form.userId || !form.amount) {
      setError('All fields are required.');
      return;
    }

    try {
      const res = await fetch(`https://chama-system-5.onrender.com/api/users/${form.userId}/contributions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: form.amount }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Contribution added successfully!');
        setForm({ userId: '', amount: '' });
      } else {
        setError(data.error || 'Failed to add contribution.');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setError('Server error. Try again later.');
    }
  };

  return (
    <Box maxWidth={500} mx="auto" mt={5}>
      <Typography variant="h5" gutterBottom>
        Add Monthly Contribution
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Select Member"
            name="userId"
            value={form.userId}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          >
            {members.map(member => (
              <MenuItem key={member.id} value={member.id}>
                {member.username} ({member.phone})
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Amount (KES)"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            Submit Contribution
          </Button>

          {message && (
            <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
          )}
        </form>
      )}
    </Box>
  );
}
