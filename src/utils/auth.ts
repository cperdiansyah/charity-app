import { jwtVerify } from 'jose'
export function getJwtSecretKey() {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY

  if (!secret) {
    throw new Error('JWT Secret key is not matched')
  }

  return new TextEncoder().encode(secret)
}

export async function verifyJwtToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey())
    // console.log(payload)
    return payload
  } catch (error: any) {
    console.log(error)
    // console.log(error.name)
    if (error.name === 'JWTExpired') {
      // console.log('error nih')

      // const refresh = await refreshToken()
    }
    return null
  }
}
