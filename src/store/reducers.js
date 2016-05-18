import {
  combineReducers,
} from 'redux';
import {
  routerReducer as router,
} from 'react-router-redux';
import initState from './initState';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    router,
    shoppinglist: () => initState.shoppinglist,
    shoppingcard: () => initState.shoppingcard,
    ...asyncReducers,
  });
};

export const injectReducer = (store, {
  key,
  reducer,
}) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
