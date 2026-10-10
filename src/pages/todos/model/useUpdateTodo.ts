import { useMutation } from '@apollo/client/react';
import { ListTodosDocument } from '../api/ListTodos.generated';
import { UpdateTodoDocument } from '../api/UpdateTodo.generated';

export function useUpdateTodo() {
  const [updateTodo, { loading, error, reset }] = useMutation(UpdateTodoDocument, {
    refetchQueries: [ListTodosDocument],
    awaitRefetchQueries: true,
  });

  return { updateTodo, loading, error, reset };
}
