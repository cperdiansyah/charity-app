import { createStore } from 'swr-global-state'

const useSidebarCollapsed = createStore({
  key: '@app/sidebarCollapsed', // (Required) state key with unique string
  initial: true, // <- (Required) initial state
})
export default useSidebarCollapsed