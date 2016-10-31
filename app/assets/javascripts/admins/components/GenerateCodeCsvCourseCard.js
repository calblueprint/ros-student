import React from 'react'

class GenerateCodeCsvCourseCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selected: false }
  }

  render() {
    return (
      <div>
        <h2>{this.props.course.name}</h2>
      </div>
    )
  }
}

export default GenerateCodeCsvCourseCard
