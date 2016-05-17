import React from 'react';
import classes from './Component.scss';
import * as _ from 'lodash';

const listElement = (ctx, i) => (
  <div key={`developer-entry-${ctx.e.login}`} className="well developer-entry" id={`${ctx.e.login}-data`}>
    <div className="media">
      <div className="media-left media-top">
        <a href="#">
          <img
            className={classes.devPhoto}
            src={ctx.e.avatar_url} alt={ctx.e.login} style={{
              maxWidth: 100,
            }}
          />
        </a>
      </div>
      <div className="media-body">
        <h4 className="media-heading">
          {ctx.e.login}
        </h4>

        <table className="table table-bordered table-hovered">
          <tbody>

            <tr>
              <td>Followers</td>
              <td>{ctx.e.followers}</td>
            </tr>
            <tr>
              <td>Gists</td>
              <td>{ctx.e.public_gists}</td>
            </tr>
            <tr>
              <td>Repos</td>
              <td>{ctx.e.public_repos}</td>
            </tr>
            <tr>
              <td>Registered since</td>
              <td>{new Date(ctx.e.created_at).getUTCFullYear()}</td>
            </tr>
            <tr>
              <td>Estimated price (hourly)</td>
              <td><span className="price">{ctx.e.appAdded.price}</span>$</td>
            </tr>
            <tr>
              <td>Ordered hours</td>
              <td>
                <input
                  className="form-control hours" value={ctx.e.appAdded.orderedHours}
                  disabled={ctx.e.isInCard} onChange={ctx
                  .calculatePrice
                  .bind(null, ctx.e)} type="number"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="">
          <button
            disabled={!ctx.e.appAdded.orderedHours} style={{
              display: ctx.e.isInCard
                ? 'none'
                : 'inherit'
            }} className="btn btn-block btn-success add-to-card" onClick={ctx
            .addToCard
            .bind(null, ctx.e)}
           >
            Add {ctx.e.login} to cart for {ctx.e.appAdded.totalSum}$
          </button>
          <button
            className="btn btn-block btn-warning" style={{
              display: ctx.e.isInCard
                ? 'inherit'
                : 'none',
            }} onClick={ctx
            .removeFromCard
            .bind(null, ctx.e)}>Remove from cart
          </button>
        </div>
      </div>
    </div>
  </div>
);

const listShoppingCard = (ctx, i) => (
  <li key={`shoppingcart-${ctx.e.login}`} className="list-group-item">
    {ctx.e.login}
    {' '}
    ({ctx.e.appAdded.orderedHours * ctx.e.appAdded.price}$)
  </li>
);

const dv = e => document
  .querySelector(e)
  .value;

const loadingBar = (props) => (
  <div className="row">
    <div className="col-sm-8">
      <div className="progress">
        <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: '100%'}}>
        </div>
      </div>
    </div>
  </div>
);

const priceFormatWithDiscount = ({sumOriginal, discount, sum}) => (
  <div className="text-center">
    <h4 style={{display: discount ? 'inherit' : 'none'}}>{sumOriginal}$ - {discount}%</h4>
    <h2><span id="total-sum">{sum}</span>$</h2>
  </div>
);

const renderPageLink = (ctx, i) => (
  <li key={`page-${i}`} onClick={ctx.changePage.bind(null, i)}
    className={i === ctx.currentPage ? 'active' : ''}><a href="#">{i + 1}</a></li>
);

const pagination = (props) => (
  <ul
    className="pagination"
    style={{
      display: props.pages > 1 ? 'table' : 'none',
      margin: '0 auto',
      marginBottom: 10,
    }}
  >
    <li>
      <a href="#" aria-label="Previous" onClick={() => props.changePage(props.currentPage - 1)}>
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {_.range(props.pages).map(renderPageLink.bind(null, props))}
    <li>
      <a href="#" aria-label="Next" onClick={() => props.changePage(props.currentPage + 1)}>
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
);

const redirect = (token) => {
  location.href = `${location.origin}/shoppingcard?token=${token}`;
};

export const ShoppingList = (props) => (
  <div>
    <h5 className={classes.counterContainer}>
      Devs in Shopping Card: {' '}
      <span className={classes['counter--green']}>
        {props.shoppingcard.length}
      </span>
    </h5>

    <div
      className="row" style={{
        marginBottom: 10,
      }}
    >
      <div className="col-sm-8">
        <div className="input-group">
          <span
            className="input-group-addon" style={{
              minWidth: 120,
            }}
          >
            User
          </span>
          <input id="dev-name" className="form-control" type="text" placeholder="e.g. omelhoro" />
          <span className="input-group-btn">
            <button
              id="import-developer" className="btn btn-default" type="button"
              onClick={() => props.addDevFromName(dv('#dev-name'))}
            >
              Import!
            </button>
          </span>
        </div>
      </div>
    </div>

    <div
      className="row" style={{
        marginBottom: 10,
      }}
    >
      <div className="col-sm-8">
        <div className="input-group">
          <span
            className="input-group-addon" style={{
              minWidth: 120,
            }}
          >
            Organization
          </span>
          <input id="org-name" className="form-control" type="text" placeholder="e.g. Homebrew" />
          <span className="input-group-btn">
            <button
              id="import-organization" className="btn btn-default"
              type="button" onClick={() => props.addDevFromOrg(dv('#org-name'))}
            >
              Import!
            </button>
          </span>
        </div>
      </div>
    </div>

    {props.loading ? loadingBar(props) : ''}

    <div className="row">
      <div id="developers-list" className="col-sm-8">
        {pagination(props)}
        {props
          .developers
          .slice(props.currentPage * props.devsOnPage, (props.currentPage + 1) * props.devsOnPage)
          .map(e => listElement({
            e,
            ...props,
          }))}
          {pagination(props)}
      </div>

      <div className="col-sm-4">
        <div
          className="fixed" style={{
            position: 'fixed',
            width: 290,
            margin: '10px',
          }}
        >

        <div
          className="panel panel-default"
          style={{
            display: props.shoppingcard.length
            ? 'inherit'
            : 'none',
          }}
        >
          <div className="panel-heading">
            <h3 className="panel-title">Shopping cart</h3>
          </div>
          <div className="panel-body">
            <ul className="list-group">
              {props
                .shoppingcard
                .map(e => listShoppingCard({
                  e,
                  ...props,
                }))}
            </ul>

            <div>
              <div className="input-group">
                <span className="input-group-addon">Coupon</span>
                <input
                  id="coupon-entry"
                  placeholder="SHIPIT" value={props.coupon}
                  onChange={props.useCoupon} className="form-control" type="text"
                />
              </div>

              {priceFormatWithDiscount(props)}

              <button
                id="open-modal-confirm"
                data-toggle="modal" data-target="#confirmModal" className="btn btn-block btn-info"
              >
                Order
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>


    <div
      id="confirmModal" className="modal fade text-center"
      tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
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
                By confirming you're get a token to view the progress of your order.
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
              }} onClick={() => props.sendOrder(dv('#user-email'))} className="btn btn-success"
            >
              Send order
            </button>

            <button
              id="reset-view-button" className="btn btn-primary" data-dismiss="modal"
              style={{
                display: props.token ? 'inline' : 'none',
              }}
              onClick={redirect.bind(null, props.token)}
            >
            Go to the order
            </button>

          </div>
        </div>
      </div>
    </div>
  </div>
);

ShoppingList.propTypes = {
  token: React.PropTypes.string.isRequired,
  developers: React.PropTypes.array.isRequired,
  shoppingcard: React.PropTypes.array.isRequired,
  organizations: React.PropTypes.array.isRequired,
  addToCard: React.PropTypes.func.isRequired,
  coupon: React.PropTypes.string.isRequired,
  removeFromCard: React.PropTypes.func.isRequired,
  addDevFromOrg: React.PropTypes.func.isRequired,
  endOrdering: React.PropTypes.func.isRequired,
  sendOrder: React.PropTypes.func.isRequired,
  calculatePrice: React.PropTypes.func.isRequired,
};

export default ShoppingList;
