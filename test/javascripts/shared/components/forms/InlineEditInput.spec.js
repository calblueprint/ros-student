import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import chaiEnzyme from 'chai-enzyme'
import _ from 'underscore'

import { mount, shallow } from 'enzyme'
import chai, { expect } from 'chai'

chai.use(chaiEnzyme())
chai.use(sinonChai)

import InlineEditInput from '../../../../../app/assets/javascripts/shared/components/forms/InlineEditInput'

describe('<InlineEditInput />', () => {

  it('should render correctly', () => {
    const onBlurStub = sinon.stub()
    const inlineEditComponent = shallow(
      <InlineEditInput
        onBlur={onBlurStub}
        value='Value'
      />
    )

    expect(inlineEditComponent.state().editable).to.be.false
    expect(inlineEditComponent.find('.inline-edit-value')).to.have.length(1)
    expect(inlineEditComponent.find('.inline-edit-value').text()).to.equal('Value')
    expect(inlineEditComponent.find('.inline-edit-input')).to.have.length(0)
    expect(inlineEditComponent.find('.button')).to.have.length(1)

    const editButton = inlineEditComponent.find('.button')
    editButton.simulate('click')

    expect(inlineEditComponent.state().editable).to.be.true
    expect(inlineEditComponent.find('.inline-edit-value')).to.have.length(0)
    expect(inlineEditComponent.find('.button')).to.have.length(0)
    expect(inlineEditComponent.find('.inline-edit-input')).to.have.length(1)
    expect(inlineEditComponent.find('.inline-edit-input').props().defaultValue).to.equal('Value')

    const input = inlineEditComponent.find('input')
    input.simulate('blur', { target: { value: 'Value'} })

    expect(inlineEditComponent.state().editable).to.be.false
    expect(inlineEditComponent.find('.inline-edit-value')).to.have.length(1)
    expect(inlineEditComponent.find('.inline-edit-value').text()).to.equal('Value')
    expect(inlineEditComponent.find('.inline-edit-input')).to.have.length(0)
    expect(inlineEditComponent.find('.button')).to.have.length(1)
  })

  it('should call onBlur with the correct value after exiting', () => {
    const onBlurStub = sinon.stub()
    const inlineEditComponent = shallow(
      <InlineEditInput
        onBlur={onBlurStub}
        value='Value'
      />
    )

    const editButton = inlineEditComponent.find('.button')
    editButton.simulate('click')

    const input = inlineEditComponent.find('input')
    input.simulate('blur', { target: { value: 'Other Value'} })

    expect(onBlurStub).to.have.been.calledWith('Other Value')
    onBlurStub.reset()
    editButton.simulate('click')

    input.simulate('keyDown', { keyCode: 27 })

    expect(onBlurStub).to.have.been.calledWith('Value')
    onBlurStub.reset()
    expect(inlineEditComponent.state().editable).to.be.false

    editButton.simulate('click')
    input.simulate('keyDown', { keyCode: 1 })

    expect(onBlurStub).to.not.have.been.called
    onBlurStub.reset()
    expect(inlineEditComponent.state().editable).to.be.true

    input.simulate('keyPress', { key: 'Enter', target: { value: 'Other Value' }})

    expect(onBlurStub).to.have.been.calledWith('Other Value')
    onBlurStub.reset()
    expect(inlineEditComponent.state().editable).to.be.false
  })
})
