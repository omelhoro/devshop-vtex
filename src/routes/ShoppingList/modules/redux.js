import * as _ from 'lodash';
import {shoppinglist} from '../../../store/initState';

// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT';
export const ADDTOCARD = 'ADDTOCARD';
export const REMOVEFROMCARD = 'REMOVEFROMCARD';
export const ADDFROMORG = 'ADDFROMORG';
export const SETDEVLIST = 'SETDEVLIST';
export const SETPRICE = 'SETPRICE';
export const USECOUPON = 'USECOUPON';
const SETTOKEN = 'SETTOKEN';
const SETSTATE = 'SETSTATE';
const RESETSTATE = 'RESETSTATE';
// ------------------------------------
// Actions
// ------------------------------------
export function increment(value = 1) {
  return {
    type: COUNTER_INCREMENT,
    payload: value,
  };
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(increment(getState().counter));
        resolve();
      }, 200);
    });
  };
};

export function addToCard(e) {
  return {
    type: ADDTOCARD,
    item: e,
  };
}

export function removeFromCard(e) {
  return {
    type: REMOVEFROMCARD,
    item: e,
  };
}

export function addToDevList(e) {
  return {
    type: SETDEVLIST,
    devs: e,
  };
}

export function calculatePrice(obj, e) {
  const value = parseInt(e.target.value, 10);
  return {
    type: SETPRICE,
    value: value > -1 ? value : 0,
    item: obj,
  };
}

export function addDevFromName(dev) {
  return async (dispatch) => {
    if (!dev) {
      alert('No input');
      return;
    }
    const out = await fetch(`/getdev?dev=${dev}`);
    const outJson = await out.json();
    dispatch(addToDevList(outJson));
  };
}

function setToken(token) {
  return {
    type: SETTOKEN,
    token,
  };
}

function loadState(state) {
  return {
    type: SETSTATE,
    state,
  };
}

export function loadStateFromToken(token) {
  return async (dispatch) => {
    const out = await fetch(`/getorder?token=${token}`);
    const outJson = await out.json();
    dispatch(loadState(outJson));
  };
}

export function sendOrder(email) {
  return async (dispatch, getState) => {
    const state = {
      appState: {...getState().shoppinglist, timestamp: new Date().toJSON()},
      email,
    };

    const request = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(state),
    };

    const out = await fetch('/postorder', request);
    const outJson = await out.json();
    dispatch(setToken(outJson.token));
  };
}

export function addDevFromOrg(org) {
  return async (dispatch) => {
    if (!org) {
      alert('No input');
      return;
    }
    const out = await fetch(`/getmembers?org=${org}`);
    const outJson = await out.json();
    dispatch(addToDevList(outJson));
  };
}

export function endOrdering() {
  return {
    type: RESETSTATE,
  };
}

function calculateSum(state) {
  const mapped = state.shoppingcard.map(e => _.get(e, 'appAdded.totalSum'));
  const sumOriginal = _.sum(mapped);
  let sum = 0;
  if (state.discount) {
    const sumCoupon = (1 - (state.discount / 100)) * sumOriginal;
    sum = sumCoupon;
  } else {
    sum = sumOriginal;
  }
  return {
    sumOriginal,
    sum,
  };
}


export function useCoupon(event) {
  const value = event.target.value;
  let discount;
  switch (value) {
    case 'SHIPIT':
      discount = 10;
      break;
    case 'GETIDONE':
      discount = 40;
      break;
    default:
      discount = 0;
  }
  return {
    type: USECOUPON,
    value,
    discount,
  };
}

export const actions = {
  increment,
  doubleAsync,
  addToCard,
  removeFromCard,
  addDevFromOrg,
  addDevFromName,
  calculatePrice,
  useCoupon,
  sendOrder,
  endOrdering,
  loadStateFromToken,
};


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]: (state, action) => ({...state, counter: state.counter + action.payload}),
  [ADDTOCARD]: (state, action) => {
    const ixAdd = state.shoppingcard.findIndex(e => e.login === action.item.login);
    const ixIsInCard = state.developers.findIndex(e => e.login === action.item.login);

    const developer = {...state.developers[ixIsInCard], isInCard: true};

    const developers = [
      ...state.developers.slice(0, ixIsInCard),
      developer,
      ...state.developers.slice(ixIsInCard + 1),
    ];

    const shoppingcard = state.shoppingcard.concat(developer);
    const preState = {
      ...state,
      shoppingcard,
      developers,
    };
    return ixAdd === -1 ?
      {...preState, ...calculateSum(preState)} :
      state;
  },
  [SETTOKEN]: (state, action) => {
    return {
      ...state,
      token: action.token,
    };
  },
  [SETPRICE]: (state, action) => {
    const ixIsInCard = state.developers.findIndex(e => e.login === action.item.login);
    const devOld = state.developers[ixIsInCard];
    const devNew = {
      ...devOld,
      appAdded: {
        ...devOld.appAdded,
        orderedHours: action.value,
        totalSum: action.value * devOld.appAdded.price,
      },
    };

    const developers = [
      ...state.developers.slice(0, ixIsInCard),
      devNew,
      ...state.developers.slice(ixIsInCard + 1),
    ];

    return {...state, developers};
  },
  [SETSTATE]: (state, action) => {
    return {
      ...state,
      ...action.state,
    };
  },
  [USECOUPON]: (state, action) => {
    return {...state, coupon: action.value, discount: action.discount};
  },
  [RESETSTATE]: (state, action) => {
    return {...state, ...shoppinglist};
  },
  [SETDEVLIST]: (state, action) => {
    const developers = _.uniq(state.developers.concat(action.devs), e => e.login);
    return ({...state, developers});
  },
  [REMOVEFROMCARD]: (state, action) => {
    const ixRemove = state.shoppingcard.findIndex(e => e.login === action.item.login);
    const shoppingcard = [
      ...state.shoppingcard.slice(0, ixRemove),
      ...state.shoppingcard.slice(ixRemove + 1),
    ];

    const ixIsInCard = state.developers.findIndex(e => e.login === action.item.login);
    const developers = [
      ...state.developers.slice(0, ixIsInCard),
      {...state.developers[ixIsInCard], isInCard: false},
      ...state.developers.slice(ixIsInCard + 1),
    ];

    const preState = {
      ...state,
      shoppingcard,
      developers,
    };
    return {
      ...preState,
      ...calculateSum(preState),
    }
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = shoppinglist;
console.log('local initial state', initialState);
export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
