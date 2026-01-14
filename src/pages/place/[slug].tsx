import PlaceTemplate, { PlaceTemplateProps } from '@/templates/Place'
import { GetStaticPaths, GetStaticProps } from 'next'
import {
  GetPlacesQuery,
  GetPlaceBySlugQuery
} from '@/graphql/generated/graphql'

import createApolloClient from '@/graphql/client'
import { GET_PLACES, GET_PLACE_BY_SLUG } from '@/graphql/queries'

import { useRouter } from 'next/router'

const Place = ({ place }: PlaceTemplateProps) => {
  const router = useRouter()

  if (router.isFallback) return null

  return <PlaceTemplate place={place} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = createApolloClient()
  const { data } = await client.query<GetPlacesQuery>({
    query: GET_PLACES,
    variables: { first: 1 }
  })

  let paths
  if (data && data.places.length > 0) {
    paths = data?.places?.map(({ slug }) => ({
      params: { slug }
    }))
  } else {
    paths = [{ params: { slug: '' } }]
  }

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = createApolloClient()
  const { data } = await client.query<GetPlaceBySlugQuery>({
    query: GET_PLACE_BY_SLUG,
    variables: { slug: params?.slug }
  })

  if (!data?.place) return { notFound: true }

  const { place } = data

  return {
    revalidate: 43200,
    props: {
      place
    }
  }
}

export default Place
