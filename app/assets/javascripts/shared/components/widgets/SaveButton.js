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

  showError() {
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
        return 'button'
      case 'success':
        return 'button button--green'
      case 'error':
        return 'button'
      default:
        return 'button'
    }
  }

  getIcon() {
    switch (this.state.currentAction) {
      case 'save':
        return (
          <i className='fa fa-spinner fa-pulse fa-fw save-button-icon'></i>
        )
      case 'success':
        return (
          <i className='fa fa-check fa-fw save-button-icon'></i>
        )
      case 'error':
        return (
          <i className='fa fa-times fa-fw save-button-icon'></i>
        )
      default:
        return null
    }
  }

  getText() {
    return this.state.currentAction === 'save' ? (
      <span>Saving...</span>
    ) : (
      <span>{this.props.text}</span>
    )
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
  onSave: PropTypes.func,
  type: PropTypes.string,
}

export default SaveButton
