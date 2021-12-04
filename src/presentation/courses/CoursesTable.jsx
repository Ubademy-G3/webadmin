import * as React from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TableFooter from '../TableFooter';
import useTable from '../useTable';

export default function CoursesTable(props) {
  const p = props;
  const [page, setPage] = React.useState(1);
  const { slice, range } = useTable(p.courses.courses, page, 10);
  console.log(slice);
  console.log(range);
  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Course</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Subscription Type</TableCell>
            <TableCell>Level</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {slice.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Button href={`/courses/${row.id}`} target="_blank">
                  <MenuBookIcon> </MenuBookIcon>
                </Button>
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{p.categories[row.category].name}</TableCell>
              <TableCell>{row.subscription_type}</TableCell>
              <TableCell>{row.level}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
}
