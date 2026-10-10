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
import { useState, type SubmitEventHandler } from 'react';
import { useCreateTodo } from '../model/useCreateTodo';

const statusItems: { value: TodoStatus; label: string }[] = [
  { value: 'Todo', label: 'To do' },
  { value: 'InProgress', label: 'In progress' },
  { value: 'Done', label: 'Done' },
];

export function CreateTodoDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TodoStatus>('Todo');
  const { createTodo, loading, error, reset } = useCreateTodo();

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setTitle('');
      setDescription('');
      setStatus('Todo');
      reset();
    }
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const { error: mutationError } = await createTodo({
      variables: {
        input: { title: title.trim(), description: description.trim() || null, status },
      },
    });
    if (!mutationError) handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button />}>Add Todo</DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className='grid gap-4'>
          <DialogHeader>
            <DialogTitle>Add Todo</DialogTitle>
            <DialogDescription>Create a new todo item.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-2'>
            <Label htmlFor='todo-title'>Title</Label>
            <Input
              id='todo-title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='todo-description'>Description</Label>
            <Textarea
              id='todo-description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='todo-status'>Status</Label>
            <Select
              items={statusItems}
              value={status}
              onValueChange={(value) => value && setStatus(value)}
            >
              <SelectTrigger id='todo-status' className='w-full'>
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
          {error && <p role='alert'>Failed to create todo: {error.message}</p>}
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
