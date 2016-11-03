import React from 'react'

import CourseSidebar from './CourseSidebar'
import ParentComponent from './ParentComponent'


class CoursePage extends React.Component {

  constructor(props) {
    super(props)

    this.component_params =  {type: 2, audio_url:'http://www.stephaniequinn.com/Music/Allegro%20from%20Duet%20in%20C%20Major.mp3', content_url: "ffDPTKn7HiY"}
  }

  render() {
    return (
      <div>
        <h1>This is a course page</h1>
        <ParentComponent component={this.component_params}/>
        <CourseSidebar id={this.props.routeParams.id}/>
      </div>
    )
  }
}

export default CoursePage
