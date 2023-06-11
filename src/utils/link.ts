const AdminLink = {
  AdminHome: '/admin',
  Dashboard: '/admin/dashboard',
  // Charity
  CharityList: '/admin/charity',
  CharityAdd: '/admin/charity/add',
  CharityEdit: '/admin/charity/edit/:id',
}

export const NAVIGATION_LINK = {
  ...AdminLink,
  Homepage: '/',
  About: '/about',
  Contact: '/contact',
  Profile: '/user/profile',
  Login: '/auth/login',
  Signup: '/auth/signup',
  ForgotPassword: '/auth/forgot-password',
}
