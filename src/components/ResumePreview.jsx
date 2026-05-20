import { ExternalLink, Loader2 } from 'lucide-react'
import * as pdfjs from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { useEffect, useMemo, useRef, useState } from 'react'
import { resolvePublicAssetUrl } from '../utils/publicAssetUrl.js'

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker

export default function ResumePreview({ src, downloadUrl, className = 'h-[75vh]' }) {
  const containerRef = useRef(null)
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const absoluteSrc = useMemo(() => resolvePublicAssetUrl(src), [src])
  const absoluteDownload = useMemo(() => resolvePublicAssetUrl(downloadUrl || src), [downloadUrl, src])

  useEffect(() => {
    const container = containerRef.current
    if (!absoluteSrc || !container) return

    let cancelled = false
    let loadingTask = null

    async function renderPdf() {
      setStatus('loading')
      setErrorMsg('')
      container.replaceChildren()

      try {
        loadingTask = pdfjs.getDocument({ url: absoluteSrc, withCredentials: false })
        const pdf = await loadingTask.promise
        if (cancelled) return

        const width = container.clientWidth > 0 ? container.clientWidth - 16 : 640
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          if (cancelled) return
          const page = await pdf.getPage(pageNum)
          const unscaled = page.getViewport({ scale: 1 })
          const scale = width / unscaled.width
          const viewport = page.getViewport({ scale: scale * pixelRatio })

          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          canvas.width = viewport.width
          canvas.height = viewport.height
          canvas.style.width = `${viewport.width / pixelRatio}px`
          canvas.style.height = `${viewport.height / pixelRatio}px`
          canvas.className = 'mx-auto mb-4 block max-w-full rounded-sm bg-white shadow-sm'

          const wrapper = document.createElement('div')
          wrapper.className = 'flex justify-center'
          wrapper.appendChild(canvas)
          container.appendChild(wrapper)

          await page.render({ canvasContext: ctx, viewport }).promise
        }

        if (!cancelled) setStatus('ready')
      } catch (err) {
        if (!cancelled) {
          setStatus('error')
          setErrorMsg(err instanceof Error ? err.message : 'Could not load resume')
        }
      }
    }

    renderPdf()

    return () => {
      cancelled = true
      loadingTask?.destroy?.()
    }
  }, [absoluteSrc])

  return (
    <div className={className}>
      <div className="relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-white/10 dark:bg-zinc-900">
        {status === 'loading' ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 bg-zinc-100/90 text-zinc-600 dark:bg-zinc-900/90 dark:text-zinc-300">
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            <span>Loading resume…</span>
          </div>
        ) : null}

        {status === 'error' ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center text-sm text-zinc-600 dark:text-zinc-300">
            <p>Preview failed: {errorMsg}</p>
            <a
              className="inline-flex items-center gap-1.5 font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-white"
              href={absoluteDownload}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Open resume in new tab
            </a>
          </div>
        ) : (
          <div ref={containerRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2" />
        )}

        <div className="flex shrink-0 justify-end border-t border-zinc-200 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-zinc-950">
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
