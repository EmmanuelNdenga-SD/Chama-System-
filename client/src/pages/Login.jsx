import { useState } from 'react';
import {
  Box, Typography, TextField, Button, Alert, CircularProgress
} from '@mui/material';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('https://chama-system.onrender.com/api/login', {  // ✅ updated URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Save token and user info
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // ✅ Redirect based on role
        if (data.user.is_admin) {
          window.location.href = '/admin/contributions';
        } else {
          window.location.href = '/member/dashboard';
        }
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={5}>
      <Typography variant="h5" gutterBottom>Login</Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
        </Button>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </form>
    </Box>
  );
}
