import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Todo = {
  id: number;
  text: string;
  tags: string[];
  isComplete?: boolean;
};

export interface ITodosState {
  todosList: string;
  tagsState: string[];
  selectTagState: string;
  togleState: boolean;
  filtredTodosList: Todo[];
}

const initialState: ITodosState = {
  todosList: '',
  tagsState: [],
  selectTagState: '',
  togleState: false,
  filtredTodosList: [],
};

const removeDuplicateTags = (arr: Todo[]) => {
  const removeDuplicate = arr.map((item) => item.tags).flat();
  const arrTags = [...new Set(removeDuplicate)];
  return arrTags;
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodoAction: (state, action: PayloadAction<Todo>) => {
      const data = state.todosList.length ? JSON.parse(state.todosList) : [];
      state.todosList = JSON.stringify([action.payload, ...data]);
      state.tagsState = [...new Set([...state.tagsState, ...action.payload.tags])];
      state.togleState = false;
    },
    updateTodoAction: (state, action) => {
      state.filtredTodosList = state.filtredTodosList
        .map((item) => (item.id === action.payload.todoId ? action.payload.newValue : item))
        .filter((item) => item.tags.length !== 0);

      const updTodosList = JSON.parse(state.todosList).map((item: Todo) =>
        item.id === action.payload.todoId ? action.payload.newValue : item,
      );

      state.togleState = false;
      state.todosList = JSON.stringify(updTodosList);
      state.tagsState = removeDuplicateTags(updTodosList);
    },
    deleteTodoAction: (state, action: PayloadAction<number>) => {
      const updTodosList = JSON.parse(state.todosList).filter(
        (todo: Todo) => todo.id !== action.payload,
      );
      state.todosList = JSON.stringify(updTodosList);

      state.filtredTodosList = state.filtredTodosList.filter(
        (todo: Todo) => todo.id !== action.payload,
      );
      if (!state.filtredTodosList.length) state.togleState = false;

      state.tagsState = removeDuplicateTags(updTodosList);
    },
    completeTodoAction: (state, action: PayloadAction<number>) => {
      const updTodoList = JSON.parse(state.todosList).map((item: Todo) => {
        if (item.id === action.payload) {
          item.isComplete = !item.isComplete;
        }
        return item;
      });
      state.todosList = JSON.stringify(updTodoList);
      state.filtredTodosList = state.filtredTodosList.map((item) => {
        if (item.id === action.payload) {
          item.isComplete = !item.isComplete;
        }
        return item;
      });
    },
    filterTodoAction: (state, action: PayloadAction<string>) => {
      state.filtredTodosList = JSON.parse(state.todosList).filter((todo: Todo) =>
        todo.tags.includes(action.payload),
      );
      state.selectTagState = action.payload;
      state.togleState = true;
    },
    deleteTagsAction: (state, action: PayloadAction<string>) => {
      state.tagsState = state.tagsState.filter((tag) => tag !== action.payload);
      const updTodoList = JSON.parse(state.todosList).map((todo: Todo) => {
        const text = todo.text.split(' ');
        const res = text.indexOf(action.payload);
        if (res !== -1) {
          const textRes = text
            .map((item, index) => (index === res ? item.slice(1) : item))
            .join(' ');

          return {
            id: todo.id,
            text: textRes,
            tags: textRes.split(' ').filter((item) => item[0] === '#'),
          };
        }
        return todo;
      });
      state.todosList = JSON.stringify(updTodoList);
      state.togleState = false;
    },
    togleAction: (state) => {
      state.togleState = false;
    },
  },
});

export const {
  addTodoAction,
  deleteTodoAction,
  completeTodoAction,
  filterTodoAction,
  updateTodoAction,
  deleteTagsAction,
  togleAction,
} = todosSlice.actions;

export default todosSlice.reducer;
