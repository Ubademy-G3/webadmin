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

export default function CourseCard(props) {
  const [course, setCourses] = React.useState([]);
  const p = props;

  React.useEffect(() => {
    axios.get(`https://staging-api-gateway-app.herokuapp.com/courses/${p.id}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((results) => results.data)
      .then((data) => {
        setCourses(data);
      });
  }, []);

  return (
    <>
      {p.completed ? (
        <Stack spacing={2} direction="row">
          <StyledBadge badgeContent="Completed" color="success">
            <Card sx={{ maxWidth: 345 }} key={p.id}>
              <CardMedia
                component="img"
                height="140"
                image={course.profile_picture ? course.profile_picture : 'https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.png'}
                alt="Course Image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {course.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href={`/courses/${p.id}`}>See Course</Button>
              </CardActions>
            </Card>
          </StyledBadge>
        </Stack>
      ) : (
        <Card sx={{ maxWidth: 345 }} key={p.id}>
          <CardMedia
            component="img"
            height="140"
            image={course.profile_picture ? course.profile_picture : 'https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.png'}
            alt="Course Image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {course.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {course.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" href={`/courses/${p.id}`}>See Course</Button>
          </CardActions>
        </Card>
      )}
    </>
  );
}
