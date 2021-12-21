import * as React from 'react';
import axios from 'axios';
import qs from 'qs';
import Typography from '@mui/material/Typography';
import CoursesTable from './CoursesTable';
import CourseFilter from './CourseFilter';
import SearchBar from '../SearchBar';

export default function Courses() {
  const [courses, setCourses] = React.useState(null);
  const [categories, setCategories] = React.useState(null);
  const [searchInput, setSearchInput] = React.useState('');
  const [query, setQuery] = React.useState({});

  React.useEffect(() => {
    axios.get('https://staging-api-gateway-app-v2.herokuapp.com/courses', { headers: { authorization: localStorage.getItem('token') } })
      .then((results) => results.data)
      .then((data) => {
        setCourses(data);
      });

    axios.get('https://staging-api-gateway-app-v2.herokuapp.com/categories', { headers: { authorization: localStorage.getItem('token') } })
      .then((results) => results.data)
      .then((data) => {
        setCategories(data);
      });
  }, []);

  React.useEffect(() => {
    axios.get('https://staging-api-gateway-app-v2.herokuapp.com/courses', { params: { text: searchInput }, headers: { authorization: localStorage.getItem('token') } })
      .then((results) => results.data)
      .then((data) => {
        setCourses(data);
      });
  }, [searchInput]);

  React.useEffect(() => {
    if ((query.category && query.category.length === 1)
    || (query.subscription_type && query.subscription_type.length === 1)) {
      axios.get('https://staging-api-gateway-app-v2.herokuapp.com/courses', { params: query, headers: { authorization: localStorage.getItem('token') } })
        .then((results) => results.data)
        .then((data) => {
          setCourses(data);
        })
        .catch(() => {
          setCourses(null);
        });
    } else {
      axios.get('https://staging-api-gateway-app-v2.herokuapp.com/courses', { params: query, headers: { authorization: localStorage.getItem('token') }, paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }) })
        .then((results) => results.data)
        .then((data) => {
          setCourses(data);
        })
        .catch(() => {
          setCourses(null);
        });
    }
  }, [query]);

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" style={{ margin: '20px' }} gutterBottom>
        Courses Admin
      </Typography>
      <SearchBar input={searchInput} setInput={setSearchInput} />
      {categories && (
        <CourseFilter query={query} setQuery={setQuery} categories={categories} />
      )}
      {courses && categories ? (
        <CoursesTable courses={courses} categories={categories} />
      ) : (
        <div>Oops! We could not find any course with the given criteria.</div>
      )}
    </>
  );
}
