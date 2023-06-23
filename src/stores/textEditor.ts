import { createStore } from 'swr-global-state'

const useTextEditor = createStore({
  key: '@app/textEditor', // (Required) state key with unique string
  initial: '', // <- (Required) initial state
})
export default useTextEditor
