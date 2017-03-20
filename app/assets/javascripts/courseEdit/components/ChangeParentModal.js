import _ from 'underscore'
import React, { PropTypes } from 'react'
import Modal from 'react-bootstrap-modal'

import request from '../../shared/requests/request'

import { APIRoutes } from '../../shared/routes'
import { Images } from '../../utils/helpers/image_helpers'

import SimpleModal from '../../shared/components/widgets/SimpleModal'

class ChangeParentModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sections: this.props.course.sections,
      subsections: this.props.selectedSection.subsections,
      selectedSection: this.props.selectedSection,
      selectedSubsection: this.props.selectedSubsection,
    }

    this.handleSectionSelect = this.handleSectionSelect.bind(this)
    this.handleSubsectionSelect = this.handleSubsectionSelect.bind(this)
  }

  updateSubsections(sectionPosition) {
    const subsections = this.state.sections[sectionPosition - 1]

    this.setState({ subsections: subsections })
  }

  getDropdownStyle() {
    return {
      backgroundImage: `url(${Images.dropdown_arrow})`,
    }
  }

  handleSectionSelect(e) {
    if (e.target.value != -1) {
      this.updateSubsections(e.target.value)
      this.setState({ selectedSection: this.state.sections[e.target.value - 1] })
    } else {
      this.setState({
        selectedSection: null,
        selectedSubsection: null,
        subsections: [],
      })
    }
  }

  handleSubsectionSelect(e) {
    this.setState({ selectedSubsection: this.state.subsections[e.target.value - 1] })
  }

  submitIsDisabled() {
    return this.props.objectType == 'component' ?
      (this.state.selectedSection == null || this.state.selectedSubsection == null) :
      this.state.selectedSection == null
  }

  renderSelectOptions(list) {
    return list.map((obj) => {
      return (
        <option key={obj.id} value={obj.position}>
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
            this.state.selectedSection.position,
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
            this.state.selectedSection.position,
            this.handleSectionSelect,
            'Select a section',
            this.state.sections,
          )}
          {this.renderSelect(
            this.state.selectedSubsection.position,
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
  course: PropTypes.object.isRequired,
  moveItem: PropTypes.func.isRequired,
  selectedSection: PropTypes.object.isRequired,
  selectedSubsection: PropTypes.object,
}

export default ChangeParentModal
