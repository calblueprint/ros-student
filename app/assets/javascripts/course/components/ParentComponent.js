import React from 'react'

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
          <div className='outer-component-container'>
            <ImageComponent
              audioUrl={this.props.component.audio_url}
              imgUrl={this.props.component.content_url}
              onEnd={this.props.onEnd}
            />
          </div>
        )
      case 1:
        return (
          <div className='outer-component-container'>
            <FormComponent
              component={this.props.component}
              onEnd={this.props.onEnd}
            />
          </div>
        )
      case 2:
        return (
          <div className='outer-component-container'>
            <VideoComponent
              videoUrl={this.props.component.content_url}
              isComplete={this.props.component.is_complete}
              onEnd={this.props.onEnd}
            />
          </div>
        )
    }
  }

  render() {
    return (
      <div className='parent-component-container flex flex-vertical flex-grow'>
        <h1 className='subsection-title-container'>{this.props.component.title}</h1>
        {this.renderComponent()}
      </div>
    )
  }
}

export default ParentComponent
