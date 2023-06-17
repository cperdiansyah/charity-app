const AdminLink = {
  AdminHome: '/admin',
  Dashboard: '/admin/dashboard',
  // Campaign
  CampaignList: '/admin/campaign',
  CampaignAdd: '/admin/campaign/add',
  CampaignEdit: '/admin/campaign/edit/:id',
  
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
