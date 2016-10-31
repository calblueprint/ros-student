import React from 'react'

import CourseSidebar from './CourseSidebar'
import ParentComponent from './ParentComponent'
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
<<<<<<< cff884485c4178f4567da40c4f529f9fc41add75
        <ParentComponent component={this.component_params}/>
        <CourseSidebar id={this.props.routeParams.id}/>
=======
        <CourseSidebar id={2} callback={this.changeSubsectionDisplayed.bind(this)}/>
>>>>>>> fixed graph bug
        <ComponentGraph id={this.state.subsection_displayed} />
      </div>
    )
  }
}

export default CoursePage
