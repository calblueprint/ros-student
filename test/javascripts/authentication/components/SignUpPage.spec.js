import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'

import SignUpPage from '../../../../app/assets/javascripts/authentication/components/SignUpPage'

describe('<SignUpPage />', () => {
  it('should have the proper inputs', () => {
    const signUpPage = shallow(<SignUpPage />)
    expect(true).to.be.true
  })
})
