import * as React from 'react';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const theme = createTheme();

export default function Login() {
  const [hasLoginError, setHasLoginError] = useState(null);
  const navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const logInfo = {
      email: data.get('email'),
      password: data.get('password'),
    };

    axios.post(`https://staging-api-gateway-app.herokuapp.com/authentication`, logInfo)
      .then(res => {
          console.log(res.status)
          if (res.status !== 200) {
            throw new Error(res.status);
          }
            if (res.data.rol !== 'admin') {
                setHasLoginError("Unauthorized: Rol must be 'admin'")
                return;
            }
            localStorage.setItem("loggedUser", res.data);
            setHasLoginError(null);
            navigate(from, { replace: true });
      })
      .catch(err => {
        if (err.response && err.response.status && (err.response.status === 400)) {
            setHasLoginError('Invalid fields')
        } else if (err.response && err.response.status && (err.response.status === 403)) {
            setHasLoginError('Invalid credentials')
        } else if (err.response && err.response.status && (err.response.status === 404)) {
            setHasLoginError('User not found with given email')
        } else {
            console.log(err)
            setHasLoginError('Unexpected error. Please try again in a few seconds.')
        }
      })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar src="./ubademy.png" sx={{ width: 240, height: 240 }}></Avatar>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {hasLoginError &&
                <Alert severity="error">{hasLoginError}</Alert>
            }
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="https://password-reset-app.herokuapp.com/:userId" variant="body2" target="_blank">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}