import type { StatePersistor, StateKey } from 'swr-global-state'

const withLocalStoragePersistor = <T = any>(): StatePersistor<T> => ({
  onSet(key: StateKey, data: T) {
    const stringifyData = JSON.stringify(data)
    window.localStorage.setItem(String(key), stringifyData)
  },
  onGet(key: StateKey) {
    const cachedData = window.localStorage.getItem(String(key)) ?? 'null'
    try {
      return JSON.parse(cachedData)
    } catch {
      return cachedData
    }
  },
})

export default withLocalStoragePersistor
