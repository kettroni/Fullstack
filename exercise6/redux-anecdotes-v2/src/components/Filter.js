import React from 'react'
import { changeFilter } from '../reducers/actionCreators'
class Filter extends React.Component {

  handleChange = (e) => {
    this.props.store.dispatch(changeFilter(e.target.value.toLowerCase()))
  }

  render() {
    const style = {
      marginBottom: 10
    }
    return (
      <div>
        <div style={style}>
          filter <input type='text' name='content' onChange={this.handleChange}/>
        </div>
      </div>
    )
  }
}

export default Filter
