import React from 'react'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'

import SubsectionEdit from './SubsectionEdit'

class SectionEdit extends React.Component {
  constructor(props) {
    super(props)
    this.id = this.props.section.id
    this.state = {
      subsections: this.props.section.subsections,
      loaded: false
    }

    this.createSubsection = this.createSubsection.bind(this)
    this.deleteSubsection = this.deleteSubsection.bind(this)
    this.deleteSection = this.deleteSection.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.loaded) {
      this.setState({ subsections: nextProps.section.subsections, loaded:true })
    }
  }

  createSubsection() {
    const path = APIRoutes.createSubsectionPath(this.id)

    request.post(path, {}, (response) => {
      const subsections = this.state.subsections
      subsections.push(response.subsection)
      this.setState({ subsections: subsections })
    }, (error) => {
      console.log(error)
    })
  }

  deleteSubsection(id) {
    const path = APIRoutes.editSubsectionPath(id)

    request.delete(path, (response) => {
      this.setState({ subsections: response.subsections })
    }, (error) => {
      console.log(error)
    })
  }

  deleteSection() {
    this.props.deleteSection(this.props.section.id)
  }

  renderSubsections() {
    if (!this.state.subsections) {
      return (
        <li>No subsections to show!</li>
      )
    } else {
      return this.state.subsections.map((value) => {
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
        <h1>Section: {this.props.section.title}</h1>
        <ul>{this.renderSubsections()}</ul>
        <button onClick={this.createSubsection}>Add subsection</button>
        <button onClick={this.deleteSection}>Delete section</button>
      </div>
    )
  }
}

SectionEdit.defaultProps = {
  section: {
    subsections: [],
  },
}

export default SectionEdit
