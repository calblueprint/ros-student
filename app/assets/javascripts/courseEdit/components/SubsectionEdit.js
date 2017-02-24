import React from 'react'
import Collapse from 'react-collapse'
import _ from 'underscore'
import update from 'immutability-helper'

import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'

import ComponentEdit from './ComponentEdit'
import InlineEditInput from '../../shared/components/forms/InlineEditInput'
import AddComponentForm from './AddComponentForm'
import { Images } from '../../utils/image_helpers'

import DeleteModal from '../../shared/components/widgets/DeleteModal'

const ComponentHandle = SortableHandle(() => {
  return(
    <img
      className='course-edit-component-handle'
      alt='handle'
      src={Images.drag_handle}
    />
  )
})

const ComponentItem = SortableElement(({ value, deleteComponent, isSorting }) => {
  return (
    <div className='edit-section' key={value.id}>
      <div className='flex vertical course-edit-component' key={value.id}>
        <ComponentHandle />
        <ComponentEdit component={value} deleteComponent={deleteComponent}/>
      </div>
    </div>
  )
})

const ComponentList = SortableContainer(({ items, deleteComponent, isSorting }) => {
  return (
    <ul>
      {
        items.map((value, index) => {
          return <ComponentItem
            key={`component-${index}`}
            index={index}
            value={value}
            deleteComponent={deleteComponent}
            isSorting={isSorting}
          />
        })
      }
    </ul>
  )
})

class SubsectionEdit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: true,
      loaded: false,
      openAddModal: false,
      openDeleteModal: false,
      subsection: this.props.subsection,
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

    this.onSortEnd = this.onSortEnd.bind(this)
  }

  updateTitle(params) {
    const path = APIRoutes.editSubsectionPath(this.state.subsection.id)
    request.update(path, params, (response) => {
      const subsection = this.state.subsection
      subsection.title = response.title
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
    this.props.deleteSubsection(this.state.subsection.id)
  }

  renderComponents() {
    if (!this.state.subsection.components) {
      return (
        <div className='course-edit-component'>No components to show!</div>
      )
    } else {
      return (
        <ComponentList
          items={this.state.subsection.components}
          useDragHandle
          useWindowAsScrollContainer
          lockAxis='y'

          deleteComponent={this.deleteComponent}
          onSortEnd={this.onSortEnd}
        />
      )
    }
  }

  showNewComponentForm() {
    this.setState({ openAddModal: true })
  }

  closeNewComponentForm() {
    this.setState({ openAddModal: false })
  }

  onFormCompletion(newComponent) {
    this.setState({ subsection: update(this.state.subsection, {
      components: { $push: [newComponent] },
    })})
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

  onSortEnd({ oldIndex, newIndex }) {
    const component = this.state.subsection.components[oldIndex]
    if (oldIndex == newIndex || !component) {
      return
    }
    console.log('switching')
    console.log(oldIndex)
    console.log(newIndex)
    const path = APIRoutes.switchComponentPath(component.id)
    const params = {
      component: {
        position: newIndex + 1,
      }
    }

    const components = this.state.subsection.components

    this.setState({ subsection: update(this.state.subsection, {
      components: { $set: arrayMove(components, oldIndex, newIndex) },
    })})

    request.post(path, params, (response) => {
    }, (error) => {
      console.log(error)

      this.setState({ subsection: update(this.state.subsection, {
        components: { $set: arrayMove(components, newIndex, oldIndex) },
      })})
    })
  }

  render() {
    const arrow = this.state.isOpen ? '' : 'rotate'

    return (
      <div>
        <div className='flex vertical h3'>
          <img
            className={`course-image-icon margin collapse ${arrow}`}
            src={Images.dropdown_arrow}
            onClick={this.toggleComponents}
          />
          <div className='course-edit-inline-edit'>
            <InlineEditInput
              value={this.state.subsection.title}
              onBlur={this.onBlurTitle}
              buttonStyle='button button--sm button--white'
            />
          </div>
          <button
            className='button button--sm button--white course-edit-delete'
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
            subsectionId={this.state.subsection.id}
            callback={this.onFormCompletion} />
          <button
            className='button button--white add-component-button'
            onClick={this.showNewComponentForm}
          >
            <div className='flex vertical'>
              <img className='course-image-icon margin' src={Images.empty_plus} />
              <p>Add new component</p>
            </div>
          </button>
        </Collapse>
      </div>
    )
  }
}

export default SubsectionEdit
