import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.VITE_GRAPHQL_URL ?? 'http://localhost:4000/graphql',
  documents: ['src/**/*.graphql'],
  generates: {
    'src/shared/api/graphql/schema.generated.ts': {
      plugins: ['typescript'],
      // tsconfig has erasableSyntaxOnly, so enums must be emitted as unions
      config: { useTypeImports: true, enumsAsTypes: true },
    },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: 'shared/api/graphql/schema.generated.ts',
      },
      // operations without schema types (e.g. DeleteTodo) leave the Types import unused
      plugins: [{ add: { content: '// @ts-nocheck' } }, 'typescript-operations', 'typed-document-node'],
      config: { useTypeImports: true },
    },
  },
};

export default config;
