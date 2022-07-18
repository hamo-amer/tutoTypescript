import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}
interface TodosSliceState {
  todos: Todo[];
}
const initialState: TodosSliceState = {
  todos: [],
};
export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.todos = [
        ...state.todos,
        { id: state.todos.length, text: action.payload, done: false },
      ];
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
  },
});
export const { addTodo, removeTodo } = todosSlice.actions;

type RootState = ReturnType<typeof store.getState>;
export const selectTodos = (state: RootState) => state.todos.todos;

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
});
