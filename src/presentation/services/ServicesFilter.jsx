import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/material/styles';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const BpIcon = styled('span')(() => ({
  borderRadius: 3,
  width: 16,
  height: 16,
  boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: '#f5f8fa',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: 'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#137cbd',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath"
      + " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 "
      + "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#106ba3',
  },
});

export default function CourseFilter(props) {
  const [state, setState] = React.useState([]);
  const [openFilters, setOpenFilters] = React.useState(false);

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

  const handleCloseFilters = () => {
    setOpenFilters(false);
  };

  const handleOpenFilters = () => {
    setOpenFilters(true);
  };

  return (
    <div style={{ marginBottom: '50px', textAlign: 'left' }}>
      <Box sx={{ display: 'flex', justifyContent: 'left', marginLeft: '10px' }}>
        <div style={{ fontSize: '14px' }}>
          Filters
        </div>
        {openFilters ? (
          <>
            <ArrowDropUpIcon onClick={() => { handleCloseFilters(); }} />
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend" style={{ fontSize: '12px' }}>State</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={(
                    <Checkbox
                      onChange={(e) => { setCheckedState(e.target.checked, e.target.value); }}
                      value="active"
                      checkedIcon={<BpCheckedIcon />}
                      icon={<BpIcon />}
                    />
                  )}
                  label={<Typography variant="caption">Active</Typography>}
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      onChange={(e) => { setCheckedState(e.target.checked, e.target.value); }}
                      value="taken_down"
                      checkedIcon={<BpCheckedIcon />}
                      icon={<BpIcon />}
                    />
                  )}
                  label={<Typography variant="caption">Inactive</Typography>}
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      onChange={(e) => { setCheckedState(e.target.checked, e.target.value); }}
                      value="blocked"
                      checkedIcon={<BpCheckedIcon />}
                      icon={<BpIcon />}
                    />
                  )}
                  label={<Typography variant="caption">Blocked</Typography>}
                />
              </FormGroup>
            </FormControl>
          </>
        ) : (
          <ArrowDropDownIcon onClick={() => { handleOpenFilters(); }} />
        )}
      </Box>
      {openFilters && (
        <Button style={{ marginLeft: '100px', fontSize: '14px' }} onClick={() => { setFilter(); }}>
          Filter
        </Button>
      )}
    </div>
  );
}
