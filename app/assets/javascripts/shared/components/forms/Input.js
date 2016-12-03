import React, { PropTypes } from 'react'

class Input extends React.Component {
  renderInput() {
    return (
      <input
        className='input'
        autoComplete={this.props.autoComplete}
        type={this.props.type}
        value={this.props.value}
        name={this.props.name}
        onChange={this.props.onChange}
        placeholder={this.props.placeholder}
      />
    )
  }

  render() {
    return (
      <div className='marginTopBot-xxs'>
        <div>{this.props.label}</div>
        <div>{this.renderInput()}</div>
        <div>{this.props.error}</div>
      </div>
    )
  }
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  autoComplete: PropTypes.bool,
  error: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string
}

Input.defaultProps = {
  type: 'text',
  autoComplete: true,
  value: '',
  error: '',
  name: '',
}

export default Input
