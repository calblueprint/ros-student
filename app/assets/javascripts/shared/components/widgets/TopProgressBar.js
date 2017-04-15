import React, { PropTypes } from 'react'

import ProgressBar from './ProgressBar'

class TopProgressBar extends React.Component {

  getDisplayProgress() {
    return Math.round(this.props.progress)
  }

  render() {
    return(
      <div className={this.props.className}>
          <p className="progress-bar-label">{this.getDisplayProgress()}% Complete</p>
          <ProgressBar progress={this.getDisplayProgress()} />
      </div>
    )
  }
}

TopProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
}

export default TopProgressBar
