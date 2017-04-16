import React, { PropTypes } from 'react'

import { Images } from '../../utils/helpers/image_helpers'
import Image from '../../shared/components/widgets/Image'

class AdminCourseRequestCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }

  }

  getImgStyle() {
    const image_url = this.props.student.image_url ?
      this.props.student.image_url :
      Images.doge

    return image_url
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

  render() {
    return (
      <div className='admin-course-request-card'>
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
    )
  }
}

AdminCourseRequestCard.propTypes = {
  student: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    image_url: PropTypes.string,
  }),
  courses: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  }))
}

export default AdminCourseRequestCard
