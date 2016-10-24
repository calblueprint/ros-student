import React from 'react'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'

import SubsectionEdit from './SubsectionEdit'

class SectionEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subsections: this.props.section.subsections,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ subsections: nextProps.section.subsections })
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
            <SubsectionEdit subsection={value} />
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
