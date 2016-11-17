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

  renderComponentImage(type) {
    if (type == 'slide') {
      return (
        <div className='inline_block'><img className='list_image' src={Images.empty_basic} /></div>
      )
    } else if (type == 'form') {
      return (
        <div className='inline_block'><img className='list_image' src={Images.empty_quiz} /></div>
      )
    } else if (type == 'multimedia') {
      return (
        <div className='inline_block'><img className='list_image' src={Images.open_play} /></div>
      )
    }
  }

  render() {
    return (
      <div>
        <div className='flex'>
          {this.renderComponentImage(this.state.component.component_type)}
          <a target='blank' href={this.state.component.content_url}>link</a>
        </div>
      </div>
    )
  }
}

export default ComponentEdit