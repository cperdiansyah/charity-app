import {
  DesktopOutlined,
  DeploymentUnitOutlined,
  PictureOutlined,
  AuditOutlined,
  PrinterOutlined,
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
    children: [{ label: 'Campaign' }, { label: 'User' }],
  },
}

export const adminSidebar = [
  SidebarMenu.dashboard,
  SidebarMenu.charity,
  SidebarMenu.banner,
  SidebarMenu.contentModeration,
  SidebarMenu.report,
]

export const userVerfiedSidebar = [
  SidebarMenu.dashboard,
  SidebarMenu.charity,
  SidebarMenu.banner,
  SidebarMenu.report,
]
