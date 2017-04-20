import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import _ from 'underscore'

import { mount, shallow } from 'enzyme'
import chai, { expect } from 'chai'

chai.use(sinonChai)

import SubsectionSidebar from '../../../../app/assets/javascripts/course/components/SubsectionSidebar'

describe('<SubsectionSidebar />', () => {
  const TITLE = 'Subsection Title'
  const subsection = {
    id: 1,
    title: TITLE,
    is_complete: true,
  }

  it('should render subsection correctly', () => {
    const currentSubsection = subsection
    const displayedSubsection = subsection

    const subsectionSidebar = shallow(
      <SubsectionSidebar
        subsection={subsection}
        currentSubsection={currentSubsection}
        displayedSubsection={displayedSubsection}
      />
    )

    expect(subsectionSidebar.find('.sidebar-subsection-title').text()).to.equal(TITLE)
  })

  it('should be active if the subsection is currently selected', () => {
    const currentSubsection = subsection
    const displayedSubsection = subsection
    const subsectionSidebar = shallow(
      <SubsectionSidebar
        subsection={subsection}
        currentSubsection={currentSubsection}
        displayedSubsection={displayedSubsection}
      />
    )

    expect(subsectionSidebar.find('.sidebar-subsection-card').hasClass('active')).to.be.true
  })

  it('should trigger a callback on click', () => {
    const onClickStub = sinon.spy()
    const currentSubsection = subsection
    const displayedSubsection = subsection
    const subsectionSidebar = shallow(
      <SubsectionSidebar
        subsection={subsection}
        currentSubsection={currentSubsection}
        displayedSubsection={displayedSubsection}
        callback={onClickStub}
      />
    )

    subsectionSidebar.find('.sidebar-subsection-title').simulate('click')

    expect(onClickStub).to.have.been.calledOnce
    expect(onClickStub).to.have.been.calledWith(1, undefined);
  })

  it('should not be active if the subsection is currently selected', () => {
    const currentSubsection = subsection
    const displayedSubsection = {
      id: 2,
    }
    const subsectionSidebar = shallow(
      <SubsectionSidebar
        subsection={subsection}
        currentSubsection={currentSubsection}
        displayedSubsection={displayedSubsection}
      />
    )

    expect(subsectionSidebar.find('.sidebar-subsection-card').hasClass('active')).to.not.be.true
  })

  it('should not be inactive if subsection is complete', () => {
    let currentSubsection = {
      id: 2,
    }
    let subsectionSidebar = shallow(
      <SubsectionSidebar
        subsection={subsection}
        currentSubsection={currentSubsection}
        displayedSubsection={subsection}
      />
    )

    expect(subsectionSidebar.find('.sidebar-subsection-card').hasClass('inactive')).to.be.false

    currentSubsection = {
      id: 1,
    }

    let incompleteSubsection = {
      id: 1,
      is_complete: false,
    }

    subsectionSidebar = shallow(
      <SubsectionSidebar
        subsection={incompleteSubsection}
        currentSubsection={currentSubsection}
        displayedSubsection={subsection}
      />
    )

    expect(subsectionSidebar.find('.sidebar-subsection-card').hasClass('inactive')).to.be.false
  })

  it('should be inactive if the subsection is not complete', () => {
    const currentSubsection = {
      id: 2,
    }
    const incompleteSubsection = {
      id: 1,
      is_complete: false,
    }
    const subsectionSidebar = shallow(
      <SubsectionSidebar
        subsection={incompleteSubsection}
        currentSubsection={currentSubsection}
        displayedSubsection={subsection}
      />
    )

    expect(subsectionSidebar.find('.sidebar-subsection-card').hasClass('inactive')).to.be.true
  })
})
