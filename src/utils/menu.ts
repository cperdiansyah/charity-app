import {
  DesktopOutlined,
  DeploymentUnitOutlined,
  PictureOutlined,
  AuditOutlined,
  PrinterOutlined,
  SettingOutlined,
  CrownOutlined,
  ShoppingOutlined,
  SmileOutlined,
} from '@ant-design/icons'
import { NAVIGATION_LINK } from '@/utils/link'

export const SidebarMenu = {
  dashboard: {
    label: 'Dashboard',
    icon: DesktopOutlined,
    pathname: NAVIGATION_LINK.Dashboard,
  },
  charity: {
    label: 'Campaign',
    icon: DeploymentUnitOutlined,
    pathname: NAVIGATION_LINK.AdminCampaignList,
  },
  banner: {
    label: 'Banner',
    icon: PictureOutlined,
    pathname: NAVIGATION_LINK.BannerList,
  },
  reward: {
    label: 'Reward',
    icon: CrownOutlined,
    pathname: NAVIGATION_LINK.RewardList,
  },
  exchangeReward: {
    label: 'Exchange Reward',
    icon: ShoppingOutlined,
    pathname: NAVIGATION_LINK.exchangeReward,
  },
  contentModeration: {
    label: 'Moderation',
    icon: AuditOutlined,
    children: [
      { label: 'Campaign', pathname: NAVIGATION_LINK.ApprovalCampaign },
      { label: 'Banner', pathname: NAVIGATION_LINK.ApprovalBanner },
      { label: 'User', pathname: NAVIGATION_LINK.ApprovalUser },
    ],
  },
  report: {
    label: 'Report',
    icon: PrinterOutlined,
    children: [
      { label: 'User', pathname: NAVIGATION_LINK.ReportUser },
      { label: 'Campaign', pathname: NAVIGATION_LINK.ReportCampaign },
    ],
  },
  reportSedekahSubuh: {
    label: 'Report Sedekah Subuh',
    icon: SmileOutlined,
    pathname: NAVIGATION_LINK.ReportSedekahSubuh,
  },
  config: {
    label: 'Config',
    icon: SettingOutlined,
    pathname: NAVIGATION_LINK.ConfigAdmin,
  },
}

export const adminSidebar = [
  SidebarMenu.dashboard,
  SidebarMenu.charity,
  SidebarMenu.banner,
  SidebarMenu.reward,
  SidebarMenu.exchangeReward,
  SidebarMenu.contentModeration,
  SidebarMenu.report,
  SidebarMenu.config,
]

export const userVerfiedSidebar = [
  SidebarMenu.dashboard,
  SidebarMenu.charity,
  SidebarMenu.banner,
  SidebarMenu.report,
]
