import React from 'react'

class CourseCard extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.course.name}</h2>
        <h3>{this.props.course.description}</h3>
      </div>
    )
  }
}

export default CourseCard
