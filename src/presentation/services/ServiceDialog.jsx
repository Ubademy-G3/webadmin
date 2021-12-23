import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';

const CustomDialog = styled(Dialog)(() => ({
  '& .MuiDialogTitle-root': {
    paddingRight: '200px',
    paddingLeft: '200px',
  },
  '& .MuiDialogActions-root': {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '20px',
    marginRight: '20px',
  },
}));

export default function ServiceDialog(props) {
  const p = props;
  const [open, setOpen] = React.useState(p.open);
  const [service, setService] = React.useState(null);
  const [showApikey, setShowApikey] = React.useState(false);

  const handleClose = () => {
    p.setShowDialog(null);
    setOpen(false);
  };

  const handleBlockService = () => {
    axios.patch(`https://staging-api-gateway-app-v2.herokuapp.com/microservices/${p.serviceId}`, { state: 'blocked' }, { headers: { authorization: localStorage.getItem('token') } })
      .then((results) => results.data)
      .then(() => {
        p.setShowDialog(null);
        setOpen(false);
        window.location.reload();
      });
  };

  const handleUnblockService = () => {
    axios.patch(`https://staging-api-gateway-app-v2.herokuapp.com/microservices/${p.serviceId}`, { state: 'active' }, { headers: { authorization: localStorage.getItem('token') } })
      .then((results) => results.data)
      .then(() => {
        p.setShowDialog(null);
        setOpen(false);
        window.location.reload();
      });
  };

  const getCreatedAt = (timestamp) => {
    const date = new Date(timestamp);
    const iso = date.toISOString().match(/(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})/);

    return `${iso[1]} ${iso[2]}`;
  };

  React.useEffect(() => {
    axios.get(`https://staging-api-gateway-app-v2.herokuapp.com/microservices/${p.serviceId}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((results) => results.data)
      .then((data) => {
        setService(data);
      });
  }, []);

  return (
    <>
      {service && (
        <CustomDialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {`${service.name} Service`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div>
                {service.description}
              </div>
              <div>
                Created at:
                {' '}
                {getCreatedAt(service.timestamp)}
                <br />
              </div>
              <div
                onMouseEnter={() => {
                  setShowApikey(true);
                }}
                onMouseLeave={() => {
                  setShowApikey(false);
                }}
              >
                Apikey:
                {' '}
                {showApikey ? (
                  <>
                    {service.apikey}
                  </>
                ) : (
                  <>
                    {service.apikey.replaceAll(/./g, '*')}
                  </>
                )}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {service.state === 'blocked' ? (
              <Button onClick={handleUnblockService} color="success">Unblock Service</Button>
            ) : (
              <Button onClick={handleBlockService} color="error">Block Service</Button>
            )}
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </CustomDialog>
      )}
    </>
  );
}
