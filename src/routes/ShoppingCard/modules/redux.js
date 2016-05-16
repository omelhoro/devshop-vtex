import {shoppingcard} from '../../../store/initState';
// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT';
const SETSTATE = 'SETSTATE';
// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */


function setState(state) {
  return {
    type: SETSTATE,
    state,
  };
}

export function loadState(token) {
  return async (dispatch) => {
    const out = await fetch(`/getorder?token=${token}`);
    const outJson = await out.json();
    dispatch(setState(outJson));
  };
}

export const actions = {
  loadState,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SETSTATE]: (state, action) => {
    return {...state, ...action.state};
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = shoppingcard;
export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
