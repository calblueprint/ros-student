import React, { PropTypes } from 'react'

import ProgressBar from './ProgressBar'

class RightProgressBar extends React.Component {
  render() {
    return(
      <div className={this.props.className}>
        <div className="right-progress-bar-container">
          <ProgressBar progress={this.props.progress} />
          <p className="right-progress-bar-label progress-bar-label">{this.props.progress}%</p>
        </div>
      </div>
    )
  }
}

RightProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
}

export default RightProgressBar
