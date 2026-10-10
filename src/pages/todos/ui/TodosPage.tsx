import { useTodos } from '../model/useTodos';
import { CreateTodoDialog } from './CreateTodoDialog';
import { TodoCard } from './TodoCard';
import { TodosPagination } from './TodosPagination';

export function TodosPage() {
  const { todos, loading, error, page, totalPages, setPage } = useTodos();

  return (
    <main className='mx-auto flex max-w-2xl flex-col gap-6 p-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Todos</h1>
        <CreateTodoDialog />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p role='alert'>Failed to load todos: {error.message}</p>}
      <ul className='flex flex-col gap-4'>
        {todos.map((todo) => (
          <li key={todo.id}>
            <TodoCard todo={todo} />
          </li>
        ))}
      </ul>
      <TodosPagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </main>
  );
}
