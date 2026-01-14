import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema:
    'https://us-west-2.cdn.hygraph.com/content/cmgs1u0o900kp07uqowxfkrvs/master',
  documents: ['src/graphql/queries.ts'],
  generates: {
    'src/graphql/generated/': {
      preset: 'client',
      plugins: [
        {
          add: {
            content: '/* eslint */'
          }
        }
      ]
    }
  }
}

export default config
