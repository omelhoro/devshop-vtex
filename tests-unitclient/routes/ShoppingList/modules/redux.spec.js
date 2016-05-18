import {
  RESETSTATE,
  ADDTOCARD,
  addToCard,
  default as reducer,
} from 'routes/ShoppingList/modules/redux';
import * as redux from 'routes/ShoppingList/modules/redux';
console.log(redux, reducer);

import {shoppinglist} from 'store/initState';

const testDev = {login: 'Igor', appAdded: {price: 10}};

describe('(Redux Module) Counter', () => {
  it('Should export a constant RESETSTATE.', () => {
    expect(RESETSTATE).to.equal('RESETSTATE');
  });

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(reducer).to.be.a('function');
    });

    it('Should initialize with a state of empty categories.', () => {
      expect(reducer(undefined, {})).to.equal(shoppinglist);
    });

    it('Should return the previous state if an action was not matched.', () => {
      let state = reducer(undefined, {});

      expect(state).to.equal(shoppinglist);
      state = reducer(state, {type: '@@@@@@@'});
      expect(state).to.equal(shoppinglist);
    });
  });

  describe('(Action Creator) addToCard', () => {
    it('Should be exported as a function.', () => {
      expect(addToCard).to.be.a('function');
    });

    it('Should return an action with type "ADDTOCARD".', () => {
      expect(addToCard()).to.have.property('type', ADDTOCARD);
    });

    it('Should assign the first argument to the "payload" property.', () => {
      expect(addToCard(testDev)).to.have.property('item', testDev);
    });

    it('Should default the "payload" property to 1 if not provided.', () => {
      expect(addToCard()).to.have.property('item', undefined);
    });
  });

  // NOTE: if you have a more complex state, you will probably want to verify
  // that you did not mutate the state. In this case our state is just a number
  // (which cannot be mutated).

  describe('(Action Handler) ADDTOCARD', () => {

    it('Should only add a developer to the card if in list.', () => {
      let state = reducer(undefined, {});
      state = reducer(state, redux.addToCard(testDev));
      expect(state.shoppingcard).to.eql([]);
    });


    it('Should add a developer to the card but not multiple times.', () => {
      let state = reducer(undefined, {});

      state = reducer(state, redux.addToDevList(testDev));
      state = reducer(state, redux.addToCard(testDev));
      expect(state.shoppingcard).to.eql([{...testDev, isInCard: true}]);

    });
  });

  describe('(Action Handler) SETTOKEN', () => {
    it('Should set the token of the shoppingcard', () => {
      let state = reducer(undefined, {});
      const token = '123123';
      state = reducer(state, redux.setToken(token));
      expect(state.token).to.eql(token);
    });
  });

  describe('(Action Handler) LOADINGSTATE', () => {
    it('Should set the token of the shoppingcard', () => {
      let state = reducer(undefined, {});
      state = reducer(state, redux.setLoadingState(true));
      expect(state.loading).to.eql(true);

      state = reducer(state, redux.setLoadingState(false));
      expect(state.loading).to.eql(false);
    });
  });


  describe('(Action Handler) SETPRICE', () => {
    it('Should calculate the price of an developer', () => {
      let state = reducer(undefined, {});
      let hours = 10;
      state = reducer(state, redux.addToDevList(testDev));
      state = reducer(state, redux.calculatePrice(testDev, {target: {value: hours}}));
      const newDev = {...testDev, appAdded:{...testDev.appAdded, orderedHours: hours, totalSum: testDev.appAdded.price * hours}};
      expect(state.developers).to.eql([newDev]);
    });

    it('Should calculate the price of an developer not going under zero', () => {
      let state = reducer(undefined, {});
      let hours = -10;
      state = reducer(state, redux.addToDevList(testDev));
      state = reducer(state, redux.calculatePrice(testDev, {target: {value: hours}}));
      const newDev = {...testDev, appAdded:{...testDev.appAdded, orderedHours: 0, totalSum: 0}};
      expect(state.developers).to.eql([newDev]);
    });


  });

  describe('(Action Handler) SETSTATE', () => {
    it('Should overwrite already defined states', () => {
      let state = reducer(undefined, {});
      const ar = [1, 2];
      state = reducer(state, redux.loadState({developers: ar}));
      expect(state.developers).to.eql(ar);
    });
  });

  describe('(Action Handler) USECOUPON', () => {

    it('Should return 0 if no dev is in card', () => {
      let state = reducer(undefined, {});
      const coupon = 'SHIPIT';
      state = reducer(state, redux.useCoupon({target: {value: coupon}}));
      expect(state.sum).to.equal(0);
      expect(state.discount).to.equal(10);
      expect(state.coupon).to.equal(coupon);
    });

    it('Should return correct discount', () => {
      let state = reducer(undefined, {});

      let hours = 10;
      state = reducer(state, redux.addToDevList(testDev));
      state = reducer(state, redux.calculatePrice(testDev, {target: {value: hours}}));

      state = reducer(state, redux.addToCard(testDev));
      const newDev = {...testDev, appAdded:{...testDev.appAdded, orderedHours: hours, totalSum: testDev.appAdded.price * hours}};

      const coupon = 'SHIPIT';
      state = reducer(state, redux.useCoupon({target: {value: coupon}}));

      expect(state.sum).to.equal(90);
      expect(state.discount).to.equal(10);
      expect(state.coupon).to.equal(coupon);
    });

  });

  describe('(Action Handler) CHANGEPAGE', () => {
    it('Should change pages correctly', () => {
      let state = reducer(undefined, {});
      state = reducer(state, redux.addToDevList([
        testDev,
        {login: 'ASD'},
        {login: 'MNM'},
        {login: 'OI'},
        {login: 'MMAAN'},
        {login: 'OIJO'}]));

      expect(state.pages).to.eql(2);

      state = reducer(state, redux.changePage(1));
      expect(state.currentPage).to.eql(1);

      state = reducer(state, redux.changePage(9));
      expect(state.currentPage).to.eql(1);

      state = reducer(state, redux.changePage(0));
      expect(state.currentPage).to.eql(0);

      state = reducer(state, redux.changePage(-99));
      expect(state.currentPage).to.eql(0);

    });
  });

  describe('(Action Handler) SKIPCHANGE', () => {
    it('Should just return the current state', () => {
      let state = reducer(undefined, {});

      state = reducer(state, redux.addDevFromOrg('xcvxcvnmm'));
      expect(state).to.eql(shoppinglist);
      state = reducer(state, redux.addDevFromName('xcvxcvnmm'));
      expect(state).to.eql(shoppinglist);
    });
  });

  describe('(Action Handler) RESETSTATE', () => {
    it('Should reset the state', () => {
      let state = reducer({test: 1}, {});

      state = reducer(state, redux.endOrdering());
      expect(state).to.eql(shoppinglist);
    });
  });

  describe('(Action Handler) SETDEVLIST', () => {
    it('Should add a list of devs correctly', () => {
      let state = reducer(undefined, {});
      const furtherDev = {login: 'Maravilhoso'};
      const theList = [testDev, furtherDev];
      state = reducer(state, redux.addToDevList(theList.concat(testDev)));
      expect(state.developers).to.eql(theList);
      expect(state.pages).to.eql(1);
    });
  });

  describe('(Action Handler) REMOVEFROMCARD', () => {
    it('Should remove a developer from the card.', () => {
      let state = reducer(undefined, {});

      state = reducer(state, redux.addToDevList(testDev));
      state = reducer(state, redux.addToCard(testDev));
      expect(state.shoppingcard).to.eql([{...testDev, isInCard: true}]);

      state = reducer(state, redux.removeFromCard(testDev));
      expect(state.shoppingcard).to.eql([]);

      state = reducer(state, redux.removeFromCard(testDev));
      expect(state.shoppingcard).to.eql([]);
    });
  });


});
