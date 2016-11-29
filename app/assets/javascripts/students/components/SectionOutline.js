import _ from 'underscore'

import React from 'react'
import { Link } from 'react-router'
import Collapse from 'react-collapse'

import { getUser } from '../../utils/user_helpers'
import { RailsRoutes, ReactRoutes } from '../../shared/routes'
import { APIRoutes } from '../../shared/routes'
import SubsectionOutline from './SubsectionOutline'
import RightProgressBar from '../../shared/components/widgets/RightProgressBar'
import { Images } from '../../utils/image_helpers'

class SectionOutline extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpen: true,
      dropdownImgState: 180,
    }

    this.toggleSubsections = this.toggleSubsections.bind(this)
  }

  getDropdownStyle() {
    return ({
      transform: `rotate(${this.state.dropdownImgState}deg)`
    })
  }

  toggleSubsections() {
    const isOpen = this.state.isOpen
    const dropdownImgState = (this.state.dropdownImgState + 180) % 360

    this.setState({
      isOpen: !isOpen,
      dropdownImgState: dropdownImgState,
    })
  }

  renderSubsections() {
    return this.props.section.subsections.map((value) => {
      return <SubsectionOutline key={value.id} subsection={value} />
    })
  }

  render() {
    return (
      <div className="section-outline-container" onClick={this.toggleSubsections}>
        <div className="section-outline-header flex">
          <h2 className="section-outline-header-title">{this.props.section.title}</h2>
          <div className="section-outline-header-right flex">
            <RightProgressBar
              className="section-outline-header-bar"
              progress={this.props.section.progress}
            />
            <img
              className="section-outline-dropdown"
              src={Images.dropdown_arrow}
              style={this.getDropdownStyle()}
            />
          </div>
        </div>
        <Collapse isOpened={this.state.isOpen}>
          <ul className="section-outline-subsections">{this.renderSubsections()}</ul>
        </Collapse>
      </div>
    )
  }
}

export default SectionOutline
