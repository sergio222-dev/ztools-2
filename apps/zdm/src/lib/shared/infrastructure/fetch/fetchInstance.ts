export const fetchInstance = (API_URL: string) => (VERSION: string) => async ({url, ...rest}: Request) => {
  return await fetch({
    url: `${API_URL}${VERSION}/${url}`,
    ...rest,
  })
}
