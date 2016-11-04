import React, { PropTypes } from 'react'

class UploadInput extends React.Component {
  constructor(props) {
    super(props)

    this.setChosenFile = this.setChosenFile.bind(this)
  }

  setChosenFile(e) {
    const files = e.target.files
    if (!files || !files[0]) {
      return
    }

    // FileReader decodes into a base64 string.
    const reader = new FileReader()
    reader.onload = (file) => {
      this.props.onChange(file.target.result)
    }

    reader.readAsDataURL(files[0])
  }

  render() {
    return (
      <input
        type='file'
        onChange={this.setChosenFile}
        accept={this.props.accept}
      />
    )
  }
}

UploadInput.propTypes = {
  accept: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default UploadInput
