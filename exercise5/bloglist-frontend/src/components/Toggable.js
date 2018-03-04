import React from 'react'
import PropTypes from 'prop-types'

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  astext = {
    background:'none',
    border:'none',
    margin:0,
    padding:0
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button style={this.astext} onClick={this.toggleVisibility}>{this.props.titleLabel}</button>

        </div>
        <div style={showWhenVisible}>
          <button style={this.astext} onClick={this.toggleVisibility}>{this.props.titleLabel}</button>
          {this.props.children}
        </div>
      </div>
    )
  }


}
Togglable.propTypes = {
  titleLabel: PropTypes.string.isRequired
}

export default Togglable
