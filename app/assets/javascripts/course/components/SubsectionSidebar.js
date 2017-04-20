import _ from 'underscore'

import React from 'react'
import { Link } from 'react-router'

import { getUser } from '../../utils/helpers/user_helpers'
import { RailsRoutes, ReactRoutes } from '../../shared/routes'
import { APIRoutes } from '../../shared/routes'

class SubsectionSidebar extends React.Component {
  isActive() {
    return this.props.displayedSubsection.id == this.props.subsection.id
  }

  getActive() {
    return this.isActive() ? 'active' : ''
  }

  getHighlight() {
    return this.isActive() ? 'sidebar-subsection-highlight' : ''
  }

  getInactive() {
    const subsection = this.props.subsection
    return subsection.id == this.props.currentSubsection.id || subsection.is_complete ? '' : 'inactive'
  }

  render() {
    return (
      <div className='sidebar-subsection-card-container'>
        <div className={this.getHighlight()} />
        <div className={`sidebar-subsection-card ${this.getActive()} ${this.getInactive()}`}>
          <h3
            className='sidebar-subsection-title'
            onClick={_.partial(this.props.callback, this.props.subsection.id, undefined)}
          >
            {this.props.subsection.title}
          </h3>
        </div>
      </div>
    )
  }
}

export default SubsectionSidebar
