import { NextApiRequestCookies } from 'next/dist/server/api-utils'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export function createFetch<Body, Response>(slug: string, method: Method) {
  return async (data?: Body) => {
    const response = await fetch(`/server/${slug}`, {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const responseJson = await response.json()
    if (!response.ok) {
      throw new Error(responseJson.error)
    }
    return responseJson as Response
  }
}

export function createServerSideFetch<Body, Response>(
  slug: string,
  method: Method
) {
  return async (cookies: NextApiRequestCookies, data?: Body) => {
    const response = await fetch(`http://localhost:8000/${slug}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${process.env.SESSION_NAME}=${cookies.sid}`
      },
      body: JSON.stringify(data)
    })
    const responseJson = await response.json()
    if (!response.ok) {
      throw new Error(responseJson.error)
    }
    return responseJson as Response
  }
}
