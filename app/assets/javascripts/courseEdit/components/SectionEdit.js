import React from 'react'
import Collapse from 'react-collapse'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'

import SubsectionEdit from './SubsectionEdit'
import InlineEditInput from '../../shared/components/forms/InlineEditInput'
import { Images } from '../../utils/image_helpers'

class SectionEdit extends React.Component {
  constructor(props) {
    super(props)
    this.id = this.props.section.id
    this.state = {
      loaded: false,
      section: this.props.section,
      isOpen: true,
    }

    this.createSubsection = this.createSubsection.bind(this)
    this.deleteSubsection = this.deleteSubsection.bind(this)
    this.deleteSection = this.deleteSection.bind(this)
    this.toggleSubsections = this.toggleSubsections.bind(this)
    this.onBlurTitle = this.onBlurTitle.bind(this)
  }

  // componentWillReceiveProps(nextProps) {
  //   if (!this.state.loaded) {
  //     this.setState({ section: nextProps.section, loaded: true })
  //   }
  // }

  createSubsection() {
    const path = APIRoutes.createSubsectionPath(this.id)

    request.post(path, {}, (response) => {
      const section = this.state.section
      section.subsections.push(response.subsection)
      this.setState({ section: section })
    }, (error) => {
      console.log(error)
    })
  }

  updateTitle(params) {
    const path = APIRoutes.editSectionPath(this.state.section.id)
    request.update(path, params, (response) => {
      const section = this.state.section
      section.title = response.section.title
      this.setState({ section: section })
    }, (error) => {
      console.log(error)
    })
  }

  deleteSubsection(id) {
    const path = APIRoutes.editSubsectionPath(id)

    request.delete(path, (response) => {
      const section = this.state.section
      section.subsections = response.subsections
      this.setState({ section: section })
    }, (error) => {
      console.log(error)
    })
  }

  deleteSection() {
    this.props.deleteSection(this.props.section.id)
  }

  onBlurTitle(value) {
    const params = {
      section: {
        title: value,
      }
    }
    this.updateTitle(params)
  }

  toggleSubsections() {
    const isOpen = this.state.isOpen
    this.setState({ isOpen: !isOpen })
  }

  renderSubsections() {
    if (!this.state.section.subsections) {
      return (
        <div>No subsections to show!</div>
      )
    } else {
      return this.state.section.subsections.map((value) => {
        return (
          <div className='edit-subsection' key={value.id}>
            <SubsectionEdit subsection={value} deleteSubsection={this.deleteSubsection} />
          </div>
        )
      })
    }
  }

  render() {
    return (
      <div className='white-box'>
        <div className='h2'>
          <img
            className='list-image'
            src={Images.dropdown_arrow}
            onClick={this.toggleSubsections}
          />
          <InlineEditInput className='inline-block' value={this.state.section.title} onBlur={this.onBlurTitle} />
          <button className='button' onClick={this.deleteSection}>Delete section</button>
        </div>
        <Collapse isOpened={this.state.isOpen}>
          <div>{this.renderSubsections()}</div>
          <button className='button button--white edit-subsection' onClick={this.createSubsection}>
            <div className='flex center'>
              <div className='inline-block'><img className='list-image' src={Images.empty_plus} /></div>
              <div className='inline-block'>Add new subsection</div>
            </div>
          </button>
        </Collapse>
      </div>
    )
  }
}

// SectionEdit.defaultProps = {
//   section: {
//     title: '',
//     subsections: [],
//   }
// }

export default SectionEdit
