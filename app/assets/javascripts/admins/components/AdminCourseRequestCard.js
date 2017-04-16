import React, { PropTypes } from 'react'
import Collapse from 'react-collapse'

import { Images } from '../../utils/helpers/image_helpers'
import Image from '../../shared/components/widgets/Image'

class AdminCourseRequestCard extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  getImgStyle() {
    const image_url = this.props.student.image_url ?
      this.props.student.image_url :
      Images.doge

    return image_url
  }

  getCardStyle() {
    return this.props.isActive ?
      'admin-course-request-card active' :
      'admin-course-request-card'
  }

  getRequestCourses() {
    return this.props.courses.map((course) => {
      return (
        <div className='course-name'>
          {course.name}
        </div>
      )
    })
  }

  handleClick(event) {
    event.preventDefault()
    this.props.setActive(this.props.id)
  }

  render() {
    return (
      <div className='admin-course-request-card-container'>
        <div
          className={this.getCardStyle()}
          onClick={this.handleClick}
        >
          <div className='student-image-container'>
            <Image
              src={this.getImgStyle()}
              img_style="student-image"
            />
          </div>
          <div className='student-request-info-container'>
            <span className='student-name'>
              {`${this.props.student.first_name} ${this.props.student.last_name}`}
            </span>
            <span className='student-email'>
              {this.props.student.email}
            </span>
          </div>
          <div className='student-request-courses-container'>
            {this.getRequestCourses()}
          </div>
        </div>

        <Collapse isOpened={this.props.isActive}>
          <div className='admin-course-request-card-controls'>
            <div className='left-container'>
              <div className='directions-text'>
                Write a message here and either approve or reject this request.
              </div>
            </div>
            <div className='right-container'>
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}

AdminCourseRequestCard.propTypes = {
  id: PropTypes.number.isRequired,
  student: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    image_url: PropTypes.string,
  }),
  courses: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })),
  setActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default AdminCourseRequestCard
