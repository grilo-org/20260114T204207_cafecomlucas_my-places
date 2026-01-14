import dynamic from 'next/dynamic'
import { InfoOutline } from '@emotion-icons/evaicons-outline'
import Head from 'next/head'

import LinkWrapper from '@/components/LinkWrapper'
import { MapProps } from '@/components/Map'

import { generateNextSeo } from 'next-seo/pages'

const Map = dynamic(() => import('@/components/Map'), { ssr: false })

export type HomeTemplateProps = MapProps

const HomeTemplate = ({ places }: HomeTemplateProps) => {
  return (
    <>
      <Head>
        {generateNextSeo({
          description:
            'A simple project to show in a map the places that I went and show more informations and photos when clicked.'
        })}
      </Head>
      <LinkWrapper href="/about">
        <InfoOutline size={32} aria-label="About" />
      </LinkWrapper>
      <Map places={places} />
    </>
  )
}

export default HomeTemplate
