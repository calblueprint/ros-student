import React from 'react'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'

import ComponentEdit from './ComponentEdit'
import InlineEditInput from '../../shared/components/forms/InlineEditInput'
import AddComponentForm from './AddComponentForm'
import { Images } from '../../utils/image_helpers'

class SubsectionEdit extends React.Component {
  constructor(props) {
    super(props)
    this.id = this.props.subsection.id
    this.state = {
      loaded: false,
      subsection: this.props.subsection,
      components: this.props.subsection.components,
      newComponentForm: false,
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
        <div className='edit-component'>No components to show!</div>
      )
    } else {
      return this.state.subsection.components.map((value) => {
        return (
          <div className='edit-component' key={value.id}>
            <ComponentEdit component={value} />
          </div>
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
        <AddComponentForm subsectionId={this.id} callback={this.onFormCompletion} />
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
        <div className='h3'>
          <div className='inline-block'><img className='list-image' src={Images.dropdown_arrow} /></div>
          <InlineEditInput value={this.state.subsection.title} onBlur={this.onBlurTitle.bind(this)} />
          <button className='button' onClick={this.deleteSubsection}>Delete subsection</button>
        </div>
        <div>{this.renderComponents()}</div>
        <button className='button button--white edit-component' onClick={this.showNewComponentForm.bind(this)}>
          <div className='flex'>
            <div className='inline-block'><img className='list-image' src={Images.empty_plus} /></div>
            <div className='inline-block'>Add new component</div>
          </div>
        </button>
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
