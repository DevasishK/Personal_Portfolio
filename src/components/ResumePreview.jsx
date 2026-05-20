import { ExternalLink } from 'lucide-react'
import { useMemo } from 'react'
import { isGoogleDriveUrl } from '../utils/resumeUrls.js'
import { resolvePublicAssetUrl } from '../utils/publicAssetUrl.js'

export default function ResumePreview({ src, downloadUrl, className = 'h-[75vh]' }) {
  const absoluteSrc = useMemo(() => resolvePublicAssetUrl(src), [src])
  const absoluteDownload = useMemo(() => resolvePublicAssetUrl(downloadUrl || src), [downloadUrl, src])
  const useDriveEmbed = isGoogleDriveUrl(absoluteSrc)

  return (
    <div className={className}>
      <div className="flex h-full min-h-[420px] flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-950">
        {useDriveEmbed ? (
          <iframe
            key={absoluteSrc}
            src={absoluteSrc}
            title="Resume preview"
            className="min-h-0 flex-1 w-full border-0"
            allow="autoplay"
          />
        ) : (
          <embed
            key={absoluteSrc}
            src={absoluteSrc}
            type="application/pdf"
            className="min-h-0 flex-1 w-full"
            title="Resume preview"
          />
        )}
        {useDriveEmbed ? (
          <p className="shrink-0 border-t border-zinc-200 px-3 py-2 text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400">
            Hosted on Google Drive — set sharing to <strong>Anyone with the link</strong> so visitors can view it.
          </p>
        ) : (
          <p className="shrink-0 border-t border-zinc-200 px-3 py-2 text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400">
            If the preview is blank, re-export your PDF (Preview → File → Export as PDF) or use a Google Drive link in{' '}
            <code className="font-mono">sampleData.js</code>.
          </p>
        )}
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
