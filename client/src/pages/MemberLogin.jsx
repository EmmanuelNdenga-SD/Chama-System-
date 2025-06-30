import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';

export default function MemberLogin({ setMemberAuth }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('https://your-render-backend-url/members/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('member_token', data.access_token);
      setMemberAuth(true);
      navigate('/contributions');
    } else {
      setError(data.error);
    }
  };

  return (
    <Box>
      <Typography variant="h4">Member Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Username" name="username" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Password" name="password" type="password" fullWidth margin="normal" onChange={handleChange} />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained">Login</Button>
      </form>
    </Box>
  );
}
