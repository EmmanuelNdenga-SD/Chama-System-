// src/pages/ChamaMembers.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

export default function ChamaMembers() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/members')
      .then(res => setMembers(res.data))
      .catch(err => console.error("Failed to fetch members:", err));
  }, []);

  return (
    <Box component={Paper} elevation={3} p={3}>
      <Typography variant="h5" mb={2}>Chama Members</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Amount Paid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map(member => (
            <TableRow key={member.id}>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.username}</TableCell>
              <TableCell>{member.phone || '—'}</TableCell>
              <TableCell>{member.amount_paid}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
