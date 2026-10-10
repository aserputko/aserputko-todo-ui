import { apolloClient } from '@/shared/api/apollo-client';
import { ApolloProvider as BaseApolloProvider } from '@apollo/client/react';
import type { ReactNode } from 'react';

export function ApolloProvider({ children }: { children: ReactNode }) {
  return <BaseApolloProvider client={apolloClient}>{children}</BaseApolloProvider>;
}
