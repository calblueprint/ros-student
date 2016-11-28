import _ from 'underscore'

import React from 'react'
import { Link } from 'react-router'

import request from '../../shared/requests/request'

import { getUser } from '../../utils/user_helpers'
import { RailsRoutes, ReactRoutes } from '../../shared/routes'
import { APIRoutes } from '../../shared/routes'
import SectionOutline from './SectionOutline'

import { Images } from '../../utils/image_helpers'

import TopProgressBar from '../../shared/components/widgets/TopProgressBar'

class CourseOutlinePage extends React.Component {

  constructor(props) {
    super(props)

    this.id = this.props.routeParams.id

    this.state = {
      courseOutline: {}
    }

    this.requestOutline()
  }

  requestOutline() {
    const path = APIRoutes.getStudentCourseOutlinePath(this.id)

    request.get(path, (response) => {
      console.log(response)
      this.setState({ courseOutline: response.course_outline })
    }, (error) => {
      console.log(error)
    })
  }

  getOutlineStyle() {
    const image_url = this.state.courseOutline.image_url ? this.state.courseOutline.image_url : Images.default_course

    return ({
      backgroundImage: `url(${image_url})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    })
  }

  renderSections() {
    if (_.isEmpty(this.state.courseOutline.sections)) {
      return "Loading"
    } else {
      return this.state.courseOutline.sections.map((value) => {
        return <SectionOutline key={value.id} section={value} />
      })
    }
  }

  render() {
    return (
      <div>
        <div className="flex center course-outline-header" style={this.getOutlineStyle()}>
          <div className='linear-gradient-60-mask flex center course-outline-header'>
            <div className="course-outline-header-container container">
              <div className="course-outline-header-text">
                <h1 className="course-outline-header-title">{this.state.courseOutline.name}</h1>
                <div>{this.state.courseOutline.description}</div>
              </div>
              <div className="course-outline-header-progress">
                <div className="course-outline-header-button marginBot-sm">
                  <a className="button" href={RailsRoutes.coursePath(this.state.courseOutline.id)}>Continue course</a>
                </div>
                <div className="course-outline-header-bar">
                  <TopProgressBar progress={this.state.courseOutline.progress}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex center">
          <div className="container course-outline-bottom">
            <ol>{this.renderSections()}</ol>
          </div>
        </div>
      </div>
    )
  }
}

export default CourseOutlinePage
