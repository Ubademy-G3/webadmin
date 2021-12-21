import * as React from 'react';
import axios from 'axios';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export default function ModuleItem(props) {
  const p = props;
  const [module, setModule] = React.useState(null);

  React.useEffect(() => {
    axios.get(`https://staging-api-gateway-app-v2.herokuapp.com/courses/${p.course_id}/modules/${p.id}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((results) => results.data)
      .then((data) => {
        setModule(data);
      });
  }, []);

  return (
    <>
      {module && (
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={module.title}
            secondary={(
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                />
                {module.content}
              </>
            )}
          />
        </ListItem>
      )}
    </>
  );
}
