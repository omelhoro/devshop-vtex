import React from 'react';
import {IndexLink, Link} from 'react-router';
import classes from './Header.scss';

import {connect} from 'react-redux';

export const Header = (props) => (
  <div className="text-center">
    <h1 className={classes.heading}>Developers Shop</h1>
    <IndexLink to="/" className={classes.headerLink} activeClassName={classes.activeRoute}>
      The Task
    </IndexLink>
    {' · '}
    <Link to="/shoppinglist" className={classes.headerLink} activeClassName={classes.activeRoute}>
      Shopping List
      {' '}
      <span
        className={classes.shoppingcardCounter}
        hidden={!props.shoppingcard.length}
      >
        ({props.shoppingcard.length})
      </span>
    </Link>
  </div>
);

Header.defaultProps = {
  shoppingcard: [],
};

Header.propTypes = {
  shoppingcard: React.PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.router,
  shoppingcard: state.shoppinglist.shoppingcard,
});

export default connect(mapStateToProps, {})(Header);
