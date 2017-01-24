import React from 'react'
import sinon from 'sinon'
import _ from 'underscore'

import { mount, shallow } from 'enzyme'
import { expect } from 'chai'

import FormComponent from '../../../../app/assets/javascripts/course/components/FormComponent'

describe('<FormComponent />', () => {
  const KEY = 'thisisakey'
  const component = {
    component: {
      key: KEY,
      content_url: 'www.google.com',
    }
  }
  const onEnd = sinon.spy()

  it('should load the component properly', () => {
    const formComponent = mount(<FormComponent component={component}/>)

    expect(formComponent.state().formCode).to.equal('');
    expect(formComponent.state().error).to.equal('');

    expect(formComponent.find('iframe')).to.have.length(1);
    expect(formComponent.find('button')).to.have.length(1);
    expect(formComponent.find('input')).to.have.length(1);
  })

  it('should callback if key is entered correctly', () => {
    const formComponent = mount(<FormComponent component={component}/>)

    const input = formComponent.find('input')
    input.simulate('change', { target: { value: KEY } })

    const button = formComponent.find('button')
    button.simulate('click')

    expect(onEnd).to.have.been.calledOnce
  })

  it('should callback if key is entered correctly', () => {
    const formComponent = mount(<FormComponent component={component}/>)

    const input = formComponent.find('input')
    input.simulate('change', { target: { value: 'KEY' } })

    const button = formComponent.find('button')
    button.simulate('click')

    expect(onEnd).to.not.have.been.calledOnce
    expect(!_.isEmpty(formComponent.state().error)).to.be.true
  })
})
