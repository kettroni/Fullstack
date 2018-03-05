import React from 'react'
import { changeFilter } from '../reducers/actionCreators'
import { connect } from 'react-redux'
class Filter extends React.Component {

  handleChange = (e) => {
    this.props.changeFilter(e.target.value.toLowerCase())
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

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const ConnectedFilter = connect(
  mapStateToProps,
  { changeFilter },
)(Filter)

export default ConnectedFilter
