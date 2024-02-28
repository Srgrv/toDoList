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

type TgetState = typeof store.getState; // представляет функцию, которая возвращает объект с определенным типом структуры
export type RootState = ReturnType<TgetState>; // извлекаем тип возвращаемого значения функции, представленной типом TgetState

//либо export type RootState = Returntype<typeof store.getState>

export default store;
