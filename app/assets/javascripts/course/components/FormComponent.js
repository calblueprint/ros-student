import React from 'react'
import Input from '../../shared/components/forms/Input'

class FormComponent extends React.Component {
  render() {
    return (
      <div>
        <p>This is an form component</p>
        <a href={this.props.formUrl}>form url</a>
        <iframe src={this.props.formUrl} width="760" height="500" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
        <Input name='keyword'/>
        <button onClick={this.props.onEnd}>Enable Next Button</button>
      </div>
    )
  }
}

export default FormComponent
