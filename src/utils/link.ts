const AdminLink = {
  AdminHome: '/admin',
  Dashboard: '/admin/dashboard',
  CharityList: '/admin/charity',
  CharityAdd: '/admin/charity/add',
  CharityEdit: '/admin/charity/edit/:id',
}

export const NAVIGATION_LINK = {
  ...AdminLink,
  Homepage: '/',
  About: '/about',
  Contact: '/contact',
  Login: '/auth/login',
  Signup: '/auth/signup',
  ForgotPassword: '/auth/forgot-password',
}
