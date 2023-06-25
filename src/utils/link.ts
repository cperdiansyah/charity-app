const AdminLink = {
  AdminHome: '/admin',
  Dashboard: '/admin/dashboard',
  // Campaign
  CampaignList: '/admin/campaign',
  CampaignAdd: '/admin/campaign/add',
  CampaignEdit: '/admin/campaign/edit/',
  // Banner
  BannerList: '/admin/banner',
  BannerAdd: '/admin/banner/add',
  BannerEdit: '/admin/banner/edit/',
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
