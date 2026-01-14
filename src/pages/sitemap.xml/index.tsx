import { getServerSideSitemapLegacy, ISitemapField } from 'next-sitemap'
import { GetServerSideProps } from 'next'

import createApolloClient from '@/graphql/client'
import { GET_PLACES } from '@/graphql/queries'
import { GetPlacesQuery } from '@/graphql/generated/graphql'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const client = createApolloClient()
  const { data } = await client.query<GetPlacesQuery>({
    query: GET_PLACES
  })

  const fields: ISitemapField[] =
    data?.places.map(({ slug }) => ({
      loc: `https://my-places.cafecomlucas.dev/place/${slug}`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily'
    })) || []

  fields.push(
    {
      loc: `https://my-places.cafecomlucas.dev/about`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly'
    },
    {
      loc: `https://my-places.cafecomlucas.dev/`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly'
    }
  )

  return getServerSideSitemapLegacy(ctx, fields)
}

// Default export to prevent next.js errors
export default function Sitemap() {}
