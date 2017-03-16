import React, { PropTypes } from 'react'

import { Images } from '../../../utils/helpers/image_helpers'

import Input from './Input'

class InlineEditInput extends React.Component {
  constructor(props) {
    super(props)

    this.enableEdit = this.enableEdit.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.state = {
      editable: false,
    }

    this.onKeyPress = this.onKeyPress.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  enableEdit() {
    this.setState({ editable: true })
  }

  setValue(value) {
    this.setState({ editable: false })
    this.props.onBlur(value)
  }

  onBlur(e) {
    this.setValue(e.target.value || this.props.value)
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.onBlur(e)
    }
  }

  onKeyDown(e) {
    if (e.keyCode === 27) {
      this.setValue(this.props.value)
    }
  }

  renderInput() {
    return (
      <input
        autoFocus
        className='flex inline-edit-input inline-edit-container'
        defaultValue={this.props.value}
        onBlur={this.onBlur}
        onKeyPress={this.onKeyPress}
        onKeyDown={this.onKeyDown}
      />
    )
  }

  renderValue() {
    return (
      <div className='flex vertical inline-edit-container'>
        <span className='inline-edit-value marginRight-sm'>
          {this.props.value}
        </span>
        <button id='inline-edit-button' className={this.props.buttonStyle} onClick={this.enableEdit}>
          <i className='fa fa-pencil fa-fw' aria-hidden='true'></i>
        </button>
      </div>
    )
  }

  render() {
    return (
      <div className='flex vertical inline-edit'>
        {this.state.editable ?
          this.renderInput() :
          this.renderValue()}
      </div>
    )
  }
}

InlineEditInput.propTypes = {
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

InlineEditInput.defaultProps = {
  value: '',
  buttonStyle: 'button button--sm'
}

export default InlineEditInput
