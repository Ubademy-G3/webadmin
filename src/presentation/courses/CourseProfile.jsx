import * as React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PublicIcon from '@mui/icons-material/Public';
import CategoryIcon from '@mui/icons-material/Category';
import TranslateIcon from '@mui/icons-material/Translate';
import TimerIcon from '@mui/icons-material/Timer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import UserCard from './UserCard';
import ModuleItem from './ModuleItem';

export default function CourseProfile() {
  const [course, setCourse] = React.useState(null);
  const [categories, setCategories] = React.useState(null);
  const [instructors, setInstructors] = React.useState(null);
  const urlParams = useParams();

  React.useEffect(() => {
    axios.get(`https://staging-api-gateway-app.herokuapp.com/courses/${urlParams.id}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((results) => results.data)
      .then((data) => {
        setCourse(data);
      });

    axios.get('https://staging-api-gateway-app.herokuapp.com/categories', { headers: { authorization: localStorage.getItem('token') } })
      .then((results) => results.data)
      .then((data) => {
        setCategories(data);
      });

    axios.get(`https://staging-api-gateway-app.herokuapp.com/courses/${urlParams.id}/users`, { headers: { authorization: localStorage.getItem('token') } })
      .then((results) => results.data)
      .then((data) => {
        const inst = data.users.filter((user) => (user.user_type === 'instructor' || user.user_type === 'collaborator'));
        setInstructors(inst);
      });
  }, []);

  return (
    <>
      {course && (
        <Paper style={{ margin: '50px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Avatar
              alt="Profile Picture"
              src={course.profile_picture ? course.profile_picture : 'https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.png'}
              sx={{ width: 210, height: 210 }}
              style={{ margin: '15px' }}
            />
            <div>
              <Typography variant="h2" style={{ margin: '25px' }}>
                {course.name}
              </Typography>
              <Typography variant="h5" style={{ margin: '30px', textAlign: 'left' }}>
                {course.description}
              </Typography>
            </div>
            <div style={{ textAlign: 'center' }}>
              <img src={`/${course.subscription_type}_subscription.jpg`} alt="Subscription Type" style={{ width: '30%' }} />
            </div>
          </div>
          <div style={{ textAlign: 'left', margin: '20px', marginLeft: '60px' }}>
            {course && categories && (
              <div style={{ display: 'flex' }}>
                <CategoryIcon fontSize="small" />
                <div style={{ marginLeft: '5px' }}>
                  {categories[course.category].name}
                </div>
              </div>
            )}
            <div style={{ display: 'flex' }}>
              <TranslateIcon fontSize="small" />
              <div style={{ marginLeft: '5px' }}>
                {course.language}
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <PublicIcon fontSize="small" />
              <div style={{ marginLeft: '5px' }}>
                {course.location}
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <TimerIcon fontSize="small" />
              <div style={{ marginLeft: '5px' }}>
                {`${course.duration} hours`}
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'left', margin: '20px', marginTop: '50px' }}>
            <Typography variant="h5">
              Contents
            </Typography>
            <List>
              {course.modules && course.modules.map((moduleId) => (
                <>
                  <ModuleItem course_id={course.id} id={moduleId} />
                  <Divider variant="inset" component="li" />
                </>
              ))}
            </List>
          </div>
          <div style={{ textAlign: 'left', margin: '20px', marginTop: '50px' }}>
            <Typography variant="h5">
              Instructors
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  {instructors && instructors.map((instructor) => (
                    <Grid lg={4} sm={12} key={instructor.id} item>
                      <UserCard instructor={instructor} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Paper>
      )}
    </>
  );
}
