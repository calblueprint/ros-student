import React, { PropTypes } from 'react'
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
import { Images } from '../../utils/helpers/image_helpers'

import DeleteModal from '../../shared/components/widgets/DeleteModal'
import ChangeParentModal from './ChangeParentModal'

const ComponentHandle = SortableHandle(() => {
  return(
    <img
      className='course-edit-component-handle'
      alt='handle'
      src={Images.drag_handle}
    />
  )
})

const ComponentItem = SortableElement(({ value, deleteComponent, updateMoveComponent, course, section, subsection }) => {
  return (
    <div className='flex vertical' key={value.id}>
      <ComponentHandle />
      <ComponentEdit
        component={value}
        deleteComponent={deleteComponent}
        updateMoveComponent={updateMoveComponent}
        course={course}
        section={section}
        subsection={subsection}
      />
    </div>
  )
})

const ComponentList = SortableContainer(({ items, deleteComponent, updateMoveComponent, course, section, subsection }) => {
  return (
    <div>
      {
        items.map((value, index) => {
          return <ComponentItem
            key={`component-${index}-${value.id}`}
            index={index}
            value={value}
            deleteComponent={deleteComponent}
            updateMoveComponent={updateMoveComponent}
            course={course}
            section={section}
            subsection={subsection}
          />
        })
      }
    </div>
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
      openParentModal: false,
      subsection: this.props.subsection,
    }

    this.deleteSubsection = this.deleteSubsection.bind(this)
    this.deleteComponent = this.deleteComponent.bind(this)
    this.onFormCompletion = this.onFormCompletion.bind(this)
    this.toggleComponents = this.toggleComponents.bind(this)
    this.onBlurTitle      = this.onBlurTitle.bind(this)
    this.closeNewComponentForm = this.closeNewComponentForm.bind(this)
    this.showNewComponentForm = this.showNewComponentForm.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
    this.closeDeleteModal = this.closeDeleteModal.bind(this)
    this.openParentModal = this.openParentModal.bind(this)
    this.closeParentModal = this.closeParentModal.bind(this)
    this.moveSubsection = this.moveSubsection.bind(this)

    this.onSortEnd = this.onSortEnd.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ subsection: nextProps.subsection })
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

  deleteComponent(id, index) {
    const path = APIRoutes.editComponentPath(id)

    request.delete(path, (response) => {
      const subsection = this.state.subsection
      subsection.components.splice(index, 1)
      subsection.components.map((value, index) => {
        value.position = index + 1
      })
      this.setState({ subsection: subsection })
    }, (error) => {
      console.log(error)
    })
  }

  deleteSubsection() {
    this.props.deleteSubsection(this.state.subsection.id, this.state.subsection.position - 1)
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
          updateMoveComponent={this.props.updateMoveComponent}
          onSortEnd={this.onSortEnd}
          course={this.props.course}
          section={this.props.section}
          subsection={this.state.subsection}
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

  openDeleteModal(e) {
    e.preventDefault()
    this.setState({ openDeleteModal: true })
  }

  closeDeleteModal(e) {
    if (!_.isUndefined(e)) {
      e.preventDefault()
    }

    this.setState({ openDeleteModal: false })
  }

  openParentModal(e) {
    e.preventDefault()
    this.setState({ openParentModal: true })
  }

  closeParentModal(e) {
    if (!_.isUndefined(e)) {
      e.preventDefault()
    }

    this.setState({ openParentModal: false })
  }

  moveSubsection(section) {
    const path = APIRoutes.switchSectionPath(this.state.subsection.id)
    const params = {
      subsection: {
        id: this.state.subsection.id,
        section_id: section.id,
      }
    }

    request.update(path, params, (response) => {
      this.props.updateMoveSubsection(
        response,
        this.props.section.position - 1,
        this.state.subsection.position - 1,
        section.position - 1,
      )
    }, (error) => {
      console.log(error)
    })
  }

  onSortEnd({ oldIndex, newIndex }) {
    const component = this.state.subsection.components[oldIndex]
    if (oldIndex == newIndex || !component) {
      return
    }

    const path = APIRoutes.reorderComponentPath(component.id)
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
    const arrow = this.state.isOpen ? 'rotate' : ''

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
              buttonStyle='button button--sm-sq button--white'
            />
          </div>
          <div className='flex course-edit-button-container'>
            <div className='tooltip course-edit-move'>
              <button
                className='button button--sm button--white'
                onClick={this.openParentModal}>
                <span
                  className='tooltip tooltiptext top'>
                  Move subsection
                </span>
                <i className='fa fa-arrows-alt course-image-icon' aria-hidden='true'></i>
              </button>
            </div>
            <button
              className='button button--sm button--white'
              onClick={this.openDeleteModal}>
              <i className='fa fa-trash fa-fw course-image-icon' aria-hidden='true'></i>
            </button>
          </div>
          <DeleteModal
            openDeleteModal={this.state.openDeleteModal}
            closeModal={this.closeDeleteModal}
            deleteFunction={this.deleteSubsection}
            objectType="subsection"
          />

          <ChangeParentModal
            isChangeOpen={this.state.openParentModal}
            closeModal={this.closeParentModal}
            objectType='subsection'
            course={this.props.course}
            moveItem={this.moveSubsection}
            selectedSection={this.props.section}
            selectedSubsection={null}
          />
        </div>

        <Collapse isOpened={this.state.isOpen}>
          <div>{this.renderComponents()}</div>
          <AddComponentForm
            openComponentForm={this.state.openAddModal}
            closeModal={this.closeNewComponentForm}
            subsectionId={this.state.subsection.id}
            callback={this.onFormCompletion}
          />
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

SubsectionEdit.propTypes = {
  subsection: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  updateMoveComponent: PropTypes.func.isRequired,
  section: PropTypes.object.isRequired,
}

export default SubsectionEdit
