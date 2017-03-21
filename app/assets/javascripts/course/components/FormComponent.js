import React, { PropTypes } from 'react'
import Input from '../../shared/components/forms/Input'
import AudioComponent from './AudioComponent'

class FormComponent extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      formCode: '',
      error: '',
      success: '',
    }

    this.updateCodeState = this.updateCodeState.bind(this)
    this.formSubmit = this.formSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.component != nextProps.component) {
      this.setState({
        formCode: '',
        error: '',
        success: '',
      })
    }
  }

  updateCodeState(e) {
    this.setState({
      formCode: e.target.value
    })
  }

  formSubmit() {
    if (this.state.formCode == this.props.component.form_key) {
      this.props.onEnd()
      this.setState({
        success: 'Success! Press next to continue.',
      })
    } else {
      this.setState({
        error: 'The secret key entered is invalid'
      })
    }
  }

  render() {
    return (
      <div className='form-component-container'>
        <iframe
          className='form-iframe'
          src={this.props.component.content_url}
        >
          Loading...
        </iframe>
        <div className='flex submit-container marginTopBot-sm'>
          <div className='keyword-container'>
            <Input
              name='keyword'
              placeholder='Enter your secret key here.'
              value={this.state.formCode}
              error={this.state.error}
              success={this.state.success}
              onChange={this.updateCodeState}
            />
          </div>
          <div>
            <button
              className='button marginTopBot-xxs'
              onClick={this.formSubmit}>
              Submit
            </button>
          </div>
        </div>
        <AudioComponent
          audioUrl={this.props.audioUrl}
          callback={this.props.onEnd}
          canSeek={this.props.canSeek}
          selfPaced={this.props.selfPaced}
        />
      </div>
    )
  }
}

FormComponent.propTypes = {
  onEnd: PropTypes.func.isRequired,
  audioUrl: PropTypes.string,
}

export default FormComponent
