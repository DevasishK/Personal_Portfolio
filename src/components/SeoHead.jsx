import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import {
  metaAuthor,
  metaKeywords,
  ogImageUrl,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  ogLocale,
  seoForPathname,
} from '../seo.ts'

export default function SeoHead() {
  const { pathname } = useLocation()
  const { title, description, canonical } = seoForPathname(pathname)

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={metaAuthor} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Devasish Viswanadh Kolla" />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content={String(OG_IMAGE_WIDTH)} />
      <meta property="og:image:height" content={String(OG_IMAGE_HEIGHT)} />
      <meta property="og:image:alt" content="Devasish Viswanadh Kolla — portfolio preview" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta name="twitter:image:alt" content="Devasish Viswanadh Kolla — portfolio preview" />
    </Helmet>
  )
}
