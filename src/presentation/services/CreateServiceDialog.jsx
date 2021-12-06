import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
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

  const handleClose = () => {
    p.setShowCreateDialog(false);
    setOpen(false);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const apikey = e.target.apikey.value;

    axios.post('https://staging-api-gateway-app.herokuapp.com/microservices/', { name, apikey, state: 'active' }, { headers: { authorization: localStorage.getItem('token') } })
      .then((results) => results.data)
      .then((response) => {
        console.log(response);
        p.setShowCreateDialog(null);
        setOpen(false);
        window.location.reload();
      });
  };

  return (
    <CustomDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Create new service
      </DialogTitle>
      <form onSubmit={(e) => { handleConfirm(e); }}>
        <DialogContent>
          <TextField
            id="name"
            label="Service name"
            type="text"
            fullWidth
            variant="standard"
            autoComplete="off"
          />
          <TextField
            id="apikey"
            label="Apikey"
            type="text"
            fullWidth
            variant="standard"
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">Cancel</Button>
          <Button type="submit">Confirm</Button>
        </DialogActions>
      </form>
    </CustomDialog>
  );
}
