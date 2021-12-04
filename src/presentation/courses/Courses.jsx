import * as React from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import CoursesTable from './CoursesTable';
import SearchBar from '../SearchBar';

export default function Courses() {
  const [courses, setCourses] = React.useState(null);
  const [categories, setCategories] = React.useState(null);
  const [searchInput, setSearchInput] = React.useState('');

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

  React.useEffect(() => {
    axios.get('https://staging-api-gateway-app.herokuapp.com/courses', { params: { text: searchInput }, headers: { authorization: localStorage.getItem('token') } })
      .then((results) => results.data)
      .then((data) => {
        setCourses(data);
      });
  }, [searchInput]);

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Courses Admin
      </Typography>
      <SearchBar input={searchInput} setInput={setSearchInput} />
      {console.log(courses)}
      {courses && categories && (
        <CoursesTable courses={courses} categories={categories} />
      )}
    </>
  );
}
