import { todosSeed } from './todos.seed';
import type { Todo } from './types';

export function useTodos(): { todos: Todo[] } {
  return { todos: todosSeed };
}
