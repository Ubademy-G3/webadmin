import * as React from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import { PieChart } from 'react-minimal-pie-chart';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SquareIcon from '@mui/icons-material/Square';
import Typography from '@mui/material/Typography';
import Orders from './Orders';

export default function Dashboard() {
  const [users, setUsers] = React.useState(null);

  React.useEffect(() => {
    axios.get('https://staging-api-gateway-app.herokuapp.com/metrics/users/', { headers: { authorization: localStorage.getItem('token') } })
      .then((results) => results.data)
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const getRegisteredWithMail = () => (
    users.metrics.registered_with_mail / users.users_amount);
  const getRegisteredByApp = () => (users.metrics.registered_with_app / users.users_amount);
  const getLoggedWithMail = () => (
    users.metrics.logged_with_mail / users.users_amount);
  const getLoggedByApp = () => (users.metrics.logged_with_app / users.users_amount);
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
                    { title: 'Usuarios registrados con email y contraseña', value: getRegisteredWithMail(), color: '#E38627' },
                    { title: 'Usuarios registrados con GoogleAuth', value: getRegisteredByApp(), color: '#C13C37' },
                  ]}
                  label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
                />
                <div>
                  <SquareIcon fontSize="small" style={{ color: '#E38627' }} />
                  Usuarios registrados con email y contraseña
                </div>
                <div>
                  <SquareIcon fontSize="small" style={{ color: '#C13C37' }} />
                  Usuarios registrados con GoogleAuth
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
                    { title: 'Usuarios loggeados con email y contraseña', value: getLoggedWithMail(), color: '#E38627' },
                    { title: 'Usuarios loggeados con GoogleAuth', value: getLoggedByApp(), color: '#C13C37' },
                  ]}
                  label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
                />
                <div>
                  <SquareIcon fontSize="small" style={{ color: '#E38627' }} />
                  Usuarios loggeados con email y contraseña
                </div>
                <div>
                  <SquareIcon fontSize="small" style={{ color: '#C13C37' }} />
                  Usuarios loggeados con GoogleAuth
                </div>
              </Paper>
            </Grid>
          </>
        )}
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
