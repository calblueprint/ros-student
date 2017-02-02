import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import chaiEnzyme from 'chai-enzyme'

import { mount, shallow } from 'enzyme'
import chai, { expect } from 'chai'

chai.use(chaiEnzyme())
chai.use(sinonChai)

import VideoComponent from '../../../../app/assets/javascripts/course/components/VideoComponent'

describe('<VideoComponent />', () => {

  const videoUrl = 'https://www.youtube.com/watch?v=AGLFV1RNOcU'

  it('renders correctly', () => {
    const onEndStub = sinon.stub()

    const videoComponent = mount(
      <VideoComponent
        onEnd={onEndStub}
        videoUrl={videoUrl}
      />
    )
  })
})
