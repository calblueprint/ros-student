import React from 'react'

import Input from './Input'

class InlineEditInput extends React.Component {
  constructor(props) {
    super(props)

    this.enableEdit = this.enableEdit.bind(this)
    this.onBlur = this.onBlur.bind(this)
    console.log(props)
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
        onBlur={this.onBlur} />
    )
  }

  renderValue() {
    return (
      <div>
        <button onClick={this.enableEdit}>Click</button>
        <p>{this.props.value}</p>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.state.editable ?
          this.renderInput() :
          this.renderValue()}
      </div>
    )
  }
}

InlineEditInput.defaultProps = {
  value: '',
}

export default InlineEditInput
