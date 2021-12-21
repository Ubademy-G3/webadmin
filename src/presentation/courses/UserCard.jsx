import * as React from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const StyledBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    right: 40,
    top: 126,
  },
}));

export default function UserCard(props) {
  const p = props;
  const [user, setUser] = React.useState(null);
  console.log(p);
  React.useEffect(() => {
    axios.get(`https://staging-api-gateway-app-v2.herokuapp.com/users/${p.instructor.user_id}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((results) => results.data)
      .then((data) => {
        setUser(data);
        console.log(data);
      });
  }, []);

  return (
    <>
      {user && (
        <Stack spacing={2} direction="row">
          <StyledBadge badgeContent={p.instructor.user_type} color="primary">
            <Card sx={{ maxWidth: 345 }} key={p.id}>
              <CardMedia
                component="img"
                height="140"
                image={user.profilePictureUrl ? user.profilePictureUrl : '/User-avatar.svg.png'}
                alt="User Profile Picture"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {`${user.firstName} ${user.lastName}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href={`/users/${p.instructor.user_id}`} target="_blank">See User</Button>
              </CardActions>
            </Card>
          </StyledBadge>
        </Stack>
      )}
    </>
  );
}
