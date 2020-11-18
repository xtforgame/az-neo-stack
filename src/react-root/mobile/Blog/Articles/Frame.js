import React from 'react';
import { Link } from '../../redirect';

export default ({ children }) => (
  <React.Fragment>
    Articles
    <br />
    <Link path="">
      Home
    </Link>
    {children}
  </React.Fragment>
);
