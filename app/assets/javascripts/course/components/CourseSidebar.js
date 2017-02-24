import _ from 'underscore'
import React from 'react'

import { Link } from 'react-router'

import request from '../../shared/requests/request'

import { getUser } from '../../utils/helpers/user_helpers'
import { RailsRoutes, ReactRoutes } from '../../shared/routes'
import { APIRoutes } from '../../shared/routes'
import { Images } from '../../utils/helpers/image_helpers'

import SectionSidebar from './SectionSidebar'

class CourseSidebar extends React.Component {

  renderSections() {
    return _.map(this.props.courseSidebar.sections, (value) => {
      return (
        <SectionSidebar
          key={value.id}
          section={value}
          currentSubsection={this.props.courseSidebar.current_subsection}
          displayedSubsection={this.props.displayedSubsection}
          callback={this.props.callback}
        />
      )
    })
  }

  renderInfo() {
    return (
      <div className='flex vertical sidebar-course-title-container'>
        <a
          className='flex'
          href={RailsRoutes.courseOutlinePath(this.props.courseId)}
          data-method='get'>
          <img
            className='sidebar-back-button'
            src={Images.left_arrow}
          />
        </a>
        <h1 className='sidebar-course-title'>{this.props.courseSidebar.name}</h1>
        <div className='sidebar-course-title-filler'>
        </div>
      </div>
    )
  }

  renderSidebar() {
    if (_.isEmpty(this.props.courseSidebar)) {
      return 'Loading'
    } else {
      return (
        <div>
          {this.renderInfo()}
          <div className='sidebar-section-container'>
            {this.renderSections()}
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderSidebar()}
      </div>
    )
  }
}

export default CourseSidebar
