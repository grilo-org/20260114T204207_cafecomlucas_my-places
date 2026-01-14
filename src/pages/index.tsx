import { GetStaticProps } from 'next'
import HomeTemplate, { HomeTemplateProps } from '@/templates/Home'
import createApolloClient from '@/graphql/client'
import { GetPlacesQuery } from '@/graphql/generated/graphql'
import { GET_PLACES } from '@/graphql/queries'

const Home = ({ places }: HomeTemplateProps) => {
  return <HomeTemplate places={places} />
}

export const getStaticProps: GetStaticProps = async () => {
  const client = createApolloClient()
  const { data } = await client.query<GetPlacesQuery>({
    query: GET_PLACES
  })

  return {
    revalidate: 43200,
    props: {
      places: data?.places
    }
  }
}

export default Home
