import _ from 'underscore'

import React from 'react'
import { Link } from 'react-router'
import Collapse from 'react-collapse'

import { getUser } from '../../utils/user_helpers'
import { RailsRoutes, ReactRoutes } from '../../shared/routes'
import { APIRoutes } from '../../shared/routes'
import SubsectionOutline from './SubsectionOutline'
import RightProgressBar from '../../shared/components/widgets/RightProgressBar'
import { Images } from '../../utils/image_helpers'

class SectionOutline extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: true,
    }

    this.toggleSubsections = this.toggleSubsections.bind(this)
  }

  toggleSubsections() {
    const isOpen = this.state.isOpen
    this.setState({ isOpen: !isOpen })
  }

  renderSubsections() {
    return this.props.section.subsections.map((value) => {
      return <SubsectionOutline key={value.id} subsection={value} />
    })
  }

  render() {
    const arrow = this.state.isOpen ? 'rotate' : ''
    return (
      <div className="section-outline-container">
        <div className="flex section-outline-header">
          <h2 className="section-outline-header-title">
            {this.props.section.title}
          </h2>
          <div className="flex section-outline-header-right">
            <RightProgressBar
              className="section-outline-header-bar"
              progress={this.props.section.progress}
            />
            <img
              className={`section-outline-dropdown collapse ${arrow}`}
              src={Images.dropdown_arrow}
              onClick={this.toggleSubsections}
            />
          </div>
        </div>
        <Collapse isOpened={this.state.isOpen}>
          <ul className="section-outline-subsections">
            {this.renderSubsections()}
          </ul>
        </Collapse>
      </div>
    )
  }
}

export default SectionOutline
