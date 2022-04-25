import { NextApiRequestCookies } from 'next/dist/server/api-utils'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

type Options<Body> = {
  data?: Body
  slug?: string
}

export function createFetch<Body, Response>(route: string, method: Method) {
  return async (options?: Options<Body>) => {
    const response = await fetch(
      `/server/${route}${options?.slug ? `/${options.slug}` : ''}`,
      {
        method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(options?.data)
      }
    )
    const responseJson = await response.json()
    if (!response.ok) {
      throw new Error(responseJson.error)
    }
    return responseJson as Response
  }
}

export function createServerSideFetch<Body, Response>(
  route: string,
  method: Method
) {
  return async (cookies: NextApiRequestCookies, options?: Options<Body>) => {
    const response = await fetch(
      `http://localhost:8000/${route}${
        options?.slug ? `/${options.slug}` : ''
      }`,
      {
        method,
        headers: {
          'Content-Type': 'application/json',
          Cookie: `${process.env.SESSION_NAME}=${cookies.sid}`
        },
        body: JSON.stringify(options?.data)
      }
    )
    const responseJson = await response.json()
    if (!response.ok) {
      throw new Error(responseJson.error)
    }
    return responseJson as Response
  }
}
