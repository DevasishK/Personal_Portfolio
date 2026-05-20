/** Files in `public/` are served from the site root (`/file.pdf`), not `/public/...`. */
function publicAsset(path) {
  const trimmed = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${trimmed}`
}

/** Extract file id from a Google Drive share link or raw id string. */
export function parseGoogleDriveFileId(input) {
  if (!input) return null
  const trimmed = input.trim()
  const fileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (fileMatch) return fileMatch[1]
  const openMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  if (openMatch) return openMatch[1]
  if (/^[a-zA-Z0-9_-]{10,}$/.test(trimmed)) return trimmed
  return null
}

export function isGoogleDriveUrl(url) {
  return Boolean(url && /drive\.google\.com/i.test(url))
}

export function isExternalResumeUrl(url) {
  return Boolean(url && /^https?:\/\//i.test(url))
}

/** In-modal embed: Drive /preview endpoint (requires link sharing: anyone with the link). */
export function resumeFromGoogleDrive(shareUrl) {
  const id = parseGoogleDriveFileId(shareUrl)
  if (!id) {
    throw new Error('Invalid Google Drive link — use Share → Copy link from the PDF in Drive.')
  }
  return {
    resumeUrl: `https://drive.google.com/uc?export=download&id=${id}`,
    resumePreviewUrl: `https://drive.google.com/file/d/${id}/preview`,
    resumeViewUrl: `https://drive.google.com/file/d/${id}/view`,
  }
}

export function resumeFromLocal(pathInPublic = '/resume.pdf') {
  const url = publicAsset(pathInPublic)
  return {
    resumeUrl: url,
    resumePreviewUrl: url,
    resumeViewUrl: url,
  }
}
