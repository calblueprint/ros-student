import React, { PropTypes } from 'react'

import ImageComponent from './ImageComponent'
import VideoComponent from './VideoComponent'
import AudioComponent from './AudioComponent'
import FormComponent from './FormComponent'

class ParentComponent extends React.Component {

  renderComponent() {
    if (this.props.component == null) {
      return
    }

    switch(this.props.component.component_type) {
      case 0:
        return (
          <ImageComponent
            canSeek={this.props.component.is_complete}
            audioUrl={this.props.component.audio_url}
            imgUrl={this.props.component.content_url}
            onEnd={this.props.onEnd}
            selfPaced={this.props.selfPaced}
          />
        )
      case 1:
        return (
          <FormComponent
            component={this.props.component}
            audioUrl={this.props.component.audio_url}
            onEnd={this.props.onEnd}
            selfPaced={this.props.selfPaced}
          />
        )
      case 2:
        return (
          <VideoComponent
            videoUrl={this.props.component.content_url}
            audioUrl={this.props.component.audio_url}
            canSeek={this.props.component.is_complete}
            onEnd={this.props.onEnd}
            selfPaced={this.props.selfPaced}
          />
        )
    }
  }

  render() {
    return (
      <div className='parent-component-container flex flex-vertical center'>
        <h1
          className='subsection-title-container marginTopBot-sm'>
          {this.props.component.title}
        </h1>
        {this.renderComponent()}
      </div>
    )
  }
}

ParentComponent.propTypes = {
  component: PropTypes.object.isRequired,
  subsection: PropTypes.object.isRequired,
  onEnd: PropTypes.func.isRequired,
  selfPaced: PropTypes.bool.isRequired,
  audioUrl: PropTypes.string,
}

export default ParentComponent
