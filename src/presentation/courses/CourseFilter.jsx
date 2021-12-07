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
  const [categories, setCategories] = React.useState([]);
  const [subscription, setSubscription] = React.useState([]);
  const [openFilters, setOpenFilters] = React.useState(false);
  // const [level, setLevel] = React.useState([]);

  const p = props;
  const addCategories = (checkedItem, add) => {
    if (add) {
      categories.push(checkedItem);
    } else {
      const index = categories.indexOf(checkedItem);
      if (index > -1) {
        categories.splice(index, 1);
      }
    }
    setCategories(categories);
  };

  const addSubscription = (checkedItem, add) => {
    if (add) {
      subscription.push(checkedItem);
    } else {
      const index = subscription.indexOf(checkedItem);
      if (index > -1) {
        subscription.splice(index, 1);
      }
    }
    setSubscription(subscription);
  };

  /* const addLevel = (checkedItem, add) => {
    if (add) {
      level.push(checkedItem);
    } else {
      const index = level.indexOf(checkedItem);
      if (index > -1) {
        level.splice(index, 1);
      }
    }
    setLevel(level);
    console.log(level);
  }; */

  const setFilter = () => {
    const query = {
      category: categories,
      subscription_type: subscription,
    };

    p.setQuery(query);
  };

  const handleCloseFilters = () => {
    setOpenFilters(false);
  };

  const handleOpenFilters = () => {
    setOpenFilters(true);
  };

  return (
    <div style={{ marginBottom: '50px', textAlign: 'left' }}>
      <Box sx={{ display: 'flex', justifyContent: 'left', marginLeft: '160px' }}>
        <div style={{ fontSize: '14px' }}>
          Filters
        </div>
        {openFilters ? (
          <>
            <ArrowDropUpIcon onClick={() => { handleCloseFilters(); }} />
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend" style={{ fontSize: '12px' }}>Category</FormLabel>
              <FormGroup>
                {p.categories.map((category) => (
                  <FormControlLabel
                    control={(
                      <Checkbox
                        onChange={(e) => { addCategories(e.target.value, e.target.checked); }}
                        value={category.id}
                        checkedIcon={<BpCheckedIcon />}
                        icon={<BpIcon />}
                      />
                    )}
                    label={<Typography variant="caption">{category.name}</Typography>}
                  />
                ))}
              </FormGroup>
            </FormControl>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend" style={{ fontSize: '12px' }}>Subscription</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={(
                    <Checkbox
                      onChange={(e) => { addSubscription(e.target.value, e.target.checked); }}
                      value="free"
                      checkedIcon={<BpCheckedIcon />}
                      icon={<BpIcon />}
                    />
                  )}
                  label={<Typography variant="caption">Free</Typography>}
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      onChange={(e) => { addSubscription(e.target.value, e.target.checked); }}
                      value="gold"
                      checkedIcon={<BpCheckedIcon />}
                      icon={<BpIcon />}
                    />
                  )}
                  label={<Typography variant="caption">Gold</Typography>}
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      onChange={(e) => { addSubscription(e.target.value, e.target.checked); }}
                      value="platinum"
                      checkedIcon={<BpCheckedIcon />}
                      icon={<BpIcon />}
                    />
                  )}
                  label={<Typography variant="caption">Platinum</Typography>}
                />
              </FormGroup>
            </FormControl>
          </>
        ) : (
          <ArrowDropDownIcon onClick={() => { handleOpenFilters(); }} />
        )}
      </Box>
      {openFilters && (
        <Button style={{ marginBottom: '50px', marginLeft: '320px' }} onClick={() => { setFilter(); }}>
          Filter
        </Button>
      )}
    </div>
  );
}
