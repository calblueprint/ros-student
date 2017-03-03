import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import { ReactRoutes } from '../../shared/routes'
import { Images } from '../../utils/image_helpers'

import Image from '../../shared/components/widgets/Image'

class AdminCourseCard extends React.Component {
  getImgStyle() {
    const image_url = this.props.course.image_url ?
      this.props.course.image_url :
      Images.doge

    return image_url
  }

  render() {
    return (
      <a
        className='card-column'
        href={this.props.route}
        data-method='get'
      >
        <div className='card'>
          <div className='card-img-container'>
            <Image src={this.getImgStyle()} />
          </div>
          <h2 className='card-title'>{this.props.course.name}</h2>
        </div>
      </a>
    )
  }
}

AdminCourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),

  route: PropTypes.string.isRequired,
}

export default AdminCourseCard
