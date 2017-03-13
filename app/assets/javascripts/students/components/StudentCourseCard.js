import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import { ReactRoutes } from '../../shared/routes'
import { Images } from '../../utils/helpers/image_helpers'

import Image from '../../shared/components/widgets/Image'
import TopProgressBar from '../../shared/components/widgets/TopProgressBar'

class StudentCourseCard extends React.Component {
  getImgStyle() {
    const image_url = this.props.course.image_url ?
      this.props.course.image_url :
      Images.doge

    return image_url
  }

  disableLink(e) {
    if (!this.props.course.is_enrolled) {
      e.preventDefault()
    }
  }

  getCourseCardStyle() {
    return this.props.course.is_enrolled ? '' : 'inactive-card-container'
  }

  getCourseDescription() {
    const desc = this.props.course.description
    return desc.length < 150 ? desc : desc.substring(0, 150) + '...'
  }

  render() {
    return (
      <div className={`${this.getCourseCardStyle()} card-column`}>
        <Link
          onClick={this.disableLink.bind(this)}
          to={this.props.route}
          className='card-link'
        >
          <div className='card'>
            <div className='card-img-container'>
              <Image src={this.getImgStyle()} />
            </div>
            <h2 className='card-title'>{this.props.course.name}</h2>
            <div className='card-line-divider' />
            <h3 className='card-description'>{this.getCourseDescription()}</h3>
            <TopProgressBar
              className='card-progress-bar'
              progress={this.props.course.progress}
            />
          </div>
        </Link>
      </div>
    )
  }
}

StudentCourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    progress: PropTypes.number.isRequired,
    is_enrolled: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),

  route: PropTypes.string.isRequired,
}

export default StudentCourseCard
