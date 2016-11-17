import React, { PropTypes } from 'react'

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
        defaultValue={this.props.value}
        onBlur={this.onBlur}
      />
    )
  }

  renderValue() {
    return (
      <div>
        <div className='inline_block'>{this.props.value}</div>
        <button className='button' onClick={this.enableEdit}>Edit</button>
      </div>
    )
  }

  render() {
    return (
      <div className='inline_block'>
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
}

export default InlineEditInput
