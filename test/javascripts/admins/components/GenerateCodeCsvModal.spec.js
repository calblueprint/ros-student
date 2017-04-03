import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import chaiEnzyme from 'chai-enzyme'
import _ from 'underscore'

import { mount, shallow } from 'enzyme'
import chai, { expect } from 'chai'

chai.use(chaiEnzyme())
chai.use(sinonChai)

import GenerateCodeCsvModal from '../../../../app/assets/javascripts/admins/components/GenerateCodeCsvModal'

import { APIRoutes } from '../../../../app/assets/javascripts/shared/routes'
import request from '../../../../app/assets/javascripts/shared/requests/request'

describe('<GenerateCodeCsvModal />', () => {

  it('renders correctly', () => {
    Images.empty_basic = 'empty_basic'
    Images.open_quiz = 'open_quiz'
    Images.open_play = 'open_play'

    const componentGraph = mount(
      <GenerateCodeCsvModal
        isModalOpen={false}
        displayedComponent={displayedComponent}
      />
    )

    expect(componentGraph.find('.component-graph-line')).to.have.length(2)
    expect(componentGraph.find('.tooltiptext')).to.have.length(3)

    const icons = componentGraph.find('.component-icon')
    expect(icons.at(0)).to.have.style('background-image', 'url(empty_basic)')
    expect(icons.at(1)).to.have.style('background-image', 'url(open_quiz)')
    expect(icons.at(2)).to.have.style('background-image', 'url(open_play)')
  })

  it('shouldn\'t call the callback for disabled components', () => {
    const callbackStub = sinon.stub()
    const componentGraph = mount(
      <ComponentGraph
        subsection={displayedSubsection}
        displayedComponent={displayedComponent}
        callback={callbackStub}
      />
    )
    const icons = componentGraph.find('.component-icon')

    icons.at(0).simulate('click')
    icons.at(1).simulate('click')
    icons.at(2).simulate('click')

    expect(callbackStub).to.have.been.calledTwice
    expect(callbackStub).to.have.been.calledWith(1)
    expect(callbackStub).to.have.been.calledWith(2)
    expect(callbackStub).to.not.have.been.calledWith(3)
  })

  it('should be opaque if disabled', () => {
    const componentGraph = mount(
      <ComponentGraph
        subsection={displayedSubsection}
        displayedComponent={displayedComponent}
      />
    )

    const lines = componentGraph.find('.component-graph-line')

    expect(lines.at(0)).to.not.have.style('opacity', '0.2')
    expect(lines.at(1)).to.have.style('opacity', '0.2')

    const icons = componentGraph.find('.component-icon')

    expect(icons.at(0)).to.have.style('opacity', '1')
    expect(icons.at(1)).to.have.style('opacity', '1')
    expect(icons.at(2)).to.have.style('opacity', '0.2')
  })
})
