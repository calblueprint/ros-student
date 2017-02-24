import React from 'react'

import { observeFlashes } from '../../utils/helpers/form_helpers'

class Toast extends React.Component {
  constructor(props) {
    super(props)

    this.showFlashes = this.showFlashes.bind(this)

    this.observeFlashes = observeFlashes(this.showFlashes)
  }

  showFlashes() {

  }

  render() {

  }
}

export default Toast
