import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import { ReactRoutes } from '../../shared/routes'
import { Images } from '../../utils/image_helpers'

class AdminCourseCard extends React.Component {
  render() {
    return (
      <a href={this.props.route} data-method='get'>
        <div className="card">
          <img className="card-img-container" src={Images.doge}/>
          <h2 className="card-title">{this.props.course.name}</h2>
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
