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
      return this.props.subsection.components.map((value) => {
        return (
          <span
            key={value.id}
            onClick={_.partial(this.props.callback, value.id)}
          >
            <img
              src={this.getComponentSvg(value.component_type)}
              alt='component vector image'
              className='component-icon'
            />
          </span>
        )
      })
    }
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
      <div>
        <div>{this.renderComponents()}</div>
      </div>
    )
  }
}

export default ComponentGraph
