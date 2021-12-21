import * as React from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import ServicesTable from './ServicesTable';
import ServicesFilter from './ServicesFilter';
import ServiceDialog from './ServiceDialog';
import CreateServiceDialog from './CreateServiceDialog';

export default function Services() {
  const [services, setServices] = React.useState(null);
  const [allServices, setAllServices] = React.useState(null);
  const [showDialog, setShowDialog] = React.useState(null);
  const [showCreateDialog, setShowCreateDialog] = React.useState(false);

  React.useEffect(() => {
    axios.get('https://staging-api-gateway-app-v2.herokuapp.com/microservices/', { headers: { authorization: localStorage.getItem('token') } })
      .then((results) => results.data)
      .then((data) => {
        setServices(data.microservices);
        setAllServices(data.microservices);
      });
  }, []);

  return (
    <>
      {showDialog && (
        <ServiceDialog serviceId={showDialog} open setShowDialog={setShowDialog} />
      )}
      {showCreateDialog && (
        <CreateServiceDialog open setShowCreateDialog={setShowCreateDialog} />
      )}
      <Typography component="p" variant="h4">
        Services
      </Typography>
      {services && (
        <>
          <ServicesFilter services={services} allServices={allServices} setServices={setServices} />
          <ServicesTable
            services={services}
            setShowDialog={setShowDialog}
            setShowCreateDialog={setShowCreateDialog}
          />
        </>
      )}
    </>
  );
}
