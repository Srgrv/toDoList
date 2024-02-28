import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editTodoId: null,
};

const editTodoSlice = createSlice({
  name: "editTodo",
  initialState,
  reducers: {
    SET_EDIT_TODO: (state, action) => {
      state.editTodoId = action.payload;
    },
  },
});

export const { SET_EDIT_TODO } = editTodoSlice.actions;
export default editTodoSlice.reducer;
