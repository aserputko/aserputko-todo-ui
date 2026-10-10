import { useTodos } from '../model/useTodos';
import { PaginationControls } from './PaginationControls';
import { TodoCard } from './TodoCard';

export function TodosPage() {
  const { todos, loading, error, page, totalPages, setPage } = useTodos();

  return (
    <main className='mx-auto flex max-w-2xl flex-col gap-6 p-6'>
      <h1 className='text-2xl font-semibold'>Todos</h1>
      {loading && <p>Loading...</p>}
      {error && <p role='alert'>Failed to load todos: {error.message}</p>}
      <ul className='flex flex-col gap-4'>
        {todos.map((todo) => (
          <li key={todo.id}>
            <TodoCard todo={todo} />
          </li>
        ))}
      </ul>
      <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />
    </main>
  );
}
