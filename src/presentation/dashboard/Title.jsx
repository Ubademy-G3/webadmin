import * as React from 'react';
// import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

function Title(props) {
  const p = props;
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {p.children}
    </Typography>
  );
}

// Title.propTypes = {
//  children: PropTypes.node,
// };

export default Title;
