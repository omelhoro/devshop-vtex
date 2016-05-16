import React from 'react';
import {IndexLink, Link} from 'react-router';
import classes from './Header.scss';

export const Header = () => (
  <div className="text-center">
    <h1 className={classes.heading}>Developers Shop</h1>
    <IndexLink to="/" className={classes.headerLink} activeClassName={classes.activeRoute}>
      The Task
    </IndexLink>
    {' · '}
    <Link to="/shoppinglist" className={classes.headerLink} activeClassName={classes.activeRoute}>
      Shopping List
    </Link>
  </div>
);

export default Header;
