import React from 'react'
import _ from 'underscore'

import request from '../../shared/requests/request'
import { RailsRoutes, ReactRoutes, APIRoutes } from '../../shared/routes'

class ComponentGraph extends React.Component {

  constructor(props) {
    super(props)

    this.state = { subsection: {} }

    this.requestSubsection(this.props.id)
  }

  componentWillReceiveProps(nextProps) {
    this.requestSubsection(nextProps.id)
  }

  requestSubsection(id) {
    const path = APIRoutes.getSubsectionPath(id)

    request.get(path, (response) => {
      this.setState({ subsection: response.subsection })
    }, (error) => {
      console.log(error)
    })
  }

  renderComponents() {
    if (_.isEmpty(this.state.subsection.components)) {
      return "Loading"
    } else {
      return this.state.subsection.components.map((value) => {
        return <p key={value.id}>{value.id}{value.component_type}</p>
      })
    }
  }

  render() {
    return (
      <div>
        <div>{this.renderComponents()}</div>
      </div>
    )
  }
}

export default ComponentGraph
