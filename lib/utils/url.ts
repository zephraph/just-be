export const siteURL = (
  pathName?: string,
  params?: Record<string, string> | string
) => {
  let host
  let query = !params
    ? ''
    : typeof params === 'object'
    ? `?${new URLSearchParams(params)}`
    : params
  if ((host = process.env.NEXT_PUBLIC_VERCEL_URL)) {
    return `https://${host}/${pathName}${query}`
  }
  return process.env.NODE_ENV === 'production'
    ? `https://just-be.dev/${pathName}${query}`
    : `http://localhost:3000/${pathName}${query}`
}
