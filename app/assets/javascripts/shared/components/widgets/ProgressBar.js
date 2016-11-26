import React, { PropTypes } from 'react'

class ProgressBar extends React.Component {
  getProgressBarStyle() {
    return ({
      width: `${this.props.progress}%`
    })
  }

  render() {
    return(
      <div className="progress-bar-background">
        <div className="progress-bar" style={this.getProgressBarStyle()}></div>
      </div>
    )
  }
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
}

export default ProgressBar
