import LinkWrapper from '@/components/LinkWrapper'
import * as S from './styles'
import { CloseOutline } from '@emotion-icons/evaicons-outline'
import Image from 'next/image'
import Head from 'next/head'
import { generateNextSeo } from 'next-seo/pages'

export type PlaceTemplateProps = {
  place: {
    name: string
    description?: {
      html: string | TrustedHTML
      text: string
    }
    gallery: {
      url: string
      width: number
      height: number
    }[]
  }
}

const PlaceTemplate = ({ place }: PlaceTemplateProps) => {
  const { name, description, gallery } = place
  const html = description && { __html: description.html }
  return (
    <>
      <Head>
        {generateNextSeo({
          title: name,
          description: description?.text,
          openGraph: {
            images: [
              {
                url: gallery[0].url,
                width: gallery[0].width,
                height: gallery[0].height,
                alt: name
              }
            ]
          }
        })}
      </Head>

      <LinkWrapper href="/">
        <CloseOutline size={32} aria-label="Go back to map" />
      </LinkWrapper>

      <S.Wrapper>
        <S.Container>
          <S.Heading>{name}</S.Heading>

          {html && <S.Body dangerouslySetInnerHTML={html} />}
          <S.Gallery>
            {gallery.map(({ url }, index) => (
              <Image
                key={`photo-${index}`}
                src={url}
                alt={name}
                sizes="100vw"
                width={1000}
                height={600}
                quality={75}
              />
            ))}
          </S.Gallery>
        </S.Container>
      </S.Wrapper>
    </>
  )
}

export default PlaceTemplate
