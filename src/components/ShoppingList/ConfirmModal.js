import React, {PropTypes as PT} from 'react';
import {priceFormatWithDiscount} from './MiniComponents';
import {dv} from './utils';
import bindClosures from '../../store/binder';

const redirect = (token) => {
  location.href = `${location.origin}/shoppingcard?token=${token}`;
};

const modal = ({props}, closures) => (
  <div
    id="confirmModal" className="modal fade text-center"
    role="dialog" aria-labelledby="myModalLabel"
  >
    <div className="modal-dialog">
      <div className="modal-content">

        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 className="modal-title">Confirm order</h4>
        </div>

        <div className="modal-body">
          Total price of your order is: {priceFormatWithDiscount(props)}
          <p>
            <strong>
              By confirming you get a token to view the progress of your order.
              <input
                id="user-email" className="form-control"
                placeholder="You get the token per email" type="email" style={{
                  textAlign: 'center',
                }}
              />
            </strong>
          </p>

          <p
            style={{
              display: props.token ? 'inherit' : 'none',
            }}
          >
            Your token is: <span id="order-token">{props.token}</span>. You can now close this window.
          </p>
        </div>
        <div className="modal-footer">

          <button
            type="button" className="btn btn-default"
            data-dismiss="modal" style={{
              display: props.token ? 'none' : 'inline',
            }}
          >
            Close
          </button>
          <button
            id="send-order-button" type="button" style={{
              display: props.token ? 'none' : 'inline',
            }} onClick={closures.sendOrder} className="btn btn-success"
          >
            Send order
          </button>

          <button
            id="reset-view-button" className="btn btn-primary" data-dismiss="modal"
            style={{
              display: props.token ? 'inline' : 'none',
            }}
            onClick={closures.redirect}
          >
          Go to the order
          </button>

        </div>
      </div>
    </div>
  </div>
);

modal.propTypes = {
  props: PT.object.isRequired,
  token: PT.string.isRequired,
  sendOrder: PT.func.isRequired,
};


// Inject a new `onComplete` that receives the original props.
const Modal = bindClosures({
  redirect({props}) {
    redirect(props.token);
  },
  sendOrder({props}) {
    props.sendOrder(dv('#user-email'));
  },
})(modal);

export default Modal;
