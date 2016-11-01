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

  current() {
      if (this.props.current_subsection.id == this.props.subsection.id) {
        return ' <---'
      }
  }

  render() {
    return (
      <div>
        <li>{this.props.subsection.id} {this.props.subsection.title} {this.current()}</li>
      </div>
    )
  }
}

export default SubsectionSidebar