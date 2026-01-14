import PageTemplate, { PageTemplateProps } from '@/templates/Page'
import createApolloClient from '@/graphql/client'
import { GET_PAGE_BY_SLUG, GET_PAGES } from '@/graphql/queries'
import { GetStaticProps, GetStaticPaths } from 'next'
import { GetPageBySlugQuery, GetPagesQuery } from '@/graphql/generated/graphql'

const Page = ({ heading, body }: PageTemplateProps) => {
  return <PageTemplate heading={heading} body={body} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = createApolloClient()
  const { data } = await client.query<GetPagesQuery>({
    query: GET_PAGES
  })

  let paths
  if (data && data.pages.length > 0) {
    paths = data?.pages?.map(({ slug }) => ({
      params: { slug }
    }))
  } else {
    paths = [{ params: { slug: '' } }]
  }

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = createApolloClient()
  const { data } = await client.query<GetPageBySlugQuery>({
    query: GET_PAGE_BY_SLUG,
    variables: { slug: `${params?.slug}` }
  })

  if (!data?.page) return { notFound: true }

  const { heading, body } = data.page

  return {
    props: {
      heading,
      body
    }
  }
}

export default Page
