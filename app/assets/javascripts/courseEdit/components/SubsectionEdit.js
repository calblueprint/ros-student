import React from 'react'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'

import ComponentEdit from './ComponentEdit'
import InlineEditInput from '../../shared/components/forms/InlineEditInput'
import AddComponentForm from './AddComponentForm'
import InlineEditInput from '../../shared/components/forms/InlineEditInput'
import AddComponentForm from './AddComponentForm'

class SubsectionEdit extends React.Component {
  constructor(props) {
    super(props)
    this.id = this.props.subsection.id
    this.state = {
      loaded: false,
      subsection: this.props.subsection,
      components: this.props.subsection.components,
      newComponentForm: false,
      loaded: false,
      subsection: this.props.subsection,
      components: this.props.subsection.components,
      newComponentForm: false
      loaded: false,
      subsection: this.props.subsection,
      components: this.props.subsection.components,
      newComponentForm: false
    }
    this.deleteSubsection = this.deleteSubsection.bind(this)
    this.onFormCompletion = this.onFormCompletion.bind(this)
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

  showNewComponentForm() {
    if (this.state.newComponentForm == false) {
      this.setState({ newComponentForm: true })
    }
  }

  renderComponentForm() {
    if (this.state.newComponentForm == true) {
      return (
          <AddComponentForm subsectionId={this.id} onFormCompletion={this.onFormCompletion.bind(this)} />
      )
    }
  }

  onFormCompletion(newComponent) {
    const components = this.state.components
    components.push(newComponent.component)
    this.setState({ components: components })
  }

  render() {
    return (
      <div>
        <h2>
          <InlineEditInput value={this.state.subsection.title} onBlur={this.onBlurTitle.bind(this)} />
        </h2>
        <ul>{this.renderComponents()}</ul>
        <button onClick={this.showNewComponentForm.bind(this)}>Add component</button>
        <button onClick={this.deleteSubsection}>Delete subsection</button>
        <div>{this.renderComponentForm()}</div>
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
