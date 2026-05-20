import { ExternalLink } from 'lucide-react'
import { useMemo } from 'react'
import { resolvePublicAssetUrl } from '../utils/publicAssetUrl.js'

/**
 * In-modal PDF preview uses the browser’s native PDF renderer (embed).
 * PDF.js fails on this resume file because the PDF has a broken xref/trailer
 * (“Invalid Root reference”) — re-export from Preview/Word/Google Docs to fix.
 */
export default function ResumePreview({ src, downloadUrl, className = 'h-[75vh]' }) {
  const absoluteSrc = useMemo(() => resolvePublicAssetUrl(src), [src])
  const absoluteDownload = useMemo(() => resolvePublicAssetUrl(downloadUrl || src), [downloadUrl, src])

  return (
    <div className={className}>
      <div className="flex h-full min-h-[420px] flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-950">
        <embed
          key={absoluteSrc}
          src={absoluteSrc}
          type="application/pdf"
          className="min-h-0 flex-1 w-full"
          title="Resume preview"
        />
        <p className="shrink-0 border-t border-zinc-200 px-3 py-2 text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400">
          If the preview is blank, your PDF file may be damaged. Open it in Preview (Mac) or Acrobat,
          then use <strong>File → Export as PDF</strong> and replace the file in{' '}
          <code className="font-mono">public/</code>.
        </p>
        <div className="flex shrink-0 justify-end gap-3 border-t border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-white/10 dark:bg-zinc-900">
          <a
            className="inline-flex items-center gap-1.5 font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-white"
            href={absoluteDownload}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            Open in new tab
          </a>
        </div>
      </div>
    </div>
  )
}
