export typeDev = (name, cb) ->
  item = $ '#dev-name'
  <- item.clear! .then!
  <- item.sendKeys name .then!
  <- $ '#import-developer' .click! .then!
  <- browser.sleep 1500 .then cb

export typeOrg = (name, cb) ->
  item = $ '#org-name'
  <- item.sendKeys name .then!
  <- $ '#import-organization' .click! .then!
  browser.sleep 5000 .then cb

export addToCard = (name, hours, cb) ->
  <- typeDev "#{name}"
  <- $ "##{name}-data .hours" .sendKeys hours .then!
  price <- $ "##{name}-data .price" .getText! .then!
  sumOfHours = parseInt(price) * hours
  <- $ "##{name}-data .add-to-card" .click! .then -> cb(sumOfHours)
