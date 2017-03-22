import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import chaiEnzyme from 'chai-enzyme'
import _ from 'underscore'

import { mount, shallow } from 'enzyme'
import chai, { expect } from 'chai'

chai.use(chaiEnzyme())
chai.use(sinonChai)

import { APIRoutes } from '../../../../app/assets/javascripts/shared/routes'

import SignUpPage from '../../../../app/assets/javascripts/authentication/components/SignUpPage'

describe('<SignUpPage />', () => {

  it('render correctly', () => {
    const signUpPage = mount(<SignUpPage />)

    expect(signUpPage).to.include.text('Enter 8 Digit Code')
    expect(signUpPage.find('.button')).to.have.attr('value', 'Continue')
    expect(signUpPage).to.not.include.text('Getting Started')
    expect(signUpPage.find('.button')).to.not.have.attr('value', 'Sign up')
  })

  let server

  beforeEach(() => {
    server = sinon.fakeServer.create()

    server.respondImmediately = true
  })

  afterEach(() => {
    server.restore()
  })

  describe('on invalid code', () => {
    const error = {
      message: 'Invalid Code'
    }

    const errorResponse = [
      404,
      { 'Content-type': 'application/json' },
      JSON.stringify(error)
    ]

    beforeEach(() => {
      server.respondWith(
        'POST',
        APIRoutes.verifyCodePath(),
        errorResponse,
      )
    })

    it('renders an error', () => {
      const signUpPage = mount(<SignUpPage />)


      expect(signUpPage).to.not.include.text('Getting Started')
      expect(signUpPage.find('.button')).to.not.have.attr('value', 'Sign up')

      signUpPage.find('[type="submit"]').simulate('click')

      expect(signUpPage).to.not.include.text('Getting Started')
      expect(signUpPage).to.include.text('is invalid')
      expect(signUpPage.find('.button')).to.not.have.attr('value', 'Sign up')
    })
  })

  describe('on valid code', () => {


    const successResponse = [
      200,
      { 'Content-type': 'application/json' },
      JSON.stringify({})
    ]

    beforeEach(() => {
      server.respondWith(
        'POST',
        APIRoutes.verifyCodePath(),
        successResponse,
      )
    })

    it('renders the signup form', () => {
      const signUpPage = mount(<SignUpPage />)

      expect(signUpPage).to.not.include.text('Getting Started')
      expect(signUpPage.find('.button')).to.not.have.attr('value', 'Sign up')

      signUpPage.find('[type="submit"]').simulate('click')

      expect(signUpPage).to.include.text('Getting Started')
      expect(signUpPage.find('.button')).to.have.attr('value', 'Sign up')
    })
  })
})
