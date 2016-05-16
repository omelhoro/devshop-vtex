import React from 'react'
import { HomeView } from 'routes/Home/components/HomeView'
import { render } from 'enzyme'

describe('(View) Home', () => {
  let _component

  beforeEach(() => {
    _component = render(<HomeView />)
  })

  it('Renders a welcome message', () => {
    const welcome = _component.find('h2#first-h2')
    expect(welcome).to.exist
    expect(welcome.text()).to.match(/Objetivo/)
  })

  it('Renders an awesome duck image', () => {
    const duck = _component.find('img')
    expect(duck).to.exist
    expect(duck.attr('alt')).to.match(/Imgur/)
  })

})