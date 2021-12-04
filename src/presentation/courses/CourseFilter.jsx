import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

export default function CourseFilter(props) {
  const [categories, setCategories] = React.useState([]);
  const [subscription, setSubscription] = React.useState([]);
  // const [level, setLevel] = React.useState([]);

  const p = props;
  console.log(p);
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
    console.log(categories);
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
    console.log(subscription);
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

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Category</FormLabel>
          <FormGroup>
            {p.categories.map((category) => (
              <FormControlLabel
                control={(
                  <Checkbox
                    onChange={(e) => { addCategories(e.target.value, e.target.checked); }}
                    value={category.id}
                  />
                )}
                label={category.name}
              />
            ))}
          </FormGroup>
        </FormControl>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Subscription</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox onChange={(e) => { addSubscription(e.target.value, e.target.checked); }} value="free" />
              }
              label="Free"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={(e) => { addSubscription(e.target.value, e.target.checked); }} value="gold" />
              }
              label="Gold"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={(e) => { addSubscription(e.target.value, e.target.checked); }} value="platinum" />
              }
              label="Platinum"
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
