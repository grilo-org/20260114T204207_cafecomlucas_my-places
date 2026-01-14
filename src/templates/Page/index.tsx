import LinkWrapper from '@/components/LinkWrapper'
import { CloseOutline } from '@emotion-icons/evaicons-outline'

import * as S from './styles'

export type PageTemplateProps = {
  heading: string
  body: {
    html: string | TrustedHTML
  }
}

const PageTemplate = ({ heading, body }: PageTemplateProps) => {
  const html = { __html: body.html }
  return (
    <S.Content>
      <LinkWrapper href="/">
        <CloseOutline size={32} />
      </LinkWrapper>

      <S.Heading>{heading}</S.Heading>

      <S.Body>
        <div dangerouslySetInnerHTML={html}></div>
      </S.Body>
    </S.Content>
  )
}

export default PageTemplate
