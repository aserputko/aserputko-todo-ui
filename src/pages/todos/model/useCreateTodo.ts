import { useMutation } from '@apollo/client/react';
import { CreateTodoDocument } from '../api/CreateTodo.generated';
import { ListTodosDocument } from '../api/ListTodos.generated';

export function useCreateTodo() {
  const [createTodo, { loading, error, reset }] = useMutation(CreateTodoDocument, {
    refetchQueries: [ListTodosDocument],
    awaitRefetchQueries: true,
  });

  return { createTodo, loading, error, reset };
}
