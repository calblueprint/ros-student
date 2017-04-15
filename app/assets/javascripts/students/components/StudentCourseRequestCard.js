import React, { PropTypes } from 'react'

import { Images } from '../../utils/helpers/image_helpers'
import Image from '../../shared/components/widgets/Image'

class StudentCourseRequestCard extends React.Component {
  constructor(props) {
    super(props)
  }

  getImgStyle() {
    const image_url = this.props.image_url ?
      this.props.image_url :
      Images.doge

    return image_url
  }

  render() {
    return (
      <div className='student-course-request-card'>
        <div className='course-image'>
          <Image src={this.getImgStyle()} />
        </div>
        <div className='course-info-container'>
          <div className='course-title'>
            {this.props.name}
          </div>
          <div className='course-description'>
            {this.props.description + "aweofijasdlkfjawoefijasdlfkjawfeoijasdlfkjaweofij awefoijasdlfkja oawiejaslkfj "}
          </div>
        </div>
      </div>
    )
  }
}

StudentCourseRequestCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
}

export default StudentCourseRequestCard
