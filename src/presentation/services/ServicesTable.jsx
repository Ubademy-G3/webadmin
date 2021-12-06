import * as React from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import AddIcon from '@mui/icons-material/Add';
import TableFooter from '../TableFooter';
import useTable from '../useTable';

export default function ServicesTable(props) {
  const p = props;
  const [page, setPage] = React.useState(1);
  const { slice, range } = useTable(p.services, page, 10);

  return (
    <>
      <div style={{ textAlign: 'left' }}>
        <Button onClick={() => { p.setShowCreateDialog(true); }}>
          <AddIcon />
          Add new service
        </Button>
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell> </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Apikey</TableCell>
            <TableCell>State</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {slice.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Button onClick={() => { p.setShowDialog(row.id); }}>
                  <MiscellaneousServicesIcon />
                </Button>
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.apikey}</TableCell>
              <TableCell>{row.state}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ display: 'flex' }}>
        <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
      </div>
    </>
  );
}
