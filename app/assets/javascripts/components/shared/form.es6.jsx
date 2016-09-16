class Form extends React.Component {
  render () {
    return (
      <form
        className={this.props.className}
        id={this.props.id}
        action={this.props.action}
        method={this.props.method}
        acceptCharset='UTF-8'>

        <input type='hidden' name='utf8' value='&#x2713;' />

        <input
          type='hidden'
          name={FormHelpers.getCSRFFieldName()}
          value={FormHelpers.getCSRFToken()} />

        {this.props.children}
      </form>
    )
  }
}

Form.defaultProps = {
  class: '',
  id: '',
  action: 'post',
  method: ''
}
