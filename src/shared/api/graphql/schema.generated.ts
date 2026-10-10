export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: unknown; output: unknown; }
};

export type CreateTodoInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TodoStatus>;
  title: Scalars['String']['input'];
};

export type Health = {
  __typename?: 'Health';
  status: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: Scalars['ID']['output'];
  deleteTodo: Scalars['Boolean']['output'];
  updateTodo: Scalars['Boolean']['output'];
};


export type MutationCreateTodoArgs = {
  input: CreateTodoInput;
};


export type MutationDeleteTodoArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateTodoArgs = {
  id: Scalars['ID']['input'];
  input: UpdateTodoInput;
};

export type PaginatedTodos = {
  __typename?: 'PaginatedTodos';
  items: Array<Todo>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  health: Health;
  todo: Todo;
  todos: PaginatedTodos;
};


export type QueryTodoArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTodosArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  status?: InputMaybe<TodoStatus>;
};

export type Todo = {
  __typename?: 'Todo';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  status: TodoStatus;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TodoStatus =
  | 'Done'
  | 'InProgress'
  | 'Todo';

export type UpdateTodoInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TodoStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
};
