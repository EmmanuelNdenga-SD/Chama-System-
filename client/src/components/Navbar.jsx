import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navbar({ isAuthenticated, isMemberAuthenticated, onLogout }) {
  return (
    <AppBar position="static" color="primary" elevation={3}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            Chama System
          </Link>
        </Typography>

        {/* Admin Navigation */}
        {isAuthenticated && (
          <Box>
            <Button color="inherit" component={Link} to="/payments">
              Payments
            </Button>
            <Button color="inherit" component={Link} to="/add-member">
              Add Member
            </Button>
          </Box>
        )}

        {/* Member Navigation */}
        {isMemberAuthenticated && (
          <Button color="inherit" component={Link} to="/contributions">
            Contributions
          </Button>
        )}

        {/* Auth buttons */}
        {(isAuthenticated || isMemberAuthenticated) ? (
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Admin Login
            </Button>
            <Button color="inherit" component={Link} to="/member/login">
              Member Login
            </Button>
            <Button color="inherit" component={Link} to="/member/register">
              Register Member
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
