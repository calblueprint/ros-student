import React from 'react'
import Input from '../../shared/components/forms/Input'

class FormComponent extends React.Component {
  render() {
    return (
      <div>
        <p>This is an form component</p>
        <a href={this.props.formUrl}>form url</a>
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScs6BR2CcmlwVEp_ksgtlUq-ukBOmuSI5_qBcK2vNfpsO_CyQ/viewform?embedded=true" width="760" height="500" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
        <Input name='keyword'/>
      </div>
    )
  }
}

export default FormComponent
