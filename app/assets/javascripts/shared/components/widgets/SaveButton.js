/**
 * Button used for form/task submissions that typically use API requests, has
 * different states showing when request was successful or errored, and disables
 * pointer events when processing requests to prevent duplicate requests.
 *
 * @prop text         - text string to be displayed in button
 * @prop onPress      - handler function called when button pressed (see PropTypes below)
 * @prop type         - optional type argument to button (like 'submit')
 * @prop loadingText  - optional text to display when button is processing
 * @prop successText  - optional text to display when request is successful
 * @prop errorText    - optional text to display when request fails
 */

import _ from 'underscore'
import React, { PropTypes } from 'react'

class SaveButton extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      currentAction: null
    }
    this.handlePress = this.handlePress.bind(this)
    this.resetState = this.resetState.bind(this)
    this.startSave = this.startSave.bind(this)
    this.endSave = this.endSave.bind(this)
    this.showError = this.showError.bind(this)
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }

  resetState() {
    this.setState({ currentAction: null })
  }

  startSave() {
    this.setState({ currentAction: 'save' })
  }

  endSave() {
    this.setState({ currentAction: 'success' })
    this.timer = setTimeout(this.resetState, 2000);
  }

  showError(error) {
    this.setState({ currentAction: 'error' })
    this.timer = setTimeout(this.resetState, 2000);
  }

  handlePress(event) {
    this.startSave()
    this.props.onPress(event, this.endSave, this.showError)
  }

  getStyle() {
    switch (this.state.currentAction) {
      case 'save':
        return 'button disabled'
      case 'success':
        return 'button button--green save-button-disabled'
      case 'error':
        return 'button button--red save-button-disabled'
      default:
        return 'button'
    }
  }

  getIcon() {
    switch (this.state.currentAction) {
      case 'save':
        return (
          <i className='fa fa-spinner fa-pulse save-button-icon'></i>
        )
      case 'success':
        return (
          <i className='fa fa-check save-button-icon'></i>
        )
      case 'error':
        return (
          <i className='fa fa-times save-button-icon'></i>
        )
      default:
        return null
    }
  }

  getText() {
    switch (this.state.currentAction) {
      case 'save':
        return (
          <span>{this.props.loadingText || 'Saving...'}</span>
        )
      case 'success':
        return (
          <span>{this.props.successText || 'Success!'}</span>
        )
      case 'error':
        return (
          <span>{this.props.errorText || 'Error'}</span>
        )
      default:
        return (
          <span>{this.props.text}</span>
        )
    }
  }

  render() {
    return (
      <button
        onClick={this.handlePress}
        className={`${this.getStyle()} ${this.props.className}`}
        type={this.props.type}
      >
        {this.getIcon()}
        {this.getText()}
      </button>
    )
  }
}

/* NOTE:
 * onPress must be a handler function with three arguments:
 *   - event: DOM event object
 *   - success: callback to be executed upon success
 *   - error: callback to be executed upon error
 */
SaveButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  type: PropTypes.string,
  loadingText: PropTypes.string,
  successText: PropTypes.string,
  errorText: PropTypes.string,
}

export default SaveButton
