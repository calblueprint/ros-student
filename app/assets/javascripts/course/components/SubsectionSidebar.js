import _ from 'underscore'

import React from 'react'
import { Link } from 'react-router'

import { getUser } from '../../utils/user_helpers'
import { RailsRoutes, ReactRoutes } from '../../shared/routes'
import { APIRoutes } from '../../shared/routes'

class SubsectionSidebar extends React.Component {
  getActive() {
    return this.props.displayedSubsection.id == this.props.subsection.id ? 'active' : ''
  }

  getInactive() {
    const subsection = this.props.subsection
    return subsection.id == this.props.displayedSubsection.id || subsection.is_complete ? '' : 'inactive'
  }

  render() {
    return (
      <div className={`sidebar-subsection-card ${this.getActive()} ${this.getInactive()}`}>
        <li onClick={_.partial(this.props.callback, this.props.subsection.id, 0)}>
          {this.props.subsection.title}
        </li>
      </div>
    )
  }
}

export default SubsectionSidebar
