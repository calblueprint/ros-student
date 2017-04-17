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

  getResponseMessage() {
    if (_.isEmpty(this.props.success) && _.isEmpty(this.props.error)) {
      return ''
    }
    return (
      <div
        className={
          `marginTopBot-xxs ${this.getStyling(this.props.error, 'input-text error')}
          ${this.getStyling(this.props.success, 'input-text success')}`
        }
      >
        {!_.isEmpty(this.props.success) ? (
          this.props.success
        ) : (
          this.props.error
        )}
      </div>
    )
  }

  renderLabel() {
    return this.props.label ? (
      <div className='input-label marginTop-xs marginBot-xxs'>
        {this.props.label}
      </div>
    ) : ''
  }

  renderInput() {
    return this.props.multiline === 1 ? (
      <input
        className={`input ${this.getStyling(this.props.error, 'error')} ${this.getStyling(this.props.success, 'success')} ${this.props.style}`}
        autoComplete={this.props.autoComplete}
        type={this.props.type}
        value={this.props.value}
        name={this.props.name}
        onChange={this.props.onChange}
        placeholder={this.props.placeholder}
      />
    ) : (
      <textarea
        className={`input ${this.getStyling(this.props.error, 'error')} ${this.getStyling(this.props.success, 'success')} ${this.props.style}`}
        autoComplete={this.props.autoComplete}
        type={this.props.type}
        value={this.props.value}
        name={this.props.name}
        onChange={this.props.onChange}
        placeholder={this.props.placeholder}
        rows={this.props.multiline}
      >
      </textarea>
    )
  }

  render() {
    return (
      <div className='marginTopBot-xxs'>
        {this.renderLabel()}
        <div className='marginTopBot-xxs'>
          {this.renderInput()}
        </div>
        {this.getResponseMessage()}
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
  placeholder: PropTypes.string,
  style: PropTypes.string,
  multiline: PropTypes.number.isRequired,
}

Input.defaultProps = {
  type: 'text',
  autoComplete: true,
  value: '',
  error: '',
  success: '',
  name: '',
  style: '',
  multiline: 1,
}

export default Input
