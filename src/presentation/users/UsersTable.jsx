import * as React from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import TableFooter from '../TableFooter';
import useTable from '../useTable';

export default function UsersTable(props) {
  const p = props;
  const [page, setPage] = React.useState(1);
  const { slice, range } = useTable(p.users, page, 10);

  return (
    <>
      <div style={{ textAlign: 'left' }}>
        <Button onClick={() => { p.setShowCreateAdminDialog(true); }}>
          <AddIcon />
          Add admin
        </Button>
      </div>
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
          {slice.map((row) => (
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
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
}
