import bindClosures from '../../store/binder';
import React, {PropTypes as PT} from 'react';
import classes from './index.scss';

const listElement = ({element}, {addToCard, removeFromCard, calculatePrice}) => (
  <div key={`developer-entry-${element.login}`} className="well developer-entry" id={`${element.login}-data`}>
    <div className="media">
      <div className="media-left media-top">
        <a href="#">
          <img
            className={classes.devPhoto}
            src={element.avatar_url} alt={element.login} style={{
              maxWidth: 100,
            }}
          />
        </a>
      </div>
      <div className="media-body">
        <h4 className="media-heading">
          {element.login}
        </h4>

        <table className="table table-bordered table-hovered">
          <tbody>

            <tr>
              <td>Followers</td>
              <td>{element.followers}</td>
            </tr>
            <tr>
              <td>Gists</td>
              <td>{element.public_gists}</td>
            </tr>
            <tr>
              <td>Repos</td>
              <td>{element.public_repos}</td>
            </tr>
            <tr>
              <td>Registered since</td>
              <td>{new Date(element.created_at).getUTCFullYear()}</td>
            </tr>
            <tr>
              <td>Estimated price (hourly)</td>
              <td><span className="price">{element.appAdded.price}</span>$</td>
            </tr>
            <tr>
              <td>Ordered hours</td>
              <td>
                <input
                  className="form-control hours" value={element.appAdded.orderedHours}
                  disabled={element.isInCard} onChange={calculatePrice} type="number"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="">
          <button
            disabled={!element.appAdded.orderedHours}
            hidden={element.isInCard}
            className="btn btn-block btn-success add-to-card" onClick={addToCard}
          >
            Add {element.login} to cart for {element.appAdded.totalSum}$
          </button>
          <button
            className="btn btn-block btn-warning" hidden={!element.isInCard} onClick={removeFromCard}
          >Remove from cart
          </button>
        </div>
      </div>
    </div>
  </div>
);

listElement.propTypes = {
  element: PT.object.isRequired,
};

// Inject a new `onComplete` that receives the original props.
const ListElement = bindClosures({
  addToCard({props, element}) {
    props.addToCard(element);
  },
  removeFromCard({props, element}) {
    props.removeFromCard(element);
  },
  calculatePrice({props, element}, event) {
    props.calculatePrice(element, event);
  },
})(listElement);

export default ListElement;
