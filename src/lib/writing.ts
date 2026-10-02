export const writingPath = '/writing'

export function writingHref(slug?: string) {
  return slug ? `${writingPath}/${slug}` : writingPath
}

export function isWritingPath(pathname: string) {
  return pathname === writingPath || pathname.startsWith(`${writingPath}/`)
}
