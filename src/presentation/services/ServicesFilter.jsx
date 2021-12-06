import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

export default function CourseFilter(props) {
  const [state, setState] = React.useState([]);

  const p = props;

  const setCheckedState = (checked, value) => {
    const alreadyChecked = state;
    if (checked && value && !alreadyChecked.includes(value)) {
      alreadyChecked.push(value);
    }

    if (!checked && (alreadyChecked.includes(value))) {
      const index = alreadyChecked.indexOf(value);
      if (index > -1) {
        alreadyChecked.splice(index, 1);
      }
    }
    setState(alreadyChecked);
  };

  const setFilter = () => {
    if (state && state.length > 0) {
      const filtered = p.allServices.filter((service) => state.includes(service.state));
      p.setServices(filtered);
    } else {
      p.setServices(p.allServices);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">State</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={(
                <Checkbox
                  onChange={(e) => { setCheckedState(e.target.checked, e.target.value); }}
                  value="active"
                />
              )}
              label="Active"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  onChange={(e) => { setCheckedState(e.target.checked, e.target.value); }}
                  value="taken_down"
                />
              )}
              label="Inactive"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  onChange={(e) => { setCheckedState(e.target.checked, e.target.value); }}
                  value="blocked"
                />
              )}
              label="Blocked"
            />
          </FormGroup>
        </FormControl>
      </Box>
      <Button style={{ marginBottom: '50px' }} onClick={() => { setFilter(); }}>
        Filtrar
      </Button>
    </>
  );
}
