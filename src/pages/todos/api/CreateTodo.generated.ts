// @ts-nocheck
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type * as Types from '../../../shared/api/graphql/schema.generated';

import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CreateTodoInput = {
  description?: string | null | undefined;
  status?: TodoStatus | null | undefined;
  title: string;
};

export type TodoStatus =
  | 'Done'
  | 'InProgress'
  | 'Todo';

export type CreateTodoMutationVariables = Exact<{
  input: Types.CreateTodoInput;
}>;


export type CreateTodoMutation = { createTodo: string };


export const CreateTodoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTodo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTodoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTodo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<CreateTodoMutation, CreateTodoMutationVariables>;