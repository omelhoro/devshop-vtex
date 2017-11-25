require! './utils'
its = it

describe 'Shopping card', ->
  beforeEach -> browser.get 'http://localhost:3000/shoppinglist'

  its 'user can confirm the order', ->
    <- utils.addToCard 'omelhoro', 5
    <- utils.addToCard 'core-process', 10

    <- $ '#open-modal-confirm' .click!
      .then -> browser.sleep 1000
      .then -> ($ '#user-email' .sendKeys 'fischerig@outlook.com')
      .then -> ($ '#send-order-button' .click!)
      .then -> (browser.sleep 1000)
      .then -> ($ '#order-token' .getText!)
      .then (token) -> (expect token.length .toEqual 36)
      .then -> ($ '#reset-view-button' .click!)
      .then -> (browser.sleep 4000)
      .then -> ($$ '.developer-entry' .count!)
      .then (count) -> (expect count .toEqual 2)
