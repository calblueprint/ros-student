import React, { PropTypes } from 'react'

import ProgressBar from './ProgressBar'

class TopProgressBar extends React.Component {
  render() {
    return(
      <div className={this.props.className}>
          <p className="progress-bar-label">{this.props.progress}% Complete</p>
          <ProgressBar progress={this.props.progress} />
      </div>
    )
  }
}

TopProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
}

export default TopProgressBar
