import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import MenuBookIcon from '@mui/icons-material/MenuBook';

function preventDefault(event) {
  event.preventDefault();
}

export default function Courses() {
  const [courses, setCourses] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    axios.get('https://staging-api-gateway-app.herokuapp.com/courses', { headers: { authorization: localStorage.getItem('token') } })
      .then((results) => results.data)
      .then((data) => {
        setCourses(data);
      });

    axios.get('https://staging-api-gateway-app.herokuapp.com/categories', { headers: { authorization: localStorage.getItem('token') } })
      .then((results) => results.data)
      .then((data) => {
        setCategories(data);
      });
  }, []);

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Courses Admin
      </Typography>
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
          {console.log(categories)}
          {courses && courses.courses && courses.courses.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Button href={`/courses/${row.id}`} target="_blank">
                  <MenuBookIcon> </MenuBookIcon>
                </Button>
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{categories[row.category].name}</TableCell>
              <TableCell>{row.subscription_type}</TableCell>
              <TableCell>{row.level}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more courses
      </Button>
    </>
  );
}
