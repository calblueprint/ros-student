import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import { ReactRoutes } from '../../shared/routes'
import { Images } from '../../utils/image_helpers'

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

  render() {
    return (
      <div className={`${this.getCourseCardStyle()} card-column`}>
        <Link
          onClick={this.disableLink.bind(this)}
          to={this.props.route}>
          <div className='card'>
            <div className="card-img-container">
              <Image src={this.getImgStyle()}/>
            </div>
            <h2 className="card-title">{this.props.course.name}</h2>
            <TopProgressBar className="card-progress-bar" progress={this.props.course.progress} />
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
  }),

  route: PropTypes.string.isRequired,
}

export default StudentCourseCard
