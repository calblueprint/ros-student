import React, { PropTypes } from 'react'

import { Images } from '../../utils/helpers/image_helpers'
import Image from '../../shared/components/widgets/Image'

class StudentCourseRequestCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: false,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  getCardStyle() {
    return this.props.selected ?
      'student-course-request-card selected' :
      'student-course-request-card'
  }

  getImgStyle() {
    const image_url = this.props.course.image_url ?
      this.props.course.image_url :
      Images.doge

    return image_url
  }

  getCourseDescription() {
    const limit = 200
    return this.props.course.description.substring(0, limit)
  }

  handleClick(event) {
    event.preventDefault()
    this.props.updateSelected(this.props.course.id)
  }

  render() {
    return (
      <div
        className={this.getCardStyle()}
        onClick={this.handleClick}
      >
        <div className='course-image'>
          <Image src={this.getImgStyle()} />
        </div>
        <div className='course-info-container'>
          <div className='course-title'>
            {this.props.course.name}
          </div>
          <div className='course-description'>
            {this.getCourseDescription()}
          </div>
        </div>
      </div>
    )
  }
}

StudentCourseRequestCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
  }),
  selected: PropTypes.bool.isRequired,
  updateSelected: PropTypes.func.isRequired,
}

export default StudentCourseRequestCard
