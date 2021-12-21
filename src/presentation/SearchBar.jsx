import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function SearchBar(props) {
  const p = props;
  const [timer, setTimer] = React.useState(null);

  const changeDelay = (change) => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        p.setInput(change);
      }, 300),
    );
  };

  return (
    <Box
      sx={{
        width: '75%',
        maxWidth: '100%',
        margin: 'auto',
        marginTop: '30px',
        marginBottom: '20px',
      }}
    >
      <TextField hiddenLabel fullWidth label="Search course..." id="search-bar" onChange={(e) => { changeDelay(e.target.value); }} />
    </Box>
  );
}
