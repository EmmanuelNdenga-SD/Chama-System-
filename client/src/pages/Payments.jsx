import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  IconButton,
} from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Payments() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch members on component mount
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/members');
        setMembers(res.data);
      } catch (error) {
        console.error('❌ Error fetching members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // 🔥 DELETE member by ID
  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this member?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/members/${id}`);
      setMembers((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      console.error('❌ Error deleting member:', error);
      alert('Failed to delete member.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 6,
        background: 'linear-gradient(to right, #eef2f7, #f6f9fc)',
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={5}
          sx={{
            p: 4,
            borderRadius: 4,
            backgroundColor: '#fff',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700, color: 'primary.main' }}
          >
            Member Payment Records
          </Typography>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
              <CircularProgress />
            </Box>
          ) : members.length === 0 ? (
            <Typography align="center" color="text.secondary">
              No members found.
            </Typography>
          ) : (
            <TableContainer sx={{ mt: 3 }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f7fa' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Amount Paid (KES)</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {members.map((member) => (
                    <TableRow
                      key={member.id}
                      sx={{
                        backgroundColor: '#fff',
                        '&:hover': { backgroundColor: '#f0f4ff' },
                      }}
                    >
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.phone}</TableCell>
                      <TableCell>
                        {Number(member.amount_paid).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(member.id)}
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
