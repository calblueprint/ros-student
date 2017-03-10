import _ from 'underscore'
import React, { PropTypes } from 'react'

class SaveButton extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      isSaving: false,
      error: false,
    }

    this.handlePress = this.handlePress.bind(this)
    this.startSave = this.startSave.bind(this)
    this.endSave = this.endSave.bind(this)
  }

  startSave() {
    this.setState({ isSaving: true })
  }

  endSave() {
    this.setState({ isSaving: false})
  }

  showError() {
    this.setState({ error: true })
  }

  handlePress(event) {
    this.startSave()
    this.props.onPress(event, this.endSave, this.showError)
  }

  getStyle() {
    return this.state.isSaving ? 'button' : 'button'
  }

  getSpinner() {
    return this.state.isSaving ? (
      <i className='fa fa-spinner fa-pulse fa-fw'></i>
    ) : null
  }

  render() {
    return (
      <button
        onClick={this.handlePress}
        className={this.getStyle()}
      >
        {this.getSpinner()}
        <span>{this.props.text}</span>
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
}

export default SaveButton
