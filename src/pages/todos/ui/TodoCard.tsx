import { Badge } from '@/shared/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import type { Todo, TodoStatus } from '../model/types';

const statusConfig: Record<
  TodoStatus,
  { label: string; variant: 'secondary' | 'default' | 'outline' }
> = {
  todo: { label: 'To do', variant: 'secondary' },
  'in-progress': { label: 'In progress', variant: 'default' },
  done: { label: 'Done', variant: 'outline' },
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
