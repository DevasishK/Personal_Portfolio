import { profile } from '../profile.ts'
import { absoluteUrl, ogImageUrl } from '../seo.ts'

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  alternateName: ['Devasish Kolla'],
  url: absoluteUrl('/'),
  image: ogImageUrl,
  jobTitle: 'Full-stack software engineer',
  description: profile.tagline,
  sameAs: [
    profile.social.linkedin,
    profile.social.github,
    profile.social.instagram,
    profile.social.leetcode,
  ],
}

const jsonString = JSON.stringify(personLd)

export default function JsonLdPerson() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonString }} />
  )
}
