import * as React from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import UsersTable from './UsersTable';

export default function Users() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    axios.get('https://staging-api-gateway-app.herokuapp.com/users', { headers: { authorization: localStorage.getItem('token') } })
      .then((results) => results.data)
      .then((data) => {
        setUsers(data);
      });
  }, []);

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" style={{ margin: '20px', marginBottom: '40px' }} gutterBottom>
        Users Admin
      </Typography>
      {users && (
        <UsersTable users={users} />
      )}
    </>
  );
}
