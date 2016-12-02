import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import { ReactRoutes } from '../../shared/routes'
import { Images } from '../../utils/image_helpers'

import Image from '../../shared/components/widgets/Image'
import TopProgressBar from '../../shared/components/widgets/TopProgressBar'

class StudentCourseCard extends React.Component {
  getImgStyle() {
    const image_url = this.props.course.image_url ? this.props.course.image_url : Images.doge

    return image_url
  }

  disableLink(e) {
    if (!this.props.course.is_enrolled) {
      e.preventDefault()
    }
  }

  getCourseCardStyle() {
    const newOpacity = this.props.course.is_enrolled ? 1 : 0.5

    return ({
      opacity: `${newOpacity}`
    })
  }

  render() {
    const disabled = this.props.course.is_enrolled ? '' : 'disabled'
    return (
      <Link
        className={`card-column ${disabled}`}
        onClick={this.disableLink.bind(this)}
        to={this.props.route}>
        <div className="card" style={this.getCourseCardStyle()}>
          <div className="card-img-container">
            <Image src={this.getImgStyle()}/>
          </div>
          <h2 className="card-title">{this.props.course.name}</h2>
          <TopProgressBar className="card-progress-bar" progress={this.props.course.progress} />
        </div>
      </Link>
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
