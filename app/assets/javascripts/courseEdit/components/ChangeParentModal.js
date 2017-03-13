import _ from 'underscore'
import React, { PropTypes } from 'react'
import Modal from 'react-bootstrap-modal'

import request from '../../shared/requests/request'

import { APIRoutes } from '../../shared/routes'
import { Images } from '../../utils/image_helpers'

import SimpleModal from '../../shared/components/widgets/SimpleModal'

class ChangeParentModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sections: [],
      subsections: [],
      selectedSection: -1,
      selectedSubsection: -1,
    }

    this.getSections()

    this.handleSectionSelect = this.handleSectionSelect.bind(this)
    this.handleSubsectionSelect = this.handleSubsectionSelect.bind(this)
  }

  getSections() {
    const path = APIRoutes.getSectionsPath(this.props.courseId)

    request.get(path, (response) => {
      this.setState({ sections: response.sections })
    }, (error) => {
      console.log('error')
    })
  }

  getSubsections(sectionId) {
    const path = APIRoutes.getSubsectionsPath(sectionId)

    request.get(path, (response) => {
      this.setState({ subsections: response.subsections })
    }, (error) => {
      console.log('error')
    })
  }

  getDropdownStyle() {
    return {
      backgroundImage: `url(${Images.dropdown_arrow})`,
    }
  }

  handleSectionSelect(e) {
    if (e.target.value != -1) {
      this.getSubsections(e.target.value)
      this.setState({ selectedSection: e.target.value })
    } else {
      this.setState({
        selectedSection: -1,
        selectedSubsection: -1,
        subsections: [],
      })
    }
  }

  handleSubsectionSelect(e) {
    this.setState({ selectedSubsection: e.target.value })
  }

  submitIsDisabled() {
    return this.props.objectType == 'component' ?
      this.state.selectedSection == -1 || this.state.selectedSubsection == -1 :
      this.state.selectedSection == -1
  }

  renderSelectOptions(list) {
    return list.map((obj) => {
      return (
        <option key={obj.id} value={obj.id}>
          {obj.title}
        </option>
      )
    })
  }

  renderSelect(defaultValue, handle, label, list) {
    return (
      <select
        style={this.getDropdownStyle()}
        className='select marginTopBot-sm'
        defaultValue={defaultValue}
        onChange={handle}>
        <option value={-1}>
          {label}
        </option>
        {this.renderSelectOptions(list)}
      </select>
    )
  }

  renderDropdowns() {
    if (this.props.objectType === 'subsection') {
      return (
        <div className='flex flex-vertical'>
          {this.renderSelect(
            this.state.selectedSection,
            this.handleSectionSelect,
            'Select a section',
            this.state.sections
          )}
        </div>
      )
    } else {
      return (
        <div className='flex flex-vertical'>
          {this.renderSelect(
            this.state.selectedSection,
            this.handleSectionSelect,
            'Select a section',
            this.state.sections,
          )}
          {this.renderSelect(
            this.state.selectedSubsection,
            this.handleSubsectionSelect,
            'Select a subsection',
            this.state.subsections,
          )}
        </div>
      )
    }
  }

  render() {
    return (
      <SimpleModal
        title={`Move ${this.props.objectType}`}
        isModalOpen={this.props.isChangeOpen}
        closeModal={this.props.closeModal}
      >
        <div>
          {this.renderDropdowns()}
          <button
            className='button marginTop-xs'
            onClick={_.partial(
              this.props.moveItem,
              this.state.selectedSection,
              this.state.selectedSubsection,
            )}
            disabled={this.submitIsDisabled()}
          >
          Move {this.props.objectType}
          </button>
        </div>
      </SimpleModal>
    )
  }
}

ChangeParentModal.propTypes = {
  isChangeOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  objectType: PropTypes.string.isRequired,
  courseId: PropTypes.number.isRequired,
  moveItem: PropTypes.func.isRequired,
}

export default ChangeParentModal
