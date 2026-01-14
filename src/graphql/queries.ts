import { gql } from '@apollo/client'

export const GET_PAGES = gql`
  query getPages {
    pages {
      slug
      heading
      body {
        html
      }
    }
  }
`

export const GET_PAGE_BY_SLUG = gql`
  query getPageBySlug($slug: String!) {
    page(where: { slug: $slug }) {
      heading
      body {
        html
      }
    }
  }
`

export const GET_PLACES = gql`
  query getPlaces($first: Int) {
    places(first: $first) {
      id
      name
      slug
      location {
        latitude
        longitude
      }
    }
  }
`

export const GET_PLACE_BY_SLUG = gql`
  query getPlaceBySlug($slug: String!) {
    place(where: { slug: $slug }) {
      name
      description {
        html
        text
      }
      gallery {
        url
        width
        height
      }
    }
  }
`
