import React from 'react'
import Collapse from 'react-collapse'
import _ from 'underscore'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'

import ComponentEdit from './ComponentEdit'
import InlineEditInput from '../../shared/components/forms/InlineEditInput'
import AddComponentForm from './AddComponentForm'
import { Images } from '../../utils/image_helpers'

import DeleteModal from './DeleteModal'

class SubsectionEdit extends React.Component {
  constructor(props) {
    super(props)
    this.id = this.props.subsection.id
    this.state = {
      loaded: false,
      subsection: this.props.subsection,
      components: this.props.subsection.components,
      openAddModal: false,
      isOpen: true,
      openDeleteModal: false,
    }

    this.deleteSubsection = this.deleteSubsection.bind(this)
    this.deleteComponent = this.deleteComponent.bind(this)
    this.onFormCompletion = this.onFormCompletion.bind(this)
    this.toggleComponents = this.toggleComponents.bind(this)
    this.onBlurTitle      = this.onBlurTitle.bind(this)
    this.closeNewComponentForm = this.closeNewComponentForm.bind(this)
    this.showNewComponentForm = this.showNewComponentForm.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
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

  deleteComponent(id) {
    const path = APIRoutes.editComponentPath(id)

    request.delete(path, (response) => {
      const subsection = this.state.subsection
      subsection.components = response.components
      this.setState({ subsection: subsection })
    }, (error) => {
      console.log(error)
    })
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
            <ComponentEdit component={value} deleteComponent={this.deleteComponent}/>
          </div>
        )
      })
    }
  }

  showNewComponentForm() {
    this.setState({ openAddModal: true })
  }

  closeNewComponentForm() {
    this.setState({ openAddModal: false })
  }

  onFormCompletion(newComponent) {
    const components = this.state.components
    components.push(newComponent.component)
    this.setState({ components: components })
    this.closeNewComponentForm()
  }

  toggleComponents() {
    const isOpen = this.state.isOpen
    this.setState({ isOpen: !isOpen })
  }

  openModal(e) {
    e.preventDefault()
    this.setState({ openDeleteModal: true })
  }

  closeModal(e) {
    if (!_.isUndefined(e)) {
      e.preventDefault()
    }

    this.setState({ openDeleteModal: false })
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
            onClick={this.openModal}>
            <img
              className='course-image-icon'
              src={Images.delete} />
          </button>
          <DeleteModal
            openDeleteModal={this.state.openDeleteModal}
            closeModal={this.closeModal}
            deleteFunction={this.deleteSubsection}
            objectType="subsection"
          />
        </div>

        <Collapse isOpened={this.state.isOpen}>
          <div>{this.renderComponents()}</div>
          <AddComponentForm
            openComponentForm={this.state.openAddModal}
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
