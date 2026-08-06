function walk(node, visitor) {
  visitor(node)
  if (node.children) {
    for (const child of node.children) {
      walk(child, visitor)
    }
  }
}

function parseFilename(meta) {
  const trimmed = meta.trim()
  if (!trimmed) return null

  const titled = trimmed.match(
    /(?:title|filename)\s*=\s*["']?([^"'\s]+)["']?/i,
  )
  if (titled) return titled[1]

  const quoted = trimmed.match(/^["']([^"']+)["']$/)
  if (quoted) return quoted[1]

  if (/^[\w./-]+$/.test(trimmed)) return trimmed

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
