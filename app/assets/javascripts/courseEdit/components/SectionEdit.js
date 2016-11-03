import React from 'react'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'

import SubsectionEdit from './SubsectionEdit'
import InlineEditInput from '../../shared/components/forms/InlineEditInput'

class SectionEdit extends React.Component {
  constructor(props) {
    super(props)
    this.id = this.props.section.id
    this.state = {
      loaded: false,
      section: this.props.section
    }

    this.createSubsection = this.createSubsection.bind(this)
    this.deleteSubsection = this.deleteSubsection.bind(this)
    this.deleteSection = this.deleteSection.bind(this)
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

  renderSubsections() {
    if (!this.state.section.subsections) {
      return (
        <li>No subsections to show!</li>
      )
    } else {
      return this.state.section.subsections.map((value) => {
        return (
          <li key={value.id}>
            <SubsectionEdit subsection={value} deleteSubsection={this.deleteSubsection} />
          </li>
        )
      })
    }
  }

  render() {
    return (
      <div>
        <h2>
          <InlineEditInput value={this.state.section.title} onBlur={this.onBlurTitle.bind(this)} />
        </h2>
        <ul>{this.renderSubsections()}</ul>
        <button onClick={this.createSubsection}>Add subsection</button>
        <button onClick={this.deleteSection}>Delete section</button>
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
