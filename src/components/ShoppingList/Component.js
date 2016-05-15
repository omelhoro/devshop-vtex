import React from 'react';
import classes from './Component.scss';
import * as _ from 'lodash';

const listElement = (ctx) => (
  <div className="well">
    <div className="media">
      <div className="media-left media-middle">
        <a href="#">
          <img src={ctx.e.avatar_url} alt={ctx.e.login} style={{
            maxWidth: 100
          }}/>
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
              <td>{ctx.e.appAdded.price}$</td>
            </tr>
            <tr>
              <td>Ordered hours</td>
              <td>
                <input className="form-control" value={ctx.e.appAdded.orderedHours} disabled={ctx.e.isInCard} onChange={ctx
                  .calculatePrice
                  .bind(null, ctx.e)} type="number"/>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="">
          <button style={{
            display: ctx.e.isInCard
              ? 'none'
              : 'inherit'
          }} className="btn btn-block btn-success" onClick={ctx
            .addToCard
            .bind(null, ctx.e)}>Add {ctx.e.login}
            to card for {ctx.e.appAdded.totalSum}$
          </button>
          <button className="btn btn-block btn-warning" style={{
            display: ctx.e.isInCard
              ? 'inherit'
              : 'none'
          }} onClick={ctx
            .removeFromCard
            .bind(null, ctx.e)}>Remove from card
          </button>
        </div>
      </div>
    </div>
  </div>
);

const listShoppingCard = (ctx) => (
  <li className="list-group-item">
    {ctx.e.login}
    {' '}
    ({ctx.e.appAdded.orderedHours * ctx.e.appAdded.price}$)
  </li>
);

const dv = e => document
  .querySelector(e)
  .value;

const priceFormatWithDiscount = ({sumOriginal, discount, sum}) => (
  <div>
    <h4 style={{display: discount ? 'inherit' : 'none'}}>{sumOriginal}$ - {discount}%</h4>
    <h2>{sum.toFixed(0)}$</h2>
  </div>
)

export const ShoppingList = (props) => (
  <div>
    <h2 className={classes.counterContainer}>
      Devs in Shopping Card: {' '}
      <span className={classes['counter--green']}>
        {props.shoppingcard.length}
      </span>
    </h2>

    <div className="row" style={{
      margin: 10
    }}>
      <div className="col-sm-7">
        <div className="input-group">
          <span className="input-group-addon" style={{
            minWidth: 120
          }}>
            User
          </span>
          <input id="dev-name" className="form-control" type="text" placeholder="e.g. omelhoro"/>
          <span className="input-group-btn">
            <button className="btn btn-default" type="button" onClick={() => props.addDevFromName(dv('#dev-name'))}>
              Import!
            </button>
          </span>
        </div>
      </div>
    </div>

    <div className="row" style={{
      margin: 10
    }}>
      <div className="col-sm-7">
        <div className="input-group">
          <span className="input-group-addon" style={{
            minWidth: 120
          }}>
            Organization
          </span>
          <input id="org-name" className="form-control" type="text" placeholder="e.g. Homebrew"/>
          <span className="input-group-btn">
            <button className="btn btn-default" type="button" onClick={() => props.addDevFromOrg(dv('#org-name'))}>
              Import!
            </button>
          </span>
        </div>
      </div>
    </div>

    <div className="row">
      <div className="col-sm-8">
        {props
          .developers
          .map(e => listElement({
            e,
            ...props,
          }))}
      </div>

      <div className="col-sm-4">
        <ul className="list-group">
          {props
            .shoppingcard
            .map(e => listShoppingCard({
              e,
              ...props,
            }))}
        </ul>

        <div style={{
          display: props.shoppingcard.length
            ? 'inherit'
            : 'none'
        }}
        >

        <div className="input-group">
          <span className="input-group-addon">Coupon</span>
          <input placeholder="SHIPIT" value={props.coupon} onChange={props.useCoupon} className="form-control" type="text" />
        </div>

          {priceFormatWithDiscount(props)}

          <button data-toggle="modal" data-target="#confirmModal" className="btn btn-block btn-info">
            Order
          </button>
        </div>
      </div>
    </div>

    <div id="confirmModal" className="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
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
                <input id="user-email" className="form-control" placeholder="You get the token per email" type="email" style={{
                    textAlign: 'center',
                  }} />
              </strong>
            </p>

            <p style={{
                display: props.token ? 'inherit' : 'none',
              }}>
              Your token is: {props.token}. You can now close this window.
            </p>

          </div>
          <div className="modal-footer">

            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={props.endOrdering}>Close</button>
            <button type="button" style={{
                display: props.token ? 'none' : 'inherit',
              }} onClick={() => props.sendOrder(dv('#user-email'))} className="btn btn-primary">Send order</button>

          </div>
        </div>
      </div>
    </div>
  </div>
);

ShoppingList.propTypes = {
  developers: React.PropTypes.array.isRequired,
  shoppingcard: React.PropTypes.array.isRequired,
  organizations: React.PropTypes.array.isRequired,
  addToCard: React.PropTypes.func.isRequired,
  coupon: React.PropTypes.string.isRequired,
  removeFromCard: React.PropTypes.func.isRequired,
  addDevFromOrg: React.PropTypes.func.isRequired,
  endOrdering: React.PropTypes.func.isRequired,
  calculatePrice: React.PropTypes.func.isRequired,
};

export default ShoppingList;
