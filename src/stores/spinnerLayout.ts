import { createStore } from 'swr-global-state'

const useSpinnerLayout = createStore({
  key: '@app/spinnerLoading', // (Required) state key with unique string
  initial: false, // <- (Required) initial state
})
export default useSpinnerLayout
