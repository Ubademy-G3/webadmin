import * as React from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import PublicIcon from '@mui/icons-material/Public';
import PaidIcon from '@mui/icons-material/Paid';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import CourseCard from './CourseCard';

export default function UserProfile() {
  const [user, setUser] = React.useState([]);
  const [courses, setCourses] = React.useState([]);
  const [wallet, setWallet] = React.useState([]);
  const params = useParams();

  React.useEffect(() => {
    axios.get(`https://staging-api-gateway-app.herokuapp.com/users/${params.id}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((results) => results.data)
      .then((data) => {
        setUser(data);
      });

    axios.get(`https://staging-api-gateway-app.herokuapp.com/users/${params.id}/courses`, { headers: { authorization: localStorage.getItem('token') } })
      .then((results) => results.data)
      .then((data) => {
        setCourses(data);
      });

    axios.get(`https://staging-api-gateway-app.herokuapp.com/users/${params.id}/wallet`, { headers: { authorization: localStorage.getItem('token') } })
      .then((results) => results.data)
      .then((data) => {
        console.log(data);
        setWallet(data);
      });
  }, []);

  return (
    <>
      <Paper style={{ margin: '50px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Avatar
            alt="Profile Picture"
            src={user.profilePictureUrl ? user.profilePictureUrl : '/User-avatar.svg.png'}
            sx={{ width: 210, height: 210 }}
            style={{ margin: '15px' }}
          />
          <div>
            <Typography variant="h2" style={{ margin: '25px' }}>
              {`${user.firstName} ${user.lastName}`}
            </Typography>
            <Typography variant="h5" style={{ margin: '30px', textAlign: 'left' }}>
              {user.description}
            </Typography>
          </div>
          <div>
            {user.rol && user.rol.toLowerCase() === 'student' && (
              <div style={{ textAlign: 'center' }}>
                <img src={`/${user.subscription}_subscription.jpg`} alt="Subscription Type" style={{ width: '30%' }} />
                <Typography variant="subtitle2">
                  <i>
                    {`Valid until ${user.subscriptionExpirationDate.substring(0, 10)}`}
                  </i>
                </Typography>
              </div>
            )}
            <div style={{ textAlign: 'center', marginTop: 30 }}>
              <PaidIcon fontSize="large" />
              <div style={{ marginLeft: '5px' }}>
                <Typography variant="subtitle2">
                  {wallet.balance}
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'left', margin: '20px', marginLeft: '60px' }}>
          <div style={{ display: 'flex' }}>
            <EmailIcon fontSize="small" />
            <div style={{ marginLeft: '5px' }}>
              {user.email}
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <BadgeIcon fontSize="small" />
            <div style={{ marginLeft: '5px' }}>
              {user.rol}
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <PublicIcon fontSize="small" />
            <div style={{ marginLeft: '5px' }}>
              {user.location}
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'left', margin: '20px', marginTop: '50px' }}>
          <Typography variant="h5">
            Favorite Courses
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                {user.favoriteCourses && user.favoriteCourses.map((courseId) => (
                  <Grid lg={4} sm={12} key={courseId} item>
                    <CourseCard id={courseId} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div style={{ textAlign: 'left', margin: '20px', marginTop: '50px' }}>
          <Typography variant="h5">
            History
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                {courses.courses && courses.courses.map((course) => (
                  <Grid lg={4} sm={12} key={course.course_id} item>
                    <CourseCard
                      id={course.course_id}
                      completed={course.aprobal_state}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </>
  );
}
