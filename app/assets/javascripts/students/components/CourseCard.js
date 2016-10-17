import React from 'react'

class CourseCard extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.course.name}</h2>
        <p>{this.props.course.description}</p>
      </div>
    )
  }
}

export default CourseCard
