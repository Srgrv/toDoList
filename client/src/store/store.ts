import { configureStore } from "@reduxjs/toolkit";

//slices
import toDoSlice from "./slices/toDoSlice";
import editTodoSlice from "./slices/editTodoSlice";

const store = configureStore({
  reducer: {
    todos: toDoSlice,
    editTodo: editTodoSlice,
  },
});

export default store;
