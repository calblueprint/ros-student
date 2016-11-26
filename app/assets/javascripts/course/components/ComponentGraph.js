import React from 'react'
import _ from 'underscore'

import request from '../../shared/requests/request'
import { RailsRoutes, ReactRoutes, APIRoutes } from '../../shared/routes'
import { Images } from '../../utils/image_helpers'

class ComponentGraph extends React.Component {

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
            className='component-icon-container'
          >
            <img
              src={this.getComponentSvg(value.component_type)}
              alt='component vector image'
              className='component-icon'
            />
          </div>
        )
      }))
    }
  }

  injectGraphLines(components) {
    var finalGraph = _.flatten(components.map((component) => {
      return [
        component,
        <div className='component-graph-line'></div>
      ]
    }))
    finalGraph.pop()
    return finalGraph
  }

  getComponentSvg(componentType) {
    switch (componentType) {
      case 0: // Slide
        return Images.empty_basic
      case 1: // Form
        return Images.open_quiz
      case 2: // multimedia
        return Images.open_play
      default:
        return Images.empty_basic
    }
  }

  render() {
    return (
      <div className='component-graph-container'>{this.renderComponents()}</div>
    )
  }
}

export default ComponentGraph
