require! './utils'
its = it

describe 'Shopping card', ->
  beforeEach -> browser.get 'http://localhost:3000/shoppinglist'

  its 'user can confirm the order', ->
    <- utils.addToCard 'omelhoro', 5
    <- utils.addToCard 'core-process', 10

    <- $ '#open-modal-confirm' .click! .then!
    <- browser.sleep 1000 .then!

    <- $ '#user-email' .sendKeys 'fischerig@outlook.com' .then!
    <- $ '#send-order-button' .click! .then!
    token <- $ '#order-token' .getText! .then!
    <- $ '#reset-view-button' .click! .then!

    expect token.length .toEqual 36

    browser.get "http://localhost:3000/shoppingcard?token=#{token}"
    <- browser.sleep 4000 .then!
    count <- $$ '.developer-entry' .count! .then!
    expect count .toEqual 2
