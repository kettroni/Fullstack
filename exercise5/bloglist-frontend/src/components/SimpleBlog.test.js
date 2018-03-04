import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {

  const temp = {
    title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
    author: 'FIksu',
    url: 'www.asdasdasd.com',
    likes: 0
  }

  const blogComponent = shallow(<SimpleBlog blog={temp} />)


  it('renders title and author', () => {

    const contentDiv = blogComponent.find('.head')

    expect(contentDiv.text()).toContain(temp.title && temp.author)
  })

  it('renders amount of likes', () => {

    const contentDiv = blogComponent.find('.likes')

    expect(contentDiv.text()).toContain(temp.likes)
  })

  it('clicking the like button twice calls event handler twice', () => {

    const mockHandler = jest.fn()

    const noteComponent = shallow(
      <SimpleBlog
        blog={temp}
        onClick={mockHandler}
      />
    )

    const button = noteComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
