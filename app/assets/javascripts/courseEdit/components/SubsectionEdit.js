import React from 'react'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'

import ComponentEdit from './ComponentEdit'

class SubsectionEdit extends React.Component {
  constructor(props) {
    super(props)
    this.id = this.props.subsection.id
    this.state = {
      components: this.props.subsection.components,
    }
    this.deleteSubsection = this.deleteSubsection.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ components: nextProps.subsection.components })
  }

  deleteSubsection() {
    this.props.deleteSubsection(this.id)
  }

  renderComponents() {
    if (!this.state.components) {
      return (
        <li>No components to show!</li>
      )
    } else {
      return this.state.components.map((value) => {
        return (
          <li key={value.id}>
            <ComponentEdit component={value} />
          </li>
        )
      })
    }
  }

  render() {
    return (
      <div>
        <h2>Subsection: {this.props.subsection.title}</h2>
        <ul>{this.renderComponents()}</ul>
        <button onClick={this.deleteSubsection}>Delete subsection</button>
      </div>
    )
  }
}

SubsectionEdit.defaultProps = {
  subsection: {
    components: [],
  },
}

export default SubsectionEdit