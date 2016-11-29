import React from 'react'
import Collapse from 'react-collapse'

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
      openEditModal: false,
      isOpen: true,
    }

    this.deleteSubsection = this.deleteSubsection.bind(this)
    this.onFormCompletion = this.onFormCompletion.bind(this)
    this.toggleComponents = this.toggleComponents.bind(this)
    this.onBlurTitle      = this.onBlurTitle.bind(this)
    this.closeNewComponentForm = this.closeNewComponentForm.bind(this)
    this.showNewComponentForm = this.showNewComponentForm.bind(this)
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
    this.setState({ openEditModal: true })
  }

  closeNewComponentForm() {
    this.setState({ openEditModal: false })
  }

  onFormCompletion(newComponent) {
    const components = this.state.components
    components.push(newComponent.component)
    this.setState({ components: components })
  }

  toggleComponents() {
    const isOpen = this.state.isOpen
    this.setState({ isOpen: !isOpen })
  }

  render() {
    return (
      <div>
        <div className='flex vertical course-edit-container h3'>
          <img
            className='course-image-icon margin'
            src={Images.dropdown_arrow}
            onClick={this.toggleComponents}
          />
          <div className='course-edit-inline-edit'>
            <InlineEditInput
              value={this.state.subsection.title}
              onBlur={this.onBlurTitle}
            />
          </div>
          <button
            className='button button--sm flex course-edit-delete'
            onClick={this.deleteSubsection}>
            <img
              className='course-image-icon'
              src={Images.delete} />
          </button>
        </div>

        <Collapse isOpened={this.state.isOpen}>
          <div>{this.renderComponents()}</div>
          <AddComponentForm
            openEditModal={this.state.openEditModal}
            closeModal={this.closeNewComponentForm}
            subsectionId={this.id}
            callback={this.onFormCompletion} />
          <button className='button button--white edit-component' onClick={this.showNewComponentForm}>
            <div className='flex'>
              <div className='inline-block'><img className='course-image-icon margin' src={Images.empty_plus} /></div>
              <div className='inline-block'>Add new component</div>
            </div>
          </button>
        </Collapse>
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
