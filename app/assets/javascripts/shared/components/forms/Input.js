import React, { PropTypes } from 'react'

class Input extends React.Component {
  renderInput() {
    return (
      <input
        autoComplete={this.props.autoComplete}
        type={this.props.type}
        value={this.props.value}
        name={this.props.name}
        onChange={this.props.onChange} />
    )
  }

  render() {
    return (
      <div>
        {this.props.label}
        {this.renderInput()}
        {this.props.error}
      </div>
    )
  }
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  autoComplete: PropTypes.bool,
  error: PropTypes.string,
  name: PropTypes.string
}

Input.defaultProps = {
  type: 'text',
  autoComplete: true,
  value: '',
  error: '',
  name: '',
}

export default Input
