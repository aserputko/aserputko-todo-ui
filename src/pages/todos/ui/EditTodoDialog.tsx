import type { TodoStatus } from '@/shared/api/graphql/schema.generated';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Textarea } from '@/shared/ui/textarea';
import { Pencil } from 'lucide-react';
import { useState, type SubmitEventHandler } from 'react';
import type { ListTodosQuery } from '../api/ListTodos.generated';
import { useUpdateTodo } from '../model/useUpdateTodo';

type Todo = ListTodosQuery['todos']['items'][number];

const statusItems: { value: TodoStatus; label: string }[] = [
  { value: 'Todo', label: 'To do' },
  { value: 'InProgress', label: 'In progress' },
  { value: 'Done', label: 'Done' },
];

export function EditTodoDialog({ todo }: { todo: Todo }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description ?? '');
  const [status, setStatus] = useState<TodoStatus>(todo.status);
  const { updateTodo, loading, error, reset } = useUpdateTodo();

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    // Re-sync the form with the current todo on every open/close.
    setTitle(todo.title);
    setDescription(todo.description ?? '');
    setStatus(todo.status);
    reset();
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const { error: mutationError } = await updateTodo({
      variables: {
        id: todo.id,
        input: { title: title.trim(), description: description.trim() || null, status },
      },
    });
    if (!mutationError) handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant='ghost' size='icon-sm' aria-label={`Edit ${todo.title}`}>
            <Pencil />
          </Button>
        }
      />
      <DialogContent>
        <form onSubmit={handleSubmit} className='grid gap-4'>
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
            <DialogDescription>Update this todo item.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-2'>
            <Label htmlFor={`edit-todo-title-${todo.id}`}>Title</Label>
            <Input
              id={`edit-todo-title-${todo.id}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor={`edit-todo-description-${todo.id}`}>Description</Label>
            <Textarea
              id={`edit-todo-description-${todo.id}`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor={`edit-todo-status-${todo.id}`}>Status</Label>
            <Select
              items={statusItems}
              value={status}
              onValueChange={(value) => value && setStatus(value)}
            >
              <SelectTrigger id={`edit-todo-status-${todo.id}`} className='w-full'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {error && <p role='alert'>Failed to update todo: {error.message}</p>}
          <DialogFooter>
            <Button type='submit' disabled={loading || !title.trim()}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
