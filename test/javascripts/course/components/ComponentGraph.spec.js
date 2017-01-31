import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import chaiEnzyme from 'chai-enzyme'

import { mount, shallow } from 'enzyme'
import chai, { expect } from 'chai'

chai.use(chaiEnzyme())
chai.use(sinonChai)

import ComponentGraph from '../../../../app/assets/javascripts/course/components/ComponentGraph'

import { Images } from '../../../../app/assets/javascripts/utils/image_helpers'

describe('<ComponentGraph />', () => {
  let sandbox
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  })

  afterEach(() => {
    sandbox.restore()
  })

  const subsection = {
    title: 'Some title',
    current_component: {
      id: 1,
      title: 'Component 1',
    },
    components: [
      {
        id: 1,
        title: 'Component 1',
        component_type: 0,
      },
      {
        id: 2,
        title: 'Component 2',
        component_type: 1,
      },
      {
        id: 3,
        title: 'Component 3',
        component_type: 2,
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
})
