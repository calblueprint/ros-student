import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import chaiEnzyme from 'chai-enzyme'

import { mount, shallow } from 'enzyme'
import chai, { expect } from 'chai'

chai.use(chaiEnzyme())
chai.use(sinonChai)

import AudioComponent from '../../../../app/assets/javascripts/course/components/AudioComponent'

describe('<AudioComponent />', () => {
  const audioUrl = 'https://ros-staging.s3.amazonaws.com/uploads/component/audio/34/tA74TtoPrkEQ-F8diXHD.mp3'

  it('should render correctly', () => {
    const audioStub = sinon.stub()
    const audioComponent = mount(
      <AudioComponent
        audioUrl={audioUrl}
        callback={audioStub}
        selfPaced={false}
      />
    )

    expect(audioComponent.find('#audio-component')).to.have.length(1)
    expect(audioComponent.state().playing).to.be.false

    // Shouldn't render unless there is an audioUrl
    const audioComponent2 = mount(
      <AudioComponent
        audioUrl={null}
        callback={audioStub}
        selfPaced={false}
      />
    )

    expect(audioComponent2.find('#audio-component')).to.have.length(0)
  })

  it('should invoke callback onEnd', () => {
    const audioStub = sinon.stub()
    const audioComponent = mount(
      <AudioComponent
        audioUrl={audioUrl}
        callback={audioStub}
        selfPaced={false}
      />
    )

    audioComponent.instance().setState({ playing: true})
    expect(audioComponent.state().playing).to.be.true

    audioComponent.instance().onEnd()
    expect(audioComponent.state().playing).to.be.false
    expect(audioStub).to.have.been.calledOnce
  })
})
