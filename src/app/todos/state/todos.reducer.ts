import { Action, createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';

import { FILTER_MODES } from './../constants/filter-modes';
import { ITodo } from '../interfaces/ITodo';

export interface ITodosState {
  filterMode?: FILTER_MODES;
  todos?: ITodo[];
}

export const initialState: ITodosState = {
  filterMode: 'All',
  todos: [],
};

let storeTodosLocal = [];

export function todosReducer(state: ITodosState, action: Action) {
  return createReducer(
    initialState,
    on(TodoActions.addTodo, (existingState, { text }) => {
      storeTodosLocal = [{ text, completed: false }, ...existingState.todos];

      return {
        ...existingState,
        todos: [{ text, completed: false }, ...existingState.todos],
      }
    }),
    on(TodoActions.removeTodo, (existingState, { index }) => {
      const updatedTodos = [...existingState.todos];
      updatedTodos.splice(index, 1);
      storeTodosLocal = [...updatedTodos];

      return {
        ...existingState,
        todos: updatedTodos,
      };
    }),
    on(TodoActions.changeFilterMode, (existingState, { mode }) => {
      if (mode ==='All') {
        return {
          ...existingState,
          todos: [...storeTodosLocal],
          filterMode: mode,
        }
      }
      else if (mode === 'Active') {
        return {
          ...existingState,
          todos: [...storeTodosLocal.filter((todo) => !todo.completed)],
          filterMode: mode,          
        }
      }
      else if (mode==='Completed') {
        return {
          ...existingState,
          todos: [...storeTodosLocal.filter((todo) => todo.completed)],
          filterMode: mode,
        };        
      }

    }),
    on(TodoActions.clearCompleted, (existingState) => {
      storeTodosLocal = [
        ...existingState.todos.filter((todo) => !todo.completed),
      ];

      return {
        ...existingState,
        todos: [...existingState.todos.filter((todo) => !todo.completed)],
      };
    }),
    on(TodoActions.toggleCompleted, (existingState, { index }) => {
      const updatedTodos = [...existingState.todos];
      const newTodo = {
        ...updatedTodos[index],
        completed: !updatedTodos[index].completed,
      };

      const todos = [
        ...existingState.todos.slice(0, index),
        newTodo,
        ...existingState.todos.slice(index + 1),
      ];

      storeTodosLocal = [...todos];

      return {
        ...existingState,
        todos,
      };
    })    
  )(state, action);
}

export const filterMode = (state: ITodosState) => state.filterMode;
export const todos = (state: ITodosState) => state.todos;
