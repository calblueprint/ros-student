import React from 'react'

import ImageComponent from './ImageComponent'
import VideoComponent from './VideoComponent'
import AudioComponent from './AudioComponent'
import FormComponent from './FormComponent'

class ParentComponent extends React.Component {

  onEnd() {
    console.log("finished component")
  }

  renderComponent() {
    if (this.props.component == null) {
      return
    }

    switch(this.props.component.component_type) {
      case 0:
        return (
          <div>
            <ImageComponent
              audioUrl={this.props.component.audio_url}
              imgUrl={this.props.component.content_url}
              callback={this.onEnd}
            />
          </div>
        )
      case 1:
        return (
          <div>
            <FormComponent
              audioUrl={this.props.component.audio_url}
              formUrl={this.props.component.content_url}
              callback={this.onEnd}
            />
          </div>
        )
      case 2:
        return (
          <div>
            <VideoComponent
              videoUrl={this.props.component.content_url}
              callback={this.onEnd}
            />
          </div>
        )
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
