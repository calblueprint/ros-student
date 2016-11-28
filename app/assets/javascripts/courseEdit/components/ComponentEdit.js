import React from 'react'

import { Images } from '../../utils/image_helpers'

class ComponentEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      component: this.props.component,
    }
    this.id = this.props.component.id
    this.deleteComponent = this.deleteComponent.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ component: nextProps.component })
  }

  renderComponentImage() {
    switch(this.state.component.component_type) {
      case 1:
        // slide
        return (
          <div className='inline-block'><img className='course-image-icon margin' src={Images.empty_basic} /></div>
        )
      case 2:
        // form
        return (
          <div className='inline-block'><img className='course-image-icon margin' src={Images.open_quiz} /></div>
        )
      default:
        // multimedia
        return (
          <div className='inline-block'><img className='course-image-icon margin' src={Images.open_play} /></div>
        )
    }
  }

  deleteComponent() {
    this.props.deleteComponent(this.id)
  }

  render() {
    return (
      <div>
        <div className='flex'>
          {this.renderComponentImage()}
          <a target='blank' href={this.state.component.content_url}>{this.state.component.title}</a>
          <button className='button' onClick={this.deleteComponent}>Delete component</button>
        </div>
      </div>
    )
  }
}

export default ComponentEdit
