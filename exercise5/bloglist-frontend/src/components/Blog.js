import React from 'react'
import Toggable from './Toggable'
import BlogService from '../services/blogs'

class Blog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      author: props.blog.author,
      title: props.blog.title,
      likes: props.blog.likes,
      url: props.blog.url,
      user: props.blog.user,
      id: props.blog.id
    }
  }

  blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  handleLike = async (event) => {
    event.preventDefault()
    const temp = {
      likes: this.state.likes+1
    }
    this.setState({likes: this.state.likes+1})
    const asd = await BlogService.update(this.state.id, temp)
  }

  render() {
    return (
      <div style={this.blogStyle}>
        <Toggable titleLabel={this.state.title + ' ' + this.state.author}>
          <p><a href={this.state.url}>{this.state.url}</a></p>
          <form onSubmit={this.handleLike}>
          <p>{this.state.likes} likes <button type='submit'>like</button></p>
          </form>
          <p>added by {this.state.user.name}</p>
        </Toggable>
      </div>
    )
  }
}
export default Blog
