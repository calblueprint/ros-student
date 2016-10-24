import React from 'react'

class ComponentEdit extends React.Component {
  render() {
    return (
      <div>
        <h3>Component: {this.props.component.type}: {this.props.component.content_url}</h3>
      </div>
    )
  }
}

export default ComponentEdit
