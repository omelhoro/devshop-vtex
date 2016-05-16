import ShoppingList from 'routes/ShoppingList'

describe('(Route) ShoppingList', () => {
  let _route

  beforeEach(() => {
    _route = ShoppingList({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof(_route)).to.equal('object')
  })

  it('Configuration should contain path `counter`', () => {
    expect(_route.path).to.equal('shoppinglist')
  })

})
