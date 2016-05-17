require! './utils'
its = it

describe 'On the shopping list', ->
  beforeEach -> browser.get 'http://localhost:3000/shoppinglist'

  its 'user should type in a github user', ->
    <- utils.typeDev 'omelhoro'
    count <- $$ '#developers-list .well' .count!.then!
    expect count .toEqual 1

  its 'user should type in an organization', ->
    <- utils.typeOrg 'Homebrew'
    count <- $$ '#developers-list .well' .count!.then!
    expect count .toEqual 5

  its 'user should choose developers for the card and coupon is working', ->

    wishedSum <- utils.addToCard 'omelhoro', 5
    totalSum <- $ '#total-sum' .getText! .then!

    expect parseInt(totalSum) .toEqual wishedSum

    <- $ '#coupon-entry' .sendKeys 'SHIPIT' .then!

    totalSum <- $ '#total-sum' .getText! .then!
    expect parseInt(totalSum) .toBeLessThan wishedSum

  its 'user should type in something wrong and get an alert', ->
    <- utils.typeDev 'omexcvcxvxcvcxvlhoro'
    browser.wait(protractor.ExpectedConditions.alertIsPresent!, 5000)
    browser.switchTo!.alert!.accept!

    <- utils.typeOrg 'xcvxcvxvwerw'
    browser.wait(protractor.ExpectedConditions.alertIsPresent!, 5000)
    browser.switchTo!.alert!.accept!
