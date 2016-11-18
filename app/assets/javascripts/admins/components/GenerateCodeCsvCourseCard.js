import React from 'react'

class GenerateCodeCsvCourseCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: false
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ selected: !this.state.selected})
    this.props.updateActive(this.props.course)
  }

  render() {
    return (
      <div
        className={`flex generate-code-csv-course-card ${this.state.selected ? ' active' : ''}`}
        onClick={this.handleClick}
      >
          <h2 className='generate-code-csv-course-text'>{this.props.course.name}</h2>
      </div>
    )
  }
}

export default GenerateCodeCsvCourseCard
