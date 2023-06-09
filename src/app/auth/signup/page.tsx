import React from 'react'

import UserTemplate from 'components/templates/UserLayout'
import SignupForm from 'components/organisms/Auth/SignupForm'

const Signup = () => {
  return (
    <UserTemplate>
      <SignupForm />
    </UserTemplate>
  )
}

export default Signup
