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
      newTitle: '',
      newAuthor: '',
      newUrl: ''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  }

  addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.newTitle,
      author: this.state.newAuthor,
      url: this.state.newUrl
    }
    try {
      const temp = await blogService.create(blogObject)
      console.log(temp)
      this.setState({newTitle: '', newAuthor: '', newUrl: '', blogs: this.state.blogs.concat(temp)})
    } catch (e) {
      this.setState({error: e})
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
        <div>
          title
          <input
            type="text"
            name="newTitle"
            value={this.state.newTitle}
            onChange={this.handleLoginFieldChange}
          />
        </div>
        <div>
          author
          <input
            type="text"
            name="newAuthor"
            value={this.state.newAuthor}
            onChange={this.handleLoginFieldChange}
          />
        </div>
        <div>
          url
          <input
            type="text"
            name="newUrl"
            value={this.state.newUrl}
            onChange={this.handleLoginFieldChange}
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )

  logOut() {
    window.localStorage.clear()
    this.setState({user: null})
  }

  listBlogs = () => (
    <div>
      <h2>blogs</h2>
      <p>{this.state.user.name} logged in <button onClick={() => this.logOut()}>logout</button></p>
      {this.state.blogs.map(blog =>
        <Blog key={blog.id || blog._id} blog={blog}/>
      )}
      {this.blogForm()}
    </div>
  )

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

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '',user: user})
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
