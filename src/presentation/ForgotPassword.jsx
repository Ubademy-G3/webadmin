import * as React from 'react';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const theme = createTheme();

export default function ForgotPassword() {
  const [hasLoginError, setHasLoginError] = useState(null);
  const [passwordReset, setPasswordReset] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const logInfo = {
      email: data.get('email'),
    };

    axios.post('https://staging-api-gateway-app-v2.herokuapp.com/authentication/password', { email: logInfo.email })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.status);
        }
        setHasLoginError(null);
        setPasswordReset(true);
      })
      .catch((err) => {
        if (err.response && err.response.status && (err.response.status === 400)) {
          setHasLoginError('Invalid fields');
        } else if (err.response && err.response.status && (err.response.status === 404)) {
          setHasLoginError('User not found with given email');
        } else {
          setHasLoginError('Unexpected error. Please try again in a few seconds.');
        }
      });
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
          <Avatar src="./ubademy.png" sx={{ width: 240, height: 240 }} />

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {hasLoginError
                && <Alert severity="error">{hasLoginError}</Alert>}
            {passwordReset
              && <Alert severity="success">Password recovery email sent!</Alert>}
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset password
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
