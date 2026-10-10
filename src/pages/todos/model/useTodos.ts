import type { TodoStatus } from '@/shared/api/graphql/schema.generated';
import { useQuery } from '@apollo/client/react';
import { useState } from 'react';
import { ListTodosDocument } from '../api/ListTodos.generated';

const PAGE_SIZE = 10;

export function useTodos() {
  const [page, setPage] = useState(1);
  // undefined means no filter: the status is not sent to the backend.
  const [status, setStatusState] = useState<TodoStatus | undefined>(undefined);
  const { data, previousData, loading, error } = useQuery(ListTodosDocument, {
    variables: { status, page, pageSize: PAGE_SIZE },
  });

  const setStatus = (next: TodoStatus | undefined) => {
    setStatusState(next);
    setPage(1);
  };

  // Keep the previous page visible while the next one loads.
  const current = data ?? previousData;
  const total = current?.todos.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return {
    todos: current?.todos.items ?? [],
    total,
    page,
    status,
    setStatus,
    pageSize: PAGE_SIZE,
    totalPages,
    setPage: (next: number) => setPage(Math.min(Math.max(1, next), totalPages)),
    loading,
    error,
  };
}
