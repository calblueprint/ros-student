import _ from 'underscore'

import React from 'react'
import { Link } from 'react-router'

import { getUser } from '../../utils/user_helpers'
import { RailsRoutes, ReactRoutes } from '../../shared/routes'
import { APIRoutes } from '../../shared/routes'

class SubsectionOutline extends React.Component {

  constructor(props) {
    super(props)
  }

  complete() {
    if (this.props.subsection.is_complete == true) {
      return ' √'
    } else {
      return ' ø'
    }
  }

  render() {
    return (
      <div>
        <li>{this.props.subsection.title} {this.complete()}</li>
      </div>
    )
  }
}

export default SubsectionOutline
