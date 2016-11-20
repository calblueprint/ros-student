import React from 'react'

import { Images } from '../../utils/image_helpers'

class ComponentEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      component: this.props.component,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ component: nextProps.component })
  }

  renderComponentImage() {
    switch(this.state.component.component_type) {
      case 1:
        // slide
        return (
          <div className='inline-block'><img className='list-image' src={Images.empty_basic} /></div>
        )
      case 2:
        // form
        return (
          <div className='inline-block'><img className='list-image' src={Images.open_quiz} /></div>
        )
      default:
        // multimedia
        return (
          <div className='inline-block'><img className='list-image' src={Images.open_play} /></div>
        )
    }
  }

  render() {
    return (
      <div>
        <div className='flex'>
          {this.renderComponentImage()}
          <a target='blank' href={this.state.component.content_url}>{this.state.component.component_type}</a>
        </div>
      </div>
    )
  }
}

export default ComponentEdit