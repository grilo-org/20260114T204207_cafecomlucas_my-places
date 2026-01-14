import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import { generateDefaultSeo } from 'next-seo/pages'

import { DEFAULT_SEO } from '@/config/next-seo.config'
import { globalStyles } from '@/styles/global'
import Head from 'next/head'

const cache = createCache({ key: 'next' })

const App = ({ Component, pageProps }: AppProps) => (
  <CacheProvider value={cache}>
    {globalStyles}
    <Head>
      <meta
        name="google-site-verification"
        content="09fIGqbUb33gygeDtIwWFwBHVcJERHt5KcLlSY0B9Ac"
      />
      {generateDefaultSeo(DEFAULT_SEO)}
    </Head>
    <NextNProgress
      color="#74B1DE"
      startPosition={0.3}
      height={4}
      stopDelayMs={80}
      options={{ easing: 'ease-out', speed: 400 }}
    />
    <Component {...pageProps} />
  </CacheProvider>
)

export default App
