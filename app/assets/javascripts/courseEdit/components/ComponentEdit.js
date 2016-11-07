import React from 'react'

class ComponentEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      component: this.props.component,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ component: nextProps.component })
  }

  render() {
    return (
      <div>
        <h3>Component: {this.state.component.type}: {this.state.component.content_url}</h3>
      </div>
    )
  }
}

export default ComponentEdit
