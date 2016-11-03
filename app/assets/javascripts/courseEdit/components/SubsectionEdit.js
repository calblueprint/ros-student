import React from 'react'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'

import ComponentEdit from './ComponentEdit'
import InlineEditInput from '../../shared/components/forms/InlineEditInput'

class SubsectionEdit extends React.Component {
  constructor(props) {
    super(props)
    this.id = this.props.subsection.id
    this.state = {
      loaded: false,
      subsection: this.props.subsection,
    }
    this.deleteSubsection = this.deleteSubsection.bind(this)
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(this.state.loaded)
  //   if (!this.state.loaded) {
  //     this.setState({ subsection: nextProps.subsection, loaded: true })
  //   }
  // }

  updateTitle(params) {
    const path = APIRoutes.editSubsectionPath(this.state.subsection.id)
    request.update(path, params, (response) => {
      const subsection = this.state.subsection
      subsection.title = response.subsection.title
      this.setState({ subsection: subsection })
    }, (error) => {
      console.log(error)
    })
  }

  onBlurTitle(value) {
    const params = { 
      subsection: {
        title: value,
      }
    }
    this.updateTitle(params)
  }

  deleteSubsection() {
    this.props.deleteSubsection(this.id)
  }

  renderComponents() {
    if (!this.state.subsection.components) {
      return (
        <li>No components to show!</li>
      )
    } else {
      return this.state.subsection.components.map((value) => {
        return (
          <li key={value.id}>
            <ComponentEdit component={value} />
          </li>
        )
      })
    }
  }

  render() {
    return (
      <div>
        <h2>
          <InlineEditInput value={this.state.subsection.title} onBlur={this.onBlurTitle.bind(this)} />
        </h2>
        <ul>{this.renderComponents()}</ul>
        <button onClick={this.deleteSubsection}>Delete subsection</button>
      </div>
    )
  }
}

// SubsectionEdit.defaultProps = {
//   subsection: {
//     title: '',
//     components: [],
//   }
// }

export default SubsectionEdit
