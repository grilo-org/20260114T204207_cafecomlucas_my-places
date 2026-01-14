import type { DefaultSeoProps } from 'next-seo/pages'

export const DEFAULT_SEO: DefaultSeoProps = {
  titleTemplate: '%s | My Places',
  defaultTitle: 'My Places',
  description: 'A simple project to show my favorite spots in the world.',
  canonical: 'https://my-places.cafecomlucas.dev/',
  themeColor: '#06092b',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://my-places.cafecomlucas.dev/',
    siteName: 'My Places',
    images: [
      {
        url: 'https://my-places.cafecomlucas.dev/img/cover.png',
        width: 1920,
        height: 1080,
        alt: 'My Places Cover Image'
      }
    ]
  }
}
