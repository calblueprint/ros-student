import React from 'react'
import Input from '../../shared/components/forms/Input'

class FormComponent extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      formCode: '',
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
    } else {
      this.setState({
        error: 'Code entered is invalid'
      })
    }
  }

  render() {
    return (
      <div className='form-component-container'>
        <div className='form'>
          <iframe src={this.props.component.content_url} width="100%" height="100%" frameBorder="0" marginHeight="0" marginWidth="0">
            Loading...
          </iframe>
        </div>
        <div className='keyword-container'>
          <Input
            value={this.state.formCode}
            placeholder='Enter your form completion code here!'
            name='keyword'
            onChange={this.updateCodeState}
          />
          <div className='button-container'>
            <button
              className='button'
              onClick={this.formSubmit}>
              Submit Keyword
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default FormComponent
