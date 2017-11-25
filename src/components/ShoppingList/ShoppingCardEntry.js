import React, {PropTypes as PT} from 'react';
import moment from 'moment';
import bindClosures from '../../store/binder';

const listShoppingCard = ({element, ctx}, closures) => (
  <li key={`shoppingcart-${element.login}`} className="list-group-item">
    {element.login}
    {' '}
    ({element.appAdded.orderedHours * element.appAdded.price}$)
    <br />
    <small>
      Added {moment(element.addedToCart).format('[on] DD.MM.YYYY [at] HH:mm')}
    </small>
    <button className="btn btn-xs btn-warning pull-right" onClick={closures.removeFromCard}>X</button>
  </li>
);

listShoppingCard.propTypes = {
  element: PT.object.isRequired,
  ctx: PT.object.isRequired,
};

export default bindClosures({
  removeFromCard({ctx, element}) {
    ctx.removeFromCard(element);
  },
})(listShoppingCard);
