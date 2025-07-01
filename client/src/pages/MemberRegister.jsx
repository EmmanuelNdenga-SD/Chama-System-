import React, { useState } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';

export default function MemberRegister() {
  const [form, setForm] = useState({
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('https://chama-system.onrender.com/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // ✅ Required for cookies or JWT auth
        body: JSON.stringify({
          username: form.username,
          phone: form.phone,
          password: form.password,
          is_admin: false,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Registration successful!');
        setForm({
          username: '',
          phone: '',
          password: '',
          confirmPassword: '',
        });
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Member Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          fullWidth
          margin="normal"
          value={form.username}
          onChange={handleChange}
          required
        />
        <TextField
          label="Phone"
          name="phone"
          fullWidth
          margin="normal"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={form.password}
          onChange={handleChange}
          required
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          fullWidth
          margin="normal"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
      {message && (
        <Typography color="primary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
