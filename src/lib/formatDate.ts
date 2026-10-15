export function formatDate(dateString: string) {
  let date = new Date(`${dateString}T00:00:00Z`)
  let today = new Date()
  let dateDay = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
  )
  let todayDay = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate(),
  )
  let daysAgo = Math.floor((todayDay - dateDay) / 86_400_000)

  if (daysAgo === 0) return 'Today'
  if (daysAgo === 1) return 'Yesterday'
  if (daysAgo > 1 && daysAgo <= 30) {
    let weeksAgo = Math.floor(daysAgo / 7)
    return weeksAgo > 0
      ? `${weeksAgo} ${weeksAgo === 1 ? 'week' : 'weeks'} ago`
      : `${daysAgo} days ago`
  }

  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
