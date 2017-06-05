/**
 * Card on admin dashboard contained within AdminCourseList that is asociated
 * with a course that the admin can then click to enter the respective course
 * edit page. Contains basic info such as a title and the cover picture for the
 * course.
 *
 * @prop course     - course object associated with this card, must have fields
 *                    of `id` and `name` in order to render the card
 * @prop route      - string containing the route to the course edit page associated
 *                    with this card
 */

import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import { ReactRoutes } from '../../shared/routes'
import { Images } from '../../utils/helpers/image_helpers'

import Image from '../../shared/components/widgets/Image'

class AdminCourseCard extends React.Component {

  getImgStyle() {
    const image_url = this.props.course.image_url ?
      this.props.course.image_url :
      Images.doge

    return image_url
  }

  getPublishText(course) {
    return course.is_published ? (
      <div className='card-publish-text-box'>
        <i className='fa fa-bookmark' aria-hidden='true'></i>
        <span className='card-publish-text'>published</span>
      </div>
    ) : (
      <div className='card-publish-text-box'>
        <i className='fa fa-wrench' aria-hidden='true'></i>
        <span className='card-publish-text'>draft</span>
      </div>
    )
  }

  render() {
    return (
      <a
        className='card-column card-link'
        href={this.props.route}
        data-method='get'
      >
        <div className='card'>
          <div className='card-img-container'>
            <Image src={this.getImgStyle()} />
          </div>
          <h2 className='card-title'>
            {this.props.course.name}
          </h2>
          {this.getPublishText(this.props.course)}
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
