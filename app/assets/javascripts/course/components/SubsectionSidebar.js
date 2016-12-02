import _ from 'underscore'

import React from 'react'
import { Link } from 'react-router'

import { getUser } from '../../utils/user_helpers'
import { RailsRoutes, ReactRoutes } from '../../shared/routes'
import { APIRoutes } from '../../shared/routes'

class SubsectionSidebar extends React.Component {

  constructor(props) {
    super(props)
  }

  getActive() {
    return this.props.displayedSubsection.id == this.props.subsection.id ? 'active' : ''
  }

  render() {
    return (
      <div className={`sidebar-subsection-card ${this.getActive()} ${this.props.subsectionDisplayType}`}>
        <li onClick={_.partial(this.props.callback, this.props.subsection.id, 0)}>
          {this.props.subsection.title}
        </li>
      </div>
    )
  }
}

export default SubsectionSidebar
