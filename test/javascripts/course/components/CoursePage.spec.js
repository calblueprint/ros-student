import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import chaiEnzyme from 'chai-enzyme'
import _ from 'underscore'

import { mount, shallow } from 'enzyme'
import chai, { expect } from 'chai'

chai.use(chaiEnzyme())
chai.use(sinonChai)

import CoursePage from '../../../../app/assets/javascripts/course/components/CoursePage'

import { APIRoutes } from '../../../../app/assets/javascripts/shared/routes'
import request from '../../../../app/assets/javascripts/shared/requests/request'

describe('<CoursePage />', () => {
  const ID = 1
  const AUDIO_URL = 'https://ros-staging.s3.amazonaws.com/uploads/component/audio/34/tA74TtoPrkEQ-F8diXHD.mp3'
  const CONTENT_URL = 'https://ros-staging.s3.amazonaws.com/uploads/photo/image/32/slide-presentation-guidelines-1-728.jpg'
  const sidebar = {
    'course_sidebar':{
      'id':1,
      'name':'Maren Morris',
      'description':'Eveniet tenetur',
      'image_url': null,
      'is_published': true,
      'sections':[
        {
          'id':1,
          'title':'Section 1',
          'course_id':1,
          'position':1,
          'subsections':[
            {
              'id':2,
              'title':'Subsection 1',
              'section_id':1,
              'position':2,
              'is_complete':true
            },
            {
              'id':3,
              'title':'Subsection 2',
              'section_id':1,
              'position':3,
              'is_complete':true
            },
          ]
       },
       {
          'id':2,
          'title':'Section 2',
          'course_id':1,
          'position':2,
          'subsections':[
            {
              'id':6,
              'title':'Subsection 1',
              'section_id':2,
              'position':1,
              'is_complete':true
            },
            {
              'id':7,
              'title':'Subsection 2',
              'section_id':2,
              'position':2,
              'is_complete':false
            },
            {
              'id':8,
              'title':'Subsection 3',
              'section_id':2,
              'position':3,
              'is_complete':false
            },
          ]
        },
      ],
      'current_subsection': {
        'id':7,
        'title':'Subsection 2',
        'section_id':2,
        'position':2,
        'is_complete':false
      }
    }
  }


  const subsection = {
    'id': 7,
    'title': 'Grated Goats',
    'section_id': 2,
    'position': 2,
    'is_complete': false,
    'components': [
      {
        'id': 1,
        'component_type': 0,
        'title': 'Bachelor of Arts in Medical Science',
        'form_key': null,
        'audio_url': AUDIO_URL,
        'content_url': CONTENT_URL,
        'position': 1,
        'subsection_id': 7,
        'is_complete': true
      },
      {
        'id': 2,
        'component_type': 0,
        'title': 'Bachelor of Arts in Medical Arts',
        'form_key': null,
        'audio_url': AUDIO_URL,
        'content_url': CONTENT_URL,
        'position': 2,
        'subsection_id': 7,
        'is_complete': false
      },
    ],
    'current_component': {
      'id': 2,
      'component_type': 0,
      'title': 'Bachelor of Arts in Medical Arts',
      'form_key': null,
      'audio_url': AUDIO_URL,
      'content_url': CONTENT_URL,
      'position': 2,
      'subsection_id': 7,
      'is_complete': false
    }
  }

  const sidebarResponse = [
    200,
    { 'Content-type': 'application/json' },
    JSON.stringify(sidebar)
  ]

  const subsectionResponse = [
    200,
    { 'Content-type': 'application/json' },
    JSON.stringify(subsection)
  ]

  let server

  beforeEach(() => {
    server = sinon.fakeServer.create()

    server.respondWith(
      'GET',
      APIRoutes.getStudentCourseSidebarPath(ID),
      sidebarResponse
    )

    _.times(8, (n) => {
      server.respondWith(
        'GET',
        APIRoutes.getSubsectionPath(n),
        subsectionResponse
      )
    })

    server.respondImmediately = true
  })

  afterEach(() => {
    server.restore()
  })

  it('renders correctly', () => {
    const coursePage = mount(<CoursePage routeParams={{id: ID}}/>)

    expect(coursePage.state().nextDisabled).to.be.true

    expect(coursePage.find('#next-button')).to.have.length(1)
    expect(coursePage.find('#previous-button')).to.have.length(1)
  })

  it('should navigate properly', () => {
    const coursePage = mount(<CoursePage routeParams={{id: ID}}/>)

    const prevButton = coursePage.find('#previous-button')
    const nextButton = coursePage.find('#next-button')
    const title = coursePage.find('.subsection-title-container')
    const markComponentAsCompleteSpy = sinon.spy(coursePage.instance(), 'markComponentAsComplete')
    const displayNextComponentSpy = sinon.spy(coursePage.instance(), 'displayNextComponent')
    const displaySubsectionSpy = sinon.spy(coursePage.instance(), 'displaySubsection')

    expect(title.text()).to.equal('Bachelor of Arts in Medical Arts')

    prevButton.simulate('click')

    expect(title.text()).to.equal('Bachelor of Arts in Medical Science')
    expect(nextButton).to.not.have.attr('disabled')

    nextButton.simulate('click')

    expect(displayNextComponentSpy).to.be.called
    expect(markComponentAsCompleteSpy).to.not.be.called
    expect(title.text()).to.equal('Bachelor of Arts in Medical Arts')

    prevButton.simulate('click')
    expect(title.text()).to.equal('Bachelor of Arts in Medical Science')

    prevButton.simulate('click')
    expect(displaySubsectionSpy).to.be.calledWith(6, -1)
    expect(title.text()).to.equal('Bachelor of Arts in Medical Arts')
  })

  it('should not continue unless you finish the component', () => {
    const coursePage = mount(<CoursePage routeParams={{id: ID}}/>)

    const nextButton = coursePage.find('#next-button')
    const displayNextComponentStub = sinon.stub(coursePage.instance(), 'displayNextComponent').returns({})

    expect(nextButton).to.have.attr('disabled')
    expect(coursePage.state().nextDisabled).to.be.true

    nextButton.simulate('click')
    expect(displayNextComponentStub).to.not.be.called

    coursePage.instance().enableNextButton()

    expect(nextButton).to.not.have.attr('disabled')

    nextButton.simulate('click')

    expect(displayNextComponentStub).to.be.calledOnce
  })

  it('should mark component as complete after clicking next', () => {
    const coursePage = mount(<CoursePage routeParams={{id: ID}}/>)

    const nextButton = coursePage.find('#next-button')
    const markComponentAsCompleteSpy = sinon.spy(coursePage.instance(), 'markComponentAsComplete')

    expect(nextButton).to.have.attr('disabled')
    expect(coursePage.state().nextDisabled).to.be.true

    coursePage.instance().enableNextButton()
    expect(nextButton).to.not.have.attr('disabled')
    expect(coursePage.state().nextDisabled).to.not.be.true

    // nextButton.simulate('click')


  })

  // TODO: Charles - add alot more tests for this page.
})
