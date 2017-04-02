import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import chaiEnzyme from 'chai-enzyme'

import { mount, shallow } from 'enzyme'
import chai, { expect } from 'chai'

chai.use(chaiEnzyme())
chai.use(sinonChai)

import ImageComponent from '../../../../app/assets/javascripts/course/components/ImageComponent'

describe('<ImageComponent />', () => {
  const imageUrl = 'https://ros-staging.s3.amazonaws.com/uploads/photo/image/31/slide-presentation-guidelines-1-728.jpg'

  const audioUrl = 'https://ros-staging.s3.amazonaws.com/uploads/component/audio/34/tA74TtoPrkEQ-F8diXHD.mp3'

  it('renders correctly', () => {
    const onEndStub = sinon.stub()
    const imageComponent = mount(
      <ImageComponent
        imgUrl={imageUrl}
        onEnd={onEndStub}
        audioUrl={null}
        selfPaced={false}
      />
    )

    expect(imageComponent.find('.image')).to.have.length(1)
    expect(imageComponent.find('.image')).to.have.attr('src', imageUrl)

    expect(imageComponent.find('#audio-component')).to.have.length(0)

    // AudioComponent should not render if not self paced
    const imageComponent2 = mount(
      <ImageComponent
        imgUrl={imageUrl}
        onEnd={onEndStub}
        audioUrl={audioUrl}
        selfPaced={false}
      />
    )

    expect(imageComponent2.find('#audio-component')).to.have.length(0)

    // AudioComponent should not render if audioUrl is not provided
    const imageComponent3 = mount(
      <ImageComponent
        imgUrl={imageUrl}
        onEnd={onEndStub}
        audioUrl={null}
        selfPaced={true}
      />
    )

    expect(imageComponent3.find('#audio-component')).to.have.length(0)

    /**
     * AudioComponent should only render if audioUrl is provided and
     * the course is taken self paced
     */
    const imageComponent4 = mount(
      <ImageComponent
        imgUrl={imageUrl}
        onEnd={onEndStub}
        audioUrl={audioUrl}
        selfPaced={true}
      />
    )

    expect(imageComponent4.find('#audio-component')).to.have.length(1)
  })
})
