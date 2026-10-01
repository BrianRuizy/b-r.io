/**
 * Die-cut a product photo into a uses-page sticker PNG.
 *
 * Local/on-demand only — Next.js never runs this at build or request time.
 *
 *   npm run stickerify -- photo.png src/images/uses/my-item.png
 *   npm run stickerify -- --app icon.png src/images/uses/app-foo.png
 *   npm run stickerify -- --mode alpha --tol 28 in.png out.png
 *   npm run stickerify -- --vinyl 51,51,51 in.png uses/dark/name.png
 *   npm run stickerify -- --recolor-vinyl 51,51,51 in.png uses/dark/in.png
 *
 * Then import the PNG in src/app/uses/tools.ts.
 *
 * Best inputs: official packshots with a transparent background, or a
 * product on a flat white studio background. Dark-on-dark photos cut poorly.
 */
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import sharp from 'sharp'

type Mode = 'auto' | 'alpha'

type StickerifyOptions = {
  dest: string
  mode?: Mode
  tol?: number
  border?: number
  outSize?: number
  maxSide?: number
  /** Extra transparent canvas margin as a fraction of the die-cut size. Default 0.05. */
  margin?: number
  /** Normalized crop box: left, top, right, bottom in 0–1. */
  crop?: [number, number, number, number]
  /** Vinyl fill RGB. Default white. Use 51,51,51 for dark sticker chrome. */
  vinyl?: [number, number, number]
}

const INF = 1e10

function colorDistSq(
  r: number,
  g: number,
  b: number,
  cr: number,
  cg: number,
  cb: number,
) {
  let dr = r - cr
  let dg = g - cg
  let db = b - cb
  return dr * dr + dg * dg + db * db
}

function floodFromEdges(mask: Uint8Array, w: number, h: number) {
  let vis = new Uint8Array(w * h)
  let q = new Int32Array(w * h)
  let head = 0
  let tail = 0

  let tryAdd = (x: number, y: number) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return
    let i = y * w + x
    if (vis[i] || !mask[i]) return
    vis[i] = 1
    q[tail++] = i
  }

  for (let x = 0; x < w; x++) {
    tryAdd(x, 0)
    tryAdd(x, h - 1)
  }
  for (let y = 0; y < h; y++) {
    tryAdd(0, y)
    tryAdd(w - 1, y)
  }

  while (head < tail) {
    let i = q[head++]!
    let x = i % w
    let y = (i / w) | 0
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx || dy) tryAdd(x + dx, y + dy)
      }
    }
  }

  return vis
}

function keepLargest(fg: Uint8Array, w: number, h: number) {
  let n = w * h
  let seen = new Uint8Array(n)
  let q = new Int32Array(n)
  let best: number[] = []
  let bestSize = 0

  for (let start = 0; start < n; start++) {
    if (!fg[start] || seen[start]) continue
    let head = 0
    let tail = 0
    seen[start] = 1
    q[tail++] = start
    let cells: number[] = []
    while (head < tail) {
      let i = q[head++]!
      cells.push(i)
      let x = i % w
      let y = (i / w) | 0
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue
          let nx = x + dx
          let ny = y + dy
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue
          let ni = ny * w + nx
          if (!fg[ni] || seen[ni]) continue
          seen[ni] = 1
          q[tail++] = ni
        }
      }
    }
    if (cells.length > bestSize) {
      bestSize = cells.length
      best = cells
    }
  }

  let out = new Uint8Array(n)
  for (let i of best) out[i] = 1
  return out
}

function fillSmallHoles(fg: Uint8Array, w: number, h: number, limit = 120) {
  let n = w * h
  let bg = new Uint8Array(n)
  for (let i = 0; i < n; i++) bg[i] = fg[i] ? 0 : 1
  let edgeBg = floodFromEdges(bg, w, h)
  let seen = new Uint8Array(n)
  let q = new Int32Array(n)
  let out = Uint8Array.from(fg)

  for (let start = 0; start < n; start++) {
    if (fg[start] || edgeBg[start] || seen[start]) continue
    let head = 0
    let tail = 0
    seen[start] = 1
    q[tail++] = start
    let cells: number[] = []
    while (head < tail) {
      let i = q[head++]!
      cells.push(i)
      let x = i % w
      let y = (i / w) | 0
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue
          let nx = x + dx
          let ny = y + dy
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue
          let ni = ny * w + nx
          if (fg[ni] || edgeBg[ni] || seen[ni]) continue
          seen[ni] = 1
          q[tail++] = ni
        }
      }
    }
    if (cells.length <= limit) {
      for (let i of cells) out[i] = 1
    }
  }

  return out
}

/** Felzenszwalb 1D squared Euclidean distance transform. */
function edt1d(
  f: Float64Array,
  n: number,
  v: Int32Array,
  z: Float64Array,
  d: Float64Array,
) {
  let k = 0
  v[0] = 0
  z[0] = Number.NEGATIVE_INFINITY
  z[1] = Number.POSITIVE_INFINITY
  for (let q = 1; q < n; q++) {
    let s = 0
    while (k >= 0) {
      let r = v[k]!
      s = (f[q]! - f[r]! + q * q - r * r) / (2 * (q - r))
      if (s > z[k]!) break
      k--
    }
    k++
    v[k] = q
    z[k] = s
    z[k + 1] = Number.POSITIVE_INFINITY
  }
  k = 0
  for (let q = 0; q < n; q++) {
    while (z[k + 1]! < q) k++
    let r = v[k]!
    let diff = q - r
    d[q] = diff * diff + f[r]!
  }
}

/** Distance from every 1-pixel to the nearest 0-pixel. */
function distanceTransform(mask: Uint8Array, w: number, h: number) {
  let n = w * h
  let grid = new Float64Array(n)
  for (let i = 0; i < n; i++) grid[i] = mask[i] ? INF : 0

  let v = new Int32Array(Math.max(w, h))
  let z = new Float64Array(Math.max(w, h) + 1)
  let f = new Float64Array(Math.max(w, h))
  let d = new Float64Array(Math.max(w, h))

  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) f[y] = grid[y * w + x]!
    edt1d(f, h, v, z, d)
    for (let y = 0; y < h; y++) grid[y * w + x] = d[y]!
  }
  for (let y = 0; y < h; y++) {
    let row = y * w
    for (let x = 0; x < w; x++) f[x] = grid[row + x]!
    edt1d(f, w, v, z, d)
    for (let x = 0; x < w; x++) grid[row + x] = d[x]!
  }

  let out = new Float32Array(n)
  for (let i = 0; i < n; i++) out[i] = Math.sqrt(grid[i]!)
  return out
}

function signedDistance(fg: Uint8Array, w: number, h: number) {
  let n = w * h
  let inv = new Uint8Array(n)
  for (let i = 0; i < n; i++) inv[i] = fg[i] ? 0 : 1
  let distIn = distanceTransform(fg, w, h)
  let distOut = distanceTransform(inv, w, h)
  let sdf = new Float32Array(n)
  for (let i = 0; i < n; i++) sdf[i] = distIn[i]! - distOut[i]!
  return sdf
}

function gaussianKernel(sigma: number) {
  let radius = Math.max(1, Math.ceil(sigma * 3))
  let k = new Float32Array(radius * 2 + 1)
  let sum = 0
  let s2 = 2 * sigma * sigma
  for (let i = -radius; i <= radius; i++) {
    let v = Math.exp(-(i * i) / s2)
    k[i + radius] = v
    sum += v
  }
  for (let i = 0; i < k.length; i++) k[i]! /= sum
  return { k, radius }
}

function gaussianBlur(src: Float32Array, w: number, h: number, sigma: number) {
  let { k, radius } = gaussianKernel(sigma)
  let tmp = new Float32Array(w * h)
  let out = new Float32Array(w * h)

  for (let y = 0; y < h; y++) {
    let row = y * w
    for (let x = 0; x < w; x++) {
      let acc = 0
      for (let i = -radius; i <= radius; i++) {
        let xx = Math.min(w - 1, Math.max(0, x + i))
        acc += src[row + xx]! * k[i + radius]!
      }
      tmp[row + x] = acc
    }
  }
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let acc = 0
      for (let i = -radius; i <= radius; i++) {
        let yy = Math.min(h - 1, Math.max(0, y + i))
        acc += tmp[yy * w + x]! * k[i + radius]!
      }
      out[y * w + x] = acc
    }
  }
  return out
}

function smoothMask(fg: Uint8Array, w: number, h: number, sigma: number) {
  let sdf = signedDistance(fg, w, h)
  let blurred = gaussianBlur(sdf, w, h, sigma)
  let out = new Uint8Array(w * h)
  for (let i = 0; i < out.length; i++) out[i] = blurred[i]! > 0 ? 1 : 0
  return out
}

function foreground(
  rgba: Buffer,
  w: number,
  h: number,
  { tol, mode }: { tol: number; mode: Mode },
) {
  let n = w * h
  let alphaMin = 255
  let lowAlpha = 0
  for (let i = 0; i < n; i++) {
    let a = rgba[i * 4 + 3]!
    if (a < alphaMin) alphaMin = a
    if (a < 20) lowAlpha++
  }
  let hasAlpha = alphaMin < 250 && lowAlpha / n > 0.02
  let useAlpha = mode === 'alpha' || (mode === 'auto' && hasAlpha)

  if (mode === 'alpha') {
    let fg = new Uint8Array(n)
    for (let i = 0; i < n; i++) fg[i] = rgba[i * 4 + 3]! > 24 ? 1 : 0
    return { fg, hasAlpha: true }
  }

  if (useAlpha) {
    let edge = new Uint8Array(n)
    for (let i = 0; i < n; i++) {
      let r = rgba[i * 4]!
      let g = rgba[i * 4 + 1]!
      let b = rgba[i * 4 + 2]!
      let a = rgba[i * 4 + 3]!
      let maxc = Math.max(r, g, b)
      let minc = Math.min(r, g, b)
      let nearWhite = maxc >= 236 && maxc - minc <= 18
      edge[i] = a <= 40 || nearWhite ? 1 : 0
    }
    let bg = floodFromEdges(edge, w, h)
    let fg = new Uint8Array(n)
    for (let i = 0; i < n; i++) {
      fg[i] = !bg[i] && rgba[i * 4 + 3]! > 24 ? 1 : 0
    }
    return { fg, hasAlpha: true }
  }

  let corners: number[][] = []
  let block = 16
  let pushBlock = (x0: number, y0: number) => {
    for (let y = y0; y < y0 + block; y++) {
      for (let x = x0; x < x0 + block; x++) {
        let i = (y * w + x) * 4
        corners.push([rgba[i]!, rgba[i + 1]!, rgba[i + 2]!])
      }
    }
  }
  pushBlock(0, 0)
  pushBlock(w - block, 0)
  pushBlock(0, h - block)
  pushBlock(w - block, h - block)
  corners.sort((a, b) => a[0]! + a[1]! + a[2]! - (b[0]! + b[1]! + b[2]!))
  let mid = corners[(corners.length / 2) | 0]!
  let cr = mid[0]!
  let cg = mid[1]!
  let cb = mid[2]!
  let tolSq = tol * tol
  let similar = new Uint8Array(n)
  for (let i = 0; i < n; i++) {
    let o = i * 4
    similar[i] =
      colorDistSq(rgba[o]!, rgba[o + 1]!, rgba[o + 2]!, cr, cg, cb) <= tolSq
        ? 1
        : 0
  }
  let bg = floodFromEdges(similar, w, h)
  let fg = new Uint8Array(n)
  for (let i = 0; i < n; i++) fg[i] = bg[i] ? 0 : 1
  return { fg, hasAlpha: false }
}

function padRgba(
  rgba: Buffer,
  w: number,
  h: number,
  pad: number,
  fill: [number, number, number, number],
) {
  let nw = w + pad * 2
  let nh = h + pad * 2
  let out = Buffer.alloc(nw * nh * 4)
  for (let i = 0; i < nw * nh; i++) {
    out[i * 4] = fill[0]
    out[i * 4 + 1] = fill[1]
    out[i * 4 + 2] = fill[2]
    out[i * 4 + 3] = fill[3]
  }
  for (let y = 0; y < h; y++) {
    rgba.copy(out, ((y + pad) * nw + pad) * 4, y * w * 4, (y + 1) * w * 4)
  }
  return { rgba: out, w: nw, h: nh }
}

function bboxOf(mask: Uint8Array, w: number, h: number) {
  let minX = w
  let minY = h
  let maxX = -1
  let maxY = -1
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (!mask[y * w + x]) continue
      if (x < minX) minX = x
      if (y < minY) minY = y
      if (x > maxX) maxX = x
      if (y > maxY) maxY = y
    }
  }
  if (maxX < 0) return null
  return { minX, minY, maxX, maxY }
}

export async function stickerify(src: string, options: StickerifyOptions) {
  let mode = options.mode ?? 'auto'
  let tol = options.tol ?? 36
  let outSize = options.outSize ?? 720
  let maxSide = options.maxSide ?? 1800
  let [vr, vg, vb] = options.vinyl ?? [255, 255, 255]

  let pipeline = sharp(src).ensureAlpha()
  let meta = await pipeline.metadata()
  let width = meta.width ?? 0
  let height = meta.height ?? 0
  if (!width || !height) throw new Error(`Could not read ${src}`)

  if (options.crop) {
    let [l, t, r, b] = options.crop
    pipeline = sharp(src)
      .extract({
        left: Math.round(l * width),
        top: Math.round(t * height),
        width: Math.max(1, Math.round((r - l) * width)),
        height: Math.max(1, Math.round((b - t) * height)),
      })
      .ensureAlpha()
    let croppedMeta = await pipeline.metadata()
    width = croppedMeta.width ?? width
    height = croppedMeta.height ?? height
  }

  let scale = Math.min(1, maxSide / Math.max(width, height))
  if (scale < 1) {
    width = Math.max(1, Math.round(width * scale))
    height = Math.max(1, Math.round(height * scale))
    pipeline = pipeline.resize(width, height, { kernel: 'lanczos3' })
  }

  let raw = await pipeline.raw().toBuffer({ resolveWithObject: true })
  let rgba = raw.data
  width = raw.info.width
  height = raw.info.height

  let probe = foreground(rgba, width, height, { tol, mode })
  let prePad = Math.max(72, Math.round(Math.max(width, height) * 0.1))
  let padded = padRgba(
    rgba,
    width,
    height,
    prePad,
    probe.hasAlpha ? [0, 0, 0, 0] : [255, 255, 255, 255],
  )
  rgba = padded.rgba
  width = padded.w
  height = padded.h

  let { fg } = foreground(rgba, width, height, { tol, mode })
  fg = keepLargest(fg, width, height)
  fg = fillSmallHoles(fg, width, height)
  fg = keepLargest(fg, width, height)
  fg = smoothMask(fg, width, height, 1.05)
  fg = keepLargest(fg, width, height)

  let fgCount = 0
  for (let i = 0; i < fg.length; i++) if (fg[i]) fgCount++
  if (fgCount < 400) {
    throw new Error(`Foreground too small in ${src} (${fgCount} px)`)
  }

  let box = bboxOf(fg, width, height)!
  let objW = box.maxX - box.minX + 1
  let objH = box.maxY - box.minY + 1
  let border =
    options.border ?? Math.max(18, Math.round(Math.max(objW, objH) * 0.05))

  let sdf = signedDistance(fg, width, height)
  let die = new Uint8Array(fg.length)
  for (let i = 0; i < die.length; i++) die[i] = sdf[i]! >= -border ? 1 : 0
  die = smoothMask(die, width, height, 3.4)

  let dieSdf = gaussianBlur(
    signedDistance(die, width, height),
    width,
    height,
    1.15,
  )
  let whiteA = new Uint8Array(fg.length)
  for (let i = 0; i < whiteA.length; i++) {
    whiteA[i] = Math.max(
      0,
      Math.min(255, Math.round(((dieSdf[i]! + 2) / 4) * 255)),
    )
  }

  let sticker = Buffer.alloc(width * height * 4)
  for (let i = 0; i < fg.length; i++) {
    let o = i * 4
    sticker[o] = vr
    sticker[o + 1] = vg
    sticker[o + 2] = vb
    sticker[o + 3] = whiteA[i]!
    let prodA = Math.max(
      0,
      Math.min(255, Math.round(((sdf[i]! + 0.75) / 1.5) * 255)),
    )
    if (prodA <= 0) continue
    let sr = sticker[o]!
    let sg = sticker[o + 1]!
    let sb = sticker[o + 2]!
    let sa = sticker[o + 3]! / 255
    let pr = rgba[o]!
    let pg = rgba[o + 1]!
    let pb = rgba[o + 2]!
    let pa = prodA / 255
    let outA = pa + sa * (1 - pa)
    if (outA <= 0) continue
    sticker[o] = Math.round((pr * pa + sr * sa * (1 - pa)) / outA)
    sticker[o + 1] = Math.round((pg * pa + sg * sa * (1 - pa)) / outA)
    sticker[o + 2] = Math.round((pb * pa + sb * sa * (1 - pa)) / outA)
    sticker[o + 3] = Math.round(outA * 255)
  }

  let whiteBox = bboxOf(whiteA, width, height)
  if (!whiteBox) throw new Error(`No silhouette in ${src}`)
  let extra = Math.max(16, Math.round(border * 0.55))
  let left = Math.max(0, whiteBox.minX - extra)
  let top = Math.max(0, whiteBox.minY - extra)
  let right = Math.min(width, whiteBox.maxX + 1 + extra)
  let bottom = Math.min(height, whiteBox.maxY + 1 + extra)
  let cw = right - left
  let ch = bottom - top
  let cropped = Buffer.alloc(cw * ch * 4)
  for (let y = 0; y < ch; y++) {
    sticker.copy(
      cropped,
      y * cw * 4,
      ((top + y) * width + left) * 4,
      ((top + y) * width + left + cw) * 4,
    )
  }

  let marginFrac = options.margin ?? 0.05
  let margin = Math.max(extra, Math.round(Math.max(cw, ch) * marginFrac))
  let side = Math.max(cw, ch) + margin * 2
  let canvas = Buffer.alloc(side * side * 4)
  let ox = ((side - cw) / 2) | 0
  let oy = ((side - ch) / 2) | 0
  for (let y = 0; y < ch; y++) {
    cropped.copy(
      canvas,
      ((oy + y) * side + ox) * 4,
      y * cw * 4,
      (y + 1) * cw * 4,
    )
  }

  await mkdir(path.dirname(options.dest), { recursive: true })
  await sharp(canvas, { raw: { width: side, height: side, channels: 4 } })
    .resize(outSize, outSize, { kernel: 'lanczos3' })
    .png({ compressionLevel: 9 })
    .toFile(options.dest)

  console.log(
    `wrote ${path.basename(options.dest)}  fg=${(fgCount / fg.length).toFixed(3)}  border=${border}`,
  )
}

export async function exportAppIcon(src: string, dest: string, outSize = 512) {
  await mkdir(path.dirname(dest), { recursive: true })
  await sharp(src)
    .ensureAlpha()
    .resize(outSize, outSize, { kernel: 'lanczos3' })
    .png()
    .toFile(dest)
  console.log(`wrote app ${path.basename(dest)}`)
}

/** Optional gray vinyl if a dark plate is ever needed again. Uses stickers stay white. */
export const vinylMutedRgb: [number, number, number] = [51, 51, 51]

/**
 * Recolor the baked white vinyl ring on an existing sticker PNG.
 * Product pixels stay as-is; only near-white outline / die-cut fill changes.
 */
export async function recolorVinyl(
  src: string,
  dest: string,
  rgb: [number, number, number] = vinylMutedRgb,
) {
  let raw = await sharp(src).ensureAlpha().raw().toBuffer({
    resolveWithObject: true,
  })
  let w = raw.info.width
  let h = raw.info.height
  let rgba = Buffer.from(raw.data)
  let n = w * h
  let opaque = new Uint8Array(n)
  for (let i = 0; i < n; i++) opaque[i] = rgba[i * 4 + 3]! > 20 ? 1 : 0
  let sdf = signedDistance(opaque, w, h)
  let vinylMax = Math.max(28, Math.round(Math.min(w, h) * 0.055))
  let [vr, vg, vb] = rgb
  let count = 0
  for (let i = 0; i < n; i++) {
    let o = i * 4
    let a = rgba[o + 3]!
    if (a <= 20) continue
    let r = rgba[o]!
    let g = rgba[o + 1]!
    let b = rgba[o + 2]!
    let minc = Math.min(r, g, b)
    let maxc = Math.max(r, g, b)
    let dist = sdf[i]!
    let exactWhite = minc >= 254 && maxc - minc <= 4
    let edgeWhite = minc >= 248 && maxc - minc <= 12 && dist <= vinylMax
    if (!exactWhite && !edgeWhite) continue
    rgba[o] = vr
    rgba[o + 1] = vg
    rgba[o + 2] = vb
    count++
  }
  await mkdir(path.dirname(dest), { recursive: true })
  await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(dest)
  console.log(
    `recolored ${path.basename(dest)}  vinyl=${(count / n).toFixed(3)}  rgb=${vr},${vg},${vb}`,
  )
}

function parseArgs(argv: string[]) {
  let mode: Mode = 'auto'
  let app = false
  let recolorVinylRgb: [number, number, number] | undefined
  let vinylRgb: [number, number, number] | undefined
  let tol: number | undefined
  let margin: number | undefined
  let crop: [number, number, number, number] | undefined
  let positional: string[] = []

  for (let i = 0; i < argv.length; i++) {
    let arg = argv[i]!
    if (arg === '--app') app = true
    else if (arg === '--help' || arg === '-h') {
      console.log(
        'Usage: npm run stickerify -- [--app] [--mode auto|alpha] [--tol 36] [--margin 0.05] [--crop l,t,r,b] [--vinyl r,g,b] [--recolor-vinyl r,g,b] <input> <output.png>',
      )
      process.exit(0)
    } else if (arg === '--mode') mode = argv[++i] as Mode
    else if (arg === '--tol') tol = Number(argv[++i])
    else if (arg === '--margin') margin = Number(argv[++i])
    else if (arg === '--recolor-vinyl') {
      let parts = argv[++i]!.split(',').map(Number)
      if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) {
        throw new Error('Use --recolor-vinyl r,g,b with 0–255 values')
      }
      recolorVinylRgb = parts as [number, number, number]
    } else if (arg === '--vinyl') {
      let parts = argv[++i]!.split(',').map(Number)
      if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) {
        throw new Error('Use --vinyl r,g,b with 0–255 values')
      }
      vinylRgb = parts as [number, number, number]
    } else if (arg === '--crop') {
      let parts = argv[++i]!.split(',').map(Number)
      if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) {
        throw new Error('Use --crop left,top,right,bottom with 0–1 values')
      }
      crop = parts as [number, number, number, number]
    } else if (arg.startsWith('-')) {
      throw new Error(`Unknown flag: ${arg}`)
    } else {
      positional.push(arg)
    }
  }

  if (positional.length !== 2) {
    throw new Error(
      'Usage: npm run stickerify -- [--app] [--mode auto|alpha] [--tol 36] [--margin 0.05] [--crop l,t,r,b] [--vinyl r,g,b] [--recolor-vinyl r,g,b] <input> <output.png>',
    )
  }

  return {
    app,
    mode,
    tol,
    margin,
    crop,
    vinylRgb,
    recolorVinylRgb,
    src: positional[0]!,
    dest: positional[1]!,
  }
}

let isMain =
  import.meta.url === pathToFileURL(path.resolve(process.argv[1] ?? '')).href
if (isMain) {
  let args = parseArgs(process.argv.slice(2))
  if (args.app) {
    await exportAppIcon(args.src, args.dest)
  } else if (args.recolorVinylRgb) {
    await recolorVinyl(args.src, args.dest, args.recolorVinylRgb)
  } else {
    await stickerify(args.src, {
      dest: args.dest,
      mode: args.mode,
      tol: args.tol,
      margin: args.margin,
      crop: args.crop,
      vinyl: args.vinylRgb,
    })
  }
}
