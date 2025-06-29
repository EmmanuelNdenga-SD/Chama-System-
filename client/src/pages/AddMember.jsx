import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  CssBaseline,
  Alert
} from '@mui/material';
import axios from 'axios';

export default function AddMember() {
  const [member, setMember] = useState({
    name: '',
    phone: '',
    amount_paid: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending member data:", member);

    try {
      const preparedMember = {
        ...member,
        amount_paid: Number(member.amount_paid)
      };

      const response = await axios.post('http://localhost:5000/members', preparedMember);
      setMessage(response.data.message);
      setError(false);
      setMember({ name: '', phone: '', amount_paid: '' });
    } catch (error) {
      console.error("❌ Add member error:", error.response?.data || error.message);
      setError(true);
      setMessage(error.response?.data?.error || 'Failed to add member');
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
      <CssBaseline />
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: '#fff',
        }}
      >
        <Typography component="h1" variant="h5" align="center" sx={{ fontWeight: 600, mb: 3 }}>
          ➕ Add New Chama Member
        </Typography>

        {message && (
          <Alert severity={error ? "error" : "success"} sx={{ mb: 3 }}>
            {message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={member.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={member.phone}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Amount Paid"
            name="amount_paid"
            type="number"
            value={member.amount_paid}
            onChange={handleChange}
            margin="normal"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}
          >
            Add Member
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
