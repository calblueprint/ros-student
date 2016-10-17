import _ from 'underscore'

import React from 'react'
import { Link } from 'react-router'

import { getUser } from '../../utils/user_helpers'
import { RailsRoutes, ReactRoutes } from '../../shared/routes'
import { APIRoutes } from '../../shared/routes'
import SubsectionOutline from './SubsectionOutline'
import SectionProgressBar from './SectionProgressBar'

class SectionOutline extends React.Component {

  constructor(props) {
    super(props)
  }

  renderSubsections() {
    return this.props.section.subsections.map((value) => {
      return <SubsectionOutline key={value.id} subsection={value} />
    })
  }

  render() {
    return (
      <div>
        <li><h2>{this.props.section.title} <SectionProgressBar progress={this.props.section.progress}/></h2></li>
        <ul>{this.renderSubsections()}</ul>
      </div>
    )
  }
}

export default SectionOutline
