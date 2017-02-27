import React, { PropTypes } from 'react'
import _ from 'underscore'

class Input extends React.Component {
  getStyling(attr, style) {
    return _.isEmpty(attr) ? '' : style
  }

  setResponseMessage() {
    if (!_.isEmpty(this.props.success)) {
      return this.props.success
    } else if (!_.isEmpty(this.props.error)) {
      return this.props.error
    } else {
      return null
    }
  }

  renderInput() {
    return (
      <input
        className={`input ${this.getStyling(this.props.error, 'error')} ${this.getStyling(this.props.success, 'success')}`}
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
        <div
          className={
            `input-label marginTop-xs marginBot-xxs ${this.getStyling(this.props.error, 'input-text--error')}
            ${this.getStyling(this.props.success, 'input-text success')}`
          }
        >
          {this.props.label}
        </div>
        <div className='marginTopBot-xxs'>
          {this.renderInput()}
        </div>
        <div
          className={
            `marginTopBot-xs ${this.getStyling(this.props.error, 'input-text--error')}
            ${this.getStyling(this.props.success, 'input-text success')}`
          }
        >
          {this.setResponseMessage()}
        </div>
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
  success: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string
}

Input.defaultProps = {
  type: 'text',
  autoComplete: true,
  value: '',
  error: '',
  success: '',
  name: '',
}

export default Input
