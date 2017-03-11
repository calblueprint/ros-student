import React from 'react'
import _ from 'underscore'

import { getFlashes, observeFlashes } from '../../../utils/helpers/form_helpers'

class Flash extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      flash: {},
    }

    this.showFlashes = this.showFlashes.bind(this)

    this.observeFlashes = observeFlashes(() => {
      console.log('new flash')
      this.showFlashes()
    })
  }

  componentDidMount() {
    this.showFlashes()
  }

  componentWillUnmount() {
    this.observeFlashes.disconnect()
  }

  showFlashes() {
    this.setState({ flash: getFlashes() }, () => {
      setTimeout(() => {
        this.setState({ flash: {} })
      }, 4000)
    })
  }

  getFlashStyle() {
    return _.isEmpty(this.state.flash) ? 'hidden-input' : 'fade-in-out'
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
      <div className={`flash-container ${this.getFlashStyle()}`}>
        {this.renderFlashes()}
      </div>
    )
  }
}

export default Flash
