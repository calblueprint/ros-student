import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import _ from 'underscore'

import { mount, shallow } from 'enzyme'
import chai, { expect } from 'chai'

chai.use(sinonChai);

import FormComponent from '../../../../app/assets/javascripts/course/components/FormComponent'

describe('<FormComponent />', () => {
  const KEY = 'thisisakey'
  const component = {
    form_key: KEY,
    content_url: 'www.google.com',
  }

  it('should load the component properly', () => {
    const formComponent = mount(<FormComponent component={component}/>)

    expect(formComponent.state().formCode).to.equal('');
    expect(formComponent.state().error).to.equal('');

    expect(formComponent.find('iframe')).to.have.length(1);
    expect(formComponent.find('button')).to.have.length(1);
    expect(formComponent.find('input')).to.have.length(1);
  })

  it('should callback if key is entered correctly', () => {
    const onEndStub = sinon.spy()
    const formComponent = mount(
      <FormComponent
        component={component}
        onEnd={onEndStub}
      />
    )

    const input = formComponent.find('input')
    input.simulate('change', { target: { value: KEY } })

    const button = formComponent.find('button')
    button.simulate('click')

    expect(onEndStub).to.have.been.calledOnce
  })

  it('should not callback if key is entered incorrectly', () => {
    const onEndStub = sinon.spy()
    const formComponent = mount(
      <FormComponent
        component={component}
        onEnd={onEndStub}
      />
    )

    const input = formComponent.find('input')
    input.simulate('change', { target: { value: 'KEY' } })

    const button = formComponent.find('button')
    button.simulate('click')

    expect(onEndStub).to.not.have.been.called
    expect(!_.isEmpty(formComponent.state().error)).to.be.true
  })
})
