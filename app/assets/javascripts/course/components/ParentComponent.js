import React from 'react'

import ImageComponent from './ImageComponent'
import VideoComponent from './VideoComponent'
import AudioComponent from './AudioComponent'
import FormComponent from './FormComponent'

class ParentComponent extends React.Component {

  constructor(props) {
    super(props)
  }

  onEnd() {
    console.log("finished component")
  }

  renderComponent() {
    switch(this.props.component.component_type) {
      case 0:
        return <ImageComponent audioUrl={this.props.component.audio_url} imgUrl={this.props.component.content_url} callback={this.onEnd} />
      case 1:
        return <FormComponent audioUrl={this.props.component.audio_url} formUrl={this.props.component.content_url} callback={this.onEnd} />
      case 2:
        return <VideoComponent videoUrl={this.props.component.content_url} callback={this.onEnd} />
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
