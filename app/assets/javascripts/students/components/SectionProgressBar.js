import _ from 'underscore'

import React from 'react'
import { Link } from 'react-router'

import { getUser } from '../../utils/user_helpers'
import { RailsRoutes, ReactRoutes } from '../../shared/routes'
import { APIRoutes } from '../../shared/routes'

class SectionProgressBar extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {this.props.progress}%
      </div>
    )
  }
}

export default SectionProgressBar
