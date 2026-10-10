import { RouterProvider } from 'react-router';
import { ApolloProvider } from './providers/ApolloProvider';
import { router } from './router';

export function App() {
  return (
    <ApolloProvider>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}
