import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {

  const temp = {
    title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
    author: 'FIksu',
    url: 'www.asdasdasd.com',
    likes: 0,
    user: {
      name: 'Testaaja'
    }
  }

  it('if not clicked only shows title and author', () => {

    const blogComponent = shallow(<Blog blog={temp} />)
    const contentDiv = blogComponent.find('.wrapper')
    expect(contentDiv.text()).toContain(temp.author)
  })

})
