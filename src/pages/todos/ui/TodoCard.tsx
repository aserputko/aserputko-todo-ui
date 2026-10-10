import { Badge } from '@/shared/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import type { ListTodosQuery } from '../api/ListTodos.generated';

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

  return (
    <Card>
      <CardHeader>
        <div className='flex items-start justify-between gap-4'>
          <CardTitle>{todo.title}</CardTitle>
          <Badge variant={variant}>{label}</Badge>
        </div>
        <CardDescription>{todo.description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
