import React from 'react'
import Toggable from './Toggable'
const Blog = ({blog}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
      <div style={blogStyle}>
        <Toggable titleLabel={blog.title + ' ' + blog.author}>
          <p><a href={blog.url}>{blog.url}</a></p>
          <p>{blog.likes} likes <button>like</button></p>
          <p>added by {blog.user.name}</p>
        </Toggable>
      </div>

  )
}
export default Blog
