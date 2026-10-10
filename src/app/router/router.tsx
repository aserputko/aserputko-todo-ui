import { NotFoundPage } from '@/pages/not-found';
import { TodosPage } from '@/pages/todos';
import { createBrowserRouter, redirect } from 'react-router';

export const router = createBrowserRouter([
  { path: '/', loader: () => redirect('/todos') },
  { path: '/todos', element: <TodosPage /> },
  { path: '/not-found', element: <NotFoundPage /> },
  { path: '*', loader: () => redirect('/not-found') },
]);
