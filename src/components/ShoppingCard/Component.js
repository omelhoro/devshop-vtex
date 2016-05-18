import React from 'react';
import classes from './Component.scss';
import moment from 'moment';

/* eslint-disable */
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
/* eslint-enable */

const listElement = (ctx, e) => (
  <div className="well developer-entry">
    <div className="media">
      <div className="media-left media-top">
        <a href="#">
          <img
            src={e.avatar_url} alt={e.login} style={{
              maxWidth: 100,
            }}
          />
        </a>
      </div>
      <div className="media-body">
        <h4 className="media-heading">
          {e.login}
        </h4>

        <table className="table table-bordered table-hovered">
          <tbody>

            <tr>
              <td>Followers</td>
              <td>{e.followers}</td>
            </tr>
            <tr>
              <td>Gists</td>
              <td>{e.public_gists}</td>
            </tr>
            <tr>
              <td>Repos</td>
              <td>{e.public_repos}</td>
            </tr>
            <tr>
              <td>Registered since</td>
              <td>{new Date(e.created_at).getUTCFullYear()}</td>
            </tr>
            <tr>
              <td>Estimated price (hourly)</td>
              <td>{e.appAdded.price}$</td>
            </tr>
            <tr>
              <td>Ordered hours</td>
              <td>{e.appAdded.orderedHours}</td>
            </tr>
          </tbody>
        </table>
        <h4>Cost: {e.appAdded.totalSum}$</h4>
      </div>
    </div>
  </div>
);

const loadInitialState = (props) => {
  if (props.token) {
    return;
  }

  setTimeout(() => {
    const token = getParameterByName('token');
    if (token) {
      props.loadState(token);
    }
  }, 500);
};

export const ShoppingCard = (props) => (
  <div>
    {loadInitialState(props)}
    <h2 className={classes.counterContainer}>
      Your shopping card from {moment(props.timestamp).format('HH:mm DD-MM-YYYY')} with a value of {props.sum}$
    </h2>
    {props.shoppingcard.map(listElement.bind(null, props))}
  </div>
);

ShoppingCard.propTypes = {
  shoppingcard: React.PropTypes.array.isRequired,
  loadState: React.PropTypes.func.isRequired,
  timestamp: React.PropTypes.string.isRequired,
  sum: React.PropTypes.number.isRequired,
};

export default ShoppingCard;
