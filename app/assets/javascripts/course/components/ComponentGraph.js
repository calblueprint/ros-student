import React from 'react'
import _ from 'underscore'

import request from '../../shared/requests/request'
import { RailsRoutes, ReactRoutes, APIRoutes } from '../../shared/routes'
import { Images } from '../../utils/image_helpers'

class ComponentGraph extends React.Component {
  constructor(props) {
    super(props)

    this.onComponentClick = this.onComponentClick.bind(this)
  }

  isComponentEnabled(component) {
    return this.isCurrentComponent(component) || component.is_complete
  }

  isCurrentComponent(component) {
    const currentComponent = this.props.subsection.current_component
    return currentComponent && currentComponent.id == component.id
  }

  processTitle(title, componentType) {
    const maxLength = 50
    if (title.length <= maxLength) {
      return title
    }
    return title.slice(0, maxLength) + '...'
  }

  getComponentSvg(component) {
    let imageUrl
    switch (component.component_type) {
      case 0: // Slide
        imageUrl = Images.empty_basic
        break
      case 1: // Form
        imageUrl = Images.open_quiz
        break
      case 2: // Multimedia
        imageUrl = Images.open_play
        break
      default:
        imageUrl = Images.empty_basic
        break
    }

    return {
      backgroundImage: `url(${imageUrl})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: 'cover',
      opacity: this.isComponentEnabled(component) ? 1 : 0.2,
    }
  }

  getDisabledComponentStyle(component) {
    return this.isComponentEnabled(component) ? {} : { opacity: 0.2 }
  }

  getDisplayedComponentStyle(id) {
    return this.props.displayedComponent && this.props.displayedComponent.id === id ? 'active' : ''
  }

  onComponentClick(component, e) {
    e.preventDefault()

    if (!this.isComponentEnabled(component)) {
      return
    }

    this.props.callback(component.position)
  }

  renderComponentIcon(component, index) {
    return (
      <div key={component.id} className='flex'>
        {index == 0 ? '' :
          <div
            style={this.getDisabledComponentStyle(component)}
            className='component-graph-line'
          />
        }
        <div
          className={`component-icon-container ${this.getDisplayedComponentStyle(component.id)} tooltip`}
        >
          <button
            style={this.getComponentSvg(component)}
            alt='component vector image'
            className='component-icon'
            onClick={_.partial(this.onComponentClick, component)}
          />
          <span className='tooltip tooltiptext bottom'>
            {this.processTitle(component.title)}
          </span>
        </div>
      </div>
    )
  }

  renderComponents() {
    const subsection = this.props.subsection

    if (_.isEmpty(subsection)) {
      return 'No subsection selected'
    } else if (_.isEmpty(subsection.components)) {
      return 'Loading'
    } else {
      return subsection.components.map((component, index) => {
        return this.renderComponentIcon(component, index)
      })
    }
  }


  render() {
    return (
      <div className='component-graph-container'>
        {this.renderComponents()}
      </div>
    )
  }
}

export default ComponentGraph
