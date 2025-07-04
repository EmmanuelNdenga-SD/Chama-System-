import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import MemberLogin from './pages/MemberLogin';
import MemberRegister from './pages/MemberRegister';
import Contributions from './pages/Contributions';
import AddContribution from './pages/AddContribution';
import AdminMembers from './pages/AdminMembers';
import Navbar from './components/Navbar';
import { Box, Typography, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2E5BFF' },
    secondary: { main: '#00C292' },
    background: { default: '#f2f6fc' },
  },
  typography: { fontFamily: 'Roboto, sans-serif' },
  shape: { borderRadius: 8 },
});

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMemberAuthenticated, setMemberAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const memberToken = localStorage.getItem('member_token');
    setIsAuthenticated(!!token);
    setMemberAuthenticated(!!memberToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('member_token');
    setIsAuthenticated(false);
    setMemberAuthenticated(false);
    navigate('/login');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundImage: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
          backgroundAttachment: 'fixed',
        }}
      >
        <Navbar
          isAuthenticated={isAuthenticated}
          isMemberAuthenticated={isMemberAuthenticated}
          onLogout={handleLogout}
        />

        <Box sx={{ flex: 1, px: 2, py: 4 }}>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />

            {/* Auth */}
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/member/login"
              element={<MemberLogin setMemberAuthenticated={setMemberAuthenticated} />}
            />
            <Route path="/member/register" element={<MemberRegister />} />

            {/* Member Route */}
            <Route
              path="/contributions"
              element={
                isMemberAuthenticated ? (
                  <Contributions />
                ) : (
                  <MemberLogin setMemberAuthenticated={setMemberAuthenticated} />
                )
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/contributions"
              element={
                isAuthenticated ? (
                  <AddContribution />
                ) : (
                  <Login setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route
              path="/admin/members"
              element={
                isAuthenticated ? (
                  <AdminMembers />
                ) : (
                  <Login setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />

            {/* 404 */}
            <Route
              path="*"
              element={
                <Box textAlign="center" mt={5}>
                  <Typography variant="h5">404 - Page Not Found</Typography>
                </Box>
              }
            />
          </Routes>
        </Box>

        {/* Footer */}
        <Box sx={{ py: 3, textAlign: 'center', color: 'gray' }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Chama Management System. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
