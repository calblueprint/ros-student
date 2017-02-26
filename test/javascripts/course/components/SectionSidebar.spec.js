import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import _ from 'underscore'

import { mount, shallow } from 'enzyme'
import chai, { expect } from 'chai'

chai.use(sinonChai)

import SectionSidebar from '../../../../app/assets/javascripts/course/components/SectionSidebar'

describe('<SectionSidebar />', () => {
  const TITLE = 'Section Sidebar'
  const section = {
    id: 1,
    title: TITLE,
    subsections: [
      {
        id: 1,
        title: 'Subsection 1',
      },
      {
        id: 2,
        title: 'Subsection 2',
      },
      {
        id: 3,
        title: 'Subsection 3',
      },
    ]
  }

  const currentSubsection = {
    id: 1,
    title: 'Subsection 1',
  }

  const displayedSubsection = {
    id: 1,
    title: 'Subsection 1',
    section_id: 1,
  }

  it('should render correctly', () => {
    const sectionSidebar = mount(
      <SectionSidebar
        section={section}
        currentSubsection={currentSubsection}
        displayedSubsection={displayedSubsection}
      />
    )

    expect(sectionSidebar.state().isOpen).to.be.true
    expect(sectionSidebar.find('h2').text()).to.equal(TITLE)
    expect(sectionSidebar.find('.sidebar-subsection-card')).to.have.length(3)

    expect(sectionSidebar.text()).to.contain('Subsection 1')
    expect(sectionSidebar.text()).to.contain('Subsection 2')
    expect(sectionSidebar.text()).to.contain('Subsection 3')

    // Checking initial isOpen conditions
    const displayedSubsection2 = {
      id: 1,
      title: 'Subsection 1',
      section_id: 2,
    }
    const sectionSidebar2 = mount(
      <SectionSidebar
        section={section}
        currentSubsection={currentSubsection}
        displayedSubsection={displayedSubsection2}
      />
    )
    expect(sectionSidebar2.state().isOpen).to.be.false
  })

  it('should toggle when title is clicked', () => {
    const sectionSidebar = mount(
      <SectionSidebar
        section={section}
        currentSubsection={currentSubsection}
        displayedSubsection={displayedSubsection}
      />
    )

    const title = sectionSidebar.find('sidebar-section-title-container')

    expect(sectionSidebar.state().isOpen).to.be.true

    sectionSidebar.find('.sidebar-section-title-container').simulate('click')
    expect(sectionSidebar.state().isOpen).to.be.false
  })
})
