import React from 'react'

class GenerateCodeCsvCourseCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.getStyle = this.getStyle.bind(this);
  }

  handleClick() {
    this.setState({ selected: !this.state.selected})
    this.props.updateActive(this.props.course)
  }

  getStyle() {
    return this.state.selected == true ? this.activeStyle() : this.inactiveStyle()
  }

  activeStyle() {
    return {
      color: 'blue',
      fontSize: '48px'
    }
  }

  inactiveStyle() {
    return {
      color: 'black',
      fontSize: '24px'
    }
  }

  render() {
    return (
      <div>
        <h2 style={this.getStyle()} onClick={this.handleClick}>{this.props.course.name}</h2>
      </div>
    )
  }
}

export default GenerateCodeCsvCourseCard
