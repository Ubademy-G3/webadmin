import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';

function preventDefault(event) {
  event.preventDefault();
}

export default function Users() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    axios.get('https://staging-users-service.herokuapp.com/users', { headers: { authorization: '47M47m' } })
      .then((results) => results.data)
      .then((data) => {
        setUsers(data);
      });
  }, []);

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Administración de Usuarios
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Profile</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Rol</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Button href={`/users/${row.id}`} target="_blank">
                  <PersonIcon> </PersonIcon>
                </Button>
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.rol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more users
      </Button>
    </>
  );
}
