import React from 'react'
import _ from 'underscore'

import request from '../../shared/requests/request'
import { RailsRoutes, ReactRoutes, APIRoutes } from '../../shared/routes'
import { Images } from '../../utils/image_helpers'

class ComponentGraph extends React.Component {
  injectGraphLines(components) {
    var finalGraph = _.flatten(components.map((component, index) => {
      return [
        component,
        <div key={`${index}-line`} className='component-graph-line'></div>
      ]
    }))
    finalGraph.pop()
    return finalGraph
  }

  processTitle(title, componentType) {
    if (title === undefined || title === null) {
      switch (componentType) {
        case 0:
          return 'slide'
        case 1:
          return 'form'
        case 2:
          return 'multimedia'
        default:
          return 'component'
      }
    }
    const maxLength = 50
    if (title.length <= maxLength) {
      return title
    }
    return title.slice(0, maxLength) + '...'
  }

  getComponentSvg(componentType) {
    switch (componentType) {
      case 0: // Slide
        return Images.empty_basic
      case 1: // Form
        return Images.open_quiz
      case 2: // Multimedia
        return Images.open_play
      default:
        return Images.empty_basic
    }
  }

  getDisplayedComponentStyle(id) {
    return this.props.displayedComponentId === id ? 'active' : ''
  }

  renderComponents() {
    if (_.isEmpty(this.props.subsection)) {
      return 'No subsection selected'
    } else if (_.isEmpty(this.props.subsection.components)) {
      return 'Loading'
    } else {
      return this.injectGraphLines(this.props.subsection.components.map((value) => {
        return (
          <div
            key={value.id}
            onClick={_.partial(this.props.callback, value.id)}
            className={`component-icon-container ${this.getDisplayedComponentStyle(value.id)} tooltip`}
          >
            <img
              src={this.getComponentSvg(value.component_type)}
              alt='component vector image'
              className='component-icon'
            />
            <span className='tooltip tooltiptext bottom'>{this.processTitle(value.title)}</span>
          </div>
        )
      }))
    }
  }


  render() {
    return (
      <div className='component-graph-container'>{this.renderComponents()}</div>
    )
  }
}

export default ComponentGraph
