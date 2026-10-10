import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Trash2 } from 'lucide-react';
import type { ListTodosQuery } from '../api/ListTodos.generated';
import { useDeleteTodo } from '../model/useDeleteTodo';
import { EditTodoDialog } from './EditTodoDialog';

type Todo = ListTodosQuery['todos']['items'][number];

const statusConfig: Record<
  Todo['status'],
  { label: string; variant: 'secondary' | 'default' | 'outline' }
> = {
  Todo: { label: 'To do', variant: 'secondary' },
  InProgress: { label: 'In progress', variant: 'default' },
  Done: { label: 'Done', variant: 'outline' },
};

export function TodoCard({ todo }: { todo: Todo }) {
  const { label, variant } = statusConfig[todo.status];
  const { deleteTodo, loading, error } = useDeleteTodo();

  return (
    <Card key={todo.id}>
      <CardHeader>
        <div className='flex items-start justify-between gap-4'>
          <CardTitle>{todo.title}</CardTitle>
          <div className='flex items-center gap-2'>
            <Badge variant={variant}>{label}</Badge>
            <EditTodoDialog todo={todo} />
            <Button
              variant='ghost'
              size='icon-sm'
              aria-label={`Delete ${todo.title}`}
              disabled={loading}
              onClick={() => deleteTodo(todo.id)}
            >
              <Trash2 />
            </Button>
          </div>
        </div>
        <CardDescription>{todo.description}</CardDescription>
        {error && <p role='alert'>Failed to delete todo: {error.message}</p>}
      </CardHeader>
    </Card>
  );
}
