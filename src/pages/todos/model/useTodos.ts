import { useQuery } from '@apollo/client/react';
import { useState } from 'react';
import { ListTodosDocument } from '../api/ListTodos.generated';

const PAGE_SIZE = 10;

export function useTodos() {
  const [page, setPage] = useState(1);
  const { data, previousData, loading, error } = useQuery(ListTodosDocument, {
    variables: { page, pageSize: PAGE_SIZE },
  });

  // Keep the previous page visible while the next one loads.
  const current = data ?? previousData;
  const total = current?.todos.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return {
    todos: current?.todos.items ?? [],
    total,
    page,
    pageSize: PAGE_SIZE,
    totalPages,
    setPage: (next: number) => setPage(Math.min(Math.max(1, next), totalPages)),
    loading,
    error,
  };
}
