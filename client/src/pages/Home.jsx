import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 5,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #f0f4ff 0%, #e4f7f0 100%)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
          Welcome to Chama System
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4 }}>
          Efficiently manage your Chama group members, track payments, and keep records with ease.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/add-member"
            variant="outlined"
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Add Member
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
