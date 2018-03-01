import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      error: null,
      newBlog: null
    }
  }

  loginForm = () => (
    <div>
      <h2>Log in to application</h2>

     <form onSubmit={this.login}>
       <div>
         username
         <input
           type="text"
           name="username"
           value={this.state.username}
           onChange={this.handleLoginFieldChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleLoginFieldChange}
           />
         </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  blogForm = () => (
    <div>
      <h2>Create new blog</h2>

      <form onSubmit={this.addBlog}>
        <input
          value={this.state.newBlog}
          onChange={this.handleBlogChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )

  listBlogs = () => (
    <div>
      <h2>blogs</h2>
      <p>{this.state.user.name} logged in</p>
      {this.state.blogs.map(blog =>
        <Blog key={blog._id} blog={blog}/>
      )}
    </div>
  )

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        error: 'username or password is incorrect',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  render() {
    return (
      <div>
        {this.state.error}
        {this.state.user === null ?
          this.loginForm() :
          this.listBlogs()
        }
      </div>
    )
  }
}

export default App
