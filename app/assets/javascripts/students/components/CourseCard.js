import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import { ReactRoutes } from '../../shared/routes'
import { Images } from '../../utils/image_helpers'

import ProgressBar from '../../shared/components/widgets/ProgressBar'

class CourseCard extends React.Component {
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
    return (
      <Link onClick={this.disableLink.bind(this)}
        to={this.props.route}>
        <div className="card" style={this.getCourseCardStyle()}>
          <img className="card-img-container" src={Images.doge}/>
          <h2 className="card-title">{this.props.course.name}</h2>
          <ProgressBar className="card-progress-bar" progress={this.props.course.progress} />
        </div>
      </Link>
    )
  }
}

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    progress: PropTypes.number.isRequired,
    is_enrolled: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
  }),

  route: PropTypes.string.isRequired,
}

export default CourseCard
