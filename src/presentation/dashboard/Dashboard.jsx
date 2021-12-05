import * as React from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import { PieChart } from 'react-minimal-pie-chart';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SquareIcon from '@mui/icons-material/Square';
import Typography from '@mui/material/Typography';

export default function Dashboard() {
  const [users, setUsers] = React.useState(null);
  const [courses, setCourses] = React.useState(null);

  React.useEffect(() => {
    axios.get('https://staging-api-gateway-app.herokuapp.com/metrics/users/', { headers: { authorization: localStorage.getItem('token') } })
      .then((results) => results.data)
      .then((data) => {
        setUsers(data);
      });
    axios.get('https://staging-api-gateway-app.herokuapp.com/metrics/courses/', { headers: { authorization: localStorage.getItem('token') } })
      .then((results) => results.data)
      .then((data) => {
        setCourses(data);
      });
  }, []);

  const getRegisteredWithMail = () => (
    users.metrics.registered_with_mail / users.users_amount);
  const getRegisteredByApp = () => (users.metrics.registered_with_app / users.users_amount);
  const getLoggedWithMail = () => (
    users.metrics.logged_with_mail / users.users_amount);
  const getLoggedByApp = () => (users.metrics.logged_with_app / users.users_amount);
  const getApprovedRate = () => (
    courses.metrics.users_approved / courses.metrics.total_users);
  const getCurrentlyStudyingRate = () => (
    courses.metrics.users_currently_studying / courses.metrics.total_users);
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2}>
        {users && (
          <>
            <div display="flex">
              <Grid item mt="15px">
                <Paper
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h5">
                    Total Users
                  </Typography>
                  {users.users_amount}
                </Paper>
              </Grid>
              <Grid item mt="30px">
                <Paper
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h5">
                    Number of password resets
                  </Typography>
                  {users.metrics.times_pw_changed}
                </Paper>
              </Grid>
            </div>
            <Grid item>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <PieChart
                  data={[
                    { title: 'Registered users with email and password', value: getRegisteredWithMail(), color: '#E38627' },
                    { title: 'Registered users with GoogleAuth', value: getRegisteredByApp(), color: '#C13C37' },
                  ]}
                  label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
                />
                <div>
                  <SquareIcon fontSize="small" style={{ color: '#E38627' }} />
                  Registered users with email and password
                </div>
                <div>
                  <SquareIcon fontSize="small" style={{ color: '#C13C37' }} />
                  Registered users with con GoogleAuth
                </div>
              </Paper>
            </Grid>
            <Grid item>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <PieChart
                  data={[
                    { title: 'Logged users with email and password', value: getLoggedWithMail(), color: '#E38627' },
                    { title: 'Logged users with GoogleAuth', value: getLoggedByApp(), color: '#C13C37' },
                  ]}
                  label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
                />
                <div>
                  <SquareIcon fontSize="small" style={{ color: '#E38627' }} />
                  Logged users with email and password
                </div>
                <div>
                  <SquareIcon fontSize="small" style={{ color: '#C13C37' }} />
                  Logged users with GoogleAuth
                </div>
              </Paper>
            </Grid>
          </>
        )}
      </Grid>
      <Grid container spacing={2} mt="10px">
        {courses && (
          <>
            <div display="flex">
              <Grid item mt="15px">
                <Paper
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h5">
                    Total Courses
                  </Typography>
                  {courses.courses_amount}
                </Paper>
              </Grid>
              <Grid item mt="30px">
                <Paper
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h5">
                    Number of current students
                  </Typography>
                  {courses.metrics.total_users}
                </Paper>
              </Grid>
            </div>
            <Grid item>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <PieChart
                  data={[
                    { title: 'Users who completed the course', value: getApprovedRate(), color: '#E38627' },
                    { title: 'Users currently studying', value: getCurrentlyStudyingRate(), color: '#C13C37' },
                  ]}
                  label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
                />
                <div>
                  <SquareIcon fontSize="small" style={{ color: '#E38627' }} />
                  Users who completed the course
                </div>
                <div>
                  <SquareIcon fontSize="small" style={{ color: '#C13C37' }} />
                  Users currently studying
                </div>
              </Paper>
            </Grid>
            <div display="flex">
              <Grid item mt="15px" ml="10px">
                <Paper
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h5">
                    Exams Taken
                  </Typography>
                  {courses.metrics.exams_amount}
                </Paper>
              </Grid>
              <Grid item mt="30px" ml="10px">
                <Paper
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h5">
                    Average Score
                  </Typography>
                  {courses.metrics.average_score}
                </Paper>
              </Grid>
            </div>
            <div>
              <Grid item mt="15px" ml="10px">
                <Paper
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h5">
                    Approval Rate
                  </Typography>
                  {courses.metrics.approval_rate * 100}
                  %
                </Paper>
              </Grid>
              <Grid item mt="30px" ml="10px">
                <Paper
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h5">
                    Passed exams
                  </Typography>
                  {courses.metrics.passed_exams}
                </Paper>
              </Grid>
            </div>
          </>
        )}
      </Grid>
    </Container>
  );
}
