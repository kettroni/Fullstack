import React from 'react'
import axios from 'axios'
import CountryFilter from './components/CountryFilter'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      searched: '',
      countries: []
    }
  }

  promise = axios.get('https://restcountries.eu/rest/v2/all')

  eventHandler = (response) => {
    this.setState({countries: response.data})
  }

  componentWillMount() {
    this.promise.then(this.eventHandler)
  }

  updateSearched = (event) => {
    this.setState({
      searched: event.target.value.toLowerCase()
    })
  }


  render() {

    return (
      <div>
        <p>find countries: <input value={this.state.searched} onChange={this.updateSearched}/></p>
        <CountryFilter state={this.state} tama={this}/>
      </div>
    )
  }
}

export default App
