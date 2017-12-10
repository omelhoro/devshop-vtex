import React, {PropTypes as PT} from 'react';
import bindClosures from '../../store/binder';
import * as _ from 'lodash';
import classes from './index.css';

export const priceFormatWithDiscount = ({sumOriginal, discount, sum}) => (
  <div className="text-center">
    <h4 style={{display: discount ? 'inherit' : 'none'}}>{sumOriginal}$ - {discount}%</h4>
    <h2><span id="total-sum">{sum}</span>$</h2>
  </div>
);

priceFormatWithDiscount.propTypes = {
  sum: PT.number,
  discount: PT.number,
  sumOriginal: PT.number,
};

export const loadingBar = () => (
  <div className={`row ${classes.importRow}`}>
    <div className={`col-sm-8 ${classes.centerCol}`}>
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped active"
          role="progressbar" aria-valuenow="100" aria-valuemin="0"
          aria-valuemax="100" style={{width: '100%'}}
        >
        </div>
      </div>
    </div>
  </div>
);

export const renderPageLink = (ctx, i, cb) => (
  <li
    key={`page-${i}`} onClick={cb.bind(null, i)} // eslint-disable-line react/jsx-no-bind
    className={i === ctx.currentPage ? 'active' : ''}
  >
    <a href="#">{i + 1}</a>
  </li>
);

export const pagination = ({props}, closure) => (
  <ul
    className="pagination"
    style={{
      display: props.pages > 1 ? 'table' : 'none',
      margin: '0 auto',
      marginBottom: 10,
    }}
  >
    <li>
      <a href="#" aria-label="Previous" onClick={closure.changePageBack}>
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {_.range(props.pages).map(closure.renderPageLink)}
    <li>
      <a href="#" aria-label="Next" onClick={closure.changePageForward}>
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
);

pagination.propTypes = {
  pages: React.PropTypes.number.isRequired,
  props: React.PropTypes.object.isRequired,
};

// Inject a new `onComplete` that receives the original props.
export const Pagination = bindClosures({
  changePageBack({props}) {
    props.changePage(props.currentPage - 1);
  },
  renderPageLink({props}, i) {
    return renderPageLink(props, i, props.changePage);
  },
  changePageForward({props}) {
    props.changePage(props.currentPage + 1);
  },
})(pagination);
