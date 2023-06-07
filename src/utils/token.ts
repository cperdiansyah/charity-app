import nookies from 'nookies'
import { SERVICE } from './api'

// export const refreshToken = async () => {
//   const token = nookies.get(null, 'token') || null

//   if (token) {
//     const url = [process.env.NEXT_PUBLIC_BASE_URL, SERVICE.refreshToken].join(
//       ''
//     )
//     // console.log(url)
//     const bodyPayload = {
//       isAnonymous: false,
//     }
//     const response = await fetchPost(url, bodyPayload)
//     const data = await response.json()
//     console.log(data)

//     return data
//   }
// }
