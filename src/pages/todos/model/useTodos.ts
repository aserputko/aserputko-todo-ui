import { useQuery } from '@apollo/client/react';
import { ListTodosDocument } from '../api/ListTodos.generated';

export function useTodos() {
  const { data, loading, error } = useQuery(ListTodosDocument, {
    variables: { page: 1, pageSize: 10 },
  });

  return {
    todos: data?.todos.items ?? [],
    total: data?.todos.total ?? 0,
    loading,
    error,
  };
}
