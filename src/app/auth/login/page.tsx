import _ from 'lodash'
import nookies from 'nookies'

import UserTemplate from 'components/templates/UserLayout'

import LoginForm from 'components/organisms/Auth/LoginForm'

async function getData() { }

const Login = () => {
  return (
    <UserTemplate>
      <LoginForm />
    </UserTemplate>
  )
}

export default Login
