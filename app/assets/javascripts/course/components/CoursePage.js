import React from 'react'

import CourseSidebar from './CourseSidebar'
import ComponentGraph from './ComponentGraph'

class CoursePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = { subsection_displayed: 31 }
  }

  changeSubsectionDisplayed(id) {
    this.setState({ subsection_displayed: id})
  }

  render() {
    return (
      <div>
        <h1>This is a course page</h1>
        <CourseSidebar id={this.props.id} callback={this.changeSubsectionDisplayed.bind(this)}/>
        <ComponentGraph id={this.state.subsection_displayed} />
      </div>
    )
  }
}

export default CoursePage
