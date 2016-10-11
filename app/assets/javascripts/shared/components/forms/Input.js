import React, { PropTypes } from 'react'

class Input extends React.Component {
  renderInput() {
    return (
      <input
        autoComplete={this.props.autoComplete}
        type={this.props.type}
        value={this.props.value}
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
}

Input.defaultProps = {
  type: 'text',
  autoComplete: true,
  error: '',
}

export default Input
