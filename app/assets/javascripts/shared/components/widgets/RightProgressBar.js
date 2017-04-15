import React, { PropTypes } from 'react'

import ProgressBar from './ProgressBar'

class RightProgressBar extends React.Component {

  getDisplayProgress() {
    return Math.round(this.props.progress)
  }

  render() {
    return(
      <div className={this.props.className}>
        <div className="right-progress-bar-container">
          <ProgressBar progress={this.getDisplayProgress()} />
          <p className="right-progress-bar-label progress-bar-label">{this.getDisplayProgress()}%</p>
        </div>
      </div>
    )
  }
}

RightProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
}

export default RightProgressBar
