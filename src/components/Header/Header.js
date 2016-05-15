import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'

export const Header = () => (
  <div>
    <h1>Developers Shop</h1>
    <IndexLink to="/" activeClassName={classes.activeRoute}>
      Market
    </IndexLink>
    {' · '}
    <Link to="/shoppinglist" activeClassName={classes.activeRoute}>
      Shopping List
    </Link>
  </div>
)

export default Header
