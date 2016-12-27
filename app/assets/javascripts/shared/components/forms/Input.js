import React, { PropTypes } from 'react'
import _ from 'underscore'

class Input extends React.Component {
  getErrorStyling(style) {
    return _.isEmpty(this.props.error) ? '' : style
  }

  renderInput() {
    return (
      <input
        className={`input ${this.getErrorStyling('error')}`}
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
          className={`
            marginTopBot-xxs ${this.getErrorStyling('input-text--error')}`
          }
        >
          {this.props.label}
        </div>
        <div className='marginTopBot-xxs'>
          {this.renderInput()}
        </div>
        <div
          className={
              `marginTopBot-xxs ${this.getErrorStyling('input-text--error')}`
          }
          >
          {this.props.error}
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
