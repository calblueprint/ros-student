import _ from 'underscore'

import React from 'react'
import { Link } from 'react-router'
import Collapse from 'react-collapse'

import { getUser } from '../../utils/user_helpers'
import { Images } from '../../utils/image_helpers'
import { RailsRoutes, ReactRoutes } from '../../shared/routes'
import { APIRoutes } from '../../shared/routes'

import SubsectionSidebar from './SubsectionSidebar'

class SectionSidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: this.props.section.id == this.props.displayedSubsection.section_id,
    }

    this.toggleCollapse = this.toggleCollapse.bind(this)
  }

  toggleCollapse() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  renderSubsections() {
    return this.props.section.subsections.map((value, index) => {
      return (
        <SubsectionSidebar
          key={value.id}
          subsection={value}
          currentSubsection={this.props.currentSubsection}
          displayedSubsection={this.props.displayedSubsection}
          callback={this.props.callback}
        />
      )
    })
  }

  render() {
    const arrow = this.state.isOpen ? 'rotate' : ''

    return (
      <div className='sidebar-section-card'>
        <div
          className='flex vertical sidebar-section-title-container'
          onClick={this.toggleCollapse}
        >
          <h2 className='sidebar-section-title noselect'>{this.props.section.title}</h2>
          <img
            className={`sidebar-section-arrow collapse ${arrow}`}
            src={Images.white_dropdown_arrow}
          />
        </div>
        <Collapse isOpened={this.state.isOpen}>
          {this.renderSubsections()}
        </Collapse>
      </div>
    )
  }
}

export default SectionSidebar
