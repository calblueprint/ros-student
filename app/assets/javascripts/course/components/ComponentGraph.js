import React from 'react'
import _ from 'underscore'

import request from '../../shared/requests/request'
import { RailsRoutes, ReactRoutes, APIRoutes } from '../../shared/routes'

class ComponentGraph extends React.Component {

  renderComponents() {
    if (_.isEmpty(this.props.subsection)) {
      return 'No subsection selected'
    } else if (_.isEmpty(this.props.subsection.components)) {
      return 'Loading'
    } else {
      return this.props.subsection.components.map((value) => {
        return <span key={value.id} onClick={_.partial(this.props.callback, value.id)}>{value.id} component {value.component_type} - </span>
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
