import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

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
      newUrl: '',
      success: null,
      loginVisible: false
    }
  }

  componentDidMount() {
    blogService.getAll()
      .then(blogs => this.setState({blogs: blogs.sort((a,b) => a.likes < b.likes) })
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
      const notif = "a new blog '" + blogObject.title + "' by " + blogObject.author + " added"
      this.setState({newTitle: '', newAuthor: '', newUrl: '', blogs: this.state.blogs.concat(temp), success: notif,
      error: null})
    } catch (e) {
      this.setState({newTitle: '', newAuthor: '', newUrl: '',error: e.message, success: null})
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }

  }

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

  loginForm = () => {

    const hideWhenVisible = { display: this.state.loginVisible ? 'none' : '' }
    const showWhenVisible = { display: this.state.loginVisible ? '' : 'none' }

    return (

      /*<Toggable buttonLabel='log in'>
        <LoginForm
          visible={this.state.visible}
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleLoginFieldChange}
          handleSubmit={this.login}
        />
      </Toggable>*/

      <div>
        <div style={hideWhenVisible}>
          <button onClick={e => this.setState({loginVisible: true})}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
          login ={this.login}
          state = {this.state}
          handleChange = {this.handleLoginFieldChange}
          />
          <button onClick={e => this.setState({loginVisible: false})}>cancel</button>
        </div>
      </div>
  )}

  listBlogs = () => (
    <div>
      {this.state.success}
      <h2>blogs</h2>
      <p>{this.state.user.name} logged in <button onClick={() => this.logOut()}>logout</button></p>
      {this.state.blogs.sort((a,b) => a.likes < b.likes).map(blog =>
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
