import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function SearchBar(props) {
  const p = props;

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
      <TextField hiddenLabel fullWidth label="Search course..." id="search-course" onChange={(e) => { p.setInput(e.target.value); }} />
    </Box>
  );
}
