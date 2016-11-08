import React, { PropTypes } from 'react'

class ProgressBar extends React.Component {
  getProgressBarStyle() {
    return ({
      width: `${this.props.progress}%`
    })
  }

  render() {

    return(
      <div className={this.props.className}>
          <p className="progress-bar-label">{this.props.progress}% Complete</p>
          <div className="progress-bar-background">
            <div className="progress-bar" style={this.getProgressBarStyle()}></div>
          </div>
          <script>
            document.getElementById('progress').style.width = {this.props.progress} + "%";
          </script>
      </div>
    )
  }
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
}

export default ProgressBar
