import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

const navStyle = {
  'backgroundColor': 'lightblue',
  'padding': '12px',
  'border': '10px groove',
  'borderColor': 'lightblue',
  'width': '30%'
}

const navActive = {
  'backgroundColor': 'orange',
  'padding': '8px'
}
const Menu = () => (
  <div style={navStyle}>
    <NavLink activeStyle={navActive} exact to='/'>anecdotes</NavLink>&nbsp;
    <NavLink activeStyle={navActive} to='/create'>create new</NavLink>&nbsp;
    <NavLink activeStyle={navActive} to='/about'>about</NavLink>&nbsp;
  </div>
)

function helper(id) {
  return '/anecdotes/' + id
}

const Anecdote = (props) => {
  return (
    <div className='container'>
      <h2>{props.anecdote.content} by {props.anecdote.author}</h2>
      <p>has {props.anecdote.votes} votes</p>
      <p>for more information see <a href='`{props.anecdote.url}`'>{props.anecdote.info}</a></p>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => <ListGroupItem key={anecdote.id} ><Link to={helper(anecdote.id)}>{anecdote.content}</Link></ListGroupItem>)}
    </ListGroup>
  </div>
)

const About = () => (
  <div className='container'>
      <h2>About anecdote app</h2>

      <p><img style={{width:'10em', float: 'right'}} alt='' src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Edsger_Wybe_Dijkstra.jpg/800px-Edsger_Wybe_Dijkstra.jpg"></img>According to Wikipedia:</p>

        <em>An anecdote is a brief, revealing account of an individual person or an incident.
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
          An anecdote is "a story with a point."</em>
          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>

)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })

    this.props.history.push('/')

  }

  render() {
    return(
      <div>
          <h2>Create a new anecdote</h2>
          <form onSubmit={this.handleSubmit}>
            <dl className='row'>
              <dt className="col-sm-1">Content</dt>
              <dd className="col-sm-9"><input name='content' value={this.state.content} onChange={this.handleChange} /></dd>
            </dl>
            <dl className='row'>
              <dt className="col-sm-1">Author</dt>
              <dd className="col-sm-9"><input name='author' value={this.state.author} onChange={this.handleChange} /></dd>
            </dl>
            <dl className='row'>
              <dt className="col-sm-1">Url for more info</dt>
              <dd className="col-sm-9"><input name='info' value={this.state.info} onChange={this.handleChange} /></dd>
            </dl>
            <button>create</button>
          </form>
      </div>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote),
    notification: 'a new anecdote ' + anecdote.content + ' created!' })
    const temp = this
    setTimeout(function(){temp.setState({notification: ''})}, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    let notificationStyle
    if (this.state.notification === '') {
      notificationStyle = {}
    } else {
      notificationStyle = {
        'border': '10px groove',
        'borderColor': 'green',
        'color': 'green',
        'fontStyle': 'italic',
        'fontSize': '30px',
        'width': '50%'}
    }
    return (
      <div className='container'>
        <Router>
          <div>
            <h1>Software anecdotes</h1>
              <Menu />
              <div style={notificationStyle}>
                {this.state.notification}
              </div>
              <Route exact path='/' render={ () =><AnecdoteList anecdotes={this.state.anecdotes} /> } />
              <Route exact path='/about' render={ () =><About /> } />
              <Route exact path='/create' render={ ({history}) => <CreateNew history={history} addNew={ this.addNew }/> }/>
              <Route exact path="/anecdotes/:id" render={ (match) =>
                  <Anecdote anecdote={this.anecdoteById(match.match.params.id)}/>}
              />
            <Footer />
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
