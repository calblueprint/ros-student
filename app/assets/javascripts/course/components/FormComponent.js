import React from 'react'
import Input from '../../shared/components/forms/Input'

class FormComponent extends React.Component {
  render() {
    return (
      <div className='form-component-container'>
        <div className='form'><iframe src={this.props.formUrl} width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe></div>
        <div className='keyword-container'>
          <Input name='keyword'/>
          <div className='button-container'><button className='button' onClick={this.props.onEnd}>Submit Keyword</button></div>
        </div>
      </div>
    )
  }
}

export default FormComponent
