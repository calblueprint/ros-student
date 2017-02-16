import React from 'react'
import Input from '../../shared/components/forms/Input'

class FormComponent extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      formCode: '',
      error: ''
    }

    this.updateCodeState = this.updateCodeState.bind(this)
    this.formSubmit = this.formSubmit.bind(this)
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
        error: 'Next button enabled'
      })
    } else {
      this.setState({
        error: 'Code entered is invalid'
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
        <div className='flex vertical marginTopBot-sm'>
          <div className='keyword-container'>
            <Input
              name='keyword'
              placeholder='Enter your form completion code here.'
              value={this.state.formCode}
              error={this.state.error}
              onChange={this.updateCodeState}
            />
          </div>
          <button
            className='button'
            onClick={this.formSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    )
  }
}

export default FormComponent
