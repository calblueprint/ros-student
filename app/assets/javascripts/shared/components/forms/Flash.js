import React from 'react'
import _ from 'underscore'

import { getFlashes } from '../../../utils/form_helpers'

class Flash extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      flash: getFlashes(),
    }
  }

  renderFlashes() {
    return _.keys(this.state.flash).map((key) => {
      return (
        <div
          key={key}
          className={`marginTopBot-xxs flash ${key}`}
        >
          <h3 className={`flash-text`}>
            {this.state.flash[key]}
          </h3>
        </div>
      )
    })
  }

  render() {
    return (
      <div className='fill'>{this.renderFlashes()}</div>
    )
  }
}

export default Flash
