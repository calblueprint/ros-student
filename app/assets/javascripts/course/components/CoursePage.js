import React from 'react'

import request from '../../shared/requests/request'

import CourseSidebar from './CourseSidebar'
import ParentComponent from './ParentComponent'

import { APIRoutes } from '../../shared/routes'


class CoursePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      displayed_subsection: null,
      displayed_component: {}
    }

    this.changeDisplayedSubsection = this.changeDisplayedSubsection.bind(this)
  }

  changeDisplayedSubsection(id) {
    const path = APIRoutes.getSubsection(id)

    request.get(path, (response) => {
      this.setState({ displayed_component: response.subsection.components[0]})
      this.setState({ displayed_subsection: response.subsection })
    }, (error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <div>
        <h1>This is a course page</h1>
        <ParentComponent component={this.state.displayed_component}/>
        <CourseSidebar id={this.props.routeParams.id} callback={this.changeDisplayedSubsection}/>
      </div>
    )
  }
}

export default CoursePage
