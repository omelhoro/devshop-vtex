export typeDev = (name, cb) ->
  item = $ '#dev-name'
  item.clear!
    .then -> (item.sendKeys name)
    .then -> item.submit!
    .then -> (browser.sleep 2000)
    .then cb

export typeOrg = (name, cb) ->
  item = $ '#org-name'
  item.clear!
    .then -> (item.sendKeys name)
    .then -> item.submit!
    .then -> (browser.sleep 5000)
    .then cb

export addToCard = (name, hours, cb) ->
  <- typeDev "#{name}"
  <- $ "##{name}-data .hours" .sendKeys hours .then!
  price <- $ "##{name}-data .price" .getText! .then!
  sumOfHours = parseInt(price) * hours
  <- $ "##{name}-data .add-to-card" .click! .then -> cb(sumOfHours)
