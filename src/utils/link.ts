const AdminLink = {
  AdminHome: '/admin',
  Dashboard: '/admin/dashboard',
  // Campaign
  AdminCampaignList: '/admin/campaign',
  AdminCampaignAdd: '/admin/campaign/add',
  AdminCampaignEdit: '/admin/campaign/edit/',
  // Banner
  BannerList: '/admin/banner',
  BannerAdd: '/admin/banner/add',
  BannerEdit: '/admin/banner/edit/',
  // Reward
  RewardList: '/admin/reward',
  RewardAdd: '/admin/reward/add',
  RewardEdit: '/admin/reward/edit/',
  /* Approval */
  ApprovalCampaign: '/admin/moderation/campaign',
  ApprovalBanner: '/admin/moderation/banner',
  ApprovalUser: '/admin/moderation/user',
  /* Report */
  ReportCampaign: '/admin/report/campaign',
  ReportBanner: '/admin/report/banner',
  ReportUser: '/admin/report/user',
  ReportSedekahSubuh: '/admin/report/sedekah-subuh',
  // Exchange Reward
  exchangeReward: '/admin/exchange-reward',
  // Config
  ConfigAdmin: '/admin/config',
}

export const NAVIGATION_LINK = {
  ...AdminLink,
  Homepage: '/',
  About: '/about',
  Contact: '/contact',
  Campaign: '/campaign',
  CampaignList: '/campaign/list',
  CampaignDetail: '/campaign/:slug',
  Profile: '/user/profile',
  Login: '/auth/login',
  Signup: '/auth/signup',
  ForgotPassword: '/auth/forgot-password',
  SedekahSubuh: '/sedekah-subuh',
}
