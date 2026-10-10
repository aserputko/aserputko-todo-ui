import { useMutation } from '@apollo/client/react';
import { DeleteTodoDocument } from '../api/DeleteTodo.generated';
import { ListTodosDocument } from '../api/ListTodos.generated';

export function useDeleteTodo() {
  const [deleteTodo, { loading, error }] = useMutation(DeleteTodoDocument, {
    refetchQueries: [ListTodosDocument],
    awaitRefetchQueries: true,
  });

  return { deleteTodo: (id: string) => deleteTodo({ variables: { id } }), loading, error };
}
