import { createStore, StateKey } from 'swr-global-state'
import withLocalStoragePersistor from './presistor/local-storage'

export interface IUserData {
  name: string
  role: string
  email: string
  id: string
  is_verified: string
}

const useUserData = createStore<IUserData>({
  key: '@app/userData', // (Required) state key with unique string
  initial: {
    name: '',
    role: '',
    email: '',
    id: '',
    is_verified: '',
  }, // <- (Required) initial state
  persistor: withLocalStoragePersistor(),
})
export default useUserData
