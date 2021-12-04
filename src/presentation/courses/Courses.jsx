import * as React from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import CoursesTable from './CoursesTable';

export default function Courses() {
  const [courses, setCourses] = React.useState(null);
  const [categories, setCategories] = React.useState(null);

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
      {courses && categories && (
        <CoursesTable courses={courses} categories={categories} />
      )}
    </>
  );
}
