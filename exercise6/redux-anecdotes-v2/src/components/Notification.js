import React from 'react'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }

    const temp = this.props.store.getState().notification

    if (temp === 'No notifications') {
      return <div></div>
    } else {
      return (
        <div style={style}>
          {temp}
        </div>
      )
    }
  }
}

export default Notification
