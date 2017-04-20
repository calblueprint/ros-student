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
  }

  enableEdit() {
    this.setState({ editable: true })
  }

  onBlur(e) {
    this.setState({ editable: false })
    const value = e.target.value || this.props.value
    this.props.onBlur(value)
  }

  renderInput() {
    return (
      <input
        autoFocus
        className='flex inline-edit-input inline-edit-container'
        defaultValue={this.props.value}
        onBlur={this.onBlur}
      />
    )
  }

  renderValue() {
    return (
      <div className='flex'>
        <div className='inline-edit-value marginRight-sm'>
          {this.props.value}
        </div>
        <div className='flex vertical'>
          <button className={`${this.props.buttonStyle} tooltip marginLeft-sm`} onClick={this.enableEdit}>
            <i className='fa fa-pencil fa-fw inline-edit-icon' aria-hidden='true'></i>
            <span
              className='tooltiptext top'>
              Edit text
            </span>
          </button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className='flex vertical inline-edit inline-edit-container'>
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
