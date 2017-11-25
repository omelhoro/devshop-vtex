import React, {PropTypes as PT} from 'react';
import classes from './index.scss';
import ListElement from './ShoppingListEntry';
import ListShoppingCard from './ShoppingCardEntry';
import SearchBar from './SearchBar';
import Modal from './ConfirmModal';
import {priceFormatWithDiscount, Pagination, loadingBar} from './MiniComponents';

export const ShoppingList = (props) => (
  <div>
    <SearchBar props={props} />

    {props.loading ? loadingBar(props) : ''}

    <div className="row">
      <div id="developers-list" className="col-sm-8">
        <Pagination props={props} />
        {props
          .developers
          .slice(props.currentPage * props.devsOnPage, (props.currentPage + 1) * props.devsOnPage)
          .map(e => <ListElement props={props} element={e} />)}
        <Pagination props={props} />
      </div>
      <div className="col-sm-4">
        <div
          className={`panel panel-primary ${classes.shoppingcard}`}
          hidden={!props.developers.length}
        >
          <div className="panel-heading">
            <h3 className="panel-title">Shopping cart</h3>
          </div>
          <div className="panel-body">
            <div hidden={!props.shoppingcard.length}>
              <ul className="list-group">
                {props
                  .shoppingcard
                  .map(e => <ListShoppingCard ctx={props} element={e} />)}
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
    <Modal props={props} />
  </div>
);

ShoppingList.propTypes = {
  token: React.PropTypes.string.isRequired,
  currentPage: PT.number.isRequired,
  loading: PT.bool.isRequired,
  useCoupon: PT.func.isRequired,
  devsOnPage: PT.number.isRequired,
  developers: React.PropTypes.array.isRequired,
  shoppingcard: React.PropTypes.array.isRequired,
  organizations: React.PropTypes.array.isRequired,
  addToCard: React.PropTypes.func.isRequired,
  coupon: React.PropTypes.string.isRequired,
  removeFromCard: React.PropTypes.func.isRequired,
  endOrdering: React.PropTypes.func.isRequired,
  sendOrder: React.PropTypes.func.isRequired,
  calculatePrice: React.PropTypes.func.isRequired,
};

export default ShoppingList;
