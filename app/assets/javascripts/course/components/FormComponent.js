import React from 'react'

class FormComponent extends React.Component {

  constructor(props) {
    super(props)

    this.formUrl = this.props.form_url
  }

  render() {
    return (
      <div>
        <p>This is an form component</p>
        <a href={this.formUrl}>form url</a>
        <iframe src={this.formUrl} width="760" height="500" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
      </div>
    )
  }
}

export default FormComponent
