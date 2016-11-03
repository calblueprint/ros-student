import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import { ReactRoutes } from '../../shared/routes'

class CourseCard extends React.Component {
  disableLink(e) {
    if (!this.props.course.is_enrolled) {
      e.preventDefault()
    }
  }

  render() {
    return (
      <Link onClick={this.disableLink.bind(this)}
        to={ReactRoutes.courseOutlinePath(this.props.course.id)}>
        <div>
          <h2>{this.props.course.name}</h2>
          <p>{this.props.course.description}</p>
        </div>
      </Link>
    )
  }
}

CourseCard.propTypes = {
  course: PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
}

export default CourseCard
