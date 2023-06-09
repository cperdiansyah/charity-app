import { createStore, StateKey } from 'swr-global-state'
import withLocalStoragePersistor from './presistor/local-storage'

export interface IUserData {
  name: string
  role: string
  email: string
}

const useUserData = createStore<IUserData>({
  key: '@app/userData', // (Required) state key with unique string
  initial: {
    name: '',
    role: '',
    email: '',
  }, // <- (Required) initial state
  persistor: withLocalStoragePersistor(),
})
export default useUserData
