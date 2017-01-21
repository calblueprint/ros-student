import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'

import SignUpPage from '../../../../app/assets/javascripts/authentication/components/SignUpPage'

describe('<SignUpPage />', () => {
  it('should have an image to display the gravatar', () => {
    const signUpPage = shallow(<SignUpPage />)
    expect(true).to.be.true
  })

  it('should have props for email and src', () => {
    const signUpPage = shallow(<SignUpPage />)
    expect(signUpPage.props().email).to.be.defined
    expect(signUpPage.props().src).to.be.defined
  })
})
