import React from 'react'

class FormComponent extends React.Component {
  render() {
    return (
      <div>
        <p>This is an form component</p>
        <a href={this.props.formUrl}>form url</a>
        <iframe src={this.props.formUrl} width="760" height="500" frameBorder="0" marginHeight="0" marginWidth="0">Loading...</iframe>
      </div>
    )
  }
}

export default FormComponent
