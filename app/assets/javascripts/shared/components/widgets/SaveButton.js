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
    this.props.onPress(event, this.endSave, this.showError)
  }

  render() {
    <button onClick={this.handlePress}>

    </button>

  }
}

SaveButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  onSave: PropTypes.func,
}

export default SaveButton
