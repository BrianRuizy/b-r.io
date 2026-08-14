function walk(node, visitor) {
  visitor(node)
  if (node.children) {
    for (const child of node.children) {
      walk(child, visitor)
    }
  }
}

const META_FLAGS = new Set(['showlinenumbers'])

function parseFilename(meta) {
  const trimmed = meta.trim()
  if (!trimmed) return null

  const titled = trimmed.match(
    /(?:title|filename)\s*=\s*["']?([^"'\s]+)["']?/i,
  )
  if (titled) return titled[1]

  const quoted = trimmed.match(/^["']([^"']+)["']$/)
  if (quoted) return quoted[1]

  const leftover = trimmed
    .replace(/\{[^}]*\}/g, '')
    .split(/\s+/)
    .filter((token) => token && !META_FLAGS.has(token.toLowerCase()))
    .join(' ')

  if (!leftover) return null

  const leftoverQuoted = leftover.match(/^["']([^"']+)["']$/)
  if (leftoverQuoted) return leftoverQuoted[1]

  if (/^[\w./-]+$/.test(leftover)) return leftover

  return null
}

function remarkCodeFilename() {
  return (tree) => {
    walk(tree, (node) => {
      if (node.type !== 'code' || !node.meta) return

      const filename = parseFilename(String(node.meta))
      if (!filename) return

      node.data = node.data || {}
      node.data.hProperties = node.data.hProperties || {}
      node.data.hProperties['data-filename'] = filename
    })
  }
}

module.exports = remarkCodeFilename
