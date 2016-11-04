import React from 'react'

class FormComponent extends React.Component {

  render() {
    return (
      <div>
        <p>This is an form component</p>
        <a href={this.props.form_url}>form url</a>
        <iframe src={this.props.form_url} width="760" height="500" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
      </div>
    )
  }
}

export default FormComponent
