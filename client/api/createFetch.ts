type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export function createFetch<Data, Response>(slug: string, method: Method) {
  return async (data: Data) => {
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
