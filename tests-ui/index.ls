its = it

describe 'Index page', ->

  beforeEach -> browser.get 'http://localhost:3000'

  its 'should have the correct title', ->
    expect browser.getTitle! .toEqual 'Developers Shop powered by IF'

  its 'should have the correct headers', ->
    headers = [
      'Objetivo'
      'Tarefas e priorização'
      'Server side'
      'Client side'
      'Entrega e observações'
    ]
    items <- $$ 'h2'
      .then!

    text <- (items.map (.getText!)
      |> Promise.all).then!

    expect text .toEqual headers
