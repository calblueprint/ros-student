import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import chaiEnzyme from 'chai-enzyme'

import { mount, shallow } from 'enzyme'
import chai, { expect } from 'chai'

chai.use(chaiEnzyme())
chai.use(sinonChai)

import ComponentGraph from '../../../../app/assets/javascripts/course/components/ComponentGraph'

import { Images } from '../../../../app/assets/javascripts/utils/helpers/image_helpers'

describe('<ComponentGraph />', () => {
  const subsection = {
    title: 'Some title',
    current_component: {
      id: 2,
      title: 'Component 1',
    },
    components: [
      {
        id: 1,
        title: 'Component 1',
        component_type: 0,
        is_complete: true,
        position: 1,
      },
      {
        id: 2,
        title: 'Component 2',
        component_type: 1,
        is_complete: false,
        position: 2,
      },
      {
        id: 3,
        title: 'Component 3',
        component_type: 2,
        is_complete: false,
        position: 3,
      },
    ]
  }

  const displayedSubsection = subsection
  const displayedComponent = {
    id: 1,
    title: 'Component 1',
    component_type: 0,
  }

  it('renders correctly', () => {
    Images.empty_basic = 'empty_basic'
    Images.open_quiz = 'open_quiz'
    Images.open_play = 'open_play'

    const componentGraph = mount(
      <ComponentGraph
        subsection={displayedSubsection}
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
