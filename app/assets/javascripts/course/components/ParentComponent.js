import React from 'react'

import ImageComponent from './ImageComponent'
import VideoComponent from './VideoComponent'
import AudioComponent from './AudioComponent'
import FormComponent from './FormComponent'

class ParentComponent extends React.Component {

  constructor(props) {
    super(props)

    this.type = this.props.component.type
    this.contentUrl = this.props.component.content_url
    this.audioUrl = this.props.component.audio_url
  }

  onEnd() {
    console.log("finished component")
  }

  renderComponent() {
    switch(this.type) {
      case 0:
        return <ImageComponent audioUrl={this.audioUrl} imgUrl={this.contentUrl} callback={this.onEnd} />
        break;
      case 1:
        return <FormComponent audioUrl={this.audioUrl} formUrl={this.contentUrl} callback={this.onEnd} />
        break;
      case 2:
        return <VideoComponent videoUrl={this.contentUrl} callback={this.onEnd} />
        break;
    }
  }

  render() {
    return (
      <div>
        {this.renderComponent()}
      </div>
    )
  }
}

export default ParentComponent
